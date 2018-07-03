package com.nascent.ecrpsaas.ingest.processor;

import java.util.ArrayList;
import java.util.List;

import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.repeat.RepeatStatus;

import com.nascent.ecrpsaas.ingest.parser.StringXmlApplicationContext;
import com.nascent.ecrpsaas.ingest.parser.xml.FieldTag;
import com.nascent.plugins.sqlinxml.annotation.ArModel;

public class ForEachTasklet extends BaseTasklet{

	
	String test;
	String listExp;
	String itemVar;
	
	String targetName;
	public ForEachTasklet(String targetName){
		this.targetName=targetName;
	}
	public ForEachTasklet setForItemInList(String item,String list){
		this.itemVar = item==null?"item":item;
		this.listExp = list;
		return this;
	}
	private List<BaseTasklet> compositTasklets;
	
	private List<FieldTag> tasks;
	public ForEachTasklet setTasklets(List<FieldTag> tasks) {
		this.tasks = tasks;
		return this;
	}
	private List<FieldTag> binds;
	public ForEachTasklet setBinds(List<FieldTag> binds) {
		this.binds = binds;
		return this;
	}
	public ForEachTasklet setTest(String test) {
		this.test=test;
		return this;
	}
	
	public List<BaseTasklet> getTasklets(){
		if(compositTasklets==null){
			StringXmlApplicationContext ctx = StringXmlApplicationContext.me();
			compositTasklets = new ArrayList<>(this.tasks.size());
			for(FieldTag task : this.tasks){
				compositTasklets.add((BaseTasklet) ctx.getBean(this.jobPrefix + task.name));
			}
		}
		return compositTasklets;
	}
	
	@Override
	public RepeatStatus execute(StepContribution contribution, ChunkContext cctx) throws Exception {
		Object result = doExecute(null,cctx);
		
		if(this.targetName!=null){
			super.getExecutionContext(cctx).put(this.targetName, result);
			
			if(logger.isDebugEnabled()) {
				logger.debug("foreach({}): set '{}'=#{}",this.getId(),this.targetName,result.hashCode());
			}
		}
		return RepeatStatus.FINISHED;
	}

	@Override
	protected Object doExecute(Object parent,ChunkContext cctx) throws Exception {
		List list = (List)super.evalOgnl(this.listExp,parent,cctx);
		
		ArrayList<Object> result = new ArrayList<>(list.size());
		List<BaseTasklet> tasklets = getTasklets();
		int i=0;
		for(Object obj : list){
			super.getExecutionContext(cctx).put(this.itemVar, obj);
			i++;
			if(null!=this.test){
				if(false==(boolean)super.evalOgnl(this.test, parent, cctx)) {
					continue;
				}
			}
			if(logger.isTraceEnabled()) {
				logger.trace("foreach({}): var '{}' in #list({}/{})",this.getId(),this.itemVar,i,list.size());
			}
			
			
			for(int k=0;k<tasklets.size();k++){
				BaseTasklet task  = tasklets.get(k);
				Object prevResult =task.doExecute(obj, cctx);
				if(prevResult instanceof List){
					result.addAll((List)prevResult);
				} else {
					result.add(prevResult);
				}
				
				//将每一步执行的结果，返回到全局变量中供后续使用
				if(this.tasks.get(k).bind!=null){
					super.getExecutionContext(cctx).put(
							this.tasks.get(k).bind,
							prevResult);
				}
			}
			
			//直接ognl执行
			for(FieldTag bind : this.binds){
				if(bind.name==null || bind.name.length()<3){
					super.evalOgnl(bind.bind, parent, cctx);
				}else{
					ArModel<?> model = (ArModel<?>)super.getExecutionContext(cctx).get(this.getId());
					model.set(bind.name, super.evalOgnl(bind.bind,parent, cctx));
				}
			}
		}

		if(logger.isDebugEnabled()) {
			logger.debug("foreach({}): '{}' results return with #list{}.size()={}",this.getId(),result.size(),list.hashCode(),list.size());
		}
		return result;
	}

}
