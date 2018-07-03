package com.nascent.ecrpsaas.plus.ziyan.dispatch.serviceimpl;

import java.math.BigDecimal;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nascent.ecrpsaas.base.util.UtilDate;
import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.database.model.KdTrade;
import com.nascent.ecrpsaas.model.KdPointRule;
import com.nascent.ecrpsaas.model.KdPointTradeNotify;
import com.nascent.ecrpsaas.plus.ziyan.Integral.service.ZyKdPointRuleService;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.PointRuleExchangeIntegralService;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.PointService;
import com.nascent.ecrpsaas.vip.model.KdCustomer;
import com.nascent.ecrpsaas.vip.model.KdCustomerBrand;
import com.nascent.ecrpsaas.vip.service.KdCustomerBrandService;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.utils.query.CommonResult;

/**
 * 描述： 积分规则兑换积分<br>
 * d 类名：PointRuleExchangeIntegralServiceImpl<br>
 * 创建人：高景玉<br>
 * 创建时间：2017年8月11日 上午9:00:25<br>
 * 修改人：<br>
 * 修改时间：<br>
 * 修改描述：<br>
 */
@Service("zypointRuleExchangeIntegralService")
public class PointRuleExchangeIntegralServiceImpl implements PointRuleExchangeIntegralService {
	// 积分规则数据接口
	private ZyKdPointRuleService kdPointRuleService = SpringContext.me().getBean(ZyKdPointRuleService.class);
	// 积分规则兑换积分
	private PointService pointService = SpringContext.me().getBean(PointService.class);
	// 日志记录工具类
	Logger logger = LoggerFactory.getLogger(PointRuleExchangeIntegralServiceImpl.class);
	@Autowired
	KdCustomerBrandService kdCustomerBrandService;

	// 获取实现接口的实现类的标识
	@Override
	public String getName() {
		return "pointRuleExchangeIntegralService";
	}

	// 通过积分规则换算积分
	@Override
	public CommonResult exchangePointRuleIntegral(KdPointTradeNotify kdPointTradeNotify,KdPointRule kdPointRule) {
		CommonResult commonResult = new CommonResult(true);
		// 积分规则生成积分
		double pointRuleount = 0;
		// 获取交易的所属品牌
		/*String zyChannel = kdPointTradeNotify.getExpValues();
		// 通过品牌获取积分规则
		KdPointRule kdPointRule = kdPointRuleService.loadZyKdPointRule(zyChannel);*/
		if (null == kdPointRule) {
			logger.info("该渠道还没有关联积分规则！");
			commonResult.setFailed();
			return commonResult;
		}
		if (kdPointRule.getIsOpen() == 0) {
			logger.info("该渠道积分规则没开启！");
			commonResult.setFailed();
			return commonResult;
		}
		// 查看会员信息，看是不是要排除的会员
		KdCustomerBrand customerBrand = kdCustomerBrandService
				.queryCustomerBrandInfoByCustomerId(kdPointTradeNotify.getSysCustomerId());
		KdCustomer customer = KdCustomer.dao().loadByCustomerId(kdPointTradeNotify.getSysCustomerId());
		if (null != customer) {
			String memberCard = customer.getMemberCard();
			String mobile = customer.getmobile();
			String openId = customer.getKdOpenId();
			Integer isActive = customer.getIsActivate();
			if (isActive != 1) {
				logger.info("该会员还没有激活！");
				commonResult.setFailed();
				return commonResult;
			}
			if (memberCard.equals("NULL")) {
				memberCard = null;
			}
			if (UtilString.isNotEmpty(memberCard) || UtilString.isNotEmpty(mobile) || UtilString.isNotEmpty(openId)) {
				if (null != customerBrand) {
					// 如果开启总的黑名单过滤 则黑名单用户不进行升级
					if (kdPointRule.getIsIncludeBlack() == 1) {
						if (customerBrand.getIsRightBlack() == 1) {
							// 是黑名单用户
							logger.info("客户:" + kdPointTradeNotify.getSysCustomerId() + "黑名单客户不进行兑换积分操作");
							return commonResult.setFailed();
						}
					}
					// 是否排除未激活会员 1排除，0：不排除
					if (kdPointRule.getIsActivate() == 1) {
						if (customerBrand.getIsTouchBlack() == 1) {
							// 是黑名单用户
							logger.info("客户:" + kdPointTradeNotify.getSysCustomerId() + "触达黑名单客户不进行兑换积分操作");
							return commonResult.setFailed();
						}
					}
				}
				// 获取规则更新时间
				Date updateTime = kdPointRule.getUpdateTime();
				// 获取交易通知时间
				Date notifyTime = kdPointTradeNotify.getNotifyTime();
				long days = UtilDate.getBetweenDaysByDay(updateTime, notifyTime);
				if (days > 0) {
					logger.info("该交易通知没有在积分规则有效期内！");
					commonResult.setFailed();
					return commonResult;
				}
				CommonResult result = pointService.removePointcuntBypointRule(kdPointTradeNotify, kdPointRule);
				if ("1".equals(result.getCode())) {
					double orderNum = (double) result.getResult();
					KdTrade kdTrade = KdTrade.dao().loadTradeBySysTradeId(kdPointTradeNotify.getSysTradeId());
					if (null != kdTrade) {
						double tempPostFee = 0;
						double tempDiscountFee = 0;
						BigDecimal postFee = kdTrade.getPostFee();
						if (null != postFee) {
							tempPostFee = postFee.doubleValue();
						}
						BigDecimal disCountFee = kdTrade.getDiscountFee();
						if (null != disCountFee) {
							tempDiscountFee = disCountFee.doubleValue();
						}
						double tempNum = orderNum - tempPostFee - tempDiscountFee;
						if (tempNum < 0) {
							tempNum = 0;
						}
						// 这时候根据没有排除的商品计算
						pointRuleount = pointService.pointCalculationByOrder(kdPointRule, tempNum);
						if (pointRuleount > 0) {
							commonResult.setResult(pointRuleount);
							return commonResult;

						} else {
							commonResult.setResult(0);
							return commonResult;

						}
					}
				} else if (!"2".equals(result.getCode())) {
					// 该笔交易会员交易没有在规则所要排除的范围内，计算规则发的积分
					// 排除邮费服务费
					double tradePayment = kdPointTradeNotify.getTradePayment();
					KdTrade kdTrade = KdTrade.dao().loadTradeBySysTradeId(kdPointTradeNotify.getSysTradeId());
					if (null != kdTrade) {
						double tempPostFee = 0;
						double tempDiscountFee = 0;
						BigDecimal postFee = kdTrade.getPostFee();
						if (null != postFee) {
							tempPostFee = postFee.doubleValue();
						}
						BigDecimal disCountFee = kdTrade.getDiscountFee();
						if (null != disCountFee) {
							tempDiscountFee = disCountFee.doubleValue();
						}
						// 计算积分的金额
						double totalPayment = tradePayment - tempPostFee - tempDiscountFee;
						if (totalPayment < 0) {
							totalPayment = 0;
						}
						pointRuleount = pointService.pointCalculationByOrder(kdPointRule, totalPayment);
						if (pointRuleount > 0) {
							commonResult.setResult(pointRuleount);
							return commonResult;
						} else {
							commonResult.setResult(0);
							return commonResult;
						}
					}

				} else {
					commonResult.setFailed();
					return commonResult;
				}
			}
		}
		commonResult.setFailed();
		return commonResult;

	}

}
