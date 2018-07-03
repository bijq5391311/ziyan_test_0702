package com.nascent.ecrpsaas.plus.activeMq.service;

import java.util.Map;

import javax.jms.Destination;

/**
 * 消息生产服务
 * @author bijingQ
 *
 */

public interface ProducerService {
	/**
	 * 生产TextMessage消息
	 * @param destination
	 * @param message
	 */
    public void sendTextMessage(Destination destination, final String message);
    /**
     * 生产MapMessage
     * @param destination
	 * @param message
     */
    public void sendMapMessage(Destination destination, Map<String,Object> map);
}
