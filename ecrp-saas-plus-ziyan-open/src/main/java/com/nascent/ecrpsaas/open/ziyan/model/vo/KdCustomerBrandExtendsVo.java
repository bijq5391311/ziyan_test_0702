package com.nascent.ecrpsaas.open.ziyan.model.vo;

import com.nascent.ecrpsaas.base.vo.vip.KdCustomerBrandVo;

/**
 * Write class comments here
 * <p>
 * User: ChenQian
 * Date: 2018/3/15 16:51
 * version $Id: KdCustomerWeixinExtendsVo.java, v 0.1  16:51 Exp $
 */
public class KdCustomerBrandExtendsVo extends KdCustomerBrandVo {

	private Integer brandId;

	public void setBrandId (Integer brandId) {
		this.brandId = brandId;
	}

	public Integer getBrandId () {
		return brandId;
	}

}
