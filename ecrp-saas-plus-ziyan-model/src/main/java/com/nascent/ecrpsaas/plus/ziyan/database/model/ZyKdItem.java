package com.nascent.ecrpsaas.plus.ziyan.database.model;

import com.nascent.ecrpsaas.database.model.KdItem;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.Param;
import com.nascent.plugins.sqlinxml.annotation.Select;
@Select()
public class ZyKdItem  extends KdItem{
	
	public static ZyKdItem dao() {
	    return SpringContext.me()
		    .getModel(ZyKdItem.class);
	}
	
	@Select()
	public KdItem loadKdItem(@Param("id") int id,@Param("title") String title){
		return null;
	}

}
