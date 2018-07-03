package com.nascent.ecrpsaas.plus.ziyan.vip.model;

import com.nascent.ecrpsaas.vip.model.GradeRule;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.Select;


@SuppressWarnings("serial")
@Select()
public class ZyGradeRule extends GradeRule {
	
	public static ZyGradeRule dao() {
		return SpringContext.me().getModel(ZyGradeRule.class);
	}
	
	@Select(limit="limit 1")
	public ZyGradeRule loadZyGradeRule(){
		return null ;
	}

	



}
