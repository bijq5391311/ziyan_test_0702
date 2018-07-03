package com.nascent.ecrpsaas.ingest.processor;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.repeat.RepeatStatus;

import com.nascent.ecrpsaas.ingest.parser.xml.CodeTag;
import com.nascent.plugins.taobao.StringUtils;


public class GroovyTasklet extends BaseTasklet{

	public CodeTag code;
	public String targetName;
	Map<String,String> fields;
	
	public GroovyTasklet(CodeTag code) {
		this.code=code;
	}
	
	public GroovyTasklet setTarget(String targetName)
	{
		this.targetName=targetName;
		return this;
	}
	public GroovyTasklet setMappings(Map<String,String> mappings)
	{
		this.fields=mappings;
		return this;
	}

	
	@Override
	public RepeatStatus execute(StepContribution contribution, ChunkContext cctx) throws Exception {
		Object result = doExecute(null,cctx);
		//类注入到全局
		if(!StringUtils.isEmpty(this.targetName)){
			super.getExecutionContext(cctx).put(this.targetName, result);
			
			if(logger.isDebugEnabled()) {
				logger.debug("groovy({}): set '{}'= #{}",this.getId(),this.targetName,result.hashCode());
			}
		}
		
		return RepeatStatus.FINISHED;
	}

	@Override
	protected Object doExecute(Object parent,ChunkContext cctx) throws Exception {
		Object instance = code.createInstance();
		
		//逐一提取值
		Object result = super.evalOgnl(code.entry,instance ,cctx);
		super.extractResult(result, fields, cctx);
		
		if(logger.isDebugEnabled()) {
			logger.debug("groovy({}): eval '{}' on instance #{}",this.getId(),code.entry,instance.hashCode());
		}
		return result;
	}
	
}
