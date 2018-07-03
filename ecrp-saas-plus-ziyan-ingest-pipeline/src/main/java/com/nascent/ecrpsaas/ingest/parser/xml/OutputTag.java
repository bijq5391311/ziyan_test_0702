package com.nascent.ecrpsaas.ingest.parser.xml;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlValue;

@XmlRootElement(name="output")
public class OutputTag {

	@XmlValue
	public String value;
}
