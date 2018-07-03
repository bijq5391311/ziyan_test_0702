package com.nascent.ecrpsaas.plus.ziyan.dispatch.task;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.MemberGradeUpService;
import com.nascent.plugins.spring.SpringContext;

/**
 * 描述： 会员Vip升级服务<br>
 * 类名：SmsBackJob<br>
 * 创建人：高景玉<br>
 * 创建时间：2017年8月11日 上午9:00:25<br>
 * 修改人：<br>
 * 修改时间：<br>
 * 修改描述：<br>
 */
public class MemberGradeUpJob {
	
	/**
	 * 会员Vip升级服务
	 */
	Logger logger = LoggerFactory.getLogger(MemberGradeUpJob.class);
	private MemberGradeUpService memberGradeUpService = SpringContext.me().getBean(MemberGradeUpService.class);
	
	public synchronized void memberGradeUp() throws Exception {
		// 服务里面启用多线程操作
		ThreadPoolTaskScheduler scheduler = (ThreadPoolTaskScheduler) SpringContext.me().getBean("member_grade_up_scheduler");
		scheduler.execute(new Runnable() {
			@Override
			public void run() {
				try {
					memberGradeUpService.processMemberGradeUp();
				} catch (Exception e) {
					logger.error("会员Vip升级失败！",e);
					e.printStackTrace();

				}
			}
		});
	}

}
