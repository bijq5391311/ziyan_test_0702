package org.ecrp.saas.ingest.pipeline;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;

import com.nascent.ecrpsaas.ingest.parser.StringXmlApplicationContext;
import com.nascent.plugins.sqlinxml.SqlKit;

import junit.framework.TestCase;

public class JobLoaderTest extends TestCase{

	public void testApp() throws Exception
    {
		Path root = Paths.get(SqlKit.getConfigRoot(),"applicationContext.xml");
		byte[] appCtx = Files.readAllBytes(root);
		
		Path path = Paths.get(SqlKit.getConfigRoot(),"job.xml");
		byte[] jobs = Files.readAllBytes(path);
		
		StringXmlApplicationContext ctx = 
				new StringXmlApplicationContext()
				.addResource("applicationContext.xml", new String(appCtx))
				.addResource("job.xml","job1:", new String(jobs))
				.registerTasklets("job1:",
						new String(Files.readAllBytes(
								Paths.get(SqlKit.getConfigRoot()+"/node-def2.xml"))))
				;
		
		ctx.refresh();
		
		Job testJob = (Job)ctx.getBean("job1");

		JobLauncher launcher = (JobLauncher)ctx.getBean("jobLauncher");
		
		JobParameters p = new JobParameters();
		JobParametersBuilder pb = new JobParametersBuilder();
		pb.addString("buyernick","boc001")
			.addString("EMail","b01@alipay.com");
		launcher.run(testJob, pb.toJobParameters());
		
		assertEquals(testJob.getName(),"job1");
    }
	
	private HashMap<String,Object> getJobParam(){
    	HashMap<String,Object> obj = new HashMap<String,Object>();
    	obj.put("buyernick","boc001");
    	obj.put("EMail","b01@alipay.com");
    	
    	HashMap<String,Object> receiver = new HashMap<String,Object>();
    	receiver.put("city", "厦门市");
    	receiver.put("phone", "138599098233");
    	
    	obj.put("receiver", receiver);
    	return obj;
    }
}
