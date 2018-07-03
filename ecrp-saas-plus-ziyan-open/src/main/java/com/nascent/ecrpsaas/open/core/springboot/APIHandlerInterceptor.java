package com.nascent.ecrpsaas.open.core.springboot;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.AsyncHandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.nascent.ecrpsaas.open.core.API;
import com.nascent.ecrpsaas.open.core.security.ValidatorAdapter;

public class APIHandlerInterceptor implements AsyncHandlerInterceptor {	
	private ValidatorAdapter adapter;
	
	public APIHandlerInterceptor(ValidatorAdapter adapter) {
		this.adapter = adapter;
	}
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		if(handler instanceof HandlerMethod) {
			HandlerMethod handlerMethod = (HandlerMethod)handler;
			API apiInfo = handlerMethod.getMethodAnnotation(API.class);
			if(apiInfo == null) {
				return true;
			} else {
				return adapter.handle(apiInfo, request, response, handlerMethod);
			}
		} else {
			return true;
		}
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
	}

	@Override
	public void afterConcurrentHandlingStarted(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
	}

}
