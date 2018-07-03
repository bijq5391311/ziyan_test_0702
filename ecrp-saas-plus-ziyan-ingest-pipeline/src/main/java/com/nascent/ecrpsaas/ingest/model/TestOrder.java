package com.nascent.ecrpsaas.ingest.model;

import com.nascent.plugins.sqlinxml.annotation.ArModel;

public class TestOrder extends ArModel<TestOrder>{
	private static final long serialVersionUID = 1L;
	
	public String getName(){
		return super.getStr("name");
	}
	public void setName(String val){
		super.set("name",val);
	}
	
	public String getEmail(){
		return super.getStr("email");
	}
	public void setEmail(String val){
		super.set("email",val);
	}
}
