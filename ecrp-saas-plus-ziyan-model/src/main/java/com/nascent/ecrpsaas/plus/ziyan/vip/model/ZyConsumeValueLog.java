package com.nascent.ecrpsaas.plus.ziyan.vip.model;

import java.util.Date;

import com.nascent.ecrpsaas.base.model.BaseModel;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.Param;
import com.nascent.plugins.sqlinxml.annotation.Select;
import com.nascent.plugins.sqlinxml.annotation.TableBind;
import com.nascent.utils.query.QueryInfo;
import com.nascent.utils.query.TableRequest;
import com.nascent.utils.query.TableResponse;

/**
 * 
 * @ClassName: ZyconsumeValueLog 
 * @Description: TODO(消费值日志) 
 * @author jingyu.gao
 * @date 2017年10月9日 下午2:02:24 
 *
 */
@SuppressWarnings("serial")
@Select()
@TableBind(name="zy_consume_value_log", pk="id")
public class ZyConsumeValueLog extends BaseModel<ZyConsumeValueLog> {

	public static ZyConsumeValueLog dao() {
	    return SpringContext.me() 
		    .getModel(ZyConsumeValueLog.class);
	}

	/**
	 * 查找消费值日志
	 * @param request
	 * @return
	 */
	@Select(id="vip.zyConsumeValueLog.queryConsumeValueLog")
	public TableResponse<Record> queryconsumeValueLogList(TableRequest request) {
		return null;
	}

	@Select()
	public ZyConsumeValueLog findById(@Param("id") String id){
	    return null;
	}
	
	@Select()
	public ZyConsumeValueLog findById(@Param("sys_customer_id") long sys_customer_id,@Param("action_source") String action_source){
	    return null;
	}

	/**
	 * 获取最大消费值日志Id
	 * @return
	 */
	@Select(limit=" order by id desc limit 1")
	public ZyConsumeValueLog loadMaxId() {
		return null;
	}

	/**
	 * 批量更新消费值日志服务处理进度
	 * @param maxId 处理的最大日志id
	 */
	public void batchUpdateconsumeValueLogJobStatus(long maxId) {
		QueryInfo queryInfo = new QueryInfo("vip.hxconsumeValue.batchUpdateconsumeValueLogJobStatus");
		queryInfo.addParam("maxId", maxId);
		queryInfo.execute();
	}

	public void saveOrUpdate(ZyConsumeValueLog obj) {
	    if (obj.getId() > 0) {
	  	  obj.update();
	    } else {
	      obj.save();
	    }
	}

	/**
	*  主键id 
	*  column: id 
	*/
	public int getId(){
	    return get("id",-1);
	}
	public void setId(int id ){
	    set("id",id);
	}

	/** 
	*  1 正常 0 删除 
	*  column: state 
	*/
	public int getState(){
	    return get("state",-1);
	}
	public void setState(int state ){
	    set("state",state);
	}

	/** 
	*  创建时间 
	*  column: create_time 
	*/
	public Date getCreateTime(){
	    return get("create_time");
	}
	public void setCreateTime(Date createTime ){
	    set("create_time",createTime);
	}

	/** 
	*  修改时间 
	*  column: update_time 
	*/
	public Date getUpdateTime(){
	    return get("update_time");
	}
	public void setUpdateTime(Date updateTime ){
	    set("update_time",updateTime);
	}

	/** 
	*  系统内客户ID,由ECRM系统生成 
	*  column: sys_customer_id 
	*/
	public long getSysCustomerId(){
	    return get("sys_customer_id");
	}
	public void setSysCustomerId(long sysCustomerId ){
	    set("sys_customer_id",sysCustomerId);
	}

	/** 
	*  消费值动作 
	*  column: action 
	*/
	public int getAction(){
	    return get("action",-1);
	}
	public void setAction(int action ){
	    set("action",action);
	}

	/** 
	*  动作来源 (交易id) 
	*  column: action_source 
	*/
	public String getActionSource(){
	    return get("action_source");
	}
	public void setActionSource(String actionSource ){
	    set("action_source",actionSource);
	}
	
	/** 
	*  消费值来源类型  
	*  column: consume_value_from_type 
	*/
	public int getConsumeValueFromType(){
	    return get("consume_value_from_type",-1);
	}
	public void setConsumeValueFromType(int actionSource ){
	    set("consume_value_from_type",actionSource);
	}
	
	/** 
	*  消费值来源名称
	*  column: consume_value_from_name 
	*/
	public String getConsumeValueFromName(){
	    return get("consume_value_from_name");
	}
	public void setConsumeValueFromName(String actionSource ){
	    set("consume_value_from_name",actionSource);
	}
	
	/** 
	*  互动类型
	*  column: hd_type 
	*/
	public String getHdType(){
	    return get("hd_type");
	}
	public void setHdType(String hdType){
	    set("hd_type",hdType);
	}

	/** 
	*  消费值 
	*  column: consume_value 
	*/
	public int getConsumeValue(){
	    return get("consume_value");
	}
	public void setConsumeValue(int consumeValue ){
	    set("consume_value",consumeValue);
	}
	/** 
	*  消费值 
	*  column: consume_value 
	*/
	public int getOldConsumeValue(){
	    return get("old_consume_value");
	}
	public void setOldConsumeValue(int oldConsumeValue ){
	    set("old_consume_value",oldConsumeValue);
	}
	

	/**
	 *  备注
	 *  column: remark
	 */
	public String getRemark(){
		return get("remark");
	}
	public void setRemark(String remark ){
		set("remark",remark);
	}

	/**
	 *  日志原始生成时间
	 *  column: generate_time
	 */
	public Date getGenerateTime(){
		return get("generate_time");
	}
	public void setGenerateTime(Date createTime ){
		set("generate_time",createTime);
	}

	/**
	 *  日志消费值用于衰减是否扣完
	 *  column: exhausted
	 */
	public Integer getExhausted() {
		return get("exhausted");
	}
	public void setExhausted(Integer exhausted) {
		set("exhausted",exhausted);
	}

	/**
	 * 等级服务处理状态
	 * column: grade_job_status
	 */
	public void setGradeJobStatus(int status){
		set("grade_job_status", status);
	}
	public int getGradeJobStatus() {
		return get("grade_job_status");
	}
}