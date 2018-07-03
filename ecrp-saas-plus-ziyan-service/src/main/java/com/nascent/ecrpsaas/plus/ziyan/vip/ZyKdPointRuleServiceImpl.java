package com.nascent.ecrpsaas.plus.ziyan.vip;

import org.springframework.stereotype.Service;

import com.nascent.ecrpsaas.plus.ziyan.Integral.model.ZyKdPointRule;
import com.nascent.ecrpsaas.plus.ziyan.Integral.service.ZyKdPointRuleService;
@Service("zyKdPointRuleService")
public class ZyKdPointRuleServiceImpl implements ZyKdPointRuleService {

	@Override
	public ZyKdPointRule loadZyKdPointRule(String zyChannel) {
		ZyKdPointRule kdPointRule = ZyKdPointRule.dao().loadZyKdPointRuleByChannel(zyChannel);
		if(null != kdPointRule){
			return kdPointRule;
		}
		return null;
	}

}
