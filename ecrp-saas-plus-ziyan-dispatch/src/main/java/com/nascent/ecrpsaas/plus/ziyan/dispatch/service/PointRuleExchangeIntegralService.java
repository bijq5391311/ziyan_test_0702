package com.nascent.ecrpsaas.plus.ziyan.dispatch.service;

import com.nascent.ecrpsaas.model.KdPointRule;
import com.nascent.ecrpsaas.model.KdPointTradeNotify;
import com.nascent.utils.query.CommonResult;

/**
 * 描述： 积分规则兑换积分<br>
 * 类名：PointRuleExchangeIntegralService<br>
 * 创建人：高景玉<br>
 *创建时间：2017年12月26日 上午08:00:25<br>
 * 修改人：<br>
 * 修改时间：<br>
 * 修改描述：<br>
 */

public interface PointRuleExchangeIntegralService {
	
	//获取实现接口的实现类的标识
	public String  getName (); 
    //通过积分规则换算积分
	public  CommonResult exchangePointRuleIntegral(KdPointTradeNotify kdPointTradeNotify,KdPointRule kdPointRule);
	
}
