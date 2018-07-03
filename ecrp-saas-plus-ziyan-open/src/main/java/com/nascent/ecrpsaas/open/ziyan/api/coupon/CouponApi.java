package com.nascent.ecrpsaas.open.ziyan.api.coupon;

import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.open.core.API;
import com.nascent.ecrpsaas.open.utils.StringUtil;
import com.nascent.ecrpsaas.open.ziyan.model.SysCouponModel;
import com.nascent.ecrpsaas.open.ziyan.service.CouponService;
import com.nascent.ecrpsaas.open.ziyan.service.impl.CouponServiceImpl;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.utils.query.CommonResult;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

/**
 * @author FeiXiang
 * @date 2017/12/20
 * @describe
 */
@API(check = API.Check.NULL)
@RequestMapping(path = "/api/ziyanapi/coupon")
public class CouponApi {
	Logger logger = LoggerFactory.getLogger(CouponApi.class);
	@Autowired
    private CouponService couponService;
    /**
     * 获取单个优惠券大类信息
     *
     * @param couponId 优惠券Id
     */
    @RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})
    public CommonResult getCouponInfo(Long couponId) {
        if (StringUtil.isEmpty(couponId)) {
            return CommonResult.SUCCESS.setFailed().setMsg("优惠券id不能为空！");
        }
        return new CommonResult(SysCouponModel.dao().getByCouponId(couponId));
    }

    /**
     * 优惠券列表查询
     *
     * @param shopId 店铺Id 非必传，不传则查所有
     */
    @RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})
    public CommonResult findCouponList(Long shopId) {
        return new CommonResult(SysCouponModel.dao().findListByShopId(shopId));
    }
    /**
     * 修改优惠券有效数量
     *
     * @param shopId 店铺Id 非必传，不传则查所有
     */
    @RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})
    public CommonResult addCouponSentAmount(String couponSentAmountData) {
    	logger.info("页面领取优惠券活动创建-更新优惠券有效数量:"+couponSentAmountData);
    	if (UtilString.isEmpty(couponSentAmountData)) {
    		logger.info("优惠券信息为空");
            return CommonResult.SUCCESS.setFailed().setMsg("网络异常");
        }
    	return couponService.addCouponSentAmount(couponSentAmountData);
    }

}
