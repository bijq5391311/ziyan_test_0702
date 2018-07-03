package com.nascent.ecrpsaas.open.ziyan.model;

/**
 * File:    SysCoupon.java
 * Author:  Crabo Yang
 * Company: Nascent
 * Created: 2017-12-08 09:00:24
 * table:  sys_coupon
 * NOTE:   优惠券
 */

import java.util.Date;
import java.util.List;

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
 * @author mozhimin
 * @date 2017年12月8日
 * @功能  
 */
@Select()
@TableBind(name="sys_coupon", pk="id")
public class ZySysCouponToZY extends BaseModel<ZySysCouponToZY> {
	private static final long serialVersionUID = 1L;
	
	public static ZySysCouponToZY dao() {
	    return SpringContext.me()
		    .getModel(ZySysCouponToZY.class);
	}
	
	@Select(id = "marketing.sysCoupon.queryList")
	public TableResponse<Record> findList(TableRequest request) {
	    return null;
	}
	@Select()
	public ZySysCouponToZY findById(@Param("id") String id){
	    return null;
	}

	public void saveOrUpdate(ZySysCouponToZY obj) {
		//update partial
	    if (obj.getId() > 0) {
	  	  obj.update();
	  	//insert
	    } else {
	      obj.save();
	    }
	}
	/**通过coupon_id获取优惠券信息
	 * Title:SysCoupon.java
	 * name:zhimin.mo
	 * return:List<HxTrade>
	 * describe:
	 * time:2017年12月18日
	 */
	public ZySysCouponToZY queryCouponByCouponId(Long couponId) {
        QueryInfo queryInfo = new QueryInfo("sysCoupon.queryCouponAllByCouponId");
        return queryInfo.addParam("couponId", couponId).findOne(ZySysCouponToZY.class);
    }
	
	/**核销数量+1
	 * Title:SysCoupon.java
	 * name:zhimin.mo
	 * return:List<HxTrade>
	 * describe:
	 * time:2017年12月18日
	 */
	public void updateCouponVerification(Long couponId) {
        QueryInfo queryInfo = new QueryInfo("sysCoupon.updateCouponVerification");
        queryInfo.addParam("couponId", couponId).execute();
    }
	/**已发放数量+count
	 * Title:SysCoupon.java
	 * name:zhimin.mo
	 * return:List<HxTrade>
	 * describe:
	 * time:2017年12月18日
	 */
	public int addCouponSentAmount(int count, Long couponId) {
        QueryInfo queryInfo = new QueryInfo("sysCoupon.addCouponSentAmount");
        return queryInfo.addParam("sentAmount", count).addParam("couponId", couponId).execute();
    }
	/** 
	*  ID 
	*  column: id 
	*/
	public int getId(){
	    return get("id",-1);
	}
	public void setId(int id ){
	    set("id",id);
	}

	/** 
	*  0:有效，1：已失效，2：已核销
	*  column: state 
	*/
	public int getState(){
	    return get("state",-1);
	}
	public void setState(int state ){
	    set("state",state);
	}

	/** 
	*  更新时间 
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
	*  优惠券名称 
	*  column: coupon_name 
	*/
	public String getCouponName(){
	    return get("coupon_name");
	}
	public void setCouponName(String couponName ){
	    set("coupon_name",couponName);
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
	*  优惠券使用场景线下（可导出） 0 线上1 
	*  column: type 
	*/
	public int getType(){
	    return get("type",-1);
	}
	public void setType(int type ){
	    set("type",type);
	}
	/** 
	*  优惠券类型 
	*  column: coupon_type 
	*/
	public int getCouponType(){
	    return get("coupon_type",-1);
	}
	public void setCouponType(int couponType ){
	    set("coupon_type",couponType);
	}


	/** 
	*  权益 
	*  column: mortgage_goods_ids 
	*/
	public String getRightsAndInterests(){
	    return get("rights_and_interests");
	}
	public void setRightsAndInterests(String rightsAndInterests ){
	    set("rights_and_interests",rightsAndInterests);
	}

	/** 
	*  绝对时间 0，相对时间 1 
	*  column: valid_time_type 
	*/
	public int getValidTimeType(){
	    return get("valid_time_type",-1);
	}
	public void setValidTimeType(int validTimeType ){
	    set("valid_time_type",validTimeType);
	}
	/** 
	*  有效时间开始 
	*  column: valid_time_begin 
	*/
	public Date getValidTimeBegin(){
	    return get("valid_time_begin");
	}
	public void setValidTimeBegin(Date validTimeBegin ){
	    set("valid_time_begin",validTimeBegin);
	}

	/** 
	*  有效时间结束 
	*  column: valid_time_end 
	*/
	public Date getValidTimeEnd(){
	    return get("valid_time_end");
	}
	public void setValidTimeEnd(Date validTimeEnd ){
	    set("valid_time_end",validTimeEnd);
	}
	/** 
	*  绝对时间 0，相对时间 1 
	*  column: number_days 
	*/
	public int getNumberDays(){
	    return get("number_days",-1);
	}
	public void setNumberDays(int numberDays ){
	    set("number_days",numberDays);
	}
	/** 
	*  可使用店铺集合（空默认全部） 
	*  column: shop_ids 
	*/
	public String getShopIds(){
	    return get("shop_ids");
	}
	public void setShopIds(String shopIds ){
	    set("shop_ids",shopIds);
	}

	/** 
	*  张数 
	*  column: coupon_amouet 
	*/
	public int getCouponAmouet(){
	    return get("coupon_amouet",-1);
	}
	public void setCouponAmouet(int couponAmouet ){
	    set("coupon_amouet",couponAmouet);
	}

	/** 
	*  已发放张数 
	*  column: sent_amount 
	*/
	public int getSentAmount(){
	    return get("sent_amount",-1);
	}
	public void setSentAmount(int sentAmount ){
	    set("sent_amount",sentAmount);
	}

	/** 
	*  已核销 
	*  column: cancel_after_verification 
	*/
	public int getCancelAfterVerification(){
	    return get("cancel_after_verification",-1);
	}
	public void setCancelAfterVerification(int cancelAfterVerification ){
	    set("cancel_after_verification",cancelAfterVerification);
	}

	/** 
	*  使用条件 1满金额  2加金额  3买指定商品  4  无门槛 
	*  column: conditions_of_use 
	*/
	public int getConditionsOfUse(){
	    return get("conditions_of_use",-1);
	}
	public void setConditionsOfUse(int conditionsOfUse ){
	    set("conditions_of_use",conditionsOfUse);
	}

	/** 
	*  满金额/加金额 
	*  column: full_or_plus_money 
	*/
	public int getFullOrPlusMoney(){
	    return get("full_or_plus_money",-1);
	}
	public void setFullOrPlusMoney(int fullOrPlusMoney ){
	    set("full_or_plus_money",fullOrPlusMoney);
	}

	/** 
	*  指定商品集合（用逗号间隔） 
	*  column: appoint_goods_ids 
	*/
	public String getAppointGoodsIds(){
	    return get("appoint_goods_ids");
	}
	public void setAppointGoodsIds(String appointGoodsIds ){
	    set("appoint_goods_ids",appointGoodsIds);
	}

	/** 
	*  创建人 
	*  column: user 
	*/
	public String getUser(){
	    return get("user");
	}
	public void setUser(String user ){
	    set("user",user);
	}
	/** 
	*  经销商承担系数
	*  column: coefficient 
	*/
	public String getCoefficient(){
	    return get("coefficient");
	}
	public void setCoefficient(String title ){
	    set("coefficient",title);
	}

	/** 
	*  客服使用备注 
	*  column: title 
	*/
	public String getTitle(){
	    return get("title");
	}
	public void setTitle(String title ){
	    set("title",title);
	}
	/** 
	*  使用说明 
	*  column: title 
	*/
	public String getDescription(){
	    return get("description");
	}
	public void setDescription(String description ){
	    set("description",description);
	}


}