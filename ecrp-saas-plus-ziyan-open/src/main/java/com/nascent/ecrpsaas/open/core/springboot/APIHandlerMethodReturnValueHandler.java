package com.nascent.ecrpsaas.open.core.springboot;

import java.lang.reflect.Method;

import org.springframework.core.MethodParameter;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodReturnValueHandler;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.nascent.ecrpsaas.open.core.API;
import com.nascent.ecrpsaas.open.core.API.ReturnType;
import com.nascent.ecrpsaas.open.core.RestResult;

class APIHandlerMethodReturnValueHandler implements HandlerMethodReturnValueHandler {
	private HandlerMethodReturnValueHandler handler;
	public APIHandlerMethodReturnValueHandler(HandlerMethodReturnValueHandler handler) {
		this.handler = handler;
	}
	
	@Override
	public boolean supportsReturnType(MethodParameter returnType) {
		Method method = returnType.getMethod();
		return method.getAnnotation(API.class) != null;
	}

	@Override
	public void handleReturnValue(Object returnValue, MethodParameter returnType, ModelAndViewContainer mavContainer,
			NativeWebRequest webRequest) throws Exception {
		//返回是RestResult对象，不做处理
		if(returnValue instanceof RestResult) {
			handler.handleReturnValue(returnValue, returnType, mavContainer, webRequest);
			return;
		}
		
		API apiInfo = returnType.getMethod().getAnnotation(API.class);
		if(apiInfo.returnType() == ReturnType.COMMON_RESULT) {
			handler.handleReturnValue(new RestResult(returnValue), returnType, mavContainer, webRequest);
		} else {
			handler.handleReturnValue(returnValue, returnType, mavContainer, webRequest);
		}
	}
}
