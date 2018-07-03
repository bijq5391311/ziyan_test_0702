package com.nascent.ecrpsaas.plus.ziyan.dispatch.service;

import com.nascent.ecrpsaas.model.KdPointTradeNotify;
import com.nascent.ecrpsaas.plus.ziyan.vip.model.ZyConsumeValueRule;
import com.nascent.utils.query.CommonResult;

public interface ConsumeExcludeService {

	// 通过积分规则排除积分
	public CommonResult removePointcuntBypointRule(KdPointTradeNotify kdPointTradeNotify, ZyConsumeValueRule zyConsumeValueRule);
}
