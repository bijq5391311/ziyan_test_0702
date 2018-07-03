package com.nascent.ecrpsaas.plus.ziyan.organization.model;

import java.util.List;

import com.nascent.ecrpsaas.vip.model.KdCustomer;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.Param;
import com.nascent.plugins.sqlinxml.annotation.Select;
import com.nascent.utils.query.QueryInfo;
@Select
public class ZyKdCustomer extends KdCustomer {
	public static ZyKdCustomer dao() {
	    return SpringContext.me()
		    .getModel(ZyKdCustomer.class);
	}
  @Select()
  public KdCustomer loadCustBySysCustId(@Param("sys_customer_id") long sysCustomerId){
	return null;
  }
  /**
	 * 获取互动积分
	 * 
	 * @param customerId
	 * @return
	 */
	public List<Record> loadOutActivities(String customerId) {
		QueryInfo info = new QueryInfo("customer.database.loadOutActivities");
		info.addParam("sys_customer_id", customerId).addParam("sys_customer_id", customerId).addParam("sys_customer_id", customerId).addParam("sys_customer_id", customerId);
		List<Record>  listResult = info.find(); 
		for (Record record : listResult) {
			if(record.get("interact_times").toString().equals("0")){
				record.set("first_interact_time", "-");
				record.set("last_interact_time", "-");
				record.set("t_type", "微互动");
			}else{
				record.set("t_type", "微互动");
			}
		}
		return listResult;
	}

}
