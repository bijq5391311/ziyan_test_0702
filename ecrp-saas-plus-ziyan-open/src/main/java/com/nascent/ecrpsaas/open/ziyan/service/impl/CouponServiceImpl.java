package com.nascent.ecrpsaas.open.ziyan.service.impl;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.open.utils.StringUtil;
import com.nascent.ecrpsaas.open.ziyan.constant.ZyConstant;
import com.nascent.ecrpsaas.open.ziyan.model.KdCustomerWeixinModel;
import com.nascent.ecrpsaas.open.ziyan.model.SysCouponModel;
import com.nascent.ecrpsaas.open.ziyan.model.ZyCouponCustomerExtModel;
import com.nascent.ecrpsaas.open.ziyan.model.ZySysCouponToZY;
import com.nascent.ecrpsaas.open.ziyan.model.vo.CustomizeFindVo;
import com.nascent.ecrpsaas.open.ziyan.service.CouponService;
import com.nascent.ecrpsaas.plus.ziyan.util.UtilGetMath;
import com.nascent.utils.query.CommonResult;

/**
 * @author FeiXiang
 * @date 2017/12/21
 * @describe
 */
@Service
public class CouponServiceImpl implements CouponService {
	Logger logger = LoggerFactory.getLogger(CouponServiceImpl.class);
    /**
     * 发放一张优惠券
     */
    @Override
    @Transactional
    public CommonResult sendCouponExt(CustomizeFindVo vo) {
        SysCouponModel.SysCoupon coupon = SysCouponModel.dao().getValidCouponByCouponId(vo.getCouponId());
        if (coupon == null) {
            return CommonResult.SUCCESS.setFailed().setMsg("该优惠券不存在或已失效");
        }
        if (!ZyConstant.SYS_COUPON_CONDITIONS_OF_USE_NO_LIMIT.equals(coupon.getConditionsOfUse()) && coupon.getCouponAmouet() > -1 && coupon.getCouponAmouet() <= coupon.getSentAmount()) {
            return CommonResult.SUCCESS.setFailed().setMsg("优惠券可生成数量不足");
        }
        Long sysCustomerId = KdCustomerWeixinModel.dao().getSysCustomerIdByOpenId(vo.getOpenId());
        if (StringUtil.isEmpty(sysCustomerId)) {
            return CommonResult.SUCCESS.setFailed().setMsg("找不到对应的客户");
        }
        if (SysCouponModel.dao().sendCoupon(coupon.getId()) < 1) {
            return CommonResult.SUCCESS.setFailed().setMsg("优惠券可生成数量不足");
        }
        ZyCouponCustomerExtModel.ZyCouponCustomerExt ext = new ZyCouponCustomerExtModel.ZyCouponCustomerExt();
        ext.setState(coupon.getState());
        ext.setCouponId(coupon.getCouponId());
        ext.setCouponCode(UtilGetMath.getCouponCodeMath(UtilGetMath.getYearMonth(coupon.getCouponId())));
        ext.setSysCustomerId(sysCustomerId);
        ext.setPurposeType(ZyConstant.COUPON_PURPOSE_TYPE_SEND);
        ext.setExportIdentification(1L);
        if (ZyConstant.COUPON_VALID_TIME_TYPE_RELATIVE.equals(coupon.getValidTimeType())) {
            //由相对天数numberDays设置有效期绝对时间
            long currentTime = System.currentTimeMillis();
            ext.setValidTimeBegin(new Date(currentTime));
            ext.setValidTimeEnd(new Date(currentTime + 24L * 60 * 60 * 1000 * coupon.getNumberDays()));
        } else {
            ext.setValidTimeBegin(coupon.getValidTimeBegin());
            ext.setValidTimeEnd(coupon.getValidTimeEnd());
        }
        ZyCouponCustomerExtModel.dao().save(ext);
        return new CommonResult().setCode("200").setMsg("成功").setResult("发放成功");
    }
    /**
     * 页面领取优惠券->给客户发放一张优惠券
     * Title:CouponService.java
     * name:zhimin.mo
     * return:CommonResult
     * describe:
     * time:2018年3月10日
     */
    public CommonResult sendPageReceiveCoupon(CustomizeFindVo vo){
    	SysCouponModel.SysCoupon coupon = SysCouponModel.dao().getPageCouponByCouponId(vo.getCouponId());
        if (coupon == null) {
        	logger.info("该优惠券不存在或已失效");
            return CommonResult.SUCCESS.setFailed().setMsg("无效优惠券").setResult(null);
        }
        if (!ZyConstant.SYS_COUPON_CONDITIONS_OF_USE_NO_LIMIT.equals(coupon.getConditionsOfUse()) && coupon.getCouponAmouet() > -1 && coupon.getCouponAmouet() <= coupon.getSentAmount()) {
        	logger.info("优惠券已领完");
        	return CommonResult.SUCCESS.setFailed().setMsg("优惠券已领完").setResult(null);
        }
        Long sysCustomerId = KdCustomerWeixinModel.dao().getSysCustomerIdByMobile(vo.getMobile());
        /*if (SysCouponModel.dao().sendCoupon(coupon.getId()) < 1) {
        	logger.info("优惠券已领完");
        	return CommonResult.SUCCESS.setFailed().setMsg("优惠券已领完").setResult(null);
        }*/
        String couponCode = UtilGetMath.getCouponCodeMath(UtilGetMath.getYearMonth(coupon.getCouponId()));
        ZyCouponCustomerExtModel.ZyCouponCustomerExt ext = new ZyCouponCustomerExtModel.ZyCouponCustomerExt();
        ext.setState(coupon.getState());
        ext.setCouponId(coupon.getCouponId());
        ext.setCouponCode(couponCode);
        ext.setPurposeType(ZyConstant.COUPON_PURPOSE_TYPE_PAGE_RECEIVE);
        ext.setExportIdentification(1L);
        if(!UtilString.isEmpty(vo.getGuid())){
        	ext.setGuid(vo.getGuid());
        }
        if(!UtilString.isEmpty(vo.getActivityName())){
        	ext.setActivityTitle(vo.getActivityName());
        }
        if (ZyConstant.COUPON_VALID_TIME_TYPE_RELATIVE.equals(coupon.getValidTimeType())) {
            //由相对天数numberDays设置有效期绝对时间
            long currentTime = System.currentTimeMillis();
            ext.setValidTimeBegin(new Date(currentTime));
            ext.setValidTimeEnd(new Date(currentTime + 24L * 60 * 60 * 1000 * coupon.getNumberDays()));
        } else {
            ext.setValidTimeBegin(coupon.getValidTimeBegin());
            ext.setValidTimeEnd(coupon.getValidTimeEnd());
        }
        if(null == sysCustomerId){
        	ext.setType(1);
        	ext.setPrice(vo.getMobile());
        	ext.setSysCustomerId(0L);
        }else{
        	ext.setType(0);
        	ext.setPrice("");
        	ext.setSysCustomerId(sysCustomerId);
        }
        ZyCouponCustomerExtModel.dao().save(ext);
    	return new CommonResult().setCode("200").setMsg("成功").setResult(couponCode);
    }
    /**
     * 更新优惠券的有效数量
     * Title:CouponService.java
     * name:zhimin.mo
     * return:CommonResult
     * describe:
     * time:2018年3月10日
     */
    public CommonResult addCouponSentAmount(String couponSentAmountData){
    	//解析订单
		JSONArray jsonObject = JSONObject.parseArray(couponSentAmountData);
		for(int i = 0; i < jsonObject.size(); i++) {
			JSONObject couponSentAmount = jsonObject.getJSONObject(i);
    		try{
      			if(ZySysCouponToZY.dao().addCouponSentAmount(couponSentAmount.getInteger("num"), couponSentAmount.getLong("couponId")) < 1){
      				logger.info("优惠券可生成数量+1修改失败:couponId:"+couponSentAmount.getLong("couponId"));
      			}
      		} catch (Exception e) {
      			logger.info("优惠券可生成数量+1修改失败:couponId:"+couponSentAmount.getLong("couponId"));
    		}
    	}
        return new CommonResult().setCode("200").setMsg("成功").setResult("发放成功");
    }
}
