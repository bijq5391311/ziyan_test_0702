package com.nascent.ecrpsaas.ingest.parser.xml;

import java.util.List;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="sql")
public class SqlTag extends TaskNode{
	//@XmlAttribute
	//public String id;
	
	@XmlAttribute
	public String setter;
	
	@XmlElement(name = "jdbc")
	public JdbcTag jdbc;
	
	@XmlElement(name = "query")
	public QueryTag query;
	
	@XmlElementWrapper(name="params")  
	@XmlElement(name="field")
	public List<FieldTag> params;
	
	@XmlElement(name="result")
	public ResultTag result;
	
	@XmlElement(name = "output")
	public OutputTag output;
}
