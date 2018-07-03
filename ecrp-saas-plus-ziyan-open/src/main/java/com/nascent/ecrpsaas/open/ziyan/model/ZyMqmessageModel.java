package com.nascent.ecrpsaas.open.ziyan.model;


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
public class ZyMqmessageModel extends BaseModel<ZyMqmessageModel> {

	private static final long serialVersionUID = 1L;
	private static ZyMqmessageModel zyMqmessageModel = new ZyMqmessageModel();
	public static ZyMqmessageModel dao() {
      return zyMqmessageModel;
  }
	/**s
	 * 查询message信息
	 * @param request
	 * @return
	 */
	public List<ZyMqmessageModel> findMessage(String messageType,int size,String startTime,String endTime){
		 QueryInfo queryInfo = new QueryInfo("activeMq.getTakeAwayOrder");
		 queryInfo.addParam("messageType", messageType);
		 queryInfo.addParam("size", size);
		 queryInfo.addParam("startTime", startTime);
		 queryInfo.addParam("endTime", endTime);
	        return queryInfo.findT(ZyMqmessageModel.class);
	}
	
	/**s
	 * 订单信息重新推送
	 * @param request
	 * @return
	 */
	public List<ZyMqmessageModel> findMessageTwice(int size,String startTime,String endTime){
		 QueryInfo queryInfo = new QueryInfo("activeMq.getOrderTwice");
		// queryInfo.addParam("messageType", messageType);
		 queryInfo.addParam("size", size);
		 queryInfo.addParam("startTime", startTime);
		 queryInfo.addParam("endTime", endTime);
	        return queryInfo.findT(ZyMqmessageModel.class);
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
  
  @Select()
  public TableResponse<Record> findList(TableRequest request) {
      return null;
  }
  @Select()
  public ZyMqmessageModel findById(@Param("id") String id){
      return null;
  }

  public void saveOrUpdate(ZyMqmessageModel obj) {

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