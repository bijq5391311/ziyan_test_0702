package com.nascent.ecrpsaas.plus.ziyan.dispatch.service;


/**
 * 
 * @author bijingQ
 *
 */
public interface MqMessageDeleteService {
	/**
	 * 定时删除已经推送的订单数据
	 */
	public boolean deleteMessage(String createTime);
}
