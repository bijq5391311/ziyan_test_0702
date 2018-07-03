package com.nascent.ecrpsaas.plus.ziyan.dispatch.vo;

import com.nascent.utils.query.QueryInfo;

import java.util.Date;
import java.util.List;

public class KdBrandCustomeVo {
	private int id;
	private long sysCustomerId;
	private int isRightBlack;
	private int memberGrade;
	private double score;
    private double tradeTotalScore;
    private int consumeTotal;
	private int groupId;
	private int brandId;
    private Date updateTime;
	private static final KdBrandCustomeVo BRAND_CUSTOME_VO = new KdBrandCustomeVo();

	public static KdBrandCustomeVo dao() {
		return BRAND_CUSTOME_VO;
	}

	//修改会员的消费值
	public int updateCustomerBrand (long sysCustomerId,int consumeValue){
		QueryInfo info = new QueryInfo("zy.dispatch.customerBrand.updateBrandMember");
    	info.addParam("sysCustomerId", sysCustomerId);
    	info.addParam("consumeValue", consumeValue);
        return	info.execute();
	}
	
	//修改会员的交易总积分
	public int updateCustomerBrandTradeTotalScore (long sysCustomerId,double tradeTotalScore ){
		QueryInfo info = new QueryInfo("zy.dispatch.customerBrand.updateCustomerBrandTradeTotalScore");
    	info.addParam("sysCustomerId", sysCustomerId);
    	info.addParam("tradeTotalScore", tradeTotalScore);
        return	info.execute();
	}
	
	
	
	public KdBrandCustomeVo loadBrandCustomer (long sysCustomerId){
		QueryInfo info = new QueryInfo("zy.dispatch.customerBrand.loadBrandCustomer");
    	info.addParam("sysCustomerId", sysCustomerId);
    	List<KdBrandCustomeVo> touchInfoVos =  info.findT(KdBrandCustomeVo.class);
		if(touchInfoVos.isEmpty()){
			return null;
		}
		return touchInfoVos.get(0);
	}
	
	//获取会员信息
	public int updateCustomerBrandGrade (long sysCustomerId,int grade){
		QueryInfo info = new QueryInfo("zy.dispatch.customerBrand.updateBrandMemberGrade");
    	info.addParam("sysCustomerId", sysCustomerId);
    	info.addParam("memberGrade", grade);
        return	info.execute();
	}
	
	
    public List<KdBrandCustomeVo> queryCustomerBrandList(int pageIndex,int pageSize) {
    	QueryInfo info = new QueryInfo("zy.dispatch.customerBrand.queryBrandMember");
		info.addParam ("pageSize", pageSize = pageSize > 0 ? pageSize : 1 );
		info.addParam ("startIndex", (pageIndex > 0 ? (pageIndex - 1) : 0) * pageSize);
		List<KdBrandCustomeVo> customers =	info.findT(KdBrandCustomeVo.class);
    	if(customers.size() >0){
    		return customers;
    	}
        return null;
    }
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public long getSysCustomerId() {
		return sysCustomerId;
	}
	public void setSysCustomerId(long sysCustomerId) {
		this.sysCustomerId = sysCustomerId;
	}
	public int getIsRightBlack() {
		return isRightBlack;
	}
	public void setIsRightBlack(int isRightBlack) {
		this.isRightBlack = isRightBlack;
	}
	public int getMemberGrade() {
		return memberGrade;
	}
	public void setMemberGrade(int memberGrade) {
		this.memberGrade = memberGrade;
	}
	public double getScore() {
		return score;
	}
	public void setScore(double score) {
		this.score = score;
	}
	public double getTradeTotalScore() {
		return tradeTotalScore;
	}
	public void setTradeTotalScore(double tradeTotalScore) {
		this.tradeTotalScore = tradeTotalScore;
	}
	public int getConsumeTotal() {
		return consumeTotal;
	}
	public void setConsumeTotal(int consumeTotal) {
		this.consumeTotal = consumeTotal;
	}
	public int getGroupId() {
		return groupId;
	}

	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}

	public int getBrandId() {
		return brandId;
	}

	public void setBrandId(int brandId) {
		this.brandId = brandId;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

    
}
