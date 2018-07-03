package com.nascent.ecrpsaas.plus.ziyan.dispatch.task;

import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.ZyTradeRefundService;
import com.nascent.plugins.spring.SpringContext;

/**
 * 描述： 用户来源你<br>
 * 类名：ConsumeSourceJob<br>
 * 
 * 
 * 修改人：<br>
 * 修改时间：<br>
 * 修改描述：<br>
 */
public class ZyTradeRefundJob {
	
	private ZyTradeRefundService zyTradeRefundService = SpringContext.me().getBean(ZyTradeRefundService.class);

	public void zyTradeRefundJob() throws Exception {
		// 服务里面启用多线程操作
		ThreadPoolTaskScheduler scheduler = (ThreadPoolTaskScheduler) SpringContext.me().getBean("zyTradeRefundJob_scheduler");
		scheduler.execute(new Runnable() {
			@Override
			public void run() {
				try {
					zyTradeRefundService.zyTradeRefundService();
				} catch (Exception e) {
				
				}
			}
		});
	}


}
