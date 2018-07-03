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
import com.nascent.ecrpsaas.plus.activeMq.service.ProducerService;
import com.nascent.ecrpsaas.plus.ziyan.open.model.ZyMqmessage;
import com.nascent.plugins.spring.SpringContext;
/**
 * 外卖订单 监听消息的获取
 * @author bijingQ
 *
 */
public class TestMqConsumerListener implements MessageListener {
	
	Logger logger = LoggerFactory.getLogger(TestMqConsumerListener.class) ;
	@Override
	public void onMessage(Message message) {
		try {
			String textmessage = ((TextMessage)message).getText();
	
    	System.out.println(textmessage);
    	
		} catch (JMSException e) {
			logger.error("通知消息的订单失败"+e);
		}
	}

}
