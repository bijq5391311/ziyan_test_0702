/**
 * File:    OutShop.java
 * Author:  Crabo Yang
 * Company: Nascent
 * Created: 2017-07-25 18:12:44
 * table:  out_shop
 * NOTE:   外部店铺
 */
package com.nascent.ecrpsaas.open.ziyan.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.cache.CacheManager;

import com.nascent.ecrpsaas.base.constat.SystemConstat;
import com.nascent.ecrpsaas.base.model.BaseModel;
import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.Param;
import com.nascent.plugins.sqlinxml.annotation.Select;
import com.nascent.plugins.sqlinxml.annotation.TableBind;
import com.nascent.utils.query.QueryInfo;
import com.nascent.utils.query.TableRequest;
import com.nascent.utils.query.TableResponse;

@Select()
@TableBind(name="out_shop", pk="id")
public class OutShopToZY extends BaseModel<OutShopToZY> {
	private static final long serialVersionUID = 1L;
	
	public static OutShopToZY dao() {
	    return SpringContext.me()
		    .getModel(OutShopToZY.class);
	}
	
	public Long verifyOutShop(String sysShopIds, String outShopId) {
        if(UtilString.isEmpty(outShopId)){
        	return 0L;
        }
		QueryInfo queryInfo = new QueryInfo("api.zyOutShop.countOutShop");
		Record count = queryInfo.addParam("shopIds", sysShopIds)
        		.addParam("outerShop", outShopId)
        		.findOne();
		if(null == count){
			return 0L;
		}
		return count.getLong("count");
    }
	
	/** 
	*   
	*  column: id 
	*/
	public int getid(){
	    return get("id",-1);
	}
	public void setid(int id ){
	    set("id",id);
	}

	/** 
	*   
	*  column: state 
	*/
	public int getstate(){
	    return get("state",-1);
	}
	public void setstate(int state ){
	    set("state",state);
	}

	/** 
	*   
	*  column: create_time 
	*/
	public Date getCreateTime(){
	    return get("create_time");
	}
	public void setCreateTime(Date createTime ){
	    set("create_time",createTime);
	}

	/** 
	*   
	*  column: update_time 
	*/
	public Date getUpdateTime(){
	    return get("update_time");
	}
	public void setUpdateTime(Date updateTime ){
	    set("update_time",updateTime);
	}

	/** 
	*  外部店铺名称 
	*  column: out_name 
	*/
	public String getOutName(){
	    return get("out_name");
	}
	public void setOutName(String outName ){
	    set("out_name",outName);
	}

	/** 
	*  外部店铺编码 
	*  column: out_code 
	*/
	public String getOutCode(){
	    return get("out_code");
	}
	public void setOutCode(String outCode ){
	    set("out_code",outCode);
	}

	/** 
	*  省 
	*  column: province 
	*/
	public String getprovince(){
	    return get("province");
	}
	public void setprovince(String province ){
	    set("province",province);
	}

	/** 
	*  城市 
	*  column: city 
	*/
	public String getcity(){
	    return get("city");
	}
	public void setcity(String city ){
	    set("city",city);
	}

	/** 
	*  地区 
	*  column: district 
	*/
	public String getdistrict(){
	    return get("district");
	}
	public void setdistrict(String district ){
	    set("district",district);
	}

	/** 
	*  集团ID 
	*  column: group_id 
	*/
	public int getGroupId(){
	    return get("group_id",-1);
	}
	public void setGroupId(int groupId ){
	    set("group_id",groupId);
	}

	/** 
	*  店铺编码 
	*  column: shop_code 
	*/
	public String getShopCode(){
	    return get("shop_code");
	}
	public void setShopCode(String shopCode ){
	    set("shop_code",shopCode);
	}

	public int getIsRelated(){
	    return get("is_related",0);
	}
	public void setIsRelated(int related ){
	    set("is_related",related);
	}

}