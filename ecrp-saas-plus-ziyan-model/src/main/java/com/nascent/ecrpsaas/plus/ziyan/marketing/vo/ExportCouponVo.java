package com.nascent.ecrpsaas.plus.ziyan.marketing.vo;

import java.util.Date;

public class ExportCouponVo {
	//优惠券Id
	private Long couponId;
	//优惠券编码
	private String couponCode;
	//有效时间开始
	private Date validTimeBegin;
	//有效时间结束
	private Date validTimeEnd;
	public Long getCouponId() {
		return couponId;
	}
	public void setCouponId(Long couponId) {
		this.couponId = couponId;
	}
	public String getCouponCode() {
		return couponCode;
	}
	public void setCouponCode(String couponCode) {
		this.couponCode = couponCode;
	}
	public Date getValidTimeBegin() {
		return validTimeBegin;
	}
	public void setValidTimeBegin(Date validTimeBegin) {
		this.validTimeBegin = validTimeBegin;
	}
	public Date getValidTimeEnd() {
		return validTimeEnd;
	}
	public void setValidTimeEnd(Date validTimeEnd) {
		this.validTimeEnd = validTimeEnd;
	}
	
}
