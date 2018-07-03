package com.nascent.ecrpsaas.open.core.security;

import javax.servlet.http.HttpServletRequest;

public interface AccessIP {
	public String getWhiteList(HttpServletRequest request);
	
	public String getBlackList(HttpServletRequest request);
}
