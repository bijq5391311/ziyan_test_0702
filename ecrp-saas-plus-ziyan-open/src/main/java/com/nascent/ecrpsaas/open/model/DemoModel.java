package com.nascent.ecrpsaas.open.model;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.ArModel;
import com.nascent.plugins.sqlinxml.annotation.Select;
import com.nascent.plugins.sqlinxml.annotation.TableBind;
import com.nascent.utils.query.QueryInfo;


@Component
@Select
@TableBind(name="area", pk="id")
public class DemoModel extends ArModel<DemoModel>{
	private static final long serialVersionUID = 1L;

	public static DemoModel dao() {
		return SpringContext.me().getBean(DemoModel.class);
	}
	
	public static class Area {
		private int id;
		private String name;
		private int zip;
		
		public Area() {
		}
		
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public int getZip() {
			return zip;
		}
		public void setZip(int zip) {
			this.zip = zip;
		}
	}
	
	public List<Area> findList(Map<String, Object> params) {
		return new QueryInfo("demo.findList")
				.addParams(params)
				.findT(Area.class);
	}
}
