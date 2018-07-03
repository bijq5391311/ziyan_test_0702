package com.nascent.ecrpsaas.open.core.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nascent.ecrpsaas.open.core.API;
import com.nascent.ecrpsaas.open.core.API.Check;
import com.nascent.ecrpsaas.open.core.API.SignType;
import com.nascent.ecrpsaas.open.ziyan.exception.CustomizeException;
import com.nascent.plugins.taobao.StringUtils;

/**
 * 检验适配器
 */
public class DefaultValidatorAdapter implements ValidatorAdapter {
	private IPFilter ipFilter; 
	//ip过滤器
	private Validator md5Validator;
	//md5签名检验器
	private Secret secretProxy; 
	//密钥代理对象
	
	public DefaultValidatorAdapter(IPFilter ipFilter, Secret secret) {
		this.secretProxy = secret;
		this.ipFilter = ipFilter;
		init();
	}
	
	private void init() {
		this.md5Validator = new MD5Validator(this.secretProxy);
	}
	
	
	@Override
	public boolean handle(API apiInfo, HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		Check checkType = apiInfo.check();
		
		if(Check.isEnable(checkType) == false) {
			return true;
		} else {
			//访问ip检验
			if(Check.enableIPCheck(checkType) 
					&& ipFilter.validate(apiInfo, request) == false) {
				if(ipFilter == null) {
					throw new CustomizeException("ip过滤器未定义");
				} else {
					throw new CustomizeException("IP地址被禁止访问！");
				}
			}
			
			//签名检验
			if(Check.enableSignCheck(checkType)) {
				if(!hasAppkeyParam(request)) {
					throw new CustomizeException("请求参数必须包含appKey");
				}
				
				if(getValidator(apiInfo.signType()).validate(apiInfo, request) == false) {
					throw new CustomizeException("请求参数校验错误！");
				}
			}
			return true;
		}
	}
	
	private static boolean hasAppkeyParam(HttpServletRequest request) {
		return StringUtils.isEmpty(request.getParameter("appKey")) == false;
	}
	
	/**
	 * 空检验器
	 * */
	private static class NoValidator implements Validator {
		@Override
		public boolean validate(API apiinfo, HttpServletRequest request) {
			return true;
		}
	}
	private final  Validator noValidator = new NoValidator();
	/**
	 * 获取检验器
	 * */
	private Validator getValidator(SignType type) {
		switch (type) {
			case NULL:
				return noValidator;
			case MD5: 
				return md5Validator;
			case Custom: 
				//TODO 注入自定义校验器
				return null;
		}
		return null;
	}
}
