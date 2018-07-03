package com.nascent.ecrpsaas.plus.ziyan.Integral.service;

import com.nascent.ecrpsaas.base.model.KdServiceShopPro;
import com.nascent.ecrpsaas.base.vo.organization.KdBrandAuthorizeVo;
import com.nascent.ecrpsaas.vo.PointLogVo;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface ZyPointLogService {

	/**
	 * 积分日志同步至开放平台服务
	 */
	void pointLogSynWork(List<PointLogVo> list, KdBrandAuthorizeVo authorizeVo);

	/**
	 * 积分日志从开放平台下载服务
	 */
	void pointLogDownloadWork(KdBrandAuthorizeVo authorizeVo, String startTime,
			String endTime, Map<String, String> hdShopCodeMap) throws  Exception;

	void outPointLogSynWork();
}
