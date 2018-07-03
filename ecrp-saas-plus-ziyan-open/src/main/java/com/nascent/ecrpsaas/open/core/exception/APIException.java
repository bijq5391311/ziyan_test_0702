package com.nascent.ecrpsaas.open.core.exception;

/**
 * api 异常接口
 * */
public interface APIException {
	public String getMessage();
	
	public int getCode();
}
