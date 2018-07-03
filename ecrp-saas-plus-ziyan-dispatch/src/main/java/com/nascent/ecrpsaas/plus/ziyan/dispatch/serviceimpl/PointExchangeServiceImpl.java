package com.nascent.ecrpsaas.plus.ziyan.dispatch.serviceimpl;

import java.math.BigDecimal;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.nascent.ecrpsaas.base.constat.StateEnum;
import com.nascent.ecrpsaas.base.util.UtilDate;
import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.model.KdPointLog;
import com.nascent.ecrpsaas.model.KdPointRule;
import com.nascent.ecrpsaas.model.KdPointTradeNotify;
import com.nascent.ecrpsaas.plus.ziyan.Integral.service.ZyKdPointRuleService;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.ConsumeConvertService;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.PointActivityExchangeService;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.PointExchangeService;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.PointRewardExchangeService;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.PointRuleExchangeIntegralService;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.vo.KdBrandCustomeVo;
import com.nascent.ecrpsaas.service.KdPointTradeNotifyService;
import com.nascent.ecrpsaas.service.PointLogService;
import com.nascent.ecrpsaas.vip.model.KdCustomerBrand;
import com.nascent.ecrpsaas.vip.service.KdCustomerBrandService;
/**
 * 描述： 积分兑换积分服务入口<br>
 * 类名：PointExchangeServiceImpl<br>
 * 创建人：高景玉<br>
 * 创建时间：2017年10月19日 下午13:00:25<br>
 * 修改人：<br>
 * 修改时间：<br>
 * 修改描述：<br>
 */
import com.nascent.plugins.spring.SpringContext;
import com.nascent.utils.query.CommonResult;

@Service("zypointExchangeService")
public class PointExchangeServiceImpl implements PointExchangeService {
	// 积分通知服务数据接口
	private KdPointTradeNotifyService kdPointTradeNotifyService = SpringContext.me()
			.getBean(KdPointTradeNotifyService.class);
	// 通过积分规则获取积分
	private PointRuleExchangeIntegralService pointRuleExchangeIntegralService = SpringContext.me()
			.getBean(PointRuleExchangeIntegralService.class);
	// 通过积分奖励兑换积分
	private PointRewardExchangeService pointRewardExchangeService = SpringContext.me()
			.getBean(PointRewardExchangeService.class);
	// 通过积分奖励兑换积分
	private PointActivityExchangeService pointActivityExchangeService = SpringContext.me()
			.getBean(PointActivityExchangeService.class);
	// 通过积分奖励兑换积分
	private KdCustomerBrandService kdCustomerBrandService = SpringContext.me().getBean(KdCustomerBrandService.class);
	// 积分日志
	private PointLogService logService = SpringContext.me().getBean(PointLogService.class);
	private ConsumeConvertService consumeConvertService = SpringContext.me().getBean(ConsumeConvertService.class);
	// 积分规则数据接口
	private ZyKdPointRuleService kdPointRuleService = SpringContext.me().getBean(ZyKdPointRuleService.class);

	// 日志记录工具类
	Logger logger = LoggerFactory.getLogger(PointExchangeServiceImpl.class);

