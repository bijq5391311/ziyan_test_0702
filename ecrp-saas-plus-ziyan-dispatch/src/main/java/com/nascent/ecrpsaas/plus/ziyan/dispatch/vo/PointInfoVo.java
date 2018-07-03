package com.nascent.ecrpsaas.plus.ziyan.dispatch.vo;

import com.alibaba.fastjson.JSONObject;
import com.nascent.ecrpsaas.base.util.UtilString;

/**
 * 描述： 积分兑换<br>
 * 类名：PointInfoVo<br>
 * 创建人：高景玉<br>
 * 创建时间：2017年10月20日 上午09:00:25<br>
 * 修改人：<br>
 * 修改时间：<br>
 * 修改描述：<br>
 */
public class PointInfoVo {
	
	private String  orderInfo;
	private String type;
	public String getOrderInfo() {
		return orderInfo;
	}
	public void setOrderInfo(String orderInfo) {
		this.orderInfo = orderInfo;
	}

	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public PointInfoVo analyticPointinfo(String info){
		PointInfoVo infoVo = new PointInfoVo();
		JSONObject object = JSONObject.parseObject(info);
		if(null != object){
			infoVo.setOrderInfo(UtilString.toString(object.get("orderInfo")));
			infoVo.setType(object.getString("type"));
		}
		return infoVo;
	}
	

}
