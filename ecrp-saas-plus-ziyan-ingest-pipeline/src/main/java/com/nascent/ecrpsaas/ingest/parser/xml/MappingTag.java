package com.nascent.ecrpsaas.ingest.parser.xml;

import java.util.List;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="mapping")
public class MappingTag extends TaskNode{

	//@XmlAttribute
	//public String id;
	
	@XmlAttribute
	public String setter;
	
	@XmlAttribute(name="class")
	public String setterClass;
	
	@XmlElement(name = "field")
	public List<FieldTag> fields;
	
	@XmlElement(name = "output")
	public OutputTag output;
	
	@XmlElement(name="foreach")
	public List<ForEachTag> inners;
}
