package com.nascent.ecrpsaas.plus.ziyan.open.model;


import java.util.Date;
import java.util.List;

import com.nascent.ecrpsaas.base.model.BaseModel;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.plugins.sqlinxml.annotation.Param;
import com.nascent.plugins.sqlinxml.annotation.Select;
import com.nascent.plugins.sqlinxml.annotation.TableBind;
import com.nascent.utils.query.QueryInfo;
import com.nascent.utils.query.TableRequest;
import com.nascent.utils.query.TableResponse;

@Select()
@TableBind(name="zy_mqmessage", pk="id")
public class ZyMqmessage extends BaseModel<ZyMqmessage> {

	private static final long serialVersionUID = 1L;
	private static ZyMqmessage zyMqmessage = new ZyMqmessage();
	public static ZyMqmessage dao() {
      return zyMqmessage;
  }
	/**
	 * 保存mqmessage信息
	 */
	public boolean saveMessage(ZyMqmessage mqmessage){
		 QueryInfo queryInfo = new QueryInfo("activeMq.saveMessage");
		 queryInfo.addParam("orderId", mqmessage.getOrderId());
		 queryInfo.addParam("message", mqmessage.getMessage());
		 queryInfo.addParam("message_tye", mqmessage.getMessageTye());
		 queryInfo.addParam("create_time",new Date());
		 queryInfo.addParam("update_time",new Date());
		 queryInfo.addParam("state",1);
		 queryInfo.execute();
		return true;
	}
	
	/**
	 * 查询message信息
	 * @param request
	 * @return
	 */
	public List<ZyMqmessage> findMessage(String messageType,int size){
		 QueryInfo queryInfo = new QueryInfo("activeMq.getTakeAwayOrder");
		 queryInfo.addParam("messageType", messageType);
		 queryInfo.addParam("size", size);
	        return queryInfo.findT(ZyMqmessage.class);
	}
	/**
	 * 更新message
	 * @param request
	 * @return
	 */
	
	public Boolean updateMessage(String orderId){
		QueryInfo queryInfo = new QueryInfo("activeMq.updateMessage");
		try {
			queryInfo.addParam("orderId", orderId).execute();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	/**
	 * 删除message
	 * @param request
	 * @return
	 */
	public boolean deteleMessage(String createTime){
		QueryInfo queryInfo = new QueryInfo("activeMq.deleteMessage");
		try {
			queryInfo.addParam("createTime", createTime).execute();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	
		
	}
  
  @Select()
  public TableResponse<Record> findList(TableRequest request) {
      return null;
  }
  @Select()
  public ZyMqmessage findById(@Param("id") String id){
      return null;
  }

  public void saveOrUpdate(ZyMqmessage obj) {

      if (obj.getId() > 0) {//update partial
        obj.update();
      } else {//insert
        obj.save();
      }
  }
  
  /** 
  *   
  *  column: id 
  */
  public int getId(){
      return get("id",-1);
  }
  public void setId(int id ){
      set("id",id);
  }
  public String getOrderId(){
      return get("orderId");
  }
  public void setOrderId(String orderId ){
      set("orderId",orderId);
  }
  /** 
  *   
  *  column: message 
  */
  public String getMessage(){
      return get("message");
  }
  public void setMessage(String message ){
      set("message",message);
  }

  /** 
  *   
  *  column: message_tye 
  */
  public String getMessageTye(){
      return get("message_tye");
  }
  public void setMessageTye(String messageTye ){
      set("message_tye",messageTye);
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
  *  column: state 
  */
  public int getState(){
      return get("state",-1);
  }
  public void setState(int state ){
      set("state",state);
  }


}