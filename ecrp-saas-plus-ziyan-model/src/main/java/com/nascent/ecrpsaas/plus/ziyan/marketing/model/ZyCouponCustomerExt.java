package com.nascent.ecrpsaas.plus.ziyan.marketing.model;

/**
 * File:     zyCouponCustomerExt .java
 * Author:  Crabo Yang
 * Company: Nascent
 * Created: 2017-12-16 13:37:41
 * table:   zy_coupon_customer_ext 
 * NOTE:   
 */

import java.util.Date;

import com.nascent.ecrpsaas.base.model.BaseModel;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.Param;
import com.nascent.plugins.sqlinxml.annotation.Select;
import com.nascent.plugins.sqlinxml.annotation.TableBind;
import com.nascent.utils.query.TableRequest;
import com.nascent.utils.query.TableResponse;

@Select()
@TableBind(name="zy_coupon_customer_ext", pk="id")
public class ZyCouponCustomerExt extends BaseModel<ZyCouponCustomerExt> {

	private static final long serialVersionUID = 1L;
	public static ZyCouponCustomerExt dao() {
	    return SpringContext.me()
		    .getModel(ZyCouponCustomerExt.class);
	}
	
	@Select()
	public TableResponse<Record> findList(TableRequest request) {
	    return null;
	}
	@Select()
	public ZyCouponCustomerExt findById(@Param("id") String id){
	    return null;
	}

	public void saveOrUpdate(ZyCouponCustomerExt obj) {

	    if (obj.getId() > 0) {//update partial
	  	  obj.update();
	    } else {//insert
	      obj.save();
	    }
	}
	
	/** 
	*   
	*  column:  id  
	*/
	public int getId(){
	    return get("id",-1);
	}
	public void setId(int id){
	    set("id",id);
	}

	/** 
	*   
	*  column:  state  
	*/
	public int getState(){
	    return get("state",-1);
	}
	public void setState(int state){
	    set("state",state);
	}

	/** 
	*   
	*  column:  update_time  
	*/
	public Date getUpdateTime(){
	    return get("update_time");
	}
	public void setUpdateTime(Date updateTime){
	    set("update_time",updateTime);
	}

	/** 
	*   
	*  column:  create_time  
	*/
	public Date getCreateTime(){
	    return get("create_time");
	}
	public void setCreateTime(Date createTime){
	    set("create_time", createTime);
	}

	/** 
	*  优惠券名ID
	*  column: state 
	*/
	public Long getCouponId(){
	    return get("coupon_id",-1);
	}
	public void setCouponId(Long couponId){
	    set("coupon_id",couponId);
	}

	/** 
	*   
	*  column:  coupon_code  
	*/
	public String getCouponCode(){
	    return get("coupon_code");
	}
	public void setCouponCode(String couponCode){
	    set("coupon_code", couponCode);
	}

	/** 
	*   
	*  column:  sys_customer_id  
	*/
	public long getSysCustomerId(){
	    return get("sys_customer_id");
	}
	public void setSysCustomerId(long sysCustomerId){
	    set("sys_customer_id", sysCustomerId);
	}

	/** 
	*   
	*  column:  valid_time_begin  
	*/
	public Date getValidTimeBegin(){
	    return get("valid_time_begin");
	}
	public void setValidTimeBegin(Date validTimeBegin){
	    set("valid_time_begin", validTimeBegin);
	}

	/** 
	*   
	*  column:  valid_time_end  
	*/
	public Date getValidTimeEnd(){
	    return get("valid_time_end");
	}
	public void setValidTimeEnd (Date validTimeEnd){
	    set("valid_time_end", validTimeEnd);
	}

	/** 
	*   
	*  column:  purpose_type  
	*/
	public int getPurposeType(){
	    return get("purpose_type",-1);
	}
	public void setPurposeType(int purposeType){
	    set("purpose_type", purposeType);
	}
	/** 
	*  编码导出标识
	*  column: state 
	*/
	public Long getExportIdentification(){
	    return get("export_identification",-1);
	}
	public void setExportIdentification(Long exportIdentification){
	    set("export_identification",exportIdentification);
	}
}