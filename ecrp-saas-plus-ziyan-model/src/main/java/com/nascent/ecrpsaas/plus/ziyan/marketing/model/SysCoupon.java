package com.nascent.ecrpsaas.plus.ziyan.marketing.model;

/**
 * File:    SysCoupon.java
 * Author:  Crabo Yang
 * Company: Nascent
 * Created: 2017-12-08 09:00:24
 * table:  sys_coupon
 * NOTE:   优惠券
 */

import com.nascent.ecrpsaas.base.model.BaseModel;
import com.nascent.ecrpsaas.plus.ziyan.marketing.vo.CouponAnalyzeVo;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.Param;
import com.nascent.plugins.sqlinxml.annotation.Select;
import com.nascent.plugins.sqlinxml.annotation.TableBind;
import com.nascent.utils.query.QueryInfo;
import com.nascent.utils.query.TableRequest;
import com.nascent.utils.query.TableResponse;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


/**
 * @author mozhimin
 * @date 2017年12月8日
 * @功能  
 */
@Select()
@TableBind(name="sys_coupon", pk="id")
public class SysCoupon extends BaseModel<SysCoupon> {
	private static final long serialVersionUID = 1L;
	
	public static SysCoupon dao() {
	    return SpringContext.me()
		    .getModel(SysCoupon.class);
	}
	
	/**
	 * Title:优惠券列表
	 * name:zhimin.mo
	 * return:TableResponse<Record>
	 * describe:
	 * time:2017年12月26日
	 */
	@Select(id = "marketing.sysCoupon.queryList")
	public TableResponse<Record> findList(TableRequest request) {
	    return null;
	}
	/**
	 * Title:优惠券发放详情列表
	 * name:zhimin.mo
	 * return:TableResponse<Record>
	 * describe:
	 * time:2017年12月26日
	 */
	@Select(id = "marketing.sysCoupon.findCouponExtList")
	public TableResponse<Record> findCouponExtList(TableRequest request) {
	    return null;
	}
	@Select()
	public SysCoupon findById(@Param("id") String id){
	    return null;
	}

	public void saveOrUpdate(SysCoupon obj) {
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
	public SysCoupon queryCouponByCouponId(Long couponId) {
        QueryInfo queryInfo = new QueryInfo("marketing.sysCoupon.queryCouponByCouponId");
        return queryInfo.addParam("couponId", couponId).findOne(SysCoupon.class);
    }
	
	/**
	 * Title:通过coupon_id获取优惠券信息
	 * name:zhimin.mo
	 * return:SysCoupon
	 * describe:
	 * time:2017年12月18日
	 */
	@Select(id = "marketing.sysCoupon.queryCouponByCouponId")
	public Record queryCouponByCouponIdRecord(@Param("couponId") Long couponId) {
		return null;
	}
	/**已发放数量+count
	 * Title:SysCoupon.java
	 * name:zhimin.mo
	 * return:List<HxTrade>
	 * describe:
	 * time:2017年12月18日
	 */
	public int addCouponSentAmount(int count, Long couponId) {
        QueryInfo queryInfo = new QueryInfo("marketing.sysCoupon.addCouponSentAmount");
        return queryInfo.addParam("sentAmount", count).addParam("couponId", couponId).execute();
    }
	/**已发放数量-count
	 * Title:SysCoupon.java
	 * name:zhimin.mo
	 * return:List<HxTrade>
	 * describe:
	 * time:2017年12月18日
	 */
	public void subCouponSentAmount(int count, Long couponId) {
        QueryInfo queryInfo = new QueryInfo("marketing.sysCoupon.subCouponSentAmount");
        queryInfo.addParam("sentAmount", count).addParam("couponId", couponId).execute();
    }
	/**
	 * 查询有效门店优惠卷
	 * @return
	 */
	@Select(id="marketing.sysCoupon.findAvailableAndValidCouponList")
	public List<SysCoupon> queryAvailableCouponList(){
		return null;
	}
	
	/**
	 * Title:获取所有有效且无限的优惠券信息
	 * name:zhimin.mo
	 * return:List<SysCoupon>
	 * describe:
	 * time:2017年12月25日
	 */
	@Select(id="marketing.sysCoupon.findAvailableAndValidCouponList")
	public List<SysCoupon> findAvailableAndValidCouponList(){
		return null;
	}
	/**
	 * Title:获取所有有效且无限的优惠券信息
	 * name:zhimin.mo
	 * return:List<SysCoupon>
	 * describe:
	 * time:2017年12月25日
	 */
	/*@Select(id="marketing.sysCoupon.couponAnalyze")*/
	public List<CouponAnalyzeVo> couponAnalyze(TableRequest request){
		QueryInfo queryInfo = new QueryInfo("marketing.sysCoupon.couponExtAnalyze");
		queryInfo.addParams(request.getSearchMap());
		List<Record> couponAnalyzeList = queryInfo.find();
		List<CouponAnalyzeVo> couponAnalyzeVoList = new ArrayList<CouponAnalyzeVo>();
		//现金券发放数量
		long sentAmountCash = 0l;
		//折扣券发放数量
		long sentAmountDiscount = 0l;
		//现金券核销数量
		long verificationCash = 0l;
		//折扣券核销数量
		long verificationDiscount = 0l;
		//现金券种类数量
		long couponTypeCountCash = 0;
		//折扣券种类数量
		long couponTypeCountDiscount = 0;
		if(null != couponAnalyzeList){
			for(Record couponAnalyze:couponAnalyzeList){
				if(null == couponAnalyze){
					continue;
				}
				//券类型1：现金 2：折扣
				int couponType = couponAnalyze.getInt("couponType") == null ? 1 : couponAnalyze.getInt("couponType");
				//券状态0：有效  2：已核销
				int couponState = couponAnalyze.getInt("state") == null ? 0 : couponAnalyze.getInt("state");
				//总数量
				long sentAmount = couponAnalyze.getLong("sentAmount") == null ? 0l : couponAnalyze.getLong("sentAmount");
				//种类数量
				long couponTypeCount = couponAnalyze.getLong("count") == null ? 0l : couponAnalyze.getLong("count");
				//现金券
				if(1 == couponType){
					sentAmountCash += sentAmount;
					couponTypeCountCash += couponTypeCount;
					if(2 == couponState){
						verificationCash += sentAmount;
					}
				}else{
					sentAmountDiscount += sentAmount;
					couponTypeCountDiscount += couponTypeCount;
					if(2 == couponState){
						verificationDiscount += sentAmount;
					}
				}
			}
		}
		//现金券详情
		CouponAnalyzeVo couponAnalyzeVoCash = new CouponAnalyzeVo();
		couponAnalyzeVoCash.setCouponType(1+"");
		couponAnalyzeVoCash.setSentAmount(sentAmountCash+"");
		couponAnalyzeVoCash.setVerification(verificationCash+"");
		couponAnalyzeVoCash.setCount(couponTypeCountCash+"");
		couponAnalyzeVoList.add(couponAnalyzeVoCash);
		//折扣券详情
		CouponAnalyzeVo couponAnalyzeVoDiscount = new CouponAnalyzeVo();
		couponAnalyzeVoDiscount.setCouponType(2+"");
		couponAnalyzeVoDiscount.setSentAmount(sentAmountDiscount+"");
		couponAnalyzeVoDiscount.setVerification(verificationDiscount+"");
		couponAnalyzeVoDiscount.setCount(couponTypeCountDiscount+"");
		couponAnalyzeVoList.add(couponAnalyzeVoDiscount);
		return couponAnalyzeVoList;
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