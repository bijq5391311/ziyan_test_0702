package com.nascent.ecrpsaas.open.ziyan.model.vo;

public class ZyWeChatTemple {
	//会员手机号
	private String mobile;
	//通知消息头
	private String frist;
	//备注
	private String remark;
	//付款金额
	private String payMent;
	//付款方式
	private String payType;
	//消费门店
	private String shopName;
	//交易单号
	private String tradeId;
	//付款时间
	private String payTime;
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getFrist() {
		return frist;
	}
	public void setFrist(String frist) {
		this.frist = frist;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getPayMent() {
		return payMent;
	}
	public void setPayMent(String payMent) {
		this.payMent = payMent;
	}
	public String getPayType() {
		return payType;
	}
	public void setPayType(String payType) {
		this.payType = payType;
	}
	public String getShopName() {
		return shopName;
	}
	public void setShopName(String shopName) {
		this.shopName = shopName;
	}
	public String getTradeId() {
		return tradeId;
	}
	public void setTradeId(String tradeId) {
		this.tradeId = tradeId;
	}
	public String getPayTime() {
		return payTime;
	}
	public void setPayTime(String payTime) {
		this.payTime = payTime;
	}
	
}
