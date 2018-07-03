package com.nascent.ecrpsaas.plus.ziyan.marketing.constant;

/**
 * @author mozhimin
 * @Date 2017/12/16
 * @功能 优惠券类型
 */
public class CouponValidStateEnum {
	 public enum CouponStatus {
		 	PARAM_ERROR(0,"参数错误"),
		 	TIME_ERROR(1,"已过无效期"),
		    COUNT_ERROR(2,"已经超过数量上限"),
		    SAVE_ERROR(3,"保存错误"),
		    COUPON_ERROR(4,"优惠券错误");
	        private Integer value;
	        private String name;
	        CouponStatus(Integer value, String name){
	            this.value = value;
	            this.name = name;
	        }
	        public Integer getValue() {
	            return value;
	        }

	        public String getName() {
	            return name;
	        }
	    }
}
