package com.nascent.ecrpsaas.plus.ziyan.dispatch.vo;

import java.util.ArrayList;
import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.jd.open.api.sdk.internal.util.StringUtil;
import com.nascent.ecrpsaas.base.util.UtilJson;
import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.database.model.KdGoods;

/**
 * 描述： 订单信息<br>
 * 类名：OrderInfoVo<br>
 * 创建人：高景玉<br>
 * 创建时间：2017年10月20日 上午09:00:25<br>
 * 修改人：<br>
 * 修改时间：<br>
 * 修改描述：<br>
 */
public class OrderInfoVo {

	private String orderStatus;
	private String outOrderId;
	private String sysItemId;
	private String orderFrom;
	private double orderPayment;

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	public String getOutOrderId() {
		return outOrderId;
	}

	public void setOutOrderId(String outOrderId) {
		this.outOrderId = outOrderId;
	}

	public String getSysItemId() {
		return sysItemId;
	}

	public void setSysItemId(String sysItemId) {
		this.sysItemId = sysItemId;
	}

	public String getOrderFrom() {
		return orderFrom;
	}

	public void setOrderFrom(String orderFrom) {
		this.orderFrom = orderFrom;
	}

	public double getOrderPayment() {
		return orderPayment;
	}

	public void setOrderPayment(double orderPayment) {
		this.orderPayment = orderPayment;
	}

	public List<OrderInfoVo> analyticOrderinfo(String info) {

		List<OrderInfoVo> infoVos = new ArrayList<OrderInfoVo>();
		if (UtilString.isNotEmpty(info)) {
			List<JSONObject> jsonObjects = UtilJson.parseJsonObjectList(info);
			for (JSONObject jsonObject : jsonObjects) {
				OrderInfoVo infoVo = new OrderInfoVo();
				infoVo.setOrderStatus(UtilString.toString(jsonObject.get("OrderStatus")));
				infoVo.setOutOrderId(UtilString.toString(jsonObject.get("OutOrderId")));
				if (UtilString.isNotEmpty(jsonObject.getString("OuterId")))
				{
					KdGoods goods = KdGoods.dao().getSysGoodsIdByOuterId(jsonObject.getString("OuterId"));
					if (null != goods) {
						infoVo.setSysItemId(UtilString.toString(goods.getSysGoodsId()));
					}
				}

				infoVo.setOrderFrom(jsonObject.getString("OrderFrom"));
				infoVo.setOrderPayment(jsonObject.getBigDecimal("OrderPayment").doubleValue());
				infoVos.add(infoVo);
			}
		}
		return infoVos;
	}

}
