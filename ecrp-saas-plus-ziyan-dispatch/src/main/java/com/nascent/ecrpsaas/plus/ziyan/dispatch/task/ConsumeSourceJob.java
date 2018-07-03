package com.nascent.ecrpsaas.plus.ziyan.dispatch.task;

import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.CustomerSourcService;
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
public class ConsumeSourceJob {
	
	private CustomerSourcService customerSourcService = SpringContext.me().getBean(CustomerSourcService.class);

	public void consumeDownJob() throws Exception {
		// 服务里面启用多线程操作
		ThreadPoolTaskScheduler scheduler = (ThreadPoolTaskScheduler) SpringContext.me().getBean("customerSource_scheduler");
		scheduler.execute(new Runnable() {
			@Override
			public void run() {
				try {
					customerSourcService.customerSourService();
				} catch (Exception e) {
				
				}
			}
		});
	}


}
