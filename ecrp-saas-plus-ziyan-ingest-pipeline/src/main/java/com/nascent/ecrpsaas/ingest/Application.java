package com.nascent.ecrpsaas.ingest;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;

import com.nascent.ecrpsaas.ingest.parser.StringXmlApplicationContext;
import com.nascent.plugins.sqlinxml.SqlKit;

public class Application {
	private static Logger logger = LoggerFactory.getLogger(Application.class);
	
	public static void main(String[] args){
		Path root = Paths.get(SqlKit.getConfigRoot(),"applicationContext.xml");
		byte[] appCtx;
		try {
			appCtx = Files.readAllBytes(root);
		} catch (IOException e) {
			throw new IllegalArgumentException("applicationContext.xml not found!",e);
		}
		
		StringXmlApplicationContext ctx = 
				new StringXmlApplicationContext()
				.addResource("applicationContext.xml", new String(appCtx))
				;
		ctx.refresh();
		
		DataSource ds = (DataSource)ctx.getBean("dataSource");
		List<Map<String,Object>> flows = new JdbcTemplate(ds).queryForList(
				"select * from data_access_rule where state=1");
		
		if(!flows.isEmpty()){
			for(Map<String,Object> flow : flows){
				String jobName = flow.get("code").toString();
				String jobPrefix = flow.get("code").toString()+":";
				ctx.addResource(jobName,jobPrefix, flow.get("job_xml").toString())
					.registerTasklets(jobPrefix,flow.get("rule_xml").toString());
			}
			ctx.refresh();
		}
		
		logger.info("==========Ingest Job is ready==========");
		/*while(true){
			try {
				System.in.read();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}*/
		
	}
}
