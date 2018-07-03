package com.nascent.ecrpsaas.plus.ziyan.dispatch.task;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

import com.nascent.api.util.UtilDate;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.MqMessageDeleteService;
import com.nascent.plugins.spring.SpringContext;

/**
 * 描述： mq消息删除服务<br>
 * 类名：
 * 创建人jingqiang<br>
 * 创建时间：2017年12月22日 上午9:00:25<br>
 * 修改人：<br>
 * 修改时间：<br>
 * 修改描述：<br>
 */
public class MqMessageDeleteJob {
	Logger logger = LoggerFactory.getLogger(MqMessageDeleteJob.class);
	@Autowired
	private MqMessageDeleteService mqMessageDeleteService;

	public void messageDeleteJob() throws Exception {
		// 删除前10天的数据
		// yyyy-MM-dd 00:00:00
		String createTime = UtilDate.formatDate(UtilDate.addDay(new Date(), -10), UtilDate.DEFAULT_DATETIME_FORMAT);
		// 服务里面启用多线程操作
		ThreadPoolTaskScheduler scheduler = (ThreadPoolTaskScheduler) SpringContext.me().getBean("message_delete_scheduler");
		scheduler.execute(new Runnable() {
			@Override
			public void run() {
				try {
					mqMessageDeleteService.deleteMessage(createTime);
				} catch (Exception e) {
					logger.error("mq消息删除数据失败！", e);

				}
			}
		});
	}

}
