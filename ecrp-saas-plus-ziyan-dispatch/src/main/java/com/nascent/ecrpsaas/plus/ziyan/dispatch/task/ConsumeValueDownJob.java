package com.nascent.ecrpsaas.plus.ziyan.dispatch.task;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.ConsumeDownServiceJob;
import com.nascent.plugins.spring.SpringContext;

/**
 * 描述： 消费值衰减服务<br>
 * 类名：SmsBackJob<br>
 * 创建人：高景玉<br>
 * 创建时间：2017年12月22日 上午9:00:25<br>
 * 修改人：<br>
 * 修改时间：<br>
 * 修改描述：<br>
 */
public class ConsumeValueDownJob {
	Logger logger = LoggerFactory.getLogger(ConsumeValueDownJob.class);
	private ConsumeDownServiceJob consumeDownService = SpringContext.me().getBean(ConsumeDownServiceJob.class);
	public synchronized void consumeDownJob() throws Exception {
		// 服务里面启用多线程操作
		ThreadPoolTaskScheduler scheduler = (ThreadPoolTaskScheduler) SpringContext.me().getBean("consume_down_scheduler");
		scheduler.execute(new Runnable() {
			@Override
			public void run() {
				try {
					consumeDownService.consumeDownJob();
				} catch (Exception e) {
					logger.error("消费值衰减失败！",e);
					e.printStackTrace();

				}
			}
		});
	}


}
