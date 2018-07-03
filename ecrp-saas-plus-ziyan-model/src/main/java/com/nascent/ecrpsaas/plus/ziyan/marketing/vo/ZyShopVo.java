package com.nascent.ecrpsaas.plus.ziyan.marketing.vo;


import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.utils.query.QueryInfo;
import com.nascent.utils.query.TableRequest;
import com.nascent.utils.query.TableResponse;



public class ZyShopVo implements Serializable {



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

	/**

	 * 淘宝店铺ID

	 */

	private String tbSid;

	private String departmentCode;



	private static final ZyShopVo SHOP_VO = new ZyShopVo();

	private static final int IS_SHOP_0 = 0;

	private static final int IS_SHOP_1 = 1;



	public static ZyShopVo dao() {

		return SHOP_VO;

	}

	public TableResponse<Record> loadShopTree4New(TableRequest request, String shopCodes) {

		Map<String, Object> map = new HashMap<String, Object>();

		QueryInfo info  = new QueryInfo("marketing.sysCoupon.loadShopTable", request);

		if(null != request.getSearchMap().get("brand")){

			String brand =  request.getSearchMap().get("brand").toString();

			map.put("brand", brand);

			info.addParam("brand", brand);

		}

		if(null != request.getSearchMap().get("channel")){

			String channel =  request.getSearchMap().get("channel").toString();

			map.put("channel", channel);

			info.addParam("channel", channel);

		}if(null != request.getSearchMap().get("sheng")){

			String sheng =  request.getSearchMap().get("sheng").toString();

			map.put("sheng", sheng);

			info.addParam("sheng", sheng);

		}if(null != request.getSearchMap().get("shi")){

			String shi =  request.getSearchMap().get("shi").toString();

			map.put("shi", shi);

			info.addParam("shi", shi);

		}if(null != request.getSearchMap().get("qu")){

			String qu =  request.getSearchMap().get("qu").toString();

			map.put("qu", qu);

			info.addParam("qu", qu);

		}if(null != request.getSearchMap().get("shopName")){

			String shopName =  request.getSearchMap().get("shopName").toString();

			map.put("shopName", shopName);

			info.addParam("shopName", shopName);

		}if(null != request.getSearchMap().get("shopCode")){

			String shopCode =  request.getSearchMap().get("shopCode").toString();

			map.put("shopCode", shopCode);

			info.addParam("shopCode", shopCode);

		}

		info.addParam("shopCodes",shopCodes);

		return info.paginate();

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



	public String getTbSid() {

		return tbSid;

	}



	public void setTbSid(String tbSid) {

		this.tbSid = tbSid;

	}

}

