package com.nascent.ecrpsaas.plus.ziyan.marketing.vo;

/**
 * 优惠券发放分析
 * @author mozhimin
 * @date 2018年4月8日
 * @功能  
 */
public class CouponAnalyzeVo {

	//优惠券类型  1：现金券  2：折扣券
	private String couponType;
	//发放数量
	private String sentAmount;
	//已核销数量
	private String verification;
	//类型统计
	private String count;
	public String getCouponType() {
		return couponType;
	}
	public void setCouponType(String couponType) {
		this.couponType = couponType;
	}
	public String getSentAmount() {
		return sentAmount;
	}
	public void setSentAmount(String sentAmount) {
		this.sentAmount = sentAmount;
	}
	public String getVerification() {
		return verification;
	}
	public void setVerification(String verification) {
		this.verification = verification;
	}
	public String getCount() {
		return count;
	}
	public void setCount(String count) {
		this.count = count;
	}
	@Override
	public String toString() {
		return "CouponAnalyzeVo [couponType=" + couponType + ", sentAmount=" + sentAmount + ", verification="
				+ verification + ", count=" + count + "]";
	}
}
