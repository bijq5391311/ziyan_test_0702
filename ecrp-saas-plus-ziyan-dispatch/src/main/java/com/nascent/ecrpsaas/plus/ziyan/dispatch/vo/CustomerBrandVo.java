package com.nascent.ecrpsaas.plus.ziyan.dispatch.vo;

import java.util.Date;

import java.util.List;

import com.nascent.ecrpsaas.base.util.UtilDate;
import com.nascent.utils.query.QueryInfo;

/**
 * 描述：会员等级修改vo封装 <br>
 * 创建人：高景玉<br>
 * 创建时间：2017年8月14日 上午9:00:25<br>
 * 修改人：<br>
 * 修改时间：<br>
 * 修改描述：<br>
 */
public class CustomerBrandVo {
	private static final CustomerBrandVo CUSTOMER_BRAND_VO = new CustomerBrandVo();
    
    public static CustomerBrandVo dao() {
		return CUSTOMER_BRAND_VO;
	}
    //修改会员等级
    public int updateCustomerbrandGrade(Date currentDate,int memberGrade,long sysCustomerId){
    	String time = UtilDate.formatDateTime(currentDate);
    	QueryInfo info = new QueryInfo("dispatch.customerBrand.updateCustomerBrand");
		info.addParam("memberGrade",	memberGrade)
		     .addParam("updateTime", time)
		     .addParam("sysCustomerId", sysCustomerId);
		return info.execute();
    }
    
    
    //获取一定时间范围内某一品牌的完成消费订单的客户
    public  List <CustomerBrandVo> queryFinishedCustomer(Date startTime,Date endTime,long brandId){
		QueryInfo qInfo = new QueryInfo("dispatch.customerBrand.queryCustomerBrand")
				.addParam("startTime", startTime)
				.addParam("endTime", endTime)
				.addParam("brandId", brandId);
		return qInfo.findT(CustomerBrandVo.class);
    }
    
    
	private long  sysCustomerId;
	private int memberGrade;
	private String tradeFrom;
	private String sysTradeId;
	private String outTradeId;
    private  String shopCode;
    private String outNick;
	public long getSysCustomerId() {
		return sysCustomerId;
	}
	public void setSysCustomerId(long sysCustomerId) {
		this.sysCustomerId = sysCustomerId;
	}
	public int getMemberGrade() {
		return memberGrade;
	}
	public void setMemberGrade(int memberGrade) {
		this.memberGrade = memberGrade;
	}
	public String getTradeFrom() {
		return tradeFrom;
	}
	public void setTradeFrom(String tradeFrom) {
		this.tradeFrom = tradeFrom;
	}
	public String getSysTradeId() {
		return sysTradeId;
	}
	public void setSysTradeId(String sysTradeId) {
		this.sysTradeId = sysTradeId;
	}
	public String getOutTradeId() {
		return outTradeId;
	}
	public void setOutTradeId(String outTradeId) {
		this.outTradeId = outTradeId;
	}
	public String getShopCode() {
		return shopCode;
	}
	public void setShopCode(String shopCode) {
		this.shopCode = shopCode;
	}
	public String getOutNick() {
		return outNick;
	}
	public void setOutNick(String outNick) {
		this.outNick = outNick;
	}
	
	

}
