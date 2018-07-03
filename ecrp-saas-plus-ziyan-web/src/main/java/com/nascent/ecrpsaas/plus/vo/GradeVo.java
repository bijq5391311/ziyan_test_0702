package com.nascent.ecrpsaas.plus.vo;

import java.util.List;

import com.nascent.ecrpsaas.base.util.OptionUtil;
import com.nascent.ecrpsaas.components.options.OptionItem;

public class GradeVo {
	
	
	private final static GradeVo GRADE_VO = new GradeVo();
	
	public List<OptionItem> queryGradeList(){
		List<OptionItem> list = OptionUtil.queryOptions("vip.consumeOverview.queryGradeList");
		return list;
	}
	public static GradeVo dao() {
		return GRADE_VO;	
	}
    

}
