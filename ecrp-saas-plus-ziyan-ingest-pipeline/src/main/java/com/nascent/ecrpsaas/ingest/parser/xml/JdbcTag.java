package com.nascent.ecrpsaas.ingest.parser.xml;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="jdbc")
public class JdbcTag {

	@XmlElement
	public String driver;
	
	@XmlElement
	public String url;
	@XmlElement
	public String uid;
	@XmlElement
	public String pwd;
}
