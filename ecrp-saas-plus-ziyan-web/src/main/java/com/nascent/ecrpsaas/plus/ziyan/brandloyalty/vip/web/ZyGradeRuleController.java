package com.nascent.ecrpsaas.plus.ziyan.brandloyalty.vip.web;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.nascent.ecrpsaas.base.constat.OperationTypeEnum;
import com.nascent.ecrpsaas.base.constat.SystemConstat;
import com.nascent.ecrpsaas.base.vo.organization.SysBrandVo;
import com.nascent.ecrpsaas.organization.model.SysBrand;
import com.nascent.ecrpsaas.plus.ziyan.vip.model.ZyGradeRule;
//import com.nascent.ecrpsaas.database.service.KdOperationLogService;
//import com.nascent.ecrpsaas.database.service.impl.KdOperationLogServiceImpl;
import com.nascent.ecrpsaas.vip.model.GradeRule;
import com.nascent.ecrpsaas.vip.model.GradeRuleDetail;
import com.nascent.ecrpsaas.vip.web.GradeRuleController;
import com.nascent.utils.model.Authorize;
import com.nascent.utils.model.UserSession;
import com.nascent.utils.query.CommonResult;

@Authorize
@Controller
@RequestMapping("/vip/graderule")
public class ZyGradeRuleController extends GradeRuleController {
	/**
	 * 新增积分规则
	 * @param gradeRule
	 * @return
	 */
	public CommonResult addGradeRule(int allow_sub_grade, Date date_start,
			int days_between, int is_include_black, int sub_days, int status) {
		ZyGradeRule gradeRule = new ZyGradeRule();
		gradeRule.setGroupId(Integer.parseInt(getSessionUser().getDeptCode()));
		gradeRule.setCreateUserAccount(getSessionUser().getUserCode());
		gradeRule.setAllowSubGrade(allow_sub_grade);
		gradeRule.setDateStart(date_start);
		gradeRule.setDaysBetween(days_between);
		gradeRule.setIsIncludeBlack(is_include_black);
		gradeRule.setSubDays(sub_days);
		gradeRule.setStatus(status);
		gradeRule.setstate(1);

		gradeRule.saveOrUpdate(gradeRule);

		// 获取修改之前的日志
		ZyGradeRule beforeRule = null;
		this.saveOprationLog(beforeRule, gradeRule,
				OperationTypeEnum.VIP_GRADE_RULE.getValue());

		return CommonResult.SUCCESS.setMsg(SystemConstat.OperationMsg.UPDATE
				.getName());
	}

	/**
	 * 跳转到规则页面
	 */
	public void graderule() {
		
	}

	public void brandintegration() {
	}

	public void integrationclearrule() {
	}

	/**
	 * 加载规则
	 * 
	 * @return
	 */
	@ResponseBody
	public CommonResult initGradeRule() {
	  List <SysBrand>  sysBrands = SysBrand.dao().queryBrand();
		String brand_ids = "";
		if (sysBrands.size() > 0) {
			for (SysBrand sysBrandAllVo : sysBrands) {
				brand_ids += sysBrandAllVo.getid() + ",";
			}
			brand_ids = brand_ids.substring(0, brand_ids.length() - 1);
		}
		List<GradeRule> gradeRules = GradeRule.dao().queryGradeRuleByBrandIds(
				brand_ids);
		String gradeRuleIds = gradeRules.size() > 0 ? gradeRules.get(0).getId()
				+ "" : "";
		for (int i = 0; i < gradeRules.size(); i++) {
			gradeRuleIds = gradeRuleIds + "," + gradeRules.get(i).getId() + "";
		}
		Map<String, GradeRuleDetail> map4grade = new HashMap<String, GradeRuleDetail>();
		Map<GradeRule, Map<String, GradeRuleDetail>> map4detail = new HashMap<GradeRule, Map<String, GradeRuleDetail>>();
		for (int i = 0; i < sysBrands.size(); i++) {
			sysBrands.get(i).getBrandName();
		}

		return CommonResult.SUCCESS.setResult(gradeRules);

	}

	/**
	 * 通过Id获取规则
	 * 
	 * @return
	 */
	public CommonResult getGradeRuleById(int id) {
		return CommonResult.SUCCESS.setResult(GradeRule.dao().getGradeRuleById(
				id + ""));
	}

	/**
	 * 保存等级规则
	 * 
	 * @param gradeRule
	 * @return
	 */
	@ResponseBody
	public CommonResult saveGradeRule(GradeRule gradeRule) {
		gradeRule.setstate(1); 
		// 默认状态为开启
		UserSession session = getSessionUser();
		gradeRule.setCreateUserAccount(session.getUserId()); 
		// 获取创建帐号
		gradeRule.setGroupId(Integer.parseInt(session.getDeptCode()));

		// 获取修改之前的日志
		GradeRule beforeRule = GradeRule.dao().getGradeRuleByBrandId(
				gradeRule.getBrandId());

		GradeRule.dao().saveOrUpdate(gradeRule);

		this.saveOprationLog(beforeRule, gradeRule,
				OperationTypeEnum.VIP_GRADE_RULE.getValue());
		return CommonResult.SUCCESS;
	}

	/**
	 * 获取品牌通过id
	 */
	@ResponseBody
	public CommonResult getBrandById(int id) {
		return CommonResult.SUCCESS.setResult(SysBrandVo.dao()
				.loadBrandById(id));
	}

	/**
	 * 保存操作日志.
	 * 
	 * @param brandId
	 * @param gradeRule
	 */
	private void saveOprationLog(GradeRule beforeRule, GradeRule gradeRule,
			int type) {
		// 保存操作日志
		UserSession session = this.getCurrentUser();
		String operator = session.getUserName();

		String beforeOperation = "{}";
		if (beforeRule != null) {
			beforeOperation = JSONObject.toJSONString(beforeRule);
		}
		String afterOperation = JSONObject.toJSONString(gradeRule);
		int groupId = session.getTenantId();
		String departmentCode = session.getDeptCode();
		int targetId = gradeRule.getId();

		// optLogService.addOperationLog(operator, beforeOperation,
		// afterOperation, groupId, departmentCode, targetId, type);

	}

}
