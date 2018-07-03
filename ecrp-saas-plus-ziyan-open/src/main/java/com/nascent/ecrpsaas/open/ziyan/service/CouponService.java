package com.nascent.ecrpsaas.open.ziyan.service;

import java.util.List;

import com.nascent.ecrpsaas.open.ziyan.model.vo.CouponSentAmountVo;
import com.nascent.ecrpsaas.open.ziyan.model.vo.CustomizeFindVo;
import com.nascent.utils.query.CommonResult;

/**
 * @author FeiXiang
 * @date 2017/12/21
 * @describe
 */
public interface CouponService {
    CommonResult sendCouponExt(CustomizeFindVo vo);
    
    /**
     * 页面领取优惠券->给客户发放一张优惠券
     * Title:CouponService.java
     * name:zhimin.mo
     * return:CommonResult
     * describe:
     * time:2018年3月10日
     */
    CommonResult sendPageReceiveCoupon(CustomizeFindVo vo);
    /**
     * 更新优惠券的有效数量
     * Title:CouponService.java
     * name:zhimin.mo
     * return:CommonResult
     * describe:
     * time:2018年3月10日
     */
    CommonResult addCouponSentAmount(String couponSentAmountData);
}
