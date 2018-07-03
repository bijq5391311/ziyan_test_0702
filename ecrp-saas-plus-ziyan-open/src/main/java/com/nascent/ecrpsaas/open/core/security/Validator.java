package com.nascent.ecrpsaas.open.core.security;

import javax.servlet.http.HttpServletRequest;

import com.nascent.ecrpsaas.open.core.API;

public interface Validator {
	public boolean validate(API apiInfo, HttpServletRequest request);
}
