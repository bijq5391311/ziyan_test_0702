package com.nascent.ecrpsaas.plus.ziyan.vip.service;

import com.nascent.ecrpsaas.base.model.KdServiceShopPro;
import com.nascent.ecrpsaas.base.vo.organization.KdBrandAuthorizeVo;
import com.nascent.ecrpsaas.vip.model.OutCustomerInfo;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public interface ZyHuDongCustomerService {

	/**
	 * 爱互动会员下载
	 */
	void customerDownloadWork();
	/**
	 * 爱互动会员同步
	 */
	void customerSynWork();

	/**
	 * 同步绑卡会员
	 */
	void saveOrUpdateCustomerInfo(OutCustomerInfo outCustomerInfo) throws Exception;

	/**
	 * 更新会员积分
	 *
	 * @param sysCustomerId
	 * @param brandId
	 * @param score
	 */
	void updateCustomerIntegral(Long sysCustomerId, Integer brandId, BigDecimal score)
			throws Exception;


	/**
	 * 从开放平台同步会员积分
	 * @param authorizeVo
	 * @param startTime
	 * @param endTime
	 */
	void saveOutCustomerIntegral(KdBrandAuthorizeVo
			authorizeVo,String startTime,String endTime)throws  Exception;
}
