package com.nascent.ecrpsaas.plus.ziyan.dispatch.vo;

import java.util.List;

import com.nascent.utils.query.QueryInfo;

public class GradeRuleDetailVo {
	
	private int id;
	private double discount;
	private int rewardPoints;
	private int sendRewardType;
	private int grade;
	private String gradeName;
	private int zyConsume;

	private static final GradeRuleDetailVo DETAIL_VO = new GradeRuleDetailVo();

	public static GradeRuleDetailVo dao() {
		return DETAIL_VO;
	}
	
	public List<GradeRuleDetailVo> queryGradeRuleDetailByRuleId(int ruleId) {
		QueryInfo queryInfo = new QueryInfo("zy.dispatch.graderuledetail.queryGradeRuleDetail").addParam("id", ruleId);
		return queryInfo.findT(GradeRuleDetailVo.class);
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public double getDiscount() {
		return discount;
	}
	public void setDiscount(double discount) {
		this.discount = discount;
	}
	public int getRewardPoints() {
		return rewardPoints;
	}
	public void setRewardPoints(int rewardPoints) {
		this.rewardPoints = rewardPoints;
	}
	public int getSendRewardType() {
		return sendRewardType;
	}
	public void setSendRewardType(int sendRewardType) {
		this.sendRewardType = sendRewardType;
	}
	public int getGrade() {
		return grade;
	}
	public void setGrade(int grade) {
		this.grade = grade;
	}
	public String getGradeName() {
		return gradeName;
	}
	public void setGradeName(String gradeName) {
		this.gradeName = gradeName;
	}
	public int getZyConsume() {
		return zyConsume;
	}
	public void setZyConsume(int zyConsume) {
		this.zyConsume = zyConsume;
	}

	
	
	

}
