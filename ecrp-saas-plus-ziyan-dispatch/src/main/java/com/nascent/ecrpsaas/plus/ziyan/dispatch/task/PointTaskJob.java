package com.nascent.ecrpsaas.plus.ziyan.dispatch.task;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.PointExchangeService;
import com.nascent.plugins.spring.SpringContext;

/**
 * 描述：积分服务<br>
 * 类名：PointTaskJob<br>
 * 创建人：高景玉<br>
 * 创建时间：2017年12月26日 上午10:57:25<br>
 * 修改人：<br>
 * 修改时间：<br>
 * 修改描述：<br>
 */
public class PointTaskJob {
	
	// 日志记录工具类
		Logger logger = LoggerFactory.getLogger(PointTaskJob.class);
		private PointExchangeService pointExchangeService = SpringContext.me().getBean(PointExchangeService.class);
		
		public synchronized void pointTaskAudit() throws Exception {
			// 服务里面启用多线程操作
			ThreadPoolTaskScheduler scheduler = (ThreadPoolTaskScheduler) SpringContext.me()
					.getBean("point_scheduler");
			scheduler.execute(new Runnable() {
				@Override
				public void run() {
					try {
						
						pointExchangeService.pointExchangeJob();
					} catch (Exception e) {
						logger.error("积分服务失败！",e);
						e.printStackTrace();

					}
				}
			});
		}

}
