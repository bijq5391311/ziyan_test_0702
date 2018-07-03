package com.nascent.ecrpsaas.plus.ziyan.dispatch.task.vip;

import com.nascent.ecrpsaas.base.constat.DataSynEnum;
import com.nascent.ecrpsaas.base.model.KdServiceShopPro;
import com.nascent.ecrpsaas.base.util.UtilCollection;
import com.nascent.ecrpsaas.base.util.UtilDate;
import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.base.util.UtilThread;
import com.nascent.ecrpsaas.base.vo.organization.KdBrandAuthorizeVo;
import com.nascent.ecrpsaas.base.vo.vip.KdCustomerVo;
import com.nascent.ecrpsaas.plus.ziyan.util.ZyHdUtil;
import com.nascent.ecrpsaas.plus.ziyan.vip.service.ZyHuDongCustomerService;
import com.nascent.ecrpsaas.vip.model.OutCustomerInfo;
import com.nascent.ecrpsaas.vip.model.OutCustomerIntegral;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

public class ZyHuDongCustomerJob {


    @Autowired
    private ZyHuDongCustomerService zyHuDongCustomerService;

    private static Logger log = LoggerFactory.getLogger(ZyHuDongCustomerJob.class);


    /**
     * 一次同步条数
     */
    private static final int SYN_LIMIT = 200;

    /**
     * 从开放平台同步到ecrp
     */
    public synchronized void downloadWork() {

        zyHuDongCustomerService.customerDownloadWork();
        log.info("从开放平台同步会员到ecrp");

    }

    /**
     * 同步会员到开放平台
     */
    public synchronized void synWork() {

        zyHuDongCustomerService.customerSynWork();
    }

    /**
     * 会员积分变动下载
     */
    public synchronized void integralChangeWork() {

        // 获取线程池
        ThreadPoolTaskScheduler scheduler = ZyHdUtil
                .getScheduler(ZyHdUtil.INTEGRAL_CHANGE_SCHEDULER);
        List<KdBrandAuthorizeVo> authorizeVos = KdBrandAuthorizeVo.dao().queryBrandAuthorizeList();
        if (authorizeVos != null && authorizeVos.size() > 0) {
            for (KdBrandAuthorizeVo authorizeVo : authorizeVos) {
                KdServiceShopPro serviceShopPro = KdServiceShopPro.dao().getServiceProgress(
                        authorizeVo.getBrandId(), 0,
                        DataSynEnum.ServiceShopProServiceName.pointChangeSyn.getName(),
                        "", 0);
                String session = authorizeVo.getAccessToken();
                String appKey = authorizeVo.getAppKey();
                String secret = authorizeVo.getAppSecret();
                if (UtilString.isEmpty(session) || UtilString.isEmpty(appKey) || UtilString
                        .isEmpty(secret)) {
                    continue;
                }
                // 获取开始时间
                Date startDate = serviceShopPro.getLastScanTime();
                Date endDate = UtilDate.addSecond(UtilDate.now(),-10);;
                // 将时间分割为一天
                List<String> dateList = ZyHdUtil.dateSplitByDay(startDate, endDate, 1);
                //最后扫描时间
                Date lastScanTime = endDate;
                List<Future<String>> futureList = UtilCollection.createArrayList();
                if (dateList.isEmpty()) {
                    break;
                }
                for (String date : dateList) {
                    //分割时间
                    Map<String, String> timeMap = ZyHdUtil
                            .splitTimeRange(date, startDate, endDate);
                    String startTime = timeMap.get(ZyHdUtil.START_TIME);
                    String endTime = timeMap.get(ZyHdUtil.END_TIME);
                    futureList.add(scheduler.submit(new Callable<String>() {
                        @Override
                        public String call() throws Exception {
                            try {
                                log.info("同步积分变动开始时间：" + startTime + "，同步积分变动结束时间：" + endTime);
                                zyHuDongCustomerService.saveOutCustomerIntegral(authorizeVo,
                                        startTime, endTime);
                            } catch (Exception e) {
                                log.error(
                                        "同步积分发生异常，开始时间：" + startTime + "，结束时间：" + endTime
                                                + "异常信息："
                                                + e.getMessage(), e);
                                return startTime;
                            }
                            return "true";
                        }
                    }));
                }
                //阻塞线程，获取线程返回结果
                for (Future<String> future : futureList) {
                    String result = "";
                    try {
                        result = future.get();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    } catch (ExecutionException e) {
                        e.printStackTrace();
                    }
                    if (!UtilString.toBoolean(result)) {
                        if (lastScanTime.after(UtilDate.parseDateTime(result))) {
                            lastScanTime = UtilDate.parseDateTime(result);
                        }
                    }
                }
                serviceShopPro.setremark("同步会员积分成功，时间范围："
                        + UtilDate.formatDateTime(startDate) + "~" + UtilDate.formatDateTime(endDate));
                serviceShopPro.setLastScanTime(lastScanTime);
                serviceShopPro.update();
            }
        }
    }

