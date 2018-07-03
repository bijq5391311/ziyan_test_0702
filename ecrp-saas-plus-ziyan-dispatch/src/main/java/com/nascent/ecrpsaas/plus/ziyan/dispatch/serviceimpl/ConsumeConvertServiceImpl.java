package com.nascent.ecrpsaas.plus.ziyan.dispatch.serviceimpl;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nascent.api.util.UtilDate;
import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.model.KdPointTradeNotify;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.ConsumeConvertService;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.ConsumeExcludeService;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.vo.KdBrandCustomeVo;
import com.nascent.ecrpsaas.plus.ziyan.vip.model.ZyConsumeValueLog;
import com.nascent.ecrpsaas.plus.ziyan.vip.model.ZyConsumeValueRule;
import com.nascent.ecrpsaas.vip.model.KdCustomer;
import com.nascent.utils.query.CommonResult;

@Service("consumeConvertService")
public class ConsumeConvertServiceImpl implements ConsumeConvertService {
	// 日志记录工具类
	Logger logger = LoggerFactory.getLogger(ConsumeConvertServiceImpl.class);
	@Autowired
	ConsumeExcludeService consumeExcludeService;

	// 通过消费规则换算消费值
	public synchronized CommonResult exchangeConsumeValue(KdPointTradeNotify kdPointTradeNotify,KdBrandCustomeVo customerBrand) {
		CommonResult commonResult = new CommonResult(true);
		ZyConsumeValueRule consumeValueRule = ZyConsumeValueRule.dao().loadConsumeValueRule();
		KdCustomer customer = KdCustomer.dao().loadByCustomerId(kdPointTradeNotify.getSysCustomerId());
		if (null != customer) {
			Integer isActive = customer.getIsActivate();
			if(isActive != 1){
				logger.info("该会员还没有激活！");
				commonResult.setFailed();
				return commonResult;
			}
		}
		int sysTotal = 0;
		if (null != consumeValueRule) {
			if (consumeValueRule.getIsOpen() == 0) {
				logger.info("该渠道消费值规则没开启！");
				commonResult.setFailed();
				return commonResult;
			}
			// 查看会员信息，看是不是要排除的会员
			long sysid = kdPointTradeNotify.getSysCustomerId();
			// 修改会员的消费值
			//KdBrandCustomeVo customerBrand = KdBrandCustomeVo.dao().loadBrandCustomer(sysid);
			if (null != customerBrand) {
				// 如果开启总的黑名单过滤 则黑名单用户不进行升级
				if (consumeValueRule.getFRightBlack() == 1) {
					if (customerBrand.getIsRightBlack() == 1) {
						// 是黑名单用户
						logger.info("客户:" + kdPointTradeNotify.getSysCustomerId() + "黑名单客户不进行兑换消费值操作");
						return commonResult.setFailed();
					}
				}
				// 根据规则兑换消费值
				CommonResult result = consumeExcludeService.removePointcuntBypointRule(kdPointTradeNotify,
						consumeValueRule);
				if ("1".equals(result.getCode())) {
					Map<String, Object> map = (Map<String, Object>) result.getResult();
					double temp = 0;
					int consumeTemp = 0;
					Object consumeValue = map.get("consumeValue");
					if (null != consumeValue) {
						consumeTemp = (int) consumeValue;
					}
					Object num = map.get("tradePayment");
					if (null != num) {
						temp =  (double)num;
					}else {
						temp = kdPointTradeNotify.getTradePayment();
					}
					double consume = ConsumeCalculationByOrder(consumeValueRule, temp);
					double total = consume + consumeTemp;
					String[] data = UtilString.split(UtilString.toString(total), ".");
					int tempTotal = UtilString.toInt(data[0]);
					int countTotal = customerBrand.getConsumeTotal();
					sysTotal = tempTotal + countTotal;
					KdBrandCustomeVo.dao().updateCustomerBrand(sysid, sysTotal);
				    long systradeId =   kdPointTradeNotify.getSysTradeId();
					ZyConsumeValueLog consumeLog = ZyConsumeValueLog.dao().findById(sysid,String.valueOf(systradeId));
					if (null == consumeLog &&  tempTotal >0)  {
						ZyConsumeValueLog consumeValueLog =  new ZyConsumeValueLog();
						consumeValueLog.setAction(0);
						consumeValueLog.setActionSource(UtilString.toString(systradeId));
						consumeValueLog.setConsumeValue(tempTotal);
						//当前总消费值
						consumeValueLog.setOldConsumeValue(sysTotal);
						consumeValueLog.setConsumeValueFromType(0);
						consumeValueLog.setSysCustomerId(sysid);
						consumeValueLog.setGenerateTime(UtilDate.now());
						consumeValueLog.save();
					}
					return null;
				}

			}
		}

		return null;

	}

	private double ConsumeCalculationByOrder(ZyConsumeValueRule consumeValueRule, double payment) {
		// 记录积变量
		double tempPointcount = 0.00;
		double totalPointcount = 0.00;
		// 获取多少元兑换1积分
		BigDecimal pointPrice = consumeValueRule.getConsumeValuePrice();
		// 计算送的积分
		tempPointcount += payment / pointPrice.longValue();
		BigDecimal pointLimit = consumeValueRule.getConsumeValueLimit();
		if (pointLimit != null) {
			if (tempPointcount > pointLimit.doubleValue()) {
				tempPointcount = pointLimit.doubleValue();
			}
		}
		// 获取积分取整规则,0想上取整,1向下取整,2四舍5入,3保留两位小数默认为0
		int pointRound = consumeValueRule.getConsumeValueRound();
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
