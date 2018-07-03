package com.nascent.ecrpsaas.plus.ziyan.marketing.service;

/**
 * 营销门店优惠券服务
 *
 * @author SHI ZH
 */
public interface MarketingLineCouponService {

    /**
     * 发送优惠券
     *
     * @param preNodeId
     * @param instanceId
     * @param nodeId
     * @param lineCouponId
     */
    Long sendLineCoupon(String preNodeId, Long instanceId, String nodeId, Long lineCouponId);
}
