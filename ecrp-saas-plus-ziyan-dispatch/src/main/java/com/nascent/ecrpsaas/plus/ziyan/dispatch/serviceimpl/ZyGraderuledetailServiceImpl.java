package com.nascent.ecrpsaas.plus.ziyan.dispatch.serviceimpl;

import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.ZyGraderuledetailService;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.vo.GradeRuleDetailVo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("zyGraderuledetailService")
public class ZyGraderuledetailServiceImpl implements  ZyGraderuledetailService {
	@Override
	public List<GradeRuleDetailVo> queryGradeRuleDetailByRuleId(int ruleId) {
		List<GradeRuleDetailVo> gradeRuleDetails =  GradeRuleDetailVo.dao().queryGradeRuleDetailByRuleId(ruleId);
		if(gradeRuleDetails==null || gradeRuleDetails.isEmpty ())
			return null;
		return gradeRuleDetails;
	}

}
