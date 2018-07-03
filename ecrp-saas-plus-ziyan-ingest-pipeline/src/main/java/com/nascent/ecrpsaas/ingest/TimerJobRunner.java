package com.nascent.ecrpsaas.ingest;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.sql.DataSource;

import org.codehaus.groovy.ast.stmt.LoopingStatement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.support.AbstractXmlApplicationContext;
import org.springframework.core.task.TaskExecutor;
import org.springframework.jdbc.core.JdbcTemplate;

import com.nascent.ecrpsaas.ingest.parser.StringXmlApplicationContext;
import com.nascent.plugins.taobao.StringUtils;


public class TimerJobRunner {
	private static Logger logger = LoggerFactory.getLogger(TimerJobRunner.class);

	public TaskExecutor taskExecutor;
	public TaskExecutor getTaskExecutor() {
		return taskExecutor;
	}
	public void setTaskExecutor(TaskExecutor taskExecutor) {
		this.taskExecutor = taskExecutor;
	}
	private ConcurrentHashMap<String,Object> runningJobs = new ConcurrentHashMap<>();
	public void run(){
		AbstractXmlApplicationContext ctx = StringXmlApplicationContext.me();
		DataSource ds = (DataSource) ctx.getBean("dataSource");
		List<Map<String,Object>> flows = new JdbcTemplate(ds).queryForList(
				"select * from data_access_rule where state=1 and timed_task=1");
		
		logger.info("'{}' jobs ready to run...",flows.size());
		JobLauncher launcher = (JobLauncher)ctx.getBean("jobLauncher");
		for(Map<String,Object> flow : flows){
			String jobCode = flow.get("code").toString();
			String context = "";
			JobParametersBuilder pb = new JobParametersBuilder();
			pb.addDate("data", new Date());
			if(!StringUtils.isEmpty(context)){
				//TODO: pb.addParameters(.....JSON....)
			}
			
			if(!runningJobs.containsKey(jobCode)){
				taskExecutor.execute(new Runnable(){
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
				});
			}
			
		}
	}
}
