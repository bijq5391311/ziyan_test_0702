package com.nascent.ecrpsaas.plus.ziyan.organization.model;

import com.nascent.ecrpsaas.base.constat.SystemConstat;
import com.nascent.ecrpsaas.organization.model.SysBrand;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.Select;

/**
 * @author ZRP
 */
@Select()
public class ZySysBrand extends SysBrand{
	
	private static final long serialVersionUID = 1L;
	public static ZySysBrand dao() {
	    return SpringContext.me()
		    .getModel(ZySysBrand.class);
	}
	
	

	/**
	 * 保存或更新一个品牌.
	 * @param brand
	 */
	public String saveOrUpdate(ZySysBrand brand){
		int id = brand.getid();
		if(id > -1) {
			brand.update();
			return SystemConstat.OperationMsg.UPDATE.getName() ;
		}
		else{
			brand.save();
			return SystemConstat.OperationMsg.SAVE.getName() ;
		}
			
	}

	@Select(sql = "select count(*)")
    public long countBrand() {
		return 0;
    }

	/**
	 *
	 * @return
	 */
	@Select(limit = " limit 1 ")
    public ZySysBrand loadSingleBrand() {
		return null;
	}
}