    /**
     * 会员积分同步到内部
     */
    public synchronized void synOutIntegralToCustomerTask() {
        //查找外部有信息变动的会员积分
        List<OutCustomerIntegral> outCustomerIntegralList = OutCustomerIntegral.dao()
                                                                               .queryNeedSynList();
        if (outCustomerIntegralList != null && !outCustomerIntegralList.isEmpty()) {
            for (OutCustomerIntegral outCustomerIntegral : outCustomerIntegralList) {
                log.info("同步积分的外部会员ID:" + outCustomerIntegral.getOutCustomerId());
                KdCustomerVo customerVo = KdCustomerVo.dao()
                                                      .queryByOutCustomerID(outCustomerIntegral
                                                              .getOutCustomerId());
                if (customerVo != null) {
                    //更新会员积分
                    try {
                        zyHuDongCustomerService
                                .updateCustomerIntegral(customerVo.getSysCustomerId()
                                        , outCustomerIntegral.getBrandId(),
                                        outCustomerIntegral.getIntegral());
                        //会员积分状态改为已同步
                        outCustomerIntegral.setSynStatus(ZyHdUtil.SYN);
                        outCustomerIntegral.update();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }

                }else{
                    log.info("未找到已激活会员,外部会员ID：" + outCustomerIntegral.getOutCustomerId());
                }
            }
        }
    }

    /**
     * 同步已绑定的会员
     */
    public synchronized void activateCustomerSynWork() {
        int limit = 1000;
        // 查找已激活未同步会员
        List<OutCustomerInfo> outCustomerInfoList = OutCustomerInfo.dao().queryListByIsActivate(
                ZyHdUtil.ACTIVATED, limit);
        //获取线程池大小
        ThreadPoolTaskScheduler sc = ZyHdUtil.getScheduler(ZyHdUtil.CUSTOMER_SYN_SYSTEM_SCHEDULER);
        List<List<?>> params = UtilThread.dealParamsInThreadGroup(outCustomerInfoList
                , sc.getScheduledThreadPoolExecutor().getCorePoolSize());
        if (params != null && !params.isEmpty()) {
            List<Future<?>> futureList = UtilCollection.createArrayList();
            for (List<?> param : params) {

                futureList.add(sc.submit(new Runnable() {
                    @SuppressWarnings("unchecked")
                    @Override
                    public void run() {
                        List<OutCustomerInfo> customerInfoList = (List<OutCustomerInfo>) param;
                        for (OutCustomerInfo outCustomerInfo : customerInfoList) {
                            try {
                                log.info("开始同步互动会员ID：" + outCustomerInfo.getOutCustomerId() + "，手机号：" + outCustomerInfo.getmobile());
                                zyHuDongCustomerService
                                        .saveOrUpdateCustomerInfo(outCustomerInfo);
                            } catch (Exception e) {
                                log.error(e.getMessage(), e);
                            }
                        }
                    }
                }));
            }
            //阻塞子线程
            UtilThread.futureListGet(futureList);
        } else {
            log.info("已激活未同步的会员记录数：0条");
        }
    }
}
