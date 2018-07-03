package com.nascent.ecrpsaas.plus.ziyan.dispatch.serviceimpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.database.model.KdGoods;
import com.nascent.ecrpsaas.model.KdPointTradeNotify;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.ConsumeExcludeService;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.util.ConsumeRuleDetailVo;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.vo.OrderInfoVo;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.vo.PointInfoVo;
import com.nascent.ecrpsaas.plus.ziyan.vip.model.ZyConsumeValueRule;
import com.nascent.utils.query.CommonResult;

@Service("consumeExcludeService")
public class ConsumeExcludeServiceImpl implements ConsumeExcludeService {
	// 日志记录工具类
	Logger logger = LoggerFactory.getLogger(ConsumeExcludeServiceImpl.class);

	@Override
	public CommonResult removePointcuntBypointRule(KdPointTradeNotify kdPointTradeNotify,
			ZyConsumeValueRule zyConsumeValueRule) {
		CommonResult commonResult = new CommonResult(true);
		double num = 0;
		// 保存指定商品的消费值
		int consumeVlaue = 0;
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> tempIds = new ArrayList<>();
		double tradePayment = kdPointTradeNotify.getTradePayment();
		// 获取订单信息
		String orderValues = kdPointTradeNotify.getOrderValues();
		PointInfoVo pointInfoVo = new PointInfoVo();
		pointInfoVo = pointInfoVo.analyticPointinfo(orderValues);
		String orderInfo = pointInfoVo.getOrderInfo();
		OrderInfoVo orderInfoVo = new OrderInfoVo();
		// 获取会员改交易所买的商品
		List<OrderInfoVo> infoVos = orderInfoVo.analyticOrderinfo(orderInfo);
		// 排除商品
		List<String> itemIds = new ArrayList<>();
		String sysItemIds = zyConsumeValueRule.getFSysItemIds();
		if (UtilString.isNotEmpty(sysItemIds)) {
			String[] sysIds = sysItemIds.split(",");
			for (String id : sysIds) {
				itemIds.add(id);
			}
		}

		for (OrderInfoVo info : infoVos) {
			tempIds.add(info.getSysItemId());
		}

		for (OrderInfoVo info : infoVos) {
			// 如果没有排除交易类型计算所购买的积分
			if (itemIds.contains(info.getSysItemId()) && "TradeFinished".equals(info.getOrderStatus())) {
				tradePayment -= info.getOrderPayment();
				map.put("tradePayment", tradePayment);
				commonResult.setCode("1");
			}

		}

		// 判断商品是否是指定商品
		String itemConsumeValue = zyConsumeValueRule.getItemConsumeValue();
		// 工具类去解析数据
		ConsumeRuleDetailVo consumeRuleDetailVo = new ConsumeRuleDetailVo();
		// 解析配置的商品
		List<ConsumeRuleDetailVo> consumeRuleDetailVos = consumeRuleDetailVo.analysisConsumeInfo(itemConsumeValue);
		for (ConsumeRuleDetailVo consumeRuleDetailVo2 : consumeRuleDetailVos) {
			for (OrderInfoVo info : infoVos) {
				// 如果没有排除交易类型计算所购买的积分
				if (consumeRuleDetailVo2.getSysItemId().equals(info.getSysItemId())
						&& "TradeFinished".equals(info.getOrderStatus())) {
					consumeVlaue += consumeRuleDetailVo2.getConsumeVlaue();
					map.put("consumeValue", consumeVlaue);
					commonResult.setCode("1");
				}

			}
		}
		// 获取店铺编码
		String shopIds = zyConsumeValueRule.getShopIdsCodes();
		// 获取交易所属店铺
		String shopCode = kdPointTradeNotify.getShopCode();
		if (UtilString.isNotEmpty(shopIds)) {
			String[] ids = UtilString.split(shopIds, ",");
			for (String id : ids) {
				if (shopCode.equals(id)) {
					logger.info("该客户购买的商品所在的店铺在积分规则所要排除的范围内！");
					commonResult.setCode("2");
					return commonResult;
				}
			}

		}
		commonResult.setCode("1");
		commonResult.setResult(map);
		return commonResult;
	}

}
