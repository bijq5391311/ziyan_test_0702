package com.nascent.ecrpsaas.plus.ziyan.organization.model;

import com.nascent.ecrpsaas.database.model.KdGoods;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.Param;
import com.nascent.plugins.sqlinxml.annotation.Select;
@Select()
public class ZyKdGoods extends KdGoods {
	
	private static final long serialVersionUID = 1L;
	public static ZyKdGoods dao() {
	    return SpringContext.me()
		    .getModel(ZyKdGoods.class);
	}
	@Select()
	public KdGoods loadKdGoods(@Param("id") int id,@Param("title") String title){
		return null;
	}

}
