package com.nascent.ecrpsaas.plus.ziyan.dispatch.service;

import com.nascent.ecrpsaas.model.KdPointRule;
import com.nascent.ecrpsaas.model.KdPointTradeNotify;

/**
 * 描述： 积分奖励兑换积分<br>d
 * 类名：PointRuleExchangeIntegralServiceImpl<br>
 * 创建人：高景玉<br>
 * 创建时间：2017年12月26日 上午08:00:25<br>
 * 修改人：<br>
 * 修改时间：<br>
 * 修改描述：<br>
 */
public interface PointRewardExchangeService {
	
	//获取实现接口的实现类的标识
	public String  getName (); 
    //通过积分奖励换算积分
	/**
	 * @param kdPointTradeNotify  交易通知记录
	 * @param pointRuleount  积分规则兑换的积分
	 * @return
	 */
	public  double  exchangePointRewardIntegral(KdPointTradeNotify kdPointTradeNotify,double pointRuleount,KdPointRule kdPointRule);
	
	

}
