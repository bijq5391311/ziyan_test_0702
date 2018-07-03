package com.nascent.ecrpsaas.open.ziyan.service;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.nascent.ecrpsaas.open.ziyan.model.ZyMqmessageModel;


/**
 * activeMq订单数据接口
 * @author bijingQ
 *
 */
public interface ActiveMqOrderToZiyanService {
	/**
	 *外卖订单数据
	 */
	List<JSONObject> takeAwayOrder(String messageType,int size,String startTime,String endTime);
	/**
	 *订单数据重新推送
	 */
	List<JSONObject> takeOrderTwice(int size,String startTime,String endTime);
	/**
	 * 中台订单数据
	 */
	List<ZyMqmessageModel> takeCenterOrder();
	/**
	 * 中台退货订单数据
	 */
	List<ZyMqmessageModel> takeCenterRtOrder();
}
