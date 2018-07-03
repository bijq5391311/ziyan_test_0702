package com.nascent.ecrpsaas.plus.ziyan.dispatch.service;

import com.nascent.ecrpsaas.model.KdPointRule;
import com.nascent.ecrpsaas.model.KdPointTradeNotify;
import com.nascent.utils.query.CommonResult;

public interface PointService {
	public  String getName();
	// 通过积分规则排除积分
	public CommonResult  removePointcuntBypointRule(KdPointTradeNotify kdPointTradeNotify,KdPointRule kdPointRule);
     //换算积分
	 public  double  pointCalculationByOrder(KdPointRule kdPointRule,double payment);
}
