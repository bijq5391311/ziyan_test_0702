package com.nascent.ecrpsaas.ingest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import javax.sql.DataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.batch.core.repository.support.MapJobRepositoryFactoryBean;
import org.springframework.context.support.AbstractXmlApplicationContext;
import org.springframework.core.task.TaskExecutor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

import com.nascent.ecrpsaas.ingest.parser.StringXmlApplicationContext;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.taobao.StringUtils;


public class JobRunner {
	private static Logger logger = LoggerFactory.getLogger(JobRunner.class);

	public TaskExecutor taskExecutor;
	public TaskExecutor getTaskExecutor() {
		return taskExecutor;
	}
	public void setTaskExecutor(TaskExecutor taskExecutor) {
		this.taskExecutor = taskExecutor;
	}
    private ThreadPoolTaskScheduler scheduler;
	
	public ThreadPoolTaskScheduler getScheduler() {
		return scheduler;
	}
	public void setScheduler(ThreadPoolTaskScheduler scheduler) {
		this.scheduler = scheduler;
	}
	private ConcurrentHashMap<String,Object> runningJobs = new ConcurrentHashMap<>();
	public void run(){
		SpringContext.me().getBean(MapJobRepositoryFactoryBean.class).clear();
		AbstractXmlApplicationContext ctx = StringXmlApplicationContext.me();
		DataSource ds = (DataSource) ctx.getBean("dataSource");
		List<Map<String,Object>> flows = new JdbcTemplate(ds).queryForList(
				"select * from data_access_rule where state=1");
		
		logger.info("'{}' jobs ready to run...",flows.size());
		JobLauncher launcher = (JobLauncher)ctx.getBean("jobLauncher");
		List<Future> futures =new ArrayList<>();
		for(Map<String,Object> flow : flows){
			String jobCode = flow.get("code").toString();
			String context = "";
			JobParametersBuilder pb = new JobParametersBuilder();
			pb.addDate("data", new Date());
			if(!StringUtils.isEmpty(context)){
				//TODO: pb.addParameters(.....JSON....)
			}
			
			if(!runningJobs.containsKey(jobCode)){
				
				futures.add(scheduler.submit(new Runnable(){
					@Override
					public void run() {
						if(runningJobs.containsKey(jobCode)) {
							return;
						}
						if(!ctx.containsBean(jobCode)){
							logger.info("job '{}' XML is not prepared, abort mission !",jobCode);
							return;
						}
						logger.info("launch job '{}' now.",jobCode);
						try {
							
							//runningJobs.put(jobCode, null);
							
							Job job = (Job)ctx.getBean(jobCode);
							
							launcher.run(job,pb.toJobParameters());
						} catch (JobExecutionAlreadyRunningException 
								| JobRestartException 
								| JobInstanceAlreadyCompleteException
								| JobParametersInvalidException e) {
							logger.warn(" job '{}' failed!",jobCode,e);
						}finally{
							runningJobs.remove(jobCode);
						}
					}
				}));
			}
			
		}
		for (Future future : futures) {
			try {
				future.get();
			} catch (ExecutionException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}
