package com.nascent.ecrpsaas.open.ziyan.model.vo;

import java.util.Date;

/**
 * @author mozhimin
 * @date 2017年12月23日
 * @功能  优惠券信息
 */
public class CouponToZiYanVo {
	//优惠券名称
	private String couponName;
	//优惠券编码
	private String couponCode;
	//'类型1 现金 2  折扣 
	private String couponType;
	//权益
	private String couponInterests;
	//有效时间开始
	private Date startTime;
	//失效时间
	private Date endTime;
	//经销商承担系数
	private String coefficient;
	//商家备注
	private String title;
	//商家备注
	private boolean isOk;
	//错误信息
	private String message;
	  
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getCouponName() {
		return couponName;
	}
	public void setCouponName(String couponName) {
		this.couponName = couponName;
	}
	public String getCouponCode() {
		return couponCode;
	}
	public void setCouponCode(String couponCode) {
		this.couponCode = couponCode;
	}
	public String getCouponType() {
		return couponType;
	}
	public void setCouponType(String couponType) {
		this.couponType = couponType;
	}
	public String getCouponInterests() {
		return couponInterests;
	}
	public void setCouponInterests(String couponInterests) {
		this.couponInterests = couponInterests;
	}
	public Date getStartTime() {
		return startTime;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	public String getCoefficient() {
		return coefficient;
	}
	public void setCoefficient(String coefficient) {
		this.coefficient = coefficient;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public boolean getIsOk() {
		return isOk;
	}
	public void setIsOk(boolean isOk) {
		this.isOk = isOk;
	}
	@Override
	public String toString() {
		return "CouponToZiYanVo [couponName=" + couponName + ", couponCode=" + couponCode + ", couponType=" + couponType
				+ ", couponInterests=" + couponInterests + ", startTime=" + startTime + ", endTime=" + endTime
				+ ", coefficient=" + coefficient + ", title=" + title + ", isOk=" + isOk + ", message=" + message + "]";
	}
	
}
