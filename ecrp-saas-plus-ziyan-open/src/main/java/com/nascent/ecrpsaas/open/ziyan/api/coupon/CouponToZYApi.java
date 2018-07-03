package com.nascent.ecrpsaas.open.ziyan.api.coupon;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.base.web.BaseController;
import com.nascent.ecrpsaas.open.core.API;
import com.nascent.ecrpsaas.open.ziyan.service.CouponToZYService;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.utils.query.CommonResult;


/**
 * 优惠券 接口
 *
 */
@API(check = API.Check.NULL)
@RequestMapping(path = "/api/ziyanapi/coupontoziyan")
public class CouponToZYApi extends BaseController {
	Logger logger = LoggerFactory.getLogger(CouponToZYApi.class);
	private CouponToZYService apiCouponService = SpringContext.me().getBean(CouponToZYService.class);
	
	/**
	 * 优惠券信息
	 */
	
	@RequestMapping(path = "getCouponInfo", method = {RequestMethod.GET, RequestMethod.POST})
	public CommonResult getCouponInfo(String productStoreId, String productData, String couponCode, String memberCard) {
		/*if(UtilString.isEmpty(memberCard)){
			return CommonResult.SUCCESS.setFailed().setCode("400").setMsg("请输入会员卡号");
		}*/
		if(UtilString.isEmpty(couponCode)){
			return CommonResult.SUCCESS.setFailed().setCode("400").setMsg("优惠券编码不能为空");
		}
		if(UtilString.isEmpty(productStoreId)){
			return CommonResult.SUCCESS.setFailed().setCode("400").setMsg("店铺ID不能为空");
		}
		if(UtilString.isEmpty(productData)){
			return CommonResult.SUCCESS.setFailed().setCode("400").setMsg("订单信息不能为空");
		}
		
		//封装优惠券信息
		Map<String, Object> result = apiCouponService.returnCoupon(couponCode, productStoreId, productData, memberCard);
		if ((boolean) result.get("isOk") == false) {
			logger.info((String)result.get("description"));
			return CommonResult.SUCCESS.setFailed().setCode("400").setMsg((String)result.get("description"));
		}
		//System.out.println(result.get("date"));
		return new CommonResult().setCode("200").setMsg("成功").setResult(result.get("date"));
	}
	/**
	* 优惠券核销
	*/
	@RequestMapping(path = "cancelAfterVerificationCoupon", method = {RequestMethod.GET, RequestMethod.POST})
	public CommonResult cancelAfterVerificationCoupon(String couponCode,String shopCode) {
		//生成会员编码且导出
		Map<String, Object> result = new HashMap<String, Object>();
		if(null == shopCode){
			result = apiCouponService.cancelAfterVerificationCoupon(couponCode);
		}else{
			result = apiCouponService.cancelAfterVerificationCoupon(couponCode,shopCode);
		}
		if ((boolean) result.get("isOk") == false) {
			logger.info((String)result.get("description"));
			return CommonResult.SUCCESS.setFailed().setCode("400").setMsg((String)result.get("description"));
		}
		return new CommonResult().setCode("200").setMsg("成功").setResult("核销成功");
	}
}
