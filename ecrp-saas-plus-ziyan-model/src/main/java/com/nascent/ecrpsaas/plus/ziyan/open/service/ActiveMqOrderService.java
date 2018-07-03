package com.nascent.ecrpsaas.plus.ziyan.open.service;

import java.util.List;

import com.nascent.ecrpsaas.plus.ziyan.open.model.ZyMqmessage;


/**
 * activeMq订单数据接口
 * @author bijingQ
 *
 */
public interface ActiveMqOrderService {
	/**
	 *外卖订单数据
	 */
	List<ZyMqmessage> takeAwayOrder(String messageType,int size);
	/**
	 * 中台订单数据
	 */
	List<ZyMqmessage> takeCenterOrder();
	/**
	 * 中台退货订单数据
	 */
	List<ZyMqmessage> takeCenterRtOrder();
}
