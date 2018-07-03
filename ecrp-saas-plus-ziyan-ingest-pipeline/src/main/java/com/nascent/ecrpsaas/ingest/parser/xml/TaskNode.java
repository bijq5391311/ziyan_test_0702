package com.nascent.ecrpsaas.ingest.parser.xml;

import javax.xml.bind.annotation.XmlAttribute;

public abstract class TaskNode {
	@XmlAttribute
	public String id;
}
