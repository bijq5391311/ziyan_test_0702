package com.nascent.ecrpsaas.ingest.parser.xml;

import java.util.List;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;

public class HttpSignTag {
	@XmlAttribute
	public String name;
	@XmlAttribute
	public String method;
	
	@XmlElement(name="field")
	public List<FieldTag> params;
}
