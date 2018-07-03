package com.nascent.ecrpsaas.plus.ziyan.dispatch.service;

import com.nascent.ecrpsaas.model.KdPointRule;
import com.nascent.ecrpsaas.model.KdPointTradeNotify;

/**
 * 描述： 积分活动兑换积分<br>
 * 类名：PointRuleExchangeIntegralServiceImpl<br>
 * 创建人：高景玉<br>
 * 创建时间：2017年10月18日 上午20:00:25<br>
 * 修改人：<br>
 * 修改时间：<br>
 * 修改描述：<br>
 */
public interface PointActivityExchangeService {
	
	//获取实现接口的实现类的标识
	public String  getName (); 
    //通过积分活动换算积分
	public  double exchangePointActivityIntegral(KdPointTradeNotify kdPointTradeNotify,KdPointRule kdPointRule);
	
	

}
