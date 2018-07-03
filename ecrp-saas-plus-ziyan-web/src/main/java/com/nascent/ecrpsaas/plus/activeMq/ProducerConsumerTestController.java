package com.nascent.ecrpsaas.plus.activeMq;

import javax.jms.Destination;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nascent.ecrpsaas.base.web.BaseController;
import com.nascent.ecrpsaas.plus.activeMq.service.ProducerService;
import com.nascent.plugins.spring.SpringContext;
/**
 * 中台信息推送
 * @author bijingQ
 *
 */
@Controller
public class ProducerConsumerTestController extends BaseController{
	private ProducerService producerService = SpringContext.me().getBean(ProducerService.class);

    @Autowired  
    @Qualifier("test")  
    private Destination destination;  
      
    @ResponseBody
    public void testSend() { 
    	System.out.println("-------------------中台信息推送---------------");
        for (int i=0; i<10; i++) {  
            producerService.sendTextMessage(destination, "你好，中台消息推送！这是消息：" + (i+1));  
        }  
    }  
}
