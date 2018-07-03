package com.nascent.ecrpsaas.ingest.processor;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.item.ExecutionContext;
import org.springframework.batch.repeat.RepeatStatus;

import com.nascent.ecrpsaas.ingest.parser.TaskletDefine;
import com.nascent.ecrpsaas.ingest.parser.xml.ForEachTag;
import com.nascent.ecrpsaas.ingest.parser.xml.MappingTag;
import com.nascent.plugins.sqlinxml.annotation.ArModel;
import com.nascent.plugins.taobao.StringUtils;

import ognl.OgnlException;

/**
 * 逐一将mapping的属性，执行表达式并set到ArModel中
 * @author crabo
 *
 */
public class MappingTasklet extends BaseTasklet{
	String targetName;
	String targetClass;
	Map<String,String> mappings;
	
	List<ForEachTag> innerTag;
	List<ForEachTasklet> inners;
	List<ForEachTasklet> getInners(){
		if(inners==null){
			inners= new ArrayList<>();
			if(innerTag!=null){
				for(ForEachTag tag : innerTag)
				{
					this.inners.add((ForEachTasklet)
							TaskletDefine.parseForEach(tag)
							.setJobPrefix(this.jobPrefix));
				}
			}
		}
		return inners;
	}
	public MappingTasklet(String targetName,String targetClass){
		this.targetName = targetName;
		this.targetClass = targetClass;
	}
	public MappingTasklet setMappings(Map<String,String> mappings)
	{
		this.mappings=mappings;
		return this;
	}
	
	public MappingTasklet setInnerMappings(List<ForEachTag> inner)
	{
		this.innerTag=inner;
		return this;
	}
	

	@Override
	public RepeatStatus execute(StepContribution contribution, ChunkContext cctx) throws Exception {
		Object result = doExecute(null,cctx);
		
		if(!StringUtils.isEmpty(targetName)) {
			super.getExecutionContext(cctx).put(targetName, result);
		}
		
		return RepeatStatus.FINISHED;
	}
	@Override
	public Object doExecute(Object parent,ChunkContext cctx) throws Exception{

		ArModel<?> model = createModel(cctx);
		mappingOne(model,parent,cctx);
		mappingInner(model,parent,cctx);
		return model;
	}
	
	//当前属性逐一设置到model中
	private void mappingOne(ArModel<?> model,Object result,ChunkContext cctx) throws OgnlException{
		for(Entry<String,String> entry : this.mappings.entrySet()){
			if(entry.getValue()!="") {
				model.set(entry.getKey(), super.evalOgnl(entry.getValue(),result, cctx));
			}
			
			if(logger.isTraceEnabled()) {
				logger.trace("mapping({}): set {}=({}) ,exp='{}'",this.getId(),entry.getKey(),model.get(entry.getKey()),entry.getValue());
			}
		}
	}
	//运行子节点映射，并将
	private void mappingInner(ArModel<?> root,Object parent,ChunkContext cctx) throws Exception{
		if(this.getInners()!=null){
			for(ForEachTasklet task : this.inners)
			{
				super.getExecutionContext(cctx).put(task.getId(), root);
				//add ref
				Object result = task.doExecute(parent, cctx);
				if(task.targetName!=null) {
					root.set(task.targetName, result);
				}
				
				super.getExecutionContext(cctx).remove(task.getId());
				//clear ref
			}
		}
	}
	
	private ArModel<?> createModel(ChunkContext cctx) throws ClassNotFoundException, InstantiationException, IllegalAccessException{
		Class<?> clazz = Class.forName(this.targetClass);
		if(logger.isDebugEnabled()) {
			logger.debug("mapping({}): create instance '#{}'= new {}()",this.getId(),this.targetName,this.targetClass);
		}
		
		return (ArModel<?>)clazz.newInstance();
	}
	private ArModel<?> getModel(ChunkContext cctx) throws ClassNotFoundException, InstantiationException, IllegalAccessException{
		ArModel<?> obj;
		ExecutionContext context = super.getExecutionContext(cctx);
		if(!context.containsKey(this.targetName))
		{
			obj =  createModel(cctx);
			
			context.put(this.targetName, obj);
		} else {
			obj = (ArModel<?>) context.get(this.targetName);
		}
		
		return obj;
	}

}
