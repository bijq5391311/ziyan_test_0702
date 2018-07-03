package com.nascent.ecrpsaas.plus.ziyan.organization.model;

import org.springframework.transaction.annotation.Transactional;

import com.nascent.ecrpsaas.base.constat.SystemConstat;
import com.nascent.ecrpsaas.base.exception.ParameterException;
import com.nascent.ecrpsaas.base.exception.constant.ParameterExceptionErrorCode;
import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.organization.model.SysPosition;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.Param;
import com.nascent.plugins.sqlinxml.annotation.Select;
@Select
public class ZySysPosition extends SysPosition {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public static ZySysPosition dao() {
	    return SpringContext.me()
		    .getModel(ZySysPosition.class);
	}
	
	/**
	 * 根据用户系统编号查询会员
	 * @param sysCustomerId
	 * @return
	 */
	@Select(limit=" limit 1 ")
	public ZySysPosition loadSysPosition(@Param("code") String code){
		return null;
	}
	
	/**
     * 平台
     * column : platfrom_value
     */
    public String getPlatfromValue() {
        return get("platfrom_value", 0);
    }
    public void setPlatfromValue(String platfromValue) {
        set("platfrom_value", platfromValue);
    }
}
