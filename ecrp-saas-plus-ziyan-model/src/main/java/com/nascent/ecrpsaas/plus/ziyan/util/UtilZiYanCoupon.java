package com.nascent.ecrpsaas.plus.ziyan.util;

import com.nascent.ecrpsaas.plus.ziyan.marketing.model.SysCoupon;
import com.nascent.ecrpsaas.plus.ziyan.marketing.model.ZyCouponCustomerExt;

import java.util.*;

import org.springsource.loaded.Log;


/**
 * @author 生成随机数
 * @date 2017年12月20日
 * @功能  
 */
public class UtilZiYanCoupon {
	private static final String IS_OK = "isOk";
	private static final String DESCRIPTION = "description";
    private UtilZiYanCoupon() {
        // 防止外部创建实例
    }
    /**
     * Title:营销发放优惠券专用         多用户生成优惠券编码
     * name:zhimin.mo
     * return:boolean
     * describe:
     * time:2017年12月25日
     * type:用途 0:未发放  1：营销发放  2：导出 
     */
    public static boolean createCouponCodeList(List<String> customerList, SysCoupon coupon) {
    	
    	Date date = new Date();
        
  		//要生成的张数
  		int size = customerList.size();
  		if(size < 1){
  			return true;
  		}
  		//基础验证通过，更改优惠券的已生成数量
  		try{
  			if (SysCoupon.dao().addCouponSentAmount(size, coupon.getCouponId()) < 1) {
  	            return false;
  	        }
  		} catch (Exception e) {
			return false;
		}
		
		
  		//封装有效时间
		Date validTimeBegin;
		Date validTimeEnd;
		//当为有效天数时 ，开始时间为现在时间，结束时间为选择时间加上有效天数
		if(1 == coupon.getValidTimeType()){
			int numberDays = coupon.getNumberDays();
			long time = date.getTime(); 
			Long day =  24L * 60 * 60 * 1000 * numberDays; 
			time += day; 
			validTimeBegin = date;
			validTimeEnd =  new Date(time);
		}else{
			validTimeBegin = coupon.getValidTimeBegin();
			validTimeEnd =  coupon.getValidTimeEnd();
		}
  		
  		//将couponId转换为时间,得到年份月份，如：201708
		String yearMonth = UtilGetMath.getYearMonth(coupon.getCouponId());
  		//优惠券编码详情
		List<ZyCouponCustomerExt> list = new ArrayList<ZyCouponCustomerExt>();
		Random ran=new Random();
  		for(String customerId : customerList){
			//编码详情对象
			ZyCouponCustomerExt couponCustomerExt = initZyCouponCustomerExt(coupon.getCouponId(), Long.parseLong(customerId), validTimeBegin, validTimeEnd, yearMonth, 1);
			list.add(couponCustomerExt);
			try {
				Thread.sleep(ran.nextInt(5));
			} catch (InterruptedException e) {
			}
  		}
  		
  		boolean ok = true;
		try {
			ok = ZyCouponCustomerExt.dao().insert(list);
		} catch (Exception e) {
			ok = false;
		}
		//批量保存优惠券编码对象，当保存失败时，提示导出失败，服务器错误
		if(!ok){
	  		try{
	  			SysCoupon.dao().subCouponSentAmount(size, coupon.getCouponId());
	  		} catch (Exception e) {
				Log.log("优惠券生成编码失败，返回已发送量失败");
			}
			return false;
		}
		
		return true;
    }
    /**
     * Title:营销专用  -验证优惠券是否有效且无限 无效返回null，有效返回优惠券对象
     * name:zhimin.mo
     * return:SysCoupon
     * describe:
     * time:2017年12月25日
     */
    public static SysCoupon validateCoupon(Long couponId){
    	Date date = new Date();
    	//参数验证
		if(null == couponId){
			return null;
        }
		//通过优惠券ID获得优惠券对象
        SysCoupon coupon = SysCoupon.dao().queryCouponByCouponId(couponId);
        if(null == coupon){
			return null;
        }
        if(1 == coupon.getState()){
        	return null;
        }
        if(coupon.getCouponAmouet() >= 0){
        	return null;
        }
        if(0 == coupon.getValidTimeType()){
			if(date.getTime() > coupon.getValidTimeEnd().getTime()){
				return null;
			}
		}
    	return coupon;
    }
    
