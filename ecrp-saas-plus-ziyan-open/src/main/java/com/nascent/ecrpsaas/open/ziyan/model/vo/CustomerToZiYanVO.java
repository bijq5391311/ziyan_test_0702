package com.nascent.ecrpsaas.open.ziyan.model.vo;

import java.util.Date;
import java.util.List;

import com.nascent.utils.query.QueryInfo;

/**
 * 
 * @author bijingQ
 *
 */
public class CustomerToZiYanVO {
	//会员姓名
	private String userName;
	//会员手机号
	private String mobile;
	//生日
	private Date birthday;
	//会员卡号
	private String memberCard;
	//性别
	private String sex;
	//注册时间
	private Date joinDate;
	//会员积分
	private Double score;
	//等级
	private String gradeName;
	//消费值
	private Double consumeValue;
	//储存余额
	private Double balance;
	private static CustomerToZiYanVO customerToZiYanVO = new CustomerToZiYanVO();
	public static CustomerToZiYanVO dao() {
      return customerToZiYanVO;
  }
	/**
	 * 查询会员信息
	 * @return
	 */
	public List<CustomerToZiYanVO> getCustomerToZiYan(String memberCard,String mobile){
	
		QueryInfo queryInfo = new QueryInfo("customer.getCusetomerToZiYan");
		if(!memberCard.isEmpty()){
			queryInfo.addParam("memberCard", memberCard);
			
		}
		if(!mobile.isEmpty()){
			queryInfo.addParam("mobile", mobile);
		}
	        return queryInfo.findT(CustomerToZiYanVO.class);
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public Date getBirthday() {
		return birthday;
	}
	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}
	public String getMemberCard() {
		return memberCard;
	}
	public void setMemberCard(String memberCard) {
		this.memberCard = memberCard;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public Date getJoinDate() {
		return joinDate;
	}
	public void setJoinDate(Date joinDate) {
		this.joinDate = joinDate;
	}
	public Double getScore() {
		return score;
	}
	public void setScore(Double score) {
		this.score = score;
	}
	
	public String getGradeName() {
		return gradeName;
	}
	public void setGradeName(String gradeName) {
		this.gradeName = gradeName;
	}
	public Double getConsumeValue() {
		return consumeValue;
	}
	public void setConsumeValue(Double consumeValue) {
		this.consumeValue = consumeValue;
	}
	public Double getBalance() {
		return balance;
	}
	public void setBalance(Double balance) {
		this.balance = balance;
	}
	
}
