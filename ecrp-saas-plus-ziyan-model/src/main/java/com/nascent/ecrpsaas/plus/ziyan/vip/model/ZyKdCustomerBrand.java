package com.nascent.ecrpsaas.plus.ziyan.vip.model;

import com.nascent.ecrpsaas.vip.model.KdCustomerBrand;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.Select;
@Select
public class ZyKdCustomerBrand  extends  KdCustomerBrand {

	private static final long serialVersionUID = 1L;
	
	public static ZyKdCustomerBrand dao() {
		return SpringContext.me().getModel(ZyKdCustomerBrand.class);
	}
	
	public int getConsumeTotal() {
		return get("consume_total", 0);
	}

	public void setConsumeTotal(int consumeTotal) {
		set("consume_total", consumeTotal);
	}
	
	

}