    /**
     * Title:单个优惠券编码生成，必要customerId与couponID
     * name:zhimin.mo
     * return:boolean
     * describe:
     * time:2017年12月25日
     * type:用途 0:未发放  1：营销发放  2：导出 
     */
    public static Map<String, Object> createCouponCode(Long customerId, Long couponId,int type) {
    	
    	Map<String, Object> result = new HashMap<String, Object>();
		result.put(IS_OK, false);
		
    	Date date = new Date();
    	//参数验证
		if(null == customerId || null == couponId){
			result.put(DESCRIPTION, "参数不能为空");
			return result;
        }
		//通过优惠券ID获得优惠券对象
        SysCoupon coupon = SysCoupon.dao().queryCouponByCouponId(couponId);
        if(null == coupon){
        	result.put(DESCRIPTION, "优惠券不存在");
			return result;
        }
        if(0 == coupon.getValidTimeType()){
			if(date.getTime() > coupon.getValidTimeEnd().getTime()){
				result.put(DESCRIPTION, "优惠券信息已过期");
				return result;
			}
		}
        
        //总张数
  		int couponAmouet = coupon.getCouponAmouet();
  		//已发放张数
  		int sentAmount = coupon.getSentAmount();
  		if(couponAmouet >= 0){
  			if((couponAmouet-sentAmount) <= 0){
  				result.put(DESCRIPTION, "优惠券可生成数量不足");
  				return result;
  			}
  		}
  		//基础验证通过，更改优惠券的已生成数量
		/*coupon.setSentAmount(sentAmount + 1);
		coupon.update();*/
  		try{
  			if(SysCoupon.dao().addCouponSentAmount(1, couponId) < 1){
  				result.put(DESCRIPTION, "优惠券可生成数量修改失败");
  				return result;
  			}
  		} catch (Exception e) {
  			result.put(DESCRIPTION, "优惠券可生成数量修改失败");
			return result;
		}
		
		
		//封装有效时间
		Date validTimeBegin;
		Date validTimeEnd;
		//当为有效天数时 ，开始时间为现在时间，结束时间为选择时间加上有效天数
		if(1 == coupon.getValidTimeType()){
			int numberDays = coupon.getNumberDays();
			long time = date.getTime(); 
			Long day =  24L * 60 * 60 * 1000 * numberDays; 
			time += day; 
			validTimeBegin = date;
			validTimeEnd =  new Date(time);
		}else{
			validTimeBegin = coupon.getValidTimeBegin();
			validTimeEnd =  coupon.getValidTimeEnd();
		}
		//将couponId转换为时间,得到年份月份，如：201708
		String yearMonth = UtilGetMath.getYearMonth(couponId);
		try {
			//生成编码详情信息
			ZyCouponCustomerExt couponCustomerExt = initZyCouponCustomerExt(couponId, customerId, validTimeBegin, validTimeEnd, yearMonth, type);
			couponCustomerExt.setState(0);
			couponCustomerExt.saveOrUpdate(couponCustomerExt);
		} catch (Exception e) {
			try {
				SysCoupon.dao().subCouponSentAmount(1, couponId);
			} catch (Exception e2) {
				Log.log("优惠券已生成数量减少失败");
			}
			result.put(DESCRIPTION, "优惠券编码生成失败，保存失败");
			return result;
		}
		result.put(IS_OK, true);
		return result;
    }
    /**
	 * Title:初始化优惠券详情赋值
	 * name:zhimin.mo
	 * return:ZyCouponCustomerExt
	 * describe:
	 * time:2017年12月21日
	 */
	private static ZyCouponCustomerExt initZyCouponCustomerExt(Long couponId, Long customerId, Date validTimeBegin, Date validTimeEnd,String yearMonth, int type){
		ZyCouponCustomerExt coupon = new ZyCouponCustomerExt();
		
		//24位随机数
		String couponCode = UtilGetMath.getCouponCodeMath(yearMonth);
		
		//封装优惠券详情信息
		coupon.setUpdateTime(new Date());
		coupon.setCreateTime(new Date());
		coupon.setCouponId(couponId);
		coupon.setCouponCode(couponCode);
		coupon.setSysCustomerId(customerId);
		coupon.setValidTimeBegin(validTimeBegin);
		coupon.setValidTimeEnd(validTimeEnd);
		coupon.setPurposeType(type);
		coupon.setExportIdentification(1L);
		
		return coupon;
	}
	
	public static String getDESCRIPTION() {
		return DESCRIPTION;
	}

	public static String getIsOk() {
		return IS_OK;
	}
}
