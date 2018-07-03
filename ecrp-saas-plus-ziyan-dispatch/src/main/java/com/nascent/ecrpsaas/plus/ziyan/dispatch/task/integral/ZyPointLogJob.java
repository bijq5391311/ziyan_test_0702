package com.nascent.ecrpsaas.plus.ziyan.dispatch.task.integral;

import com.nascent.ecrpsaas.base.model.KdServiceShopPro;
import com.nascent.ecrpsaas.base.util.UtilCollection;
import com.nascent.ecrpsaas.base.util.UtilDate;
import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.base.util.UtilThread;
import com.nascent.ecrpsaas.base.vo.organization.KdBrandAuthorizeVo;
import com.nascent.ecrpsaas.base.vo.organization.SysShopVo;
import com.nascent.ecrpsaas.model.KdPointLog;
import com.nascent.ecrpsaas.organization.model.OutShop;
import com.nascent.ecrpsaas.plus.ziyan.Integral.service.ZyPointLogService;
import com.nascent.ecrpsaas.plus.ziyan.common.constant.ZyServiceType;
import com.nascent.ecrpsaas.plus.ziyan.util.ZyHdUtil;
import com.nascent.ecrpsaas.vo.PointLogVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

public class ZyPointLogJob {

    @Autowired
    private ZyPointLogService zyPointLogService;
    private static final Logger log = LoggerFactory.getLogger(ZyPointLogJob.class);

    private static final Map<String, String> HD_SHOP_CODE = new HashMap<>();


    /**
     * 同步积分日志到业务表
     */
    public void outSynWork() {
        zyPointLogService.outPointLogSynWork();
    }

    /**
     * 从开放平台下载日志服务
     */
    public void downloadWork() {

        //获取下载积分日志线程池
        ThreadPoolTaskScheduler sc = ZyHdUtil.getScheduler(ZyHdUtil.POINT_LOG_DOWNLOAD_SCHEDULER);
        List<KdBrandAuthorizeVo> brandAuthorizeVos = KdBrandAuthorizeVo.dao().queryBrandAuthorizeList();
        if (brandAuthorizeVos == null || brandAuthorizeVos.isEmpty()) {
            return;
        }
        for (KdBrandAuthorizeVo authorizeVo : brandAuthorizeVos) {
            // 判断是否有授权信息
            if (UtilString.isEmptyOrNullWildcard(authorizeVo.getAppKey())
                    || UtilString.isEmptyOrNullWildcard(authorizeVo.getAccessToken())
                    || UtilString.isEmptyOrNullWildcard(authorizeVo.getAppSecret())) {
                continue;
            }
            List<SysShopVo> shopList = UtilCollection.createArrayList();
            Map<String, String> hdShopMap = ZyHdUtil.getHdShop();
            for (String key : hdShopMap.keySet()) {
                String outCode = key;
                // 根据code获取外部店铺
                OutShop outShop = OutShop.dao().queryOutShopByParams(outCode, null);
                if (outShop.getIsRelated() == 1) {
                    // 获取已关联店铺
                    SysShopVo shop = SysShopVo.dao().queryShopByOutSid(outShop.getid());
                    // 店铺未关联
                    if (shop != null) {
                        shopList.add(shop);
                        HD_SHOP_CODE.put(key, shop.getShopCode());
                    }
                }

            }
            if (shopList.isEmpty()) {
                log.error("没有配置互动店铺");
                continue;
            }
            // 判断品牌是否关联店铺
            KdServiceShopPro serviceShopPro = KdServiceShopPro.dao().getServiceProgress(authorizeVo.getBrandId(), 0,
                    ZyServiceType.Zy_HUDONG_POINT_LOG_DOWNLOAD.getName(), ""
                    , ZyServiceType.Zy_HUDONG_POINT_LOG_DOWNLOAD.getValue());
            Date startDate = serviceShopPro.getLastScanTime();
            // 获取开始时间
            Date endDate = UtilDate.addSecond(UtilDate.now(),-10);
            // 根据时间分割线程
            List<String> dateList = ZyHdUtil.dateSplitByDay(startDate, endDate, 1);
            //记录发生异常时间
            Date lastScanTime = endDate;
            List<Future<String>> futureList = UtilCollection.createArrayList();
            for (String date : dateList) {
                //分割时间为一天以内
                Map<String, String> timeMap = ZyHdUtil
                        .splitTimeRange(date, startDate, endDate);
                String startTime = timeMap
                        .get(ZyHdUtil.START_TIME);
                String endTime = timeMap
                        .get(ZyHdUtil.END_TIME);
                futureList.add(sc.submit(new Callable<String>() {
                    @Override
                    public String call() throws Exception {
                        try {
                            log.info("互动积分日志下载开始时间：{}",startTime);
                            //调用下载积分日志接口
                            zyPointLogService
                                    .pointLogDownloadWork(authorizeVo, startTime, endTime,
                                            HD_SHOP_CODE);
                            log.info("互动积分日志下载开始时间：{}",endTime);
                        } catch (Exception e) {
                            log.error("下载互动会员积分日志发生异常，开始时间：" + startTime + "，结束时间：" + endTime
                                    + "异常信息："
                                    + e.getMessage(), e);
                            return startTime;
                        }
                        return "true";
                    }
                }));
            }
            //获取线程返回结果列表
            for (Future<String> future : futureList) {
                String result = "";
                try {
                    //线程执行结果
                    result = future.get();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } catch (ExecutionException e) {
                    e.printStackTrace();
                }
                //判断线程是否执行成功
                if (!UtilString.toBoolean(result)) {
                    if (lastScanTime.after(UtilDate.parseDateTime(result))) {
                        lastScanTime = UtilDate.parseDateTime(result);
                    }
                }
            }
            serviceShopPro.setremark("下载互动会员积分日志成功，时间范围："
                    + UtilDate.formatDateTime(startDate) + "~" + UtilDate.formatDateTime(endDate));
            //更新服务进度时间
            serviceShopPro.setLastScanTime(lastScanTime);
            serviceShopPro.update();

        }
    }

    /**
     * 推送积分开放平台同步日志
     */
    public void synWork() {
        int limit = 1000;
        // 获取所有授权品牌信息
        List<KdBrandAuthorizeVo> brandAuthorizeVos = KdBrandAuthorizeVo.dao().queryBrandAuthorizeList();
        if (brandAuthorizeVos != null && brandAuthorizeVos.size() > 0) {
            ThreadPoolTaskScheduler sc = ZyHdUtil.getScheduler(ZyHdUtil.POINT_LOG_SYN_SCHEDULER);
            // 获取未同步的激活会员积分日志
            for (KdBrandAuthorizeVo authorizeVo : brandAuthorizeVos) {
                // 根据品牌获取需要同步的积分日志
                List<PointLogVo> pointLogs = KdPointLog.dao().querySynPointLog(0, null, limit);
                //根据线程分任务数
                List<List<?>> params = UtilThread.dealParamsInThreadGroup(pointLogs, sc.getScheduledThreadPoolExecutor().getCorePoolSize());
                 if(params != null && !params.isEmpty()) {
                     List<Future<?>> futureList = UtilCollection.createArrayList();
                    for (List<?> param : params) {

                        futureList.add(sc.submit(new Runnable() {
                            @SuppressWarnings("unchecked")
                            @Override
                            public void run() {
                                zyPointLogService.pointLogSynWork((List<PointLogVo>) param, authorizeVo);
                            }

                        }));
                    }
                    //阻塞线程，获取返回结果
                    UtilThread.futureListGet(futureList);
                }
            }
        }

    }

}
