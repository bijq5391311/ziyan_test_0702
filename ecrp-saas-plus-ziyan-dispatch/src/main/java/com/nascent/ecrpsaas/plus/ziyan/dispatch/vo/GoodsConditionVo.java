package com.nascent.ecrpsaas.plus.ziyan.dispatch.vo;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.nascent.ecrpsaas.base.util.UtilJson;
import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.database.model.KdGoods;
import com.nascent.ecrpsaas.plus.ziyan.organization.model.ZyKdGoods;

public class GoodsConditionVo {
	
	public  String analysisGoodsCondition(String condition){
		StringBuffer sb =  new StringBuffer();
		if (UtilString.isNotEmpty(condition)) {
			List<JSONObject> jsonObjects = UtilJson.parseJsonObjectList(condition);
			if(0 < jsonObjects.size()){
				for (JSONObject jsonObject : jsonObjects) {
				   int id = jsonObject.getInteger("id");
				   String title =  jsonObject.getString("title");
				  KdGoods kdGoods = ZyKdGoods.dao().loadKdGoods(id, title);
				  if( null != kdGoods){
					  sb.append(kdGoods.getSysGoodsId());
					  sb.append(",");
				  }
				}
			}
		}
		
		return sb.toString();
		
	}

}
