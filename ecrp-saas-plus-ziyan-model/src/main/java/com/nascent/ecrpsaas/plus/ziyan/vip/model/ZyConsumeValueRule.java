/**
 * File:    HxGrouthValueRule.java
 * Author:  Crabo Yang
 * Company: Nascent
 * Created: 2017-10-10 14:30:03
 * table:  hx_grouth_value_rule
 * NOTE:   成长值规则
 */
package com.nascent.ecrpsaas.plus.ziyan.vip.model;

import java.math.BigDecimal;
import java.util.Date;

import com.nascent.ecrpsaas.base.model.BaseModel;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.Param;
import com.nascent.plugins.sqlinxml.annotation.Select;
import com.nascent.plugins.sqlinxml.annotation.TableBind;
import com.nascent.utils.query.TableRequest;
import com.nascent.utils.query.TableResponse;

@SuppressWarnings("serial")
@Select()
@TableBind(name="zy_consume_value_rule", pk="id")
public class ZyConsumeValueRule extends BaseModel<ZyConsumeValueRule> {
	public static ZyConsumeValueRule dao() {
	    return SpringContext.me()
		    .getModel(ZyConsumeValueRule.class);
	}
	
	/**
	 * 
	 * @Description: TODO(获取消费值规则) 
	 */
	@Select(limit="limit 1")
	public ZyConsumeValueRule loadConsumeValueRule(){
		return null ;
	}
	
	@Select()
	public TableResponse<Record> findList(TableRequest request) {
	    return null;
	}
	@Select()
	public ZyConsumeValueRule findById(@Param("id") String id){
	    return null;
	}

	/**
	 * 
	 * @Description: TODO 
	 * @param zyGrouthValueRule
	 */
	public void saveOrUpdate(ZyConsumeValueRule obj) {
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
	*  是否启用 0否 1启用 
	*  column: is_open 
	*/
	public int getIsOpen(){
	    return get("is_open",-1);
	}
	public void setIsOpen(int isOpen ){
	    set("is_open",isOpen);
	}

	/**
	 *  是否排除权益黑名单 0否 1是
	 *  column: f_right_black
	 */
	public int getFRightBlack() {
		return get("f_right_black", -1);
	}
	public void setFRightBlack(int fRightBlack) {
		set("f_right_black", fRightBlack);
	}

	/** 
	*  交易金额,多少元兑换1成长值，默认1元 
	*  column: consume_value_price 
	*/
	public BigDecimal getConsumeValuePrice(){
	    return get("consume_value_price");
	}
	public void setConsumeValuePrice(BigDecimal consumeValuePrice ){
	    set("consume_value_price",consumeValuePrice);
	}

	/** 
	*  单笔交易成长值上限 
	*  column: grouth_value_limit 
	*/
	public BigDecimal getConsumeValueLimit(){
	    return get("consume_value_limit");
	}
	public void setConsumeLimit(BigDecimal consumeValueLimit ){
	    set("consume_value_limit",consumeValueLimit);
	}

	/** 
	*  取整规则,0想上取整,1向下取整,2四舍5入,3保留两位小数默认为0 
	*  column: grouth_value_round 
	*/
	public int getConsumeValueRound(){
	    return get("consume_value_round",-1);
	}
	public void setConsumeValueRound(int consumeValueRound ){
	    set("consume_value_round",consumeValueRound);
	}

	/** 
	*  衰减时间 
	*  column: decay_time 
	*/
	public int getDecayTime(){
	    return get("decay_time");
	}
	public void setDecayTime(int decayTime ){
	    set("decay_time",decayTime);
	}

	/** 
	*  衰减值 
	*  column: decay_value 
	*/
	public int getDecayValue(){
	    return get("decay_value");
	}
	public void setDecayValue(int decayValue ){
	    set("decay_value",decayValue);
	}

	/** 
	*  排除聚划算,0不排除，1排除；默认为0 
	*  column: is_jhs 
	*/
	public int getIsJhs(){
	    return get("is_jhs",-1);
	}
	public void setIsJhs(int isJhs ){
	    set("is_jhs",isJhs);
	}


	/** 
	*  排除店铺,多个'，'隔开
	*  column: f_shop_ids 
	*/
	public String getFShopIds(){
	    return get("f_shop_ids");
	}
	public void setFShopIds(String fShopIds ){
	    set("f_shop_ids",fShopIds);
	}

	/**
	 *  排除店铺
	 *  column: shop_ids_codes
	 */
	public String getShopIdsCodes(){
		return get("shop_ids_codes");
	}
	public void setShopIdsCodes(String shopIdsCodes){
		set("shop_ids_codes",shopIdsCodes);
	}

	/** 
	*  排除商品:多个'，'隔开 
	*  column: f_sys_item_ids 
	*/
	public String getFSysItemIds(){
	    return get("f_sys_item_ids");
	}
	public void setFSysItemIds(String fSysItemIds ){
	    set("f_sys_item_ids",fSysItemIds);
	}

	/** 
	*  商品指定成长值 json串 
	*  column: item_grouth_value 
	*/
	public String getItemConsumeValue(){
	    return get("item_consume_value");
	}
	public void setItemConsumeValue(String itemConsumeValue ){
	    set("item_consume_value",itemConsumeValue);
	}


}