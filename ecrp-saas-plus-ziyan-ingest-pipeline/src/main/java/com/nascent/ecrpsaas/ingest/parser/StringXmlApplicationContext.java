package com.nascent.ecrpsaas.ingest.parser;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.AbstractXmlApplicationContext;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;

import com.nascent.ecrpsaas.ingest.processor.BaseTasklet;

public class StringXmlApplicationContext extends AbstractXmlApplicationContext {

	static StringXmlApplicationContext instance;
	public static StringXmlApplicationContext me(){
		return instance;
	}
	public StringXmlApplicationContext() {
		instance=this;
	}

	public StringXmlApplicationContext(ApplicationContext parent) {
		super(parent);
		instance=this;
	}
	public StringXmlApplicationContext addResource(String jobName,String jobDef){
		if(jobDefinitions == null) {
			jobDefinitions = new HashMap<>();
		}
		jobDefinitions.put(jobName,jobDef);
		
		return this;
	}
	public StringXmlApplicationContext addResource(String jobName,String taskletPrefix,String jobDef){
		jobDef = jobDef.replace(" ref=\"", " ref=\""+taskletPrefix);
		
		return this.addResource(jobName,jobDef);
	}
	
	public StringXmlApplicationContext registerBean(String id,Object singletonBean)
	{
		if(jobTasklets == null) {
			jobTasklets = new HashMap<>();
		}
		
		jobTasklets.put(id, singletonBean);
		return this;
	}
	
	public StringXmlApplicationContext registerTasklets(String taskletPrefix,String xmlString)
	{
		List<BaseTasklet> tasklets = TaskletDefine.parseTasklets(taskletPrefix,xmlString);
		for(BaseTasklet task: tasklets){
			this.registerBean(taskletPrefix+task.getId(), task);
		}
		return this;
	}
	
	@Override
	protected void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) {
		if(jobTasklets!=null){
			for(Entry<String,Object> tasklet : jobTasklets.entrySet()) {
				beanFactory.registerSingleton(tasklet.getKey(),tasklet.getValue());
			}
		}
	}
	
	private Map<String,Object> jobTasklets;
	private Map<String,String> jobDefinitions;
	
	@Override
	protected Resource[] getConfigResources() {
		if(jobDefinitions==null) {
			return null;
		}
		
		List<ByteArrayResource> result=new ArrayList<>();
		for(Entry<String,String> source : jobDefinitions.entrySet()){
			try {
				result.add(new ByteArrayResource(
						source.getValue().getBytes("utf-8")
						,source.getKey()));
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
				throw new IllegalArgumentException(source.getKey()+" is not a valid job xml!");
			}
		}
		return result.toArray(new Resource[0]);
	}
}
