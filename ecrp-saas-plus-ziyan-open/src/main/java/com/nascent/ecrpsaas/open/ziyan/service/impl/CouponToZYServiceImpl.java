package com.nascent.ecrpsaas.open.ziyan.service.impl;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.open.ziyan.model.KdCustomerToZY;
import com.nascent.ecrpsaas.open.ziyan.model.KdGoodsToZY;
import com.nascent.ecrpsaas.open.ziyan.model.OutShopToZY;
import com.nascent.ecrpsaas.open.ziyan.model.ZyCouponCustomerExtToZY;
import com.nascent.ecrpsaas.open.ziyan.model.ZySysCouponToZY;
import com.nascent.ecrpsaas.open.ziyan.model.vo.CouponToZiYanVo;
import com.nascent.ecrpsaas.open.ziyan.service.CouponToZYService;

/**
 * @author 优惠券接口实现
 * @date 2017年12月22日
 * @功能  
 */
@Service("ApiCouponToZYServiceImpl")
public class CouponToZYServiceImpl implements CouponToZYService {

    Logger logger = LoggerFactory.getLogger(CouponToZYServiceImpl.class);
    
    private static final int CANCEL_AFTER_VERIFICATION = 2;
    private static final String IS_OK = "isOk";
	private static final String DESCRIPTION = "description";
	private static final String RESULT = "date";
	
	/**
	 * Title:返回优惠券信息查询结果
	 * name:zhimin.mo
	 * return:Map<String,Object>
	 * describe:"[{\"quantity\":\"1\",\"productId\":\"1001\",\"productUnitPrice\":\"65.60\",\"productName\":\"百味鸡\"},{\"quantity\":\"1\",\"productId\":\"19007\",\"productUnitPrice\":\"18.00\",\"productName\":\"五香凤爪(真空）\"}]";
	 * time:2017年12月23日
	 */
	public Map<String, Object> returnCoupon(String couponCode, String productStoreId, String productData, String memberCard){
		
		//返回信息的封装
		Map<String, Object> result = new HashMap<String, Object>();
		CouponToZiYanVo couponVo = new CouponToZiYanVo();
		result.put(IS_OK, false);
		Date date = new Date();
		
		//通过couponCode得到优惠券详情信息
		ZyCouponCustomerExtToZY couponExt = ZyCouponCustomerExtToZY.dao().queryCouponExtByCouponCode(couponCode);
		
		if(null == couponExt){
			result.put(DESCRIPTION, "请求失败，优惠券编码不存在");
			return result;
		}
		Long couponId = couponExt.getCouponId();
		if(null == couponId){
			result.put(DESCRIPTION, "请求失败，优惠券ID不存在");
			return result;
		}
		//获取优惠券信息
		ZySysCouponToZY coupon = ZySysCouponToZY.dao().queryCouponByCouponId(couponId);
		if(null == coupon){
			result.put(DESCRIPTION, "请求失败，优惠券信息丢失，优惠券不存在");
			return result;
		}
		//编码状态失效
		if(1 == couponExt.getState()){
			couponVo.setIsOk(false);
			couponVo.setMessage("该优惠券不可使用");
			result.put(RESULT, couponVo);
			result.put(IS_OK, true);
			return result;
		}
		//编码已核销
		if(2 == couponExt.getState()){
			couponVo.setIsOk(false);
			couponVo.setMessage("该优惠券已被核销");
			result.put(RESULT, couponVo);
			result.put(IS_OK, true);
			return result;
		}
		//不在有效期
		if(!(couponExt.getValidTimeBegin().getTime() < date.getTime() && date.getTime() < couponExt.getValidTimeEnd().getTime())){
			couponVo.setIsOk(false);
			couponVo.setMessage("该优惠券不在有效期");
			result.put(RESULT, couponVo);
			result.put(IS_OK, true);
			return result;
		}
		
		if(!UtilString.isEmpty(memberCard)){
			Long customerId = couponExt.getSysCustomerId();
			Long zyCustomerId = KdCustomerToZY.dao().queryCustomerIdByMemberCard(memberCard);
			if(null == zyCustomerId ){
				couponVo.setIsOk(false);
				couponVo.setMessage("该客户不是紫燕会员");
				result.put(RESULT, couponVo);
				result.put(IS_OK, true);
				return result;
			}
			if(0 == customerId.longValue()){
				couponExt.setSysCustomerId(zyCustomerId);
				couponExt.update();
			}else if(customerId.longValue() != zyCustomerId.longValue()){
				couponVo.setIsOk(false);
				couponVo.setMessage("该优惠券已绑定其它用户");
				result.put(IS_OK, true);
				result.put(RESULT, couponVo);
				return result;
			}
			
		}
		String verifyCoupon = verifyCoupon(productStoreId, productData, date, couponExt, coupon, memberCard);
		if(null != verifyCoupon){
			couponVo.setIsOk(false);
			couponVo.setMessage(verifyCoupon);
			result.put(RESULT, couponVo);
			result.put(IS_OK, true);
			return result;
		}
		String title = "";
    	if(!UtilString.isEmpty(coupon.getTitle())){
    		title = coupon.getTitle();
	    }
		couponVo.setCouponName(coupon.getCouponName());
		couponVo.setCouponCode(couponCode);
		couponVo.setCouponType(coupon.getCouponType()+"");
		couponVo.setCouponInterests(coupon.getRightsAndInterests());
		couponVo.setCoefficient(coupon.getCoefficient());
		couponVo.setTitle(title);
		couponVo.setStartTime(couponExt.getValidTimeBegin());
		couponVo.setEndTime(couponExt.getValidTimeEnd());
		couponVo.setIsOk(true);
		result.put(IS_OK, true);
		result.put(RESULT, couponVo);
		return result;
	}

