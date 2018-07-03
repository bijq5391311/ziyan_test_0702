package com.nascent.ecrpsaas.ingest.parser.xml;

import java.util.List;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;

public class ResultTag {
	@XmlAttribute
	public String type;
	
	@XmlElement(name="field")
	public List<FieldTag> fields;
}
