package com.nascent.ecrpsaas.ingest.parser.xml;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;

import groovy.lang.GroovyClassLoader;

@XmlRootElement(name="code")
public class CodeTag extends OutputTag{

	@XmlAttribute
	public String entry;
	
	//
	@XmlAttribute
	public String code;

	private static Map<String, Class<?>> cacheMap;
	public  Class<?>  getClazz() throws Exception{
		if(cacheMap==null) {
			cacheMap=new ConcurrentHashMap<String, Class<?>>();
		} 
		
		if(cacheMap.containsKey(this.entry)) {
			return (Class<?>)cacheMap.get(this.entry);
		}
		
		String codeSource=this.value;
	    if(codeSource!=null){
	    	GroovyClassLoader loader = new GroovyClassLoader();
			Class<?> clazz= loader.parseClass(codeSource);
			loader.close();
			
			cacheMap.put(this.entry,clazz);
			return clazz;
	    } else {
			return null;
		}
	}
	
	public Object createInstance() throws Exception {
		return getClazz().newInstance();
	}
}