	// 积分服务入口
	@Override
	public synchronized void pointExchangeJob() {
		// 获取返回值
		CommonResult commonResult = new CommonResult();
		// 获取积分规则换算的积分
		double pointRuleCount = 0;
		double pointActivityCount = 0;
		int pageIndex = 0;
		int pageSize = 500;
		int count = 0;
		do {
			// 获取积分奖励兑换的积分
			double rewordCount = 0;
			// 获取积分交易通知记录每也100条
			List<KdPointTradeNotify> kdPointTradeNotifies = kdPointTradeNotifyService
					.findPointTradeNotifyList(pageIndex * pageSize, pageSize);
			if (null != kdPointTradeNotifies && kdPointTradeNotifies.size() > 0) {
				count = kdPointTradeNotifies.size();
				// 遍历积分交易记录换算积分
				for (KdPointTradeNotify kdPointTradeNotify : kdPointTradeNotifies) {
					// 修改品牌会员的积分
					KdBrandCustomeVo customerBrand = KdBrandCustomeVo.dao().loadBrandCustomer(kdPointTradeNotify.getSysCustomerId());
					// 计算会员的消费值
					consumeConvertService.exchangeConsumeValue(kdPointTradeNotify,customerBrand);
					// 计算积分规则兑换的积分
					// 获取交易的所属品牌
					String zyChannel = kdPointTradeNotify.getExpValues();
					// 通过品牌获取积分规则
					KdPointRule kdPointRule = kdPointRuleService.loadZyKdPointRule(zyChannel);
					commonResult = pointRuleExchangeIntegralService.exchangePointRuleIntegral(kdPointTradeNotify,kdPointRule);
					if (commonResult.isSuccess()) {
						pointRuleCount = Double.valueOf(commonResult.getResult().toString()) ;
						// 计算积分奖励兑换积分
						rewordCount = pointRewardExchangeService.exchangePointRewardIntegral(kdPointTradeNotify,
								pointRuleCount,kdPointRule);
						// 计算积分活动兑换的积分
						pointActivityCount = pointActivityExchangeService
								.exchangePointActivityIntegral(kdPointTradeNotify,kdPointRule);
						
						// 计算该交易兑换的所有积分
						double total = pointRuleCount + rewordCount + pointActivityCount;
						/*// 修改品牌会员的积分
						KdCustomerBrand customerBrand = kdCustomerBrandService
								.queryCustomerBrandInfoByCustomerId(kdPointTradeNotify.getSysCustomerId());*/
						
//						KdBrandCustomeVo customerBrand = KdBrandCustomeVo.dao().loadBrandCustomer(sysid);
						// 获取会员当前交易总积分
						double tradeTotalscore = 0;
						
						if (null != Double.valueOf(customerBrand.getTradeTotalScore())) {
							tradeTotalscore = customerBrand.getTradeTotalScore();
						}
						double score = 0;
						if (tradeTotalscore > 0) {
							score = total + tradeTotalscore;
						} else {
							score = total;
						}
						// 获取会员当前总积分
						// long currentScore =
						// customerBrand.getscore().longValue();
						// currentScore += total;
						//customerBrand.setTradeTotalScore(score);
						// customerBrand.setscore(BigDecimal.valueOf(currentScore));
						// 更新会员信息
						KdBrandCustomeVo.dao().updateCustomerBrandTradeTotalScore(kdPointTradeNotify.getSysCustomerId(), score);
						//kdCustomerBrandService.saveOrUpdate(customerBrand);
						// 记录会员积分换算日志
						KdPointLog log = new KdPointLog();
						String remark = "积分规则送：" + commonResult.getResult() + " 积分," + "积分活动送" + pointActivityCount
								+ "积分," + "积分奖励送" + rewordCount + "积分";
						// 1代表营销送积分
						log.setaction(StateEnum.EFFECTIVE.getValue());
						// 27代表交易活动
						log.setActivityType(27);
						// 代表积分增加
						log.setoperation(StateEnum.EFFECTIVE.getValue());
						log.setShopCode(kdPointTradeNotify.getShopCode());
						log.setSysCustomerId(kdPointTradeNotify.getSysCustomerId());
						log.setTargetId(kdPointTradeNotify.getSysTradeId());
						log.setPointFromName("交易送积分");
						log.setremark(remark);
						log.setSynStatus(StateEnum.INVALID.getValue());
						log.setpoint(BigDecimal.valueOf(total));
						log.setBrandId(kdPointTradeNotify.getBrandId());
						log.setPointCreateTime(UtilDate.now());
						logService.saveOrUpdate(log);
						// 同时将已处理的交易将其状态修改为0
						kdPointTradeNotify.setstate(StateEnum.INVALID.getValue());
						kdPointTradeNotifyService.saveOrUpdate(kdPointTradeNotify);
					} else {
						// 同时将已处理的交易将其状态修改为0
						kdPointTradeNotify.setstate(StateEnum.INVALID.getValue());
						kdPointTradeNotifyService.saveOrUpdate(kdPointTradeNotify);
					}
				}
			} else {
				break;
			}
			// 下一页
			pageIndex++;
		} while (count == pageSize);

	}

}
