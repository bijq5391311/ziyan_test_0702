package com.nascent.ecrpsaas.open.core;

import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Retention(RUNTIME)
@Target({ TYPE, METHOD })
@RestController
@RequestMapping()
public @interface API {
	public Check check() default Check.SIGN; //检验的方式
	public SignType signType() default SignType.MD5;
	public ReturnType returnType() default ReturnType.COMMON_RESULT;
	
	/**
	 * 校验方式<br>
	 * NULL: 不检查请求<br>
	 * SIGN: 请求需要签名校验<br>
	 * IP: 请求需要IP校验<br>
	 * SIGN_IP: 请求需要IP和SIGN双重校验
	 */
	public enum Check {
		NULL(0b000), SIGN(0b110), IP(0b101), SIGN_IP(0b111);
		
		private Check(int v) {
			this.value = v;
		}

		int value;

		public int getValue() {
			return value;
		}
		
		public static boolean isEnable(Check value) {
			return (0b100 & value.getValue()) == 0b100;
		}
		
		public static boolean enableIPCheck(Check value) {
			return (0b101 & value.getValue()) == 0b101;
		}
		
		public static boolean enableSignCheck(Check value) {
			return (0b110 & value.getValue()) == 0b110;
		}
	}
	
	/***
	 * 签名方式<br>
	 * MD5: 通知底层用md5签名算法校验请求<br>
	 * NULL: 不使用签名校验<br>
	 * CUSTOM: 使用自定义校验规则(暂不支持)
	 */
	public enum SignType {
		MD5("md5"), Custom("custom"), NULL(null);
		
		String value;
		SignType(String type) {
			this.value = type;
		}
		
		public String getValue() {
			return value;
		}
	}
	
	/**
	 * api返回类型<br>
	 * {@code ReturnType.COMMONRESULT} 返回是用CommonResult包装的returnValue<br>
	 * {@code ReturnType.CUSTOM} 返回returnValue
	 */
	public enum ReturnType {
		COMMON_RESULT(0),CUSTOM(1);
		
		private int value;
		ReturnType(int v) {
			this.value = v;
		}
		
		public int getValue() {
			return value;
		}
	}
}
