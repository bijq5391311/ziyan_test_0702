package com.nascent.ecrpsaas.plus.ziyan.dispatch.task;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.MemberGradeDownService;
import com.nascent.plugins.spring.SpringContext;

/**
 * 描述： 会员Vip降级服务<br>
 * 类名：SmsBackJob<br>
 * 创建人：高景玉<br>
 * 创建时间：2017年12月22日 上午9:00:25<br>
 * 修改人：<br>
 * 修改时间：<br>
 * 修改描述：<br>
 */
public class MemberGradeDownJob {
	
	Logger logger = LoggerFactory.getLogger(MemberGradeDownJob.class);
	private MemberGradeDownService memberGradeDownService = SpringContext.me().getBean(MemberGradeDownService.class);
	
	public synchronized void memberGradeDown() throws Exception {
		// 服务里面启用多线程操作
		ThreadPoolTaskScheduler scheduler = (ThreadPoolTaskScheduler) SpringContext.me().getBean("member_grade_down_scheduler");
		scheduler.execute(new Runnable() {
			@Override
			public void run() {
				try {
					memberGradeDownService.processMemberGradeDown();
				} catch (Exception e) {
					logger.error("会员Vip降级失败！",e);
					e.printStackTrace();

				}
			}
		});
	}

}
