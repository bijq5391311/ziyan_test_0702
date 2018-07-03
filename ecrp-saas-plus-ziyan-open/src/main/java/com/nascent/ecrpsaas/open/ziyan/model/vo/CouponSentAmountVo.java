package com.nascent.ecrpsaas.open.ziyan.model.vo;

import org.springframework.stereotype.Component;

/**
 * @author FeiXiang
 * @date 2017/12/21
 * @describe 自定义列表查询条件
 */
@Component
public class CouponSentAmountVo {
	private Long couponId;   //couponId
    private Integer sentAmount;  //发放数量
	public Long getCouponId() {
		return couponId;
	}
	public void setCouponId(Long couponId) {
		this.couponId = couponId;
	}
	public Integer getSentAmount() {
		return sentAmount;
	}
	public void setSentAmount(Integer sentAmount) {
		this.sentAmount = sentAmount;
	}
}
