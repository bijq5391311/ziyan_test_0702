package com.nascent.ecrpsaas.ingest.parser.xml;

import java.util.List;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="spel")
public class SpELTag extends TaskNode{
	//@XmlAttribute
	//public String id;
	
	@XmlElement(name = "field")
	public List<FieldTag> fields;
}
