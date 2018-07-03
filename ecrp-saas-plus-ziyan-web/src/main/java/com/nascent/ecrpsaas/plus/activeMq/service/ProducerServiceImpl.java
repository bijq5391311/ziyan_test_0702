package com.nascent.ecrpsaas.plus.activeMq.service;

import java.util.Map;
import java.util.Set;

import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.MapMessage;
import javax.jms.Message;
import javax.jms.Session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import org.springframework.stereotype.Service;


/**
 * 消息生产服务
 * @author bijingQ
 *
 */
@Service
public class ProducerServiceImpl implements ProducerService{
	@Autowired
	private JmsTemplate jmsTemplate;

	@Override
	public void sendTextMessage(Destination destination, final String message) {  
        System.out.println("---------------生产者发送消息-----------------");  
        System.out.println("---------------生产者发了一个消息：" + message);  
        jmsTemplate.send(destination, new MessageCreator() {  
            public Message createMessage(Session session)  {  
                try {
					return session.createTextMessage(message);
				} catch (JMSException e) {
					
				}
				return null;  
            }  
        });  
    }


	@Override
	public void sendMapMessage(Destination destination, Map<String, Object> map) {
		 jmsTemplate.send(destination, new MessageCreator() {  
	            public Message createMessage(Session session)  {  
	                try {
	                	MapMessage message = session.createMapMessage();  
	                    if (map != null && !map.isEmpty()) {  
	                        Set<String> keys = map.keySet();  
	                        for (String key : keys) {  
	                            message.setObject(key, map.get(key));  
	                        }  
	                    }  
						return message;
					} catch (JMSException e) {
						
					}
					return null;  
	            }  
	        });
	}   
    
}
