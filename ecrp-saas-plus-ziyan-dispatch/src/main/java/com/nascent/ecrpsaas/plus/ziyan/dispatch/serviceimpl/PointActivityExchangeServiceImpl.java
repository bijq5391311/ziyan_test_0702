package com.nascent.ecrpsaas.plus.ziyan.dispatch.serviceimpl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.ctc.wstx.util.StringUtil;
import com.nascent.ecrpsaas.base.util.UtilDate;
import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.base.vo.database.GoodsVo;
import com.nascent.ecrpsaas.database.model.KdGoods;
import com.nascent.ecrpsaas.marketing.model.KdPointActivity;
import com.nascent.ecrpsaas.marketing.model.KdPointMarketingGroup;
import com.nascent.ecrpsaas.marketing.service.KdPointMarketingGroupService;
import com.nascent.ecrpsaas.model.KdPointRule;
import com.nascent.ecrpsaas.model.KdPointTradeNotify;
import com.nascent.ecrpsaas.plus.ziyan.Integral.service.ZyKdPointRuleService;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.PointActivityExchangeService;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.PointService;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.util.PointRuleCountVo;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.vo.GoodsConditionVo;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.vo.OrderInfoVo;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.vo.PointInfoVo;
import com.nascent.ecrpsaas.service.KdPointRuleService;
import com.nascent.ecrpsaas.vip.model.KdCustomer;
import com.nascent.plugins.spring.SpringContext;

@Service("zypointActivityExchangeService")
public class PointActivityExchangeServiceImpl implements PointActivityExchangeService {

	// 日志记录工具类
	Logger logger = LoggerFactory.getLogger(PointRewardExchangeServiceImpl.class);
	// 积分规则数据接口
	private ZyKdPointRuleService kdPointRuleService = SpringContext.me().getBean(ZyKdPointRuleService.class);
	// 获取该会员参与的营销活动
	private KdPointMarketingGroupService groupService = SpringContext.me().getBean(KdPointMarketingGroupService.class);
	// 积分规则兑换积分
	private PointService pointService = SpringContext.me().getBean(PointService.class);

	@Override
	public String getName() {
		return "pointActivityExchangeService";
	}

