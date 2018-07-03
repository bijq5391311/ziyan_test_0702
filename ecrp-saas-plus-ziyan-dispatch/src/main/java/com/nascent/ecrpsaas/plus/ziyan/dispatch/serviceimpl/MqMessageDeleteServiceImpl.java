package com.nascent.ecrpsaas.plus.ziyan.dispatch.serviceimpl;

import org.springframework.stereotype.Service;

import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.MqMessageDeleteService;
import com.nascent.ecrpsaas.plus.ziyan.open.model.ZyMqmessage;

@Service("MqMessageDeleteServiceImpl")
public class MqMessageDeleteServiceImpl implements MqMessageDeleteService{

	@Override
	public boolean deleteMessage(String createTime) {
		//删除前4天的数据
		//yyyy-MM-dd 00:00:00
		try {
			ZyMqmessage.dao().deteleMessage(createTime);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

}
