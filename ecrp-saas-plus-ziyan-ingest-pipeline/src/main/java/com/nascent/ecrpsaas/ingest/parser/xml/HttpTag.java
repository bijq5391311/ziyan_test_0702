package com.nascent.ecrpsaas.ingest.parser.xml;

import java.util.List;

import javax.xml.bind.annotation.XmlAnyElement;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="http")
public class HttpTag extends TaskNode{
	//@XmlAttribute
	//public String id;
	@XmlAttribute
	public String url;
	@XmlAttribute
	public String api;
	@XmlAttribute
	public String method;
	
	@XmlElementWrapper(name="params")  
	@XmlAnyElement(lax=true)
	public List<FieldTag> params;
	
	@XmlElementWrapper(name="session")  
	@XmlElement(name="field")
	public List<FieldTag> session;
	
	@XmlElement(name="paginate")
	public HttpPaginateTag paginate;
	
	@XmlElement(name="sign")
	public HttpSignTag sign;
	
	@XmlElement(name="code")
	public CodeTag code;
	
	@XmlElementWrapper(name="result")  
	@XmlElement(name="field")
	public List<FieldTag> result;
	
	@XmlElement(name = "output")
	public OutputTag output;
}
