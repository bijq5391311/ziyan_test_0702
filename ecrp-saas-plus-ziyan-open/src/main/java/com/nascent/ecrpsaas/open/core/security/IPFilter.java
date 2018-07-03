package com.nascent.ecrpsaas.open.core.security;

import javax.servlet.http.HttpServletRequest;

import com.nascent.ecrpsaas.open.core.API;
import com.nascent.plugins.taobao.WebUtils;

/***
 * ip拦截接口
 */
public interface IPFilter extends Validator{
	public boolean validate(String ip, HttpServletRequest request);
	
	@Override
	public default boolean validate(API apiInfo, HttpServletRequest request) {
		return validate(WebUtils.getIpAddress(request), request);
	};
}
