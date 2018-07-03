package com.nascent.ecrpsaas.plus.vo;

import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.utils.query.QueryInfo;
import com.nascent.utils.query.TableRequest;
import com.nascent.utils.query.TableResponse;

/**
 * 
 * @author jingyu.gao 保存消费数据
 *
 */

public class ConsumeOverviewVo {
	
	private static final ConsumeOverviewVo CONSUME_OVERVIEW_VO = new ConsumeOverviewVo();

	public static ConsumeOverviewVo dao() {
		return CONSUME_OVERVIEW_VO;
	}
	private String customerName;
	private String memberCard;
	private String mobile;
	private int consumeTotal;
	private String gradeName;

	public TableResponse<Record> queryConsumeOverviewList(TableRequest request) {
		QueryInfo queryInfo = new QueryInfo("vip.consumeOverview.queryConsumeOverviewList",request);
		return queryInfo.addParams(request.getSearchMap()).paginate();
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getMemberCard() {
		return memberCard;
	}

	public void setMemberCard(String memberCard) {
		this.memberCard = memberCard;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public int getConsumeTotal() {
		return consumeTotal;
	}

	public void setConsumeTotal(int consumeTotal) {
		this.consumeTotal = consumeTotal;
	}

	public String getGradeName() {
		return gradeName;
	}

	public void setGradeName(String gradeName) {
		this.gradeName = gradeName;
	}

}
