package com.nascent.ecrpsaas.ingest.processor;

import java.util.Map;
import java.util.Map.Entry;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.item.ExecutionContext;

import com.alibaba.fastjson.JSONPath;
import com.nascent.plugins.spring.boot.SpEL;

public abstract class BaseTasklet implements Tasklet{
	protected Logger logger = LoggerFactory.getLogger(this.getClass());
	private String id;
	public BaseTasklet setId(String id){
		this.id=id;
		return this;
	}
	public String getId(){
		return this.id;
	}
	
	protected String jobPrefix="";
	public BaseTasklet setJobPrefix(String prefix) {
		this.jobPrefix = prefix;
		return this;
	}
	
	/**
	 * 多级Tasklet调用
	 * @return 当前节点返回值
	 */
	protected abstract Object doExecute(Object parent,ChunkContext cctx) throws Exception;
	
	protected Object evalOgnl(String exp,ChunkContext cctx){
		return SpEL.getValue(exp, cctx, getExecutionParams(cctx));
	}
	
	protected Object evalOgnl(String exp,Object root,ChunkContext cctx){
		if(exp.startsWith("$.")) {
			return JSONPath.eval(root, exp);
		}
		return SpEL.getValue(exp, root, getExecutionParams(cctx));
	}
	
	protected Object evalOgnl(String exp,Map<String,Object> map){
		return SpEL.getValue(exp, map, map);
	}
	protected Object evalOgnl(String exp,Object root,Map<String,Object> map){
		return SpEL.getValue(exp, root, map);
	}
	
	/**
	 * 从对象及context中运行ognl，并写入到context Map中
	 * @param result root Object
	 * @param fields Map<set_field,ognl_expression>
	 * @param cctx
	 * @throws OgnlException
	 */
	protected void extractResult(Object result,Map<String,String> fields,ChunkContext cctx){
		ExecutionContext globalMap = this.getExecutionContext(cctx);
		for(Entry<String,String> entry : fields.entrySet()){
			
			if(entry.getKey().length()<2){
				//不存在返回值 ， 仅执行方法
				this.evalOgnl(entry.getValue(), result,cctx);
			}else{
				globalMap.put(
						entry.getKey(), 
						this.evalOgnl(entry.getValue(), result,cctx)
					);
			}
			
			if(logger.isTraceEnabled()) {
				logger.trace("Tasklet({}): setValue {}='{}'({})",this.getId(),entry.getKey(),entry.getValue(),globalMap.get(entry.getKey()));
			}
		}
	}
	
	protected ExecutionContext getExecutionContext(ChunkContext cctx){
		return cctx.getStepContext()
		.getStepExecution()
		.getJobExecution()
		.getExecutionContext();
	}
	
	/**
	 * 只读的Map
	 */
	protected Map<String,Object> getExecutionParams(ChunkContext cctx){
		return cctx.getStepContext()
		.getJobExecutionContext();
	}
	
	/**
	 * 将job启动参数，合并写入到context参数中
	 * @param cctx
	 */
	public void mergeJobParamsIntoExec(ChunkContext cctx){
		Map<String,Object>  ps = cctx.getStepContext().getJobParameters();
		ExecutionContext ctx = getExecutionContext(cctx);
		for(Entry<String,Object> entry:ps.entrySet()){
			ctx.put(entry.getKey(), entry.getValue());
		}
	}
}
