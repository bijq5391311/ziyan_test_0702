package com.nascent.ecrpsaas.plus.ziyan.dispatch.service;

import com.nascent.ecrpsaas.model.KdPointTradeNotify;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.vo.KdBrandCustomeVo;
import com.nascent.utils.query.CommonResult;

public interface ConsumeConvertService {

	// 通过消费规则换算积分
	public CommonResult exchangeConsumeValue(KdPointTradeNotify kdPointTradeNotify,KdBrandCustomeVo customerBrand);

}
