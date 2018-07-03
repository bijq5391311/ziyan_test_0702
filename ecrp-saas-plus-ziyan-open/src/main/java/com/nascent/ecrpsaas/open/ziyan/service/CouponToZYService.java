package com.nascent.ecrpsaas.open.ziyan.service;

import java.util.Map;


/**
 * @author mozhimin
 * @date 2017年12月22日
 * @功能 :优惠券对接紫燕接口服务层
 */
public interface CouponToZYService {
	/**
	 * Title:返回优惠券信息查询结果
	 * name:zhimin.mo
	 * return:Map<String,Object>
	 * describe:
	 * time:2017年12月23日
	 */
	Map<String, Object> returnCoupon(String couponCode, String productStoreId, String productData, String memberCard);
	/**
	 * Title:优惠券核销
	 * name:zhimin.mo
	 * return:Map<String,Object>
	 * describe:
	 * time:2017年12月22日
	 */
	Map<String, Object> cancelAfterVerificationCoupon(String couponCode, String shopCode);
	/**
	 * Title:优惠券核销
	 * name:zhimin.mo
	 * return:Map<String,Object>
	 * describe:
	 * time:2017年12月22日
	 */
	Map<String, Object> cancelAfterVerificationCoupon(String couponCode);
}
