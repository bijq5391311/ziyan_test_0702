package com.nascent.ecrpsaas.plus.ziyan.dispatch.serviceimpl;

import com.nascent.ecrpsaas.base.util.UtilDate;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.ConsumeDownServiceJob;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.vo.KdBrandCustomeVo;
import com.nascent.ecrpsaas.plus.ziyan.vip.model.ZyConsumeValueLog;
import com.nascent.ecrpsaas.plus.ziyan.vip.model.ZyConsumeValueRule;
import com.nascent.ecrpsaas.plus.ziyan.vip.service.ConsumeValueDownService;
import com.nascent.ecrpsaas.plus.ziyan.vip.service.ZyConsumeValueLogService;
import com.nascent.plugins.spring.SpringContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.Date;
import java.util.List;
/**
 * 描述： 消费值衰减服务<br>
 * 类名：ConsumeDownServiceImpl<br>
 * 创建人：高景玉<br>
 * 创建时间：2017年12月22日 上午9:00:25<br>
 * 修改人：<br>
 * 修改时间：<br>
 * 修改描述：<br>
 */
@Service("consumeDownServiceJob")
public class ConsumeDownServiceJobImpl implements ConsumeDownServiceJob {
	Logger logger = LoggerFactory.getLogger(ConsumeDownServiceJobImpl.class);
	
	private ConsumeValueDownService consumeValueDownService = SpringContext.me().getBean(ConsumeValueDownService.class);
	private ZyConsumeValueLogService zyConsumeValueLogService = SpringContext.me().getBean(ZyConsumeValueLogService.class);
	@Override
	public synchronized boolean consumeDownJob() {
       //获取消费值规则
		ZyConsumeValueRule consumeValueRule = consumeValueDownService.loadConsumeValueRule();
		if(null == consumeValueRule){
			logger.info("不好意思，您还没有设置消费值规则！");
			return false;
		}else {
			int isOpen = consumeValueRule.getIsOpen();
			if(isOpen == 0){
				logger.info("不好意思，您还没有开启消费值规则！");
				return false;
			}
			//获取规则信息
			int dacayTime = consumeValueRule.getDecayTime();
			int decayValue =  consumeValueRule.getDecayValue();
			for (int pageIndex = 1, pageSize = 100; ; pageIndex++) {
				List<KdBrandCustomeVo> customerBrands = KdBrandCustomeVo.dao().queryCustomerBrandList(pageIndex, pageSize);
				if (customerBrands == null || customerBrands.isEmpty ()) {
					break;
				}
				// 批次处理有新交易的客户,是否满足升级
				logger.info(MessageFormat.format("查询成交客户{0}条.", customerBrands.size()));
				for (KdBrandCustomeVo customerBrand : customerBrands) {
					// 公用参数
					long sysCustomerId = customerBrand.getSysCustomerId();
					// 调用会员是否升级
					Date updateTime = customerBrand.getUpdateTime();
					Date downDate =  UtilDate.addDay(updateTime, dacayTime);
					//消费值衰减距离今天的天数
					long days =  UtilDate.getBetweenDaysByDay(downDate,UtilDate.now());
					if(days == 0){
						// 获取会员的消费值
						int consumeTotal = customerBrand.getConsumeTotal();
						if(0 < consumeTotal){
							int betweenValue = consumeTotal - decayValue;
							if(0 > betweenValue){
								betweenValue = 0;
							}
							//修改会员的消费值
							int countValue  = 	KdBrandCustomeVo.dao().updateCustomerBrand(sysCustomerId, betweenValue);
							if(0 <  countValue){
								//记录消费值日志
								ZyConsumeValueLog   zyConsumeValueLog = new ZyConsumeValueLog();
								zyConsumeValueLog.setOldConsumeValue(betweenValue);
								zyConsumeValueLog.setConsumeValue(decayValue);
								zyConsumeValueLog.setSysCustomerId(sysCustomerId);
								zyConsumeValueLog.setGenerateTime(UtilDate.now());
								zyConsumeValueLog.setExhausted(1);
								zyConsumeValueLog.setConsumeValueFromType(2);
								zyConsumeValueLog.setAction(1);
								zyConsumeValueLogService.saveZyConsumeValueLog(zyConsumeValueLog);
							}

						}

					}
				}
			}
		}
		return false;
	}

}