	@Override
	public double exchangePointActivityIntegral(KdPointTradeNotify kdPointTradeNotify,KdPointRule kdPointRule) {
		// 记录活动换算积分
		double activityCount = 0;
		double goodsCount = 0;
		double totalPoint = 0;
		boolean flag = false;
		// 获取品牌id
		int brandId = kdPointTradeNotify.getBrandId();
		// 通过品牌获取积分规则
		/*// 获取交易的所属品牌
		String zyChannel = kdPointTradeNotify.getExpValues();
		// 通过品牌获取积分规则
		KdPointRule kdPointRule = kdPointRuleService.loadZyKdPointRule(zyChannel);*/
		// 获取积分活动的id
		StringBuffer sb = new StringBuffer();
		List<String> goodsIds = new ArrayList<>();
		List<Double> totalCount = new ArrayList<Double>();
		long sysCustomerId = kdPointTradeNotify.getSysCustomerId();
		KdCustomer customer = KdCustomer.dao().loadByCustomerId(sysCustomerId);
		if (null != customer) {
			String memberCard = customer.getMemberCard();
			String mobile = customer.getmobile();
			String openId = customer.getKdOpenId();
			Integer isActive = customer.getIsActivate();
			if (isActive != 1) {

				if (memberCard.equals("NULL")) {
					memberCard = null;
				}
				if (UtilString.isNotEmpty(memberCard) || UtilString.isNotEmpty(mobile)
						|| UtilString.isNotEmpty(openId)) {
					if (null != kdPointRule) {
						String orderValues = kdPointTradeNotify.getOrderValues();
						PointInfoVo pointInfoVo = new PointInfoVo();
						pointInfoVo = pointInfoVo.analyticPointinfo(orderValues);
						String orderInfo = pointInfoVo.getOrderInfo();
						OrderInfoVo orderInfoVo = new OrderInfoVo();
						// 获取会员改交易所买的商品
						List<OrderInfoVo> infoVos = orderInfoVo.analyticOrderinfo(orderInfo);
						// 根据品牌查询活动
						List<KdPointActivity> activities = KdPointActivity.dao().getPointactivityBybrandId(brandId);
						// 用于计算积分
						PointRuleCountVo pointRuleCountVo = new PointRuleCountVo();
						if (null != activities && activities.size() > 0) {
							for (KdPointActivity kdPointActivity : activities) {
								// 判断交易是否在活动有效期内
								Date notifyTime = kdPointTradeNotify.getNotifyTime();
								// 获取活动的有效期
								Date startTime = kdPointActivity.getStartTime();
								Date endTime = kdPointActivity.getEndTime();
								if (UtilDate.getBetweenDaysByDay(notifyTime, startTime) >= 0
										&& UtilDate.getBetweenDaysByDay(endTime, notifyTime) >= 0) {
									sb.append(kdPointActivity.getId());
									sb.append(",");
									// 活动类型是所有客户
									int activityType = kdPointActivity.getActivityType();
									// 获取活动所属的店铺
									String shopIds = kdPointActivity.getShopIds();
									// 获取店铺配置的商品
									String sysItemCondition = kdPointActivity.getSysItemCondition();
									StringBuffer itemIds = new StringBuffer();
									String sysItemIds = kdPointActivity.getSysItemIds();
									if (UtilString.isNotEmpty(sysItemIds)) {
										itemIds.append(sysItemIds);
									}
									if (UtilString.isNotEmpty(sysItemCondition)) {
										String goodCondition = GoodsVo.dao().analyCondition(sysItemCondition);
										if (UtilString.isNotEmpty(goodCondition)) {
											itemIds.append(goodCondition);
										}
									}
									String goodsCondition = kdPointActivity.getGoodsCondition();
									if (UtilString.isNotEmpty(goodsCondition)) {
										GoodsConditionVo goodsConditionVo = new GoodsConditionVo();
										String goodsConditions = goodsConditionVo
												.analysisGoodsCondition(goodsCondition);
										itemIds.append(goodsConditions);
									}

									if (UtilString.isNotEmpty(shopIds)) {
										String[] sIds = shopIds.split(",");
										for (String id : sIds) {
											if (id.equals(kdPointTradeNotify.getShopCode())) {
												flag = true;
											}
										}
									}
									// 如果店铺不为空，根据购买商品计算积分
									if (UtilString.isNotEmpty(UtilString.toString(itemIds))) {
										String[] ids = UtilString.split(UtilString.toString(itemIds), ",");
										if (ids.length > 0) {
											for (String id : ids) {
												if (UtilString.isNotEmpty(id)) {
													goodsIds.add(id);
												}
											}
										}
										// 代表是参与所有客户
										if (0 == activityType) {
											if (UtilString.isEmpty(shopIds)) {
												// 判断商品是否为空
												if (!UtilString.isEmpty(UtilString.toString(itemIds))) {
													// 判断该笔交易会员所买商品是否在规则范围内
													if (null != infoVos && infoVos.size() > 0) {
														for (OrderInfoVo info : infoVos) {
															if (goodsIds.contains(info.getSysItemId())) {
																// 计算该商品送的积分
																double orderPayment = info.getOrderPayment();
																// 通过积分规则去换算积分
																goodsCount += pointRuleCountVo
																		.calculatingPoint(kdPointRule, orderPayment);
															}
														}
													}
												}
											} else if (flag) {
												// 判断该笔交易会员所买商品是否在规则范围内
												if (null != infoVos && infoVos.size() > 0) {
													for (OrderInfoVo info : infoVos) {
														if (goodsIds.contains(info.getSysItemId())) {
															// 计算该商品送的积分
															double orderPayment = info.getOrderPayment();
															// 通过积分规则去换算积分
															goodsCount += pointRuleCountVo.calculatingPoint(kdPointRule,
																	orderPayment);
														}
													}
												}

											}
										}
									} else if (1 == activityType) {
										// 获取该活动的id
										int id = kdPointActivity.getId();
										// 通过会员id和品牌id和活动id获取会员参与的积分活动
										KdPointMarketingGroup kdPointMarketingGroups = groupService
												.findPointmarketintGroupList(sysCustomerId, brandId, id);
										if (null != kdPointMarketingGroups) {
											if (UtilString.isEmpty(shopIds)) {
												// 判断商品是否为空
												if (!UtilString.isEmpty(UtilString.toString(itemIds))) {
													// 判断该笔交易会员所买商品是否在规则范围内
													if (null != infoVos && infoVos.size() > 0) {
														for (OrderInfoVo info : infoVos) {
															if (goodsIds.contains(info.getSysItemId())) {
																// 计算该商品送的积分
																double orderPayment = info.getOrderPayment();
																// 通过积分规则去换算积分
																goodsCount += pointRuleCountVo
																		.calculatingPoint(kdPointRule, orderPayment);
															}
														}
													}
												}
											} else if (flag) {
												// 判断该笔交易会员所买商品是否在规则范围内
												if (null != infoVos && infoVos.size() > 0) {
													for (OrderInfoVo info : infoVos) {
														if (goodsIds.contains(info.getSysItemId())) {
															// 计算该商品送的积分
															double orderPayment = info.getOrderPayment();
															// 通过积分规则去换算积分
															goodsCount += pointRuleCountVo.calculatingPoint(kdPointRule,
																	orderPayment);
														}
													}
												}

											}
										}
									}
								}
								if (goodsCount > 0.0) {
									if (0 == kdPointActivity.getType() && null != kdPointActivity.getAppendPoint()
											&& kdPointActivity.getAppendPoint().longValue() > 0) {
										activityCount = kdPointActivity.getAppendPoint().longValue();
									} else if (1 == kdPointActivity.getType()
											&& null != kdPointActivity.getDoublePoint()
											&& kdPointActivity.getDoublePoint().longValue() > 0) {
										activityCount = goodsCount
												* (kdPointActivity.getDoublePoint().doubleValue() - 1);
									}
									totalCount.add(activityCount);
								}
							}
						}

					}
					if (totalCount.size() > 0) {
						for (double count : totalCount) {
							totalPoint += count;
						}
						BigDecimal pointLimit = kdPointRule.getPointLimit();
						if (pointLimit != null) {
							if (totalPoint > pointLimit.doubleValue()) {
								totalPoint = pointLimit.doubleValue();
							}
						}
					}
				}
			}
		}
		totalPoint = pointService.pointCalculationByOrder(kdPointRule, totalPoint);
		return totalPoint;
	}

}
