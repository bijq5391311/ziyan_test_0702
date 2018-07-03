package com.nascent.ecrpsaas.plus.vo;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.nascent.ecrpsaas.base.vo.organization.SysShopVo;
import com.nascent.utils.query.QueryInfo;

public class ZySysShopVo implements Serializable {

	private static final long serialVersionUID = 1L;
	private long id;
	private String shopCode;
	private String shopName;
	private long parentId;
	private int platFromType;
	private String appKey;
	private String appSecret;
	private String outSid;
	private String accessToken;
	private String uid;
	private String jlSessionKey;
	private Date expiresIn;
	private Date jlkeyExpireTime;
	private Integer openShopId;
	private int groupId;
	private int brandId;
	private int shopCount;
	private String departmentCode;

	private static final ZySysShopVo SHOP_VO = new ZySysShopVo();
	private static final int IS_SHOP_0 = 0;
	private static final int IS_SHOP_1 = 1;

	public static ZySysShopVo dao() {
		return SHOP_VO;
	}
	/**
	 * 根据shop查找店铺列表
	 * 
	 * @param shopCodes
	 * @return
	 */
	public List<ZySysShopVo> queryListByIsShop(String shopCodes) {
		QueryInfo queryInfo = new QueryInfo("zybase.common.queryShopList");
		return queryInfo.findT(ZySysShopVo.class);
	}
	

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getShopCode() {
		return shopCode;
	}

	public void setShopCode(String shopCode) {
		this.shopCode = shopCode;
	}

	public String getShopName() {
		return shopName;
	}

	public void setShopName(String shopName) {
		this.shopName = shopName;
	}

	public int getGroupId() {
		return groupId;
	}

	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}

	public long getParentId() {
		return parentId;
	}

	public void setParentId(long parentId) {
		this.parentId = parentId;
	}

	public int getPlatFromType() {
		return platFromType;
	}

	public void setPlatFromType(int platFromType) {
		this.platFromType = platFromType;
	}

	public String getAppKey() {
		return appKey;
	}

	public void setAppKey(String appKey) {
		this.appKey = appKey;
	}

	public String getAppSecret() {
		return appSecret;
	}

	public void setAppSecret(String appSecret) {
		this.appSecret = appSecret;
	}

	public String getOutSid() {
		return outSid;
	}

	public void setOutSid(String outSid) {
		this.outSid = outSid;
	}

	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	// public String getName() {
	// return name;
	// }
	//
	// public void setName(String name) {
	// this.name = name;
	// }

	public int getBrandId() {
		return brandId;
	}

	public void setBrandId(int brandId) {
		this.brandId = brandId;
	}

	public String getJlSessionKey() {
		return jlSessionKey;
	}

	public void setJlSessionKey(String jlSessionKey) {
		this.jlSessionKey = jlSessionKey;
	}

	public int getShopCount() {
		return shopCount;
	}

	public void setShopCount(int shopCount) {
		this.shopCount = shopCount;
	}

	public Date getExpiresIn() {
		return expiresIn;
	}

	public void setExpiresIn(Date expiresIn) {
		this.expiresIn = expiresIn;
	}

	public Date getJlkeyExpireTime() {
		return jlkeyExpireTime;
	}

	public void setJlkeyExpireTime(Date jlkeyExpireTime) {
		this.jlkeyExpireTime = jlkeyExpireTime;
	}

	public Integer getOpenShopId() {
		return openShopId;
	}

	public void setOpenShopId(Integer openShopId) {
		this.openShopId = openShopId;
	}

	public String getDepartmentCode() {
		return departmentCode;
	}

	public void setDepartmentCode(String departmentCode) {
		this.departmentCode = departmentCode;
	}

}
