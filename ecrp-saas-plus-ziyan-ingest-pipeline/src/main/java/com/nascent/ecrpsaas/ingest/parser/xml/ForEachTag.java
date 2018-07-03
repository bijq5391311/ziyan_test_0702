package com.nascent.ecrpsaas.ingest.parser.xml;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="foreach")
public class ForEachTag extends TaskNode{

	//@XmlAttribute
	//public String id;
	
	@XmlAttribute
	public String setter;
	
	/**
	 * 所需循环的列表项 ognl
	 */
	@XmlAttribute
	public String list;
	
	/**
	 * 当前循环元素名
	 */
	@XmlAttribute
	public String item;
	
	@XmlAttribute
	public String test;
	
	@XmlElement(name = "tasklet")
	public List<FieldTag> tasklets=new ArrayList<>();
	
	@XmlElement(name = "field")
	public List<FieldTag> binds=new ArrayList<>();
}
