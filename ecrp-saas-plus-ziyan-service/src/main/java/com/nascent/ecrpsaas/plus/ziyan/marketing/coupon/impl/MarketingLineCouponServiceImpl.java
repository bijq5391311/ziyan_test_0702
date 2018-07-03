package com.nascent.ecrpsaas.plus.ziyan.marketing.coupon.impl;

import com.nascent.ecrpsaas.base.vo.vip.KdCustomerVo;
import com.nascent.ecrpsaas.marketing.helper.RedisCursorResult;
import com.nascent.ecrpsaas.marketing.model.ActivitiesInstanceRelation;
import com.nascent.ecrpsaas.marketing.model.Marketing;
import com.nascent.ecrpsaas.marketing.service.impl.BaseMarketingImpl;
import com.nascent.ecrpsaas.plus.ziyan.marketing.model.SysCoupon;
import com.nascent.ecrpsaas.plus.ziyan.marketing.service.MarketingLineCouponService;
import com.nascent.ecrpsaas.plus.ziyan.util.UtilZiYanCoupon;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.plugins.spring.RepositoryService;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.utils.query.QueryInfo;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

/**
 * @author SHI ZH
 */
@Service("marketingLineCouponService")
public class MarketingLineCouponServiceImpl extends BaseMarketingImpl implements
        MarketingLineCouponService {

    public static final int SEND_TIMES = 3;
    public static final int SEND_BATCH = 200;

    private static Logger logger = LoggerFactory.getLogger(MarketingLineCouponServiceImpl.class);
    @Autowired
    private RepositoryService repositoryService;

    @Override
    public Long sendLineCoupon(String preNodeId, Long instanceId, String nodeId,
            Long lineCouponId) {
        String preCacheKey = getCacheKey(instanceId, preNodeId);
        String curNodeCacheKey = getCacheKey(instanceId, nodeId);
        StringRedisTemplate redis = SpringContext.me().getBean(StringRedisTemplate.class);
        Marketing marketing = Marketing.dao().findByNode(instanceId, nodeId);

        //验证优惠券
        SysCoupon sysCoupon = checkCouponNotExists(lineCouponId);
        logger.info("优惠券正常 ID：" + sysCoupon.getCouponId());

        //预执行直接返回结果
        boolean preExec = ActivitiesInstanceRelation.dao().isNotExec(instanceId);

        String getReportTableName = getReportTableName(instanceId, nodeId);
        long dataCount = getReportCount(getReportTableName);
        if (dataCount == 0) {
            logger.info("首次记录所有人员到发送报告表");
            //首次记录所有人员到发送记录表
            RedisCursorResult.read(redis, preCacheKey, li -> {
                saveReportRecords(li, instanceId, nodeId, 0);
                return true;
            });
        }

        //读取未发放记录，发放优惠券
        QueryInfo queryInfo = getReportQueryInfo(getReportTableName);
        logger.info("发放优惠券开始-----------------");
        repositoryService.scroll(queryInfo, SEND_BATCH, li -> {
            List<String> resultList = sendCoupon(li, instanceId, nodeId, preExec, sysCoupon);
            if (resultList.size() > 0) {
                super.addData(redis, curNodeCacheKey, resultList);
                marketing.setSendSuccessCount(marketing.getSendSuccessCount() + resultList.size());
            }
            return true;
        });
        logger.info("发放优惠券结束------------------");
        marketing.update();
        return Long.valueOf(marketing.getSendSuccessCount());
    }

    /**
     * 查询报告记录未发记录
     *
     * @param getReportTableName
     */
    /*private QueryInfo getReportQueryInfo(String getReportTableName) {
        QueryInfo queryInfo = new QueryInfo("");
        StringBuffer sb = new StringBuffer("");
        sb.append("select id, sys_customer_id from ");
        sb.append(getReportTableName);
        sb.append(" where state = 0");
        queryInfo.setQuery(sb.toString());

        return queryInfo;
    }*/

    /**
     * 查询报告表是否存在记录，无记录说明是第一次调用，写入人员记录
     *
     * @param getReportTableName
     */
    private long getReportCount(String getReportTableName) {
        QueryInfo info = new QueryInfo("");
        info.setQuery("select count(1) from " + getReportTableName);
        return info.count();
    }

    /**
     * 调用发放优惠券，更新报告发放状态
     *
     * @param records
     * @param instanceId
     * @param nodeId
     * @param preExec
     * @param sysCoupon
     */
    private List<String> sendCoupon(List<Record> records, Long instanceId, String nodeId,
            boolean preExec, SysCoupon sysCoupon) {
        List<String> li = new ArrayList<>(records.size());
        for (Record record : records) {
            li.add(String.valueOf(record.getLong("sys_customer_id")));
        }

        //预执行直接返回结果，不做真实发送请求
        if (preExec) {
            return li;
        }
        //发送门店优惠券
        boolean sendFlag = false;
        int times = 0;
        while (sendFlag == false && times < SEND_TIMES) {
            sendFlag = UtilZiYanCoupon.createCouponCodeList(li, sysCoupon);
            times++;
        }
        //更新报告记录
        if (sendFlag) {
            QueryInfo update = new QueryInfo("");
            StringBuffer sb = new StringBuffer("");
            sb.append("update ");
            sb.append(getReportTableName(instanceId, nodeId));
            sb.append(" set state = 1 where sys_customer_id in (");
            sb.append(String.join(",", li));
            sb.append(")");
            update.setQuery(sb.toString());
            update.execute();
            return li;
        }
        return new ArrayList<>();
    }

/*    private String getReportTableName(Long instanceId, String nodeId) {

        return "marketing_detail_hash" + instanceId + "_" + nodeId;
    }*/

    /**
     * 验证优惠券不存在
     *
     * @param lineCouponId
     */
    private SysCoupon checkCouponNotExists(Long lineCouponId) {

        SysCoupon sysCoupon = UtilZiYanCoupon.validateCoupon(lineCouponId);
        if (sysCoupon == null) {
            throw new IllegalArgumentException("无效优惠券");
        }
        return sysCoupon;
    }

    /**
     * 保存报告记录
     *
     * @param li
     * @param instanceId
     * @param nodeId
     * @param state
     */
    private void saveReportRecords(List<String> li, long instanceId, String nodeId, int state) {
        //记录发送信息到报告
        List<KdCustomerVo> customerVos = KdCustomerVo.dao().queryByIDs4Task(li);
        StringBuffer sb = new StringBuffer("");
        sb.append("insert into marketing_detail_hash");
        sb.append(instanceId);
        sb.append("_");
        sb.append(nodeId);
        sb.append("(state,sys_customer_id,out_nick,hash,create_time,update_time) values");

        KdCustomerVo customerShopVo = null;
        String values = "(%s,%s,'%s',999,now(),now()),";
        for (int i = 0; i < customerVos.size(); i++) {
            customerShopVo = customerVos.get(i);
            sb.append(String.format(values, state, customerShopVo.getSysCustomerId(),
                    customerShopVo.getCustomerName()));
        }

        QueryInfo info = new QueryInfo("");
        String sql = sb.toString();
        info.setQuery(sql.substring(0, sql.lastIndexOf(",")));
        info.execute();
    }
}
