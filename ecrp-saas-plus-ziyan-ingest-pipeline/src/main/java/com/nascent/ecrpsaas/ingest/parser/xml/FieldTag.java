package com.nascent.ecrpsaas.ingest.parser.xml;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="field")
public class FieldTag {
	public FieldTag(){
		
	}
	public FieldTag(String name,String bind){
		this.name=name;
		this.bind=bind;
	}
	@XmlAttribute
	public String name="";
	
	@XmlAttribute
	public String bind;
	
	public Object value;
	
	@Override
	public String toString(){
		return name+" = "+bind;
	}
}
