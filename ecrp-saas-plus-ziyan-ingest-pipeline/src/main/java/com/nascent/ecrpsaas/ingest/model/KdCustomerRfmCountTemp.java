package com.nascent.ecrpsaas.ingest.model;

import com.nascent.plugins.sqlinxml.annotation.ArModel;
import com.nascent.plugins.sqlinxml.annotation.Select;
import com.nascent.plugins.sqlinxml.annotation.TableBind;

public class KdCustomerRfmCountTemp extends ArModel<KdCustomerRfmCountTemp>{

	private static final long serialVersionUID = 1L;
	
	public KdCustomerRfmCountTemp() {
		// TODO Auto-generated constructor stub
	}
	
	public KdCustomerRfmCountTemp(String field, String sql) {
		super.set("field", field);
		super.set("select_sql", sql);
	}
	
}
