package com.nascent.ecrpsaas.plus.ziyan.vip;

import org.springframework.stereotype.Service;

import com.nascent.ecrpsaas.plus.ziyan.vip.model.ZyConsumeValueRule;
import com.nascent.ecrpsaas.plus.ziyan.vip.service.ConsumeValueDownService;
@Service("consumeValueDownService")
public class ConsumeValueDownServiceImpl implements ConsumeValueDownService {

	@Override
	public ZyConsumeValueRule loadConsumeValueRule() {
		ZyConsumeValueRule consumeValueRule =	ZyConsumeValueRule.dao().loadConsumeValueRule();
		if(null != consumeValueRule){
			return consumeValueRule;
		}
		
		return null;
	}

}
