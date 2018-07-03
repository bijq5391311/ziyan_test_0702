package com.nascent.ecrpsaas.plus.ziyan.dispatch.vo;
/**
 * 
 * @author jingyu.gao
 * 用于记录升级日志信息
 *
 */
public class GradeUpdetailVo {
	
	private  Integer memberGrade;
	private Integer nextGrade;
	private  String nextGradeName;
	private  Integer groupId;
	private Integer brandId;
	public Integer getMemberGrade() {
		return memberGrade;
	}
	public void setMemberGrade(Integer memberGrade) {
		this.memberGrade = memberGrade;
	}
	public Integer getNextGrade() {
		return nextGrade;
	}
	public void setNextGrade(Integer nextGrade) {
		this.nextGrade = nextGrade;
	}
	public String getNextGradeName() {
		return nextGradeName;
	}
	public void setNextGradeName(String nextGradeName) {
		this.nextGradeName = nextGradeName;
	}
	public Integer getGroupId() {
		return groupId;
	}
	public void setGroupId(Integer groupId) {
		this.groupId = groupId;
	}
	public Integer getBrandId() {
		return brandId;
	}
	public void setBrandId(Integer brandId) {
		this.brandId = brandId;
	}
	
	

}
