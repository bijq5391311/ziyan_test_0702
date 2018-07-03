package com.nascent.ecrpsaas.open.core;

public class RestResult {
	public RestResult(){
		success=true;
	}
	public RestResult(Object data){
		success=true;
		this.result = data;
	}
	private boolean success; 
	// true: 成功, false: 失败
	private int code = 0;
//错误编码  0： 成功, 其他:失败
	private String msg = null; 
	//错误信息描述
	private Object result; 
	//返回的数据，数据可以是任何类型
	
	public int getCode() {
		return code;
	}
	public RestResult setCode(int errorcode) {
		this.code = errorcode;
		return this;
	}
	public RestResult setFailed() {
		this.success = false;
		return this;
	}
	public boolean isSuccess() {
		return success;
	}
	public String getMsg() {
		return msg;
	}
	public RestResult setMsg(String umsg) {
		this.msg = umsg;
		return this;
	}
	public Object getResult() {
		return result;
	}
	public RestResult setResult(Object data) {
		this.result = data;
		return this;
	}
}
