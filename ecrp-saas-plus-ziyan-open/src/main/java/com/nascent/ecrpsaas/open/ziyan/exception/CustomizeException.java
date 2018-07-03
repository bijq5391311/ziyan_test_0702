package com.nascent.ecrpsaas.open.ziyan.exception;


import com.nascent.ecrpsaas.open.core.exception.APIException;

/**
 * 紫燕自定义异常
 * @author zhaoting
 * @Date 2017年10月27日
 * @功能	TODO
 */
public class CustomizeException extends RuntimeException implements APIException {

	private static final long serialVersionUID = 1L;
	
	public CustomizeException(String msg) {
		super(msg);
	}
	
	@Override
	public String getMessage() {
		return super.getMessage();
	}

	@Override
	public int getCode() {
		return 0;
	}
}
