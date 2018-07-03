package com.nascent.ecrpsaas.plus.ziyan.marketing.vo;

public class CouponVo {
	/*//优惠券类型  1：现金券  2：折扣券
	private int activityType;*/
	
	//优惠券名称
	private String activityName;
	//优惠券类型  1：现金券  2：折扣券
	private int condition;
	//0：不限  1 订单满足*
	private int condi;
	//现金券面额
	private String denomination;
	//折扣
	private String discount;
	//订单满足金额
	private String giveCondition;
	//商品ids  按逗号间隔
	private String itemIdStr;
	//店铺out_code集合   按逗号间隔
	private String shopIdStr;
	//时间限制类型  0：绝对时间   1：相对时间
	private int time;
	//优惠券有效开始时间
	private String beginTime;
	//优惠券有效结束时间
	private String endTime;
	//有效天数
	private String relativeTime;
	//有效张数
	private String productionQuantity;
	//客服使用备注
	private String coefficient;
	//使用说明
	private String description;
	//客服使用备注
	private String title;
	
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
	public String getProductionQuantity() {
		return productionQuantity;
	}
	public void setProductionQuantity(String productionQuantity) {
		this.productionQuantity = productionQuantity;
	}
	public String getActivityName() {
		return activityName;
	}
	public void setActivityName(String activityName) {
		this.activityName = activityName;
	}
	public int getCondition() {
		return condition;
	}
	public void setCondition(int condition) {
		this.condition = condition;
	}
	public int getCondi() {
		return condi;
	}
	public void setCondi(int condi) {
		this.condi = condi;
	}
	public String getDenomination() {
		return denomination;
	}
	public void setDenomination(String denomination) {
		this.denomination = denomination;
	}
	public String getDiscount() {
		return discount;
	}
	public void setDiscount(String discount) {
		this.discount = discount;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getGiveCondition() {
		return giveCondition;
	}
	public void setGiveCondition(String giveCondition) {
		this.giveCondition = giveCondition;
	}
	public String getItemIdStr() {
		return itemIdStr;
	}
	public void setItemIdStr(String itemIdStr) {
		this.itemIdStr = itemIdStr;
	}
	public String getShopIdStr() {
		return shopIdStr;
	}
	public void setShopIdStr(String shopIdStr) {
		this.shopIdStr = shopIdStr;
	}
	public int getTime() {
		return time;
	}
	public void setTime(int time) {
		this.time = time;
	}
	public String getBeginTime() {
		return beginTime;
	}
	public void setBeginTime(String beginTime) {
		this.beginTime = beginTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public String getRelativeTime() {
		return relativeTime;
	}
	public void setRelativeTime(String relativeTime) {
		this.relativeTime = relativeTime;
	}
}
