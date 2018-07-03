package com.nascent.ecrpsaas.ingest.parser.xml;

import java.util.List;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="paginate")
public class HttpPaginateTag {

	@XmlAttribute
	public String nextPage;
	
	@XmlAttribute
	public String nextDate;
	
	@XmlAttribute
	public String testPage;
	@XmlAttribute
	public String testDate;
	
	@XmlElement(name="field")
	public List<FieldTag> params;
}
