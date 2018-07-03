package com.nascent.ecrpsaas.open.model.vo;

import org.hibernate.validator.constraints.Range;
import org.springframework.stereotype.Component;

@Component
public class RequestBean {
	@Range(min=20, message="lid必须大于等于20")
	private int lid;
	
	@Range(max=50, message="lid必须小于等于50")
	private int gid;

	public int getLid() {
		return lid;
	}

	public void setLid(int lid) {
		this.lid = lid;
	}

	public int getGid() {
		return gid;
	}

	public void setGid(int gid) {
		this.gid = gid;
	}
}
