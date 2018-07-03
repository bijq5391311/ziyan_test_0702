package com.nascent.ecrpsaas.plus.ziyan.dispatch.serviceimpl;

import java.math.BigDecimal;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.nascent.ecrpsaas.base.util.UtilDate;
import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.model.KdPointRule;
import com.nascent.ecrpsaas.model.KdPointTradeNotify;
import com.nascent.ecrpsaas.plus.ziyan.Integral.service.ZyKdPointRuleService;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.PointRewardExchangeService;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.PointService;
import com.nascent.ecrpsaas.vip.model.GradeRule;
import com.nascent.ecrpsaas.vip.model.GradeRuleDetail;
import com.nascent.ecrpsaas.vip.model.KdCustomer;
import com.nascent.ecrpsaas.vip.service.GraderuledetailService;
import com.nascent.plugins.spring.SpringContext;

/**
 * 描述： 积分奖励兑换积分<br>
 * d 类名：PointRuleExchangeIntegralServiceImpl<br>
 * 创建人：高景玉<br>
 * 创建时间：2017年10月18日 上午20:00:25<br>
 * 修改人：<br>
 * 修改时间：<br>
 * 修改描述：<br>
 */
@Service("zypointRewardExchangeService")
public class PointRewardExchangeServiceImpl implements PointRewardExchangeService {
	// 日志记录工具类
	Logger logger = LoggerFactory.getLogger(PointRewardExchangeServiceImpl.class);
	// 等级规则服务
	private GraderuledetailService graderuledetailService = SpringContext.me().getBean(GraderuledetailService.class);
	// 积分规则数据接口
	private ZyKdPointRuleService kdPointRuleService = SpringContext.me().getBean(ZyKdPointRuleService.class);
	
	// 积分规则兑换积分
	private PointService pointService = SpringContext.me().getBean(PointService.class);

	@Override
	public String getName() {
		return "pointRewardExchangeService";
	}

	/**
	 * //通过积分奖励换算积分
	 * 
	 * @param kdPointTradeNotify
	 *            交易通知记录
	 * @param pointRuleount
	 *            积分规则兑换的积分
	 * @return
	 */
	@Override
	public double exchangePointRewardIntegral(KdPointTradeNotify kdPointTradeNotify, double pointRuleount,KdPointRule kdPointRule) {
		// 积分奖励获取积分
		double rewardCount = 0;
		int memberGrade = kdPointTradeNotify.getMemberGrade();
		int brandId = kdPointTradeNotify.getBrandId();
		/*// 获取交易的所属品牌
		String zyChannel = kdPointTradeNotify.getExpValues();
		// 通过品牌获取积分规则
		KdPointRule kdPointRule = kdPointRuleService.loadZyKdPointRule(zyChannel);*/
		long sysCustomerId = kdPointTradeNotify.getSysCustomerId();
		KdCustomer kdCustomer = KdCustomer.dao().loadByCustomerId(sysCustomerId);
		Date birthday = null;
		String[] month;
		String bmonth = "";
		String currentMonth = "";
		if (null != kdCustomer) {
			birthday = kdCustomer.getbirthday();
			String memberCard = kdCustomer.getMemberCard();
			String mobile = kdCustomer.getmobile();
			String openId = kdCustomer.getKdOpenId();
			if(memberCard.equals("NULL")){
				memberCard = null;
			}
			if (UtilString.isNotEmpty(memberCard) || UtilString.isNotEmpty(mobile) || UtilString.isNotEmpty(openId)) {
				
				if (null != birthday) {
					month = UtilString.split(UtilString.toString(birthday), "-");
					bmonth = month[1];
					currentMonth = UtilDate.getMonth();
					// 通过会员等级和品牌获取等级详细信息
					// 获取升级体系规则
					GradeRule gradeRule = GradeRule.dao().getGradeRuleByBrandId(brandId);
					if (null != gradeRule && bmonth.equals(currentMonth)) {
						GradeRuleDetail gradeRuleDetail = graderuledetailService.getGradeRuleDetail(gradeRule.getId(),
								memberGrade);
						// 获取会员信息，判断会员是否是生日月
						if (null != gradeRuleDetail) {
							int rewardType = gradeRuleDetail.getSendRewardType();
							BigDecimal rewradPoints = gradeRuleDetail.getRewardPoints();
							BigDecimal limit = kdPointRule.getPointLimit();
							if (null != limit) {
								if (rewardCount > limit.doubleValue()) {
									rewardCount = limit.doubleValue();
								}
							}
							if (null != rewradPoints) {
								// 0:多送，1：倍送
								if (0 == rewardType) {
									rewardCount = rewradPoints.doubleValue();
								} else if (1 == rewardType && rewradPoints.doubleValue()>1) {
									rewardCount = pointRuleount * (rewradPoints.doubleValue() - 1);
								}

							}
						}
					}
				}
			}
		}
		rewardCount = pointService.pointCalculationByOrder(kdPointRule, rewardCount);
		return rewardCount;
	}

}
