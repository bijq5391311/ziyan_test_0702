package com.nascent.ecrpsaas.plus.ziyan.dispatch.vo;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.nascent.ecrpsaas.base.util.UtilBeanToMap;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.utils.query.QueryInfo;
/**
 * 描述：会员降级数据vo封装 <br>
 * 创建人：高景玉<br>
 * 创建时间：2017年8月11日 上午9:00:25<br>
 * 修改人：<br>
 * 修改时间：<br>
 * 修改描述：<br>
 */
//会员降级数据vo封装
public class MemberDownVo implements Serializable {
	private static final long serialVersionUID = 1L;
	private static final MemberDownVo MEMBER_DOWN_VO = new MemberDownVo();
    
    public static MemberDownVo dao() {
		return MEMBER_DOWN_VO;
	}
	//会员编号
	private long sysCustomerId;
	//会员昵称
	private String  outNick;
	//会员等级
	private int  memberGrade;
	//上一次交易结束时间
	private String endTime;
	//是否是黑名单 
	private int isRightblack;
	//获取会员所在部门id
	private int groupId;
	
	private  int brandId;
	
	private  int isTouchBlack;

	
	public List<MemberDownVo> queryMemberGradeDownList(Date  endTime,long brandId){
		QueryInfo info = new QueryInfo("dispatch.member.queryMemberDownList");
		info.addParam("endTime", endTime).addParam("brandId",brandId);
		return info.findT(MemberDownVo.class);
	}
	
	//通过系统会员编号获取会员信息
	public MemberDownVo loadCustomerBrandBySyscusId(long sysCustomerId){
		QueryInfo qInfo = new QueryInfo("dispatch.customerBrand.loadCustomerBrandbyCusId").addParam("sysCustomerId", sysCustomerId);
		Record record = qInfo.findOne();
		MemberDownVo  memberDownVo = new MemberDownVo();
		if(null != record){
		    memberDownVo = (MemberDownVo) UtilBeanToMap.convertRecrod(MemberDownVo.class, record);
		}
		return memberDownVo;
	}
	
	
	public int getIsTouchBlack() {
		return isTouchBlack;
	}

	public void setIsTouchBlack(int isTouchBlack) {
		this.isTouchBlack = isTouchBlack;
	}

	public long getSysCustomerId() {
		return sysCustomerId;
	}
	public void setSysCustomerId(long sysCustomerId) {
		this.sysCustomerId = sysCustomerId;
	}
	public String getOutNick() {
		return outNick;
	}
	public void setOutNick(String outNick) {
		this.outNick = outNick;
	}
	public int getMemberGrade() {
		return memberGrade;
	}
	public void setMemberGrade(int memberGrade) {
		this.memberGrade = memberGrade;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public int getIsRightblack() {
		return isRightblack;
	}
	public void setIsRightblack(int isRightblack) {
		this.isRightblack = isRightblack;
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

	

}
