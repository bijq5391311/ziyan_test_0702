package com.nascent.ecrpsaas.open.core.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.Marker;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;

import com.nascent.ecrpsaas.open.core.RestResult;


@ControllerAdvice(basePackages = {"com.nascent.ecrpsaas.open.api"})
public class APIExceptionHandler {
	private Logger logger = LoggerFactory.getLogger(APIExceptionHandler.class);
	
	/**
	 * 未知异常统一处理方法
	 * @param exception
	 * @param handlerMethod
	 * @return
	 * @throws ClassNotFoundException 
	 */
	@ExceptionHandler(Exception.class)
	@ResponseBody
	public Object handle(Exception exception, HandlerMethod handlerMethod) {
		logger.error((Marker)null, exception.getMessage(), exception);
		if(exception instanceof APIException) {
			return handleAPIException((APIException)exception, handlerMethod);
		} else {
			return new RestResult()
				.setFailed()
				.setCode(1)
				.setMsg("系统内部错误，请联系系统管理员");
		}
		
	}
	
	/**
	 * 处理valid校验异常
	 * @param exception
	 * @param handlerMethod
	 * @return
	 */
	@ExceptionHandler(BindException.class)
	@ResponseBody
	public Object handleBindException(BindException exception, HandlerMethod handlerMethod) {
		logger.error((Marker)null, exception.getMessage(), exception);
		RestResult result = new RestResult();
		result.setCode(1)
			.setFailed()
			.setMsg(exception.getFieldError().getDefaultMessage());
		return result;
	}
	
	/**
	 * 处理请求参数异常
	 * @param exception
	 * @param handlerMethod
	 * @return
	 * @throws ClassNotFoundException
	 */
	@ExceptionHandler(IllegalStateException.class)
	@ResponseBody
	public Object handleParamException(IllegalStateException exception, HandlerMethod handlerMethod) throws ClassNotFoundException {
		logger.error((Marker)null, exception.getMessage(), exception);
		Class<?> cls = Class.forName(exception.getStackTrace()[0].getClassName());
		if(HandlerMethodArgumentResolver.class.isAssignableFrom(cls)) {
			return new RestResult()
					.setCode(1)
					.setFailed()
					.setMsg(exception.getMessage());
		} else {
			return handle(exception, handlerMethod);
		}
	}
	
	private Object handleAPIException(APIException exception, HandlerMethod handlerMethod) {
		return new RestResult()
				.setCode(1)
				.setFailed()
				.setMsg(exception.getMessage());
	}
}
