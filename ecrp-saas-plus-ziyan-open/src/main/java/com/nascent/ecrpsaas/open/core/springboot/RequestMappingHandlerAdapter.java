package com.nascent.ecrpsaas.open.core.springboot;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.List;

import org.springframework.web.method.support.HandlerMethodReturnValueHandler;
import org.springframework.web.method.support.HandlerMethodReturnValueHandlerComposite;
import org.springframework.web.servlet.mvc.method.annotation.RequestResponseBodyMethodProcessor;

public class RequestMappingHandlerAdapter
		extends org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter {
	
	@Override
	public void afterPropertiesSet() {
		super.afterPropertiesSet();
		Method getHandler = null;
		try {
			getHandler = org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.class.getDeclaredMethod("getDefaultReturnValueHandlers");
			Field returnValueHandlers = org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.class.getDeclaredField("returnValueHandlers");
			returnValueHandlers.setAccessible(true);
			getHandler.setAccessible(true);
			
			@SuppressWarnings("unchecked")
			List<HandlerMethodReturnValueHandler> handlers = (List<HandlerMethodReturnValueHandler>) getHandler.invoke(this);
			
			//获取responseBody消息处理对象
			HandlerMethodReturnValueHandler responseBodyHandler = null;
			for(HandlerMethodReturnValueHandler obj : handlers) {
				if(obj instanceof RequestResponseBodyMethodProcessor) {
					responseBodyHandler = obj;
					break;
				}
			}
			
			//将APIHandlerMethodReturnValueHandler添加到链表的第一位，避免被RequestResponseBodyMethodProcessor处理了api接口返回值
			handlers.add(0, new APIHandlerMethodReturnValueHandler(responseBodyHandler));
			
			returnValueHandlers.set(this, new HandlerMethodReturnValueHandlerComposite().addHandlers(handlers));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
