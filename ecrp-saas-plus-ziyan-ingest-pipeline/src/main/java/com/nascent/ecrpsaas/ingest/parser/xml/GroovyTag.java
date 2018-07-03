package com.nascent.ecrpsaas.ingest.parser.xml;

import java.util.List;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="groovy")
public class GroovyTag extends TaskNode{
	@XmlAttribute
	public String setter;
	
	@XmlElement(name = "code")
	public CodeTag code;
	
	
	@XmlElementWrapper(name="result")  
	@XmlElement(name="field")
	public List<FieldTag> result;
	
	@XmlElement(name = "output")
	public OutputTag output;
}
