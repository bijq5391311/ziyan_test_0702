package com.nascent.ecrpsaas.plus.ziyan.dispatch.service;

import java.util.List;

import com.nascent.ecrpsaas.plus.ziyan.dispatch.vo.GradeRuleDetailVo;

public interface ZyGraderuledetailService {
	public List<GradeRuleDetailVo> queryGradeRuleDetailByRuleId (int ruleId);

}
