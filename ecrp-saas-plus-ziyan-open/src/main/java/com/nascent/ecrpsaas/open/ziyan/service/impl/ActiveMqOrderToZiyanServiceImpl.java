package com.nascent.ecrpsaas.open.ziyan.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.nascent.ecrpsaas.open.ziyan.model.ZyMqmessageModel;
import com.nascent.ecrpsaas.open.ziyan.service.ActiveMqOrderToZiyanService;

@Service("ActiveMqOrderToZiyanServiceImpl")
public class ActiveMqOrderToZiyanServiceImpl implements ActiveMqOrderToZiyanService {

	@Override
	public List<JSONObject> takeAwayOrder(String messageType,int size,String startTime,String endTime) {
		List<JSONObject> message =null;
		// 调用model中的从数据库中获取数据
		List<ZyMqmessageModel> list = new ZyMqmessageModel().findMessage(messageType,size,startTime,endTime);
		if (list != null && list.size() > 0) {
			message =new ArrayList<JSONObject>();
			for (ZyMqmessageModel zyMqmessage : list) {
				String info = zyMqmessage.getMessage();
				message.add(JSONObject.parseObject(info));
				//更新数据的状态
				ZyMqmessageModel.dao().updateMessage(zyMqmessage.getOrderId());
			}
			return message;
		}
		return message;
	}
	/**
	 * 订单重新推送
	 */
	@Override
	public List<JSONObject> takeOrderTwice(int size,String startTime, String endTime) {
		List<JSONObject> message =null;
		// 调用model中的从数据库中获取数据
		List<ZyMqmessageModel> list = new ZyMqmessageModel().findMessageTwice(size,startTime,endTime);
		if (list != null && list.size() > 0) {
			message =new ArrayList<JSONObject>();
			for (ZyMqmessageModel zyMqmessage : list) {
				String info = zyMqmessage.getMessage();
				message.add(JSONObject.parseObject(info));
				//更新数据的状态
				ZyMqmessageModel.dao().updateMessage(zyMqmessage.getOrderId());
			}
			return message;
		}
		return message;
	}

	@Override
	public List<ZyMqmessageModel> takeCenterOrder() {

		return null;
	}

	@Override
	public List<ZyMqmessageModel> takeCenterRtOrder() {
		// TODO Auto-generated method stub
		return null;
	}
}