	/**
	 * Title:验证优惠券是否可用
	 * name:zhimin.mo
	 * return:boolean
	 * describe:
	 * time:2017年12月23日
	 */
	private String verifyCoupon(String productStoreId, String productData, Date date,
			ZyCouponCustomerExtToZY couponExt, ZySysCouponToZY coupon, String memberCard) {
		
		//店铺是否指定
		String verifyShop = verifyOutShop(coupon.getShopIds(), productStoreId);
		if(null != verifyShop){
			return verifyShop;
		}
		//验证是否满足使用条件
		if(1 == coupon.getConditionsOfUse()){
			String verifyCouponForUse = verifyCouponForUse(productData,coupon);
			if(null != verifyCouponForUse){
				return verifyCouponForUse;
			}
		}
		return null;
	}
	
	/**
	 * Title:判断是否满足使用条件
	 * name:zhimin.mo
	 * return:boolean
	 * describe:
	 * time:2017年12月23日
	 */
	private String verifyCouponForUse(String productData, ZySysCouponToZY coupon){
		//外部金额
		 Double fullOrPlusMoney = 0.00;
		//外部商品ID集合
		StringBuffer outGoodsIds = new StringBuffer();
		
		//解析订单
		JSONArray jsonObject = JSONObject.parseArray(productData);
		for(int i = 0; i < jsonObject.size(); i++) {
			JSONObject item = jsonObject.getJSONObject(i);
			//数量
			String quantity = item.getString("quantity");
			//价格
			String productUnitPrice = item.getString("productUnitPrice");
			//商品ID
			String productId = item.getString("productId");
			
			if(UtilString.isEmpty(quantity) || UtilString.isEmpty(productUnitPrice) || UtilString.isEmpty(productUnitPrice)){
				continue;
			}
			BigDecimal quantityExt = new BigDecimal(Double.valueOf(quantity));   
			BigDecimal productUnitPriceExt = new BigDecimal(Double.valueOf(productUnitPrice));   
			//计算总金额
			fullOrPlusMoney += quantityExt.multiply(productUnitPriceExt).doubleValue();
			//封装商品id
			outGoodsIds.append(productId).append(",");
		}
		//去除最后一个，号
		if(!UtilString.isEmpty(outGoodsIds.toString())){
			outGoodsIds = outGoodsIds.deleteCharAt(outGoodsIds.lastIndexOf(","));
		}
		
		//判断订单总价是否超过限定金额
		if(coupon.getFullOrPlusMoney() > fullOrPlusMoney){
			return "订单总价不满足优惠券满减需求";
		}
		//判断订单中是否有指定的商品
		String verifyGoods = verifyGoods(coupon.getAppointGoodsIds().trim(), outGoodsIds.toString());
		if(null != verifyGoods){
			return verifyGoods;
		}
		return null;
	}
	/**
	 * Title:判断店铺是否可使用
	 * name:zhimin.mo
	 * return:boolean
	 * describe:
	 * time:2017年12月23日
	 */
	private String verifyOutShop(String sysShopIds, String outShopId){
		if(UtilString.isEmpty(sysShopIds)){
			return null;
		}
		if(UtilString.isEmpty(outShopId)){
			return "购买所在店铺为空";
		}
		sysShopIds = "," + sysShopIds + ",";
		outShopId = "," + outShopId + ",";
		if(sysShopIds.indexOf(outShopId)!=-1){  
			return null; 
		}else{ 
			return "该优惠券不可在此店铺使用"; 
		} 
	}
	/**
	 * Title:判断店铺是否可使用-请求数据库判断
	 * name:zhimin.mo
	 * return:boolean
	 * describe:
	 * time:2017年12月23日
	 */
	private String verifyShop(String sysShopIds, String outShopId){
		Long shopCount = 0L;
		if(UtilString.isEmpty(sysShopIds)){
			return null;
		}
		try {
			shopCount = OutShopToZY.dao().verifyOutShop(sysShopIds, outShopId);
		} catch (Exception e) {
			logger.info(e.getMessage());
			return "请求数据库失败";
		}
		if(shopCount > 0){
			return null;
		}
		return "该优惠券不可在此店铺使用";
	}
	/**
	 * Title:判断订单中是否包含指定商品
	 * name:zhimin.mo
	 * return:boolean
	 * describe:
	 * time:2017年12月23日
	 */
	private String verifyGoods(String sysGoodsIds, String outGoodsIds){
		int goodsQuantity = 0;
		if(UtilString.isEmpty(sysGoodsIds)){
			return null;
		}
		if(UtilString.isEmpty(outGoodsIds)){
			return "商品不能为空";
		}
		goodsQuantity = sysGoodsIds.split(",").length;
		Long quantify = 0L;
		try {
			quantify = KdGoodsToZY.dao().getGoodsCount(sysGoodsIds,outGoodsIds);
		} catch (Exception e) {
			return "请求数据库失败";
		}
		if(goodsQuantity == quantify && quantify != 0){
			return null;
		}
		return "订单不包含优惠券指定商品";
	}
	
