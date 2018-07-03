package com.nascent.ecrpsaas.open.ziyan.model.vo;
/*
 * 微信付款关怀po
 */
public class ZyCustomerWeCat {
	//会员id
	public Long sysCustomerId;
	//微信appKey
	public String appKey;
	//微信openId
	public String openId;
	//所属品牌
	public int brandId;
	
	
	public Long getSysCustomerId() {
		return sysCustomerId;
	}
	public void setSysCustomerId(Long sysCustomerId) {
		this.sysCustomerId = sysCustomerId;
	}
	public String getAppKey() {
		return appKey;
	}
	public void setAppKey(String appKey) {
		this.appKey = appKey;
	}
	public String getOpenId() {
		return openId;
	}
	public void setOpenId(String openId) {
		this.openId = openId;
	}
	public int getBrandId() {
		return brandId;
	}
	public void setBrandId(int brandId) {
		this.brandId = brandId;
	}

	
}
