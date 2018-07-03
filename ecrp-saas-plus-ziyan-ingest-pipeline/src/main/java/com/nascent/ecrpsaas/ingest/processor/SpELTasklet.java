package com.nascent.ecrpsaas.ingest.processor;

import java.util.Map;

import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.repeat.RepeatStatus;

public class SpELTasklet extends BaseTasklet{

	public SpELTasklet(Map<String,String> fields)
	{
		this.fields=fields;
	}
	Map<String,String> fields;
	
	@Override
	public RepeatStatus execute(StepContribution contribution, ChunkContext cctx) throws Exception {
		if(this.fields==null || this.fields.isEmpty())
			super.mergeJobParamsIntoExec(cctx);
		else{
			doExecute(null,cctx);
		}
		
		return RepeatStatus.FINISHED;
	}

	@Override
	protected Object doExecute(Object parent,ChunkContext cctx) throws Exception {
		super.extractResult(parent, fields, cctx);
		return null;
	}

}
