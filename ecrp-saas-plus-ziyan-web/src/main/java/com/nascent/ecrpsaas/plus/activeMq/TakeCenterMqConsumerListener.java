package com.nascent.ecrpsaas.plus.activeMq;

import java.util.HashMap;
import java.util.Map;

import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.TextMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.plus.activeMq.service.ProducerService;
import com.nascent.ecrpsaas.plus.ziyan.open.model.ZyMqmessage;
import com.nascent.plugins.spring.SpringContext;

/**
 * 中台订单监听消息
 * 
 * @author bijingQ
 *
 */

public class TakeCenterMqConsumerListener implements MessageListener {

	@Autowired
	@Qualifier("takeCenterProduceQueue")
	private Destination destination;// 获取配置文件中的队列位置(绑定位置)
	Logger logger = LoggerFactory.getLogger(TakeCenterMqConsumerListener.class);
	private ProducerService producerService = SpringContext.me().getBean(ProducerService.class);

	@Override
	public void onMessage(Message message) {
		try {
			String textmessage = ((TextMessage) message).getText();
			//System.out.println(textmessage+"中台消息接受");
			// 处理json数据
			JsonParser parser = new JsonParser(); // 创建JSON解析器
			JsonObject object = (JsonObject) parser.parse(textmessage);
			String orderId = object.get("docId").getAsString();
			String memberId = object.get("memberId").isJsonNull()?null:object.get("memberId").getAsString();
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("orderId", orderId);
			ZyMqmessage zyMqmessage = new ZyMqmessage();
			zyMqmessage.setMessage(textmessage);
			zyMqmessage.setMessageTye("mq4Crm_SaleOrders");
			zyMqmessage.setOrderId(orderId);
			if(UtilString.areNotEmpty(memberId)){
				if(memberId.matches("[0-9]+")){
				zyMqmessage.dao().saveMessage(zyMqmessage);
				}
			}else{
				zyMqmessage.dao().saveMessage(zyMqmessage);
				
			}
			// 返回被消费的数据信息
			producerService.sendMapMessage(destination, map);
			logger.info("生产中台通知消息的订单成功:" + orderId);
		} catch (JMSException e) {
			logger.error("生产中台通知消息的订单失败" + e);
		}
	}
}
