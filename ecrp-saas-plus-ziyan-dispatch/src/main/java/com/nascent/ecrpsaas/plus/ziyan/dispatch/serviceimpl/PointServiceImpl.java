package com.nascent.ecrpsaas.plus.ziyan.dispatch.serviceimpl;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.base.vo.database.GoodsVo;
import com.nascent.ecrpsaas.model.KdPointRule;
import com.nascent.ecrpsaas.model.KdPointTradeNotify;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.PointService;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.vo.OrderInfoVo;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.vo.PointInfoVo;
import com.nascent.utils.query.CommonResult;

/**
 * 描述： 积分奖励兑换积分<br>
 * 类名：PointServiceImpl<br>
 * 创建人：高景玉<br>
 * 创建时间：2017年10月18日 上午20:00:25<br>
 * 修改人：<br>
 * 修改时间：<br>
 * 修改描述：<br>
 */
@Service("zypointService")
public class PointServiceImpl implements PointService {
	// 日志记录工具类
	Logger logger = LoggerFactory.getLogger(PointServiceImpl.class);

	@Override
	public String getName() {
		return "pointService";
	}

	// 通过积分规则去除积分
	@Override
	public CommonResult removePointcuntBypointRule(KdPointTradeNotify kdPointTradeNotify, KdPointRule kdPointRule) {
		CommonResult commonResult = new CommonResult(true);
		double num = 0;
		List<String> tempIds = new ArrayList<>();
		// 获取订单信息
		String orderValues = kdPointTradeNotify.getOrderValues();
		PointInfoVo pointInfoVo = new PointInfoVo();
		pointInfoVo = pointInfoVo.analyticPointinfo(orderValues);
		String orderInfo = pointInfoVo.getOrderInfo();
		OrderInfoVo orderInfoVo = new OrderInfoVo();
		//获取交易的实付金额
		double tradePayment = kdPointTradeNotify.getTradePayment();
		// 获取会员改交易所买的商品
		List<OrderInfoVo> infoVos = orderInfoVo.analyticOrderinfo(orderInfo);
		// 排除商品
		List<String> itemIds = new ArrayList<>();
		String sysItemIds = kdPointRule.getFSysItemIds();
		if (UtilString.isNotEmpty(sysItemIds)) {
			String[] sysIds = sysItemIds.split(",");
			for (String id : sysIds) {
				itemIds.add(id);
			}
		}
		String goodscondition = kdPointRule.getFSysItemCondition();
		if (UtilString.isNotEmpty(goodscondition)) {
			String condition = GoodsVo.dao().analyCondition(goodscondition);
			if (UtilString.isNotEmpty(condition)) {
				String[] cid = condition.split(",");
				for (String id : cid) {
					itemIds.add(id);
				}
			}
		}
		for (OrderInfoVo info : infoVos) {
			tempIds.add(info.getSysItemId());
		}

		if (itemIds.size() > 0 && tempIds.size() > 0) {
			if (tempIds.containsAll(itemIds)) {
				// 判断该笔交易会员所买商品是否在规则所要排除的范围内
				logger.info("该客户购买的商品积分规则所要排除的范围内！");
			} else {
				for (OrderInfoVo info : infoVos) {
					// 如果没有排除交易类型计算所购买的积分
					if (itemIds.contains(info.getSysItemId()) && "TradeClosed".equals(info.getOrderStatus())) {
						tradePayment -= info.getOrderPayment();
						commonResult.setCode("1");
						commonResult.setResult(tradePayment);
					}
				}
			}

		}

		// 排除店铺
		String shopIds = kdPointRule.getFShopIds();
		// 获取交易所属店铺
		String shopCode = kdPointTradeNotify.getShopCode();
		if (UtilString.isNotEmpty(shopIds)) {
			String[] ids = UtilString.split(shopIds, ",");
			for (String id : ids) {
				if (shopCode.equals(id)) {
					logger.info("该客户购买的商品所在的店铺在积分规则所要排除的范围内！");
					commonResult.setCode("2");
				}
			}

		}
		return commonResult;
	}

	// 根据积分规则计算积分
	@Override
	public double pointCalculationByOrder(KdPointRule kdPointRule, double payment) {
		// 记录积变量
		double tempPointcount = 0;
		double totalPointcount = 0;
		// 获取多少元兑换1积分
		BigDecimal pointPrice = kdPointRule.getPointPrice();
		// 计算送的积分
		tempPointcount += payment / pointPrice.doubleValue();
		BigDecimal pointLimit = kdPointRule.getPointLimit();
		if (pointLimit != null) {
			if (tempPointcount > pointLimit.doubleValue()) {
				tempPointcount = pointLimit.doubleValue();
			}
		}
		// 获取积分取整规则,0想上取整,1向下取整,2四舍5入,3保留两位小数默认为0
		int pointRound = kdPointRule.getPointRound();
		// 取整
		switch (pointRound) {
		// 向上取整
		case 0:
			totalPointcount = Math.ceil(tempPointcount);
			break;
		// 向下取整
		case 1:
			totalPointcount = Math.floor(tempPointcount);
			break;
		// 四舍五入
		case 2:
			totalPointcount = Math.round(tempPointcount);
			break;
		// 最小精度
		case 3:
			DecimalFormat decimalFormat = new DecimalFormat("#.##");
			totalPointcount = Double.parseDouble(decimalFormat.format(tempPointcount));
			break;
		default:
			break;

		}
		return totalPointcount;
	}

}
