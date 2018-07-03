package com.nascent.ecrpsaas.open.core.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nascent.ecrpsaas.open.core.API;

public interface ValidatorAdapter {
	public boolean handle(API apiInfo, HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception;
}
