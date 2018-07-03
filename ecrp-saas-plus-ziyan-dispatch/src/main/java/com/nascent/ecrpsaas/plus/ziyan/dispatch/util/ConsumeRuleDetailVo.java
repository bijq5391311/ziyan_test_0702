package com.nascent.ecrpsaas.plus.ziyan.dispatch.util;

import java.util.ArrayList;
import java.util.List;

import com.alibaba.fastjson.JSONArray;
import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.database.model.KdGoods;
import com.nascent.ecrpsaas.database.model.KdItem;
import com.nascent.ecrpsaas.plus.ziyan.database.model.ZyKdItem;
import com.nascent.ecrpsaas.plus.ziyan.organization.model.ZyKdGoods;

public class ConsumeRuleDetailVo {

	private String sysItemId;
	private Integer consumeVlaue;

	public String getSysItemId() {
		return sysItemId;
	}

	public void setSysItemId(String sysItemId) {
		this.sysItemId = sysItemId;
	}

	public Integer getConsumeVlaue() {
		return consumeVlaue;
	}

	public void setConsumeVlaue(Integer consumeVlaue) {
		this.consumeVlaue = consumeVlaue;
	}

	public List<ConsumeRuleDetailVo> analysisConsumeInfo(String info) {
		JSONArray arr = JSONArray.parseArray(info);
		List<ConsumeRuleDetailVo> consumeRuleDetailVos = new ArrayList<>();
		for (int i = 0; i < arr.size(); ++i) {
			int id = arr.getJSONObject(i).getInteger("id");
			String title = arr.getJSONObject(i).getString("title");
			String consumeValue = arr.getJSONObject(i).getString("consumeValue");
			KdGoods item = ZyKdGoods.dao().loadKdGoods(id,title);
			if (null != item) {
				ConsumeRuleDetailVo consumeRuleDetailVo = new ConsumeRuleDetailVo();
				consumeRuleDetailVo.setConsumeVlaue(UtilString.toInt(consumeValue));
				consumeRuleDetailVo.setSysItemId(UtilString.toString(item.getSysGoodsId()));
				consumeRuleDetailVos.add(consumeRuleDetailVo);
			}

		}
		return consumeRuleDetailVos;

	}
}
