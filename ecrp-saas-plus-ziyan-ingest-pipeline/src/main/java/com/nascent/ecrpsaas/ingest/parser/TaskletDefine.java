package com.nascent.ecrpsaas.ingest.parser;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.xml.bind.annotation.XmlAnyElement;
import javax.xml.bind.annotation.XmlRootElement;

import com.nascent.ecrpsaas.ingest.parser.xml.FieldTag;
import com.nascent.ecrpsaas.ingest.parser.xml.ForEachTag;
import com.nascent.ecrpsaas.ingest.parser.xml.GroovyTag;
import com.nascent.ecrpsaas.ingest.parser.xml.HeadTag;
import com.nascent.ecrpsaas.ingest.parser.xml.HttpTag;
import com.nascent.ecrpsaas.ingest.parser.xml.MappingTag;
import com.nascent.ecrpsaas.ingest.parser.xml.SpELTag;
import com.nascent.ecrpsaas.ingest.parser.xml.SqlTag;
import com.nascent.ecrpsaas.ingest.parser.xml.TaskNode;
import com.nascent.ecrpsaas.ingest.parser.xml.TxForEachTag;
import com.nascent.ecrpsaas.ingest.processor.BaseTasklet;
import com.nascent.ecrpsaas.ingest.processor.ForEachTasklet;
import com.nascent.ecrpsaas.ingest.processor.GroovyTasklet;
import com.nascent.ecrpsaas.ingest.processor.HttpTasklet;
import com.nascent.ecrpsaas.ingest.processor.MappingTasklet;
import com.nascent.ecrpsaas.ingest.processor.SpELTasklet;
import com.nascent.ecrpsaas.ingest.processor.SqlTasklet;
import com.nascent.ecrpsaas.ingest.processor.txForEachTasklet;
import com.nascent.utils.JaxbUtils;

@XmlRootElement(name="root")
public class TaskletDefine {
	
	@XmlAnyElement(lax=true)
	public List<TaskNode> tasks;
	
	public static TaskletDefine readXml(String xmlString){
		TaskletDefine tasklet = JaxbUtils.unmarshal(xmlString,TaskletDefine.class,
				TaskletDefine.class
				,ForEachTag.class
				,TxForEachTag.class
				,MappingTag.class
				,GroovyTag.class
				,SpELTag.class
				,SqlTag.class
				,HttpTag.class
				,FieldTag.class
				,HeadTag.class);
		return tasklet;
	}
	
	public static List<BaseTasklet> parseTasklets(String taskletPrefix,String xmlString){
		TaskletDefine job = readXml(xmlString);
		List<BaseTasklet> tasklets = new ArrayList<>(job.tasks.size());
		for(TaskNode node : job.tasks){
			BaseTasklet task;
			
			if(node instanceof ForEachTag){
				task = parseForEach((ForEachTag)node);
			}else if(node instanceof MappingTag){
				task = parseMapping((MappingTag)node);
			}else if(node instanceof TxForEachTag) {
				task = parseTxForEach((TxForEachTag)node);
			}else if(node instanceof SpELTag){
				task = parseSpEL((SpELTag)node);	
			}else if(node instanceof GroovyTag){
				task = parseGroovy((GroovyTag)node);
			}else if(node instanceof SqlTag){
				task = parseSql((SqlTag)node);
			} else {
				task = parseHttp((HttpTag)node);
			}
			
			task.setJobPrefix(taskletPrefix);
			tasklets.add(task);
		}
		return tasklets;
	}

	private static Map<String,String> fieldsToMap(List<FieldTag> fields){
		HashMap<String,String> map = new LinkedHashMap<>();
		if(fields!=null){
			for(FieldTag field : fields){
				map.put(field.name, field.bind);
			}
		}
		return map;
	}
	
	public static BaseTasklet parseTxForEach(TxForEachTag tag)
	{
		return  new txForEachTasklet(tag.setter)
				.setForItemInList(tag.item, tag.list, tag.name)
				.setTasklets(tag.tasklets)
				.setBinds(tag.binds)
				.setTest(tag.test)
				.setId(tag.id);
	}
	
	public static BaseTasklet parseForEach(ForEachTag tag)
	{
		return new ForEachTasklet(tag.setter)
				.setForItemInList(tag.item, tag.list)
				.setTasklets(tag.tasklets)
				.setBinds(tag.binds)
				.setTest(tag.test)
				.setId(tag.id);
	}
	private static BaseTasklet parseMapping(MappingTag tag)
	{
		return new MappingTasklet(tag.setter,tag.setterClass)
				.setMappings(fieldsToMap(tag.fields))
				.setInnerMappings(tag.inners)
				.setId(tag.id);
	}
	
	private static BaseTasklet parseSpEL(SpELTag tag)
	{
		return new SpELTasklet(fieldsToMap(tag.fields))
				.setId(tag.id);
	}
	
	private static BaseTasklet parseGroovy(GroovyTag tag) {
		return new GroovyTasklet(tag.code)
				.setTarget(tag.setter)
				.setMappings(fieldsToMap(tag.result))
				.setId(tag.id);
	}
	

	private static BaseTasklet parseSql(SqlTag tag) {
		return new SqlTasklet(tag.query.value,tag.params,tag.result)
				.setJdbc(tag.jdbc)
				.setMapping(fieldsToMap(tag.result.fields))
				.setTarget(tag.setter)
				.setId(tag.id);
	}
	
	private static BaseTasklet parseHttp(HttpTag tag) {
		HttpTasklet tasklet=null;
		if(tag.api.indexOf(".")>0){
			try {
				Object[] params = new Object[]{
						tag.url
						,""
						,tag.method};
				
				tasklet = (HttpTasklet)Class.forName(tag.api)
						.getConstructors()[0]
								//仅有一个构造函数！！
						.newInstance(params);
				
			} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | IllegalArgumentException | InvocationTargetException | SecurityException e) {
				e.printStackTrace();
				throw new IllegalArgumentException("error class defined in 'api' attribute.",e);
			}
		} else {
			tasklet=new HttpTasklet(tag.url,tag.api,tag.method);
		}
		
		return tasklet
				.setParams(tag.params)
				.setSessionParam(tag.session)
				.setPaginParam(tag.paginate)
				.setSignMethod(tag.sign)
				.setResponseCode(tag.code)
				.setMapping(fieldsToMap(tag.result))
				.setId(tag.id);
	}
	
	
}