	/**
	 * Title:优惠券核销
	 * name:zhimin.mo
	 * return:Map<String,Object>
	 * describe:
	 * time:2017年12月22日
	 */
	public Map<String, Object> cancelAfterVerificationCoupon(String couponCode, String shopCode){
		//返回信息的封装
		Map<String, Object> result = new HashMap<String, Object>();
		result.put(IS_OK, false);
		Date date = new Date();
		//优惠券验证
		if(null == couponCode){
    		result.put(DESCRIPTION, "请求失败，优惠券编码为空");
			return result;
        }
		if(null == shopCode){
    		result.put(DESCRIPTION, "请求失败，店铺编码为空");
			return result;
        }
		//通过couponCode得到优惠券详情信息
		ZyCouponCustomerExtToZY couponExt = ZyCouponCustomerExtToZY.dao().queryCouponExtByCouponCode(couponCode);
		
		if(null == couponExt){
			result.put(DESCRIPTION, "请求失败，优惠券编码不存在");
			return result;
		}
		if(shopCode.equals(couponExt.getOutShopCode())){
			result.put(IS_OK, true);
			return result;
		}
		
		if(1 == couponExt.getState()){
			result.put(DESCRIPTION, "请求失败，优惠券编码已失效");
			return result;
		}
		
		if(2 == couponExt.getState()){
			result.put(DESCRIPTION, "请求失败，优惠券编码已核销");
			return result;
		}
		if(!(couponExt.getValidTimeBegin().getTime() < date.getTime() && date.getTime() < couponExt.getValidTimeEnd().getTime())){
			result.put(DESCRIPTION, "请求失败，优惠券编码不在有效期");
			return result;
		}
		Long couponId = couponExt.getCouponId();
		if(null == couponId){
			result.put(DESCRIPTION, "请求失败，优惠券ID不存在");
			return result;
		}
		try {
			//更新优惠券详情信息
			couponExt.setState(CANCEL_AFTER_VERIFICATION);
			couponExt.setUpdateTime(date);
			couponExt.setOutShopCode(shopCode);
			couponExt.update();
		} catch (Exception e) {
			result.put(DESCRIPTION, "请求失败，更新优惠券编码状态出错");
			return result;
		}
		//更新优惠券信息,已核销+1
		ZySysCouponToZY.dao().updateCouponVerification(couponId);
		result.put(IS_OK, true);
		return result;
	}
	/**
	 * Title:优惠券核销
	 * name:zhimin.mo
	 * return:Map<String,Object>
	 * describe:
	 * time:2017年12月22日
	 */
	public Map<String, Object> cancelAfterVerificationCoupon(String couponCode){
		//返回信息的封装
		Map<String, Object> result = new HashMap<String, Object>();
		result.put(IS_OK, false);
		Date date = new Date();
		//优惠券验证
		if(null == couponCode){
    		result.put(DESCRIPTION, "请求失败，优惠券编码为空");
			return result;
        }
		//通过couponCode得到优惠券详情信息
		ZyCouponCustomerExtToZY couponExt = ZyCouponCustomerExtToZY.dao().queryCouponExtByCouponCode(couponCode);
		
		if(null == couponExt){
			result.put(DESCRIPTION, "请求失败，优惠券编码不存在");
			return result;
		}
		
		if(1 == couponExt.getState()){
			result.put(DESCRIPTION, "请求失败，优惠券编码已失效");
			return result;
		}
		
		if(2 == couponExt.getState()){
			result.put(DESCRIPTION, "请求失败，优惠券编码已核销");
			return result;
		}
		if(!(couponExt.getValidTimeBegin().getTime() < date.getTime() && date.getTime() < couponExt.getValidTimeEnd().getTime())){
			result.put(DESCRIPTION, "请求失败，优惠券编码不在有效期");
			return result;
		}
		Long couponId = couponExt.getCouponId();
		if(null == couponId){
			result.put(DESCRIPTION, "请求失败，优惠券ID不存在");
			return result;
		}
		try {
			//更新优惠券详情信息
			couponExt.setState(CANCEL_AFTER_VERIFICATION);
			couponExt.setUpdateTime(date);
			couponExt.update();
		} catch (Exception e) {
			result.put(DESCRIPTION, "请求失败，更新优惠券编码状态出错");
			return result;
		}
		//更新优惠券信息,已核销+1
		ZySysCouponToZY.dao().updateCouponVerification(couponId);
		result.put(IS_OK, true);
		return result;
	}
    
}
