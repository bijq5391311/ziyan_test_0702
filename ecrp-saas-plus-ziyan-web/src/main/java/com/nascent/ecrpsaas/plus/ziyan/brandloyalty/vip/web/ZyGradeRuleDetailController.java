package com.nascent.ecrpsaas.plus.ziyan.brandloyalty.vip.web;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.nascent.ecrpsaas.base.constat.OperationTypeEnum;
import com.nascent.ecrpsaas.database.service.KdOperationLogService;
import com.nascent.ecrpsaas.plus.ziyan.vip.model.ZyGradeRuleDetail;
import com.nascent.ecrpsaas.vip.model.GradeRuleDetail;
import com.nascent.ecrpsaas.vip.web.GradeRuleDetailController;
import com.nascent.utils.model.UserSession;
import com.nascent.utils.query.CommonResult;

@Controller
@RequestMapping("/vip/graderuledetail")
public class ZyGradeRuleDetailController extends GradeRuleDetailController {

	@Autowired
	KdOperationLogService optLogService;

	/**
	 * 查询所有的等级明细
	 * 
	 * @return
	 */
	@ResponseBody
	public CommonResult getList(int grade_rule_id) {
		List<GradeRuleDetail> gradeRuleDetails = GradeRuleDetail.dao().getGradeRuleDetailByGradeRuleId(grade_rule_id);
		return CommonResult.SUCCESS.setResult(gradeRuleDetails);
	}

	/**
	 * 通过会员等级名获取所有信息
	 * 
	 * @return
	 */
	@ResponseBody
	public CommonResult getByName(
			@RequestParam(name = "grade_name") String grade_name) {
		return CommonResult.SUCCESS.setResult(ZyGradeRuleDetail.dao()
				.getGradeRuleDetailByName(grade_name));
	}

	/**
	 * 保存规则细节
	 * 
	 * @param grade_name
	 * @param grade_rule_id
	 * @param code
	 * @return
	 */
	@ResponseBody
	public CommonResult addOrUpdateDetail(String grade_name,
			int send_reward_type, int grade_rule_id, BigDecimal discount,
			double reward_points, String code, String code2, String and_goods_ids,
			String goods_ids, int id, String and_goods_condition,
			String or_goods_condition,int zy_consume) {
		ZyGradeRuleDetail detail = new ZyGradeRuleDetail();
		detail.setState(1);
		detail.setShopCode(getCurrentUser().getOwnShopCodes());
		long count = GradeRuleDetail.dao().loadGradeRuleDetailcount(
				grade_rule_id);
		if (id < 0) {
			if (count == 0) {
				detail.setGrade(1);
			}
			for (int i = 1; i < count + 1; i++) {
				if (null == GradeRuleDetail.dao().getGradeRuleDetailByGrade(i,
						grade_rule_id)) {
					detail.setGrade(i);
				}

			}
			if (detail.getGrade() < 0) {
				detail.setGrade((int) count + 1);
			}
		}
		detail.setGradeName(grade_name);
		if (null != GradeRuleDetail.dao().getGradeRuleDetailByName(grade_name)) {
			detail.setId(GradeRuleDetail.dao()
					.getGradeRuleDetailByName(grade_name).getId());
		}

		// 获取修改之前的日志
		ZyGradeRuleDetail beforeRule = new ZyGradeRuleDetail().getGradeRuleDetail(grade_rule_id, detail.getGrade());

		detail.setGroupId(0);
		detail.setdiscount(discount);
		detail.setRewardPoints(BigDecimal.valueOf(reward_points));
		detail.setGradeRuleId(grade_rule_id);
		detail.setSendRewardType(send_reward_type);
		detail.setShopCode("0");
		detail.setGradeRuleConditionCode(code);
		detail.setGradeServiceData(code2);
		detail.setAndGoodsIds(and_goods_ids);
		detail.setGoodsIds(goods_ids);
		detail.setOrGoodsCondition(or_goods_condition);
		detail.setAndGoodsCondition(and_goods_condition);
		detail.setZyConsume(zy_consume);
		new ZyGradeRuleDetail().saveOrUpdate(detail);
		this.saveOprationLog(beforeRule, detail,
				OperationTypeEnum.VIP_GRADE_RULE.getValue());

		return CommonResult.SUCCESS;
	}

	@ResponseBody
	public CommonResult deleteGradeRuleDetail(int id) {
		GradeRuleDetail.dao().deleteById(id);
		return CommonResult.SUCCESS;
	}

	/**
	 * 通过name删除规则细节
	 * 
	 * @param name
	 * @return
	 */
	@ResponseBody
	public CommonResult deleteGradeRuleDetailByName(
			@RequestParam(name = "grade_name") String grade_name,
			@RequestParam(name = "grade_rule_id") int grade_rule_id) {
		GradeRuleDetail.dao().deleteGradeRuleDetailByName(grade_name,
				grade_rule_id);
		List<GradeRuleDetail> details = GradeRuleDetail.dao()
				.getGradeRuleDetailByGradeRuleId(grade_rule_id);
		if (details.size() > 0) {
			for (int i = 0; i < details.size() - 1; i++) {
				int gradeDiff = details.get(i + 1).getGrade()
						- details.get(i).getGrade();
				if (gradeDiff > 1) {
					for (int j = i + 1; j < details.size(); j++) {
						details.get(i + 1).setGrade(
								details.get(i + 1).getGrade() - gradeDiff + 1);
					}
				}
			}
			if (details.get(0).getGrade() != 1) {
				int firstGradeDiff = details.get(0).getGrade() - 1;
				for (int k = 0; k < details.size(); k++) {
					details.get(k).setGrade(
							details.get(k).getGrade() - firstGradeDiff);
				}
			}
			for (int m = 0; m < details.size(); m++) {
				GradeRuleDetail.dao().saveOrUpdate(details.get(m));
				;
			}
		}
		return CommonResult.SUCCESS;
	}

	/**
	 * 通过grade_rule_id规则id删除规则细节
	 * 
	 * @param grade_rule_id
	 * @return
	 */
	@ResponseBody
	public CommonResult deleteGradeRuleDetailByGradeid(
			@RequestParam(name = "grade_rule_id") int grade_rule_id) {
		GradeRuleDetail.dao().deleteGradeRuleDetailByGradeRuleId(grade_rule_id);
		return CommonResult.SUCCESS;
	}

	/**
	 * 通过id获取规则细节
	 * 
	 * @param id
	 * @return
	 */
	@ResponseBody
	public ZyGradeRuleDetail getById(String id) {
		ZyGradeRuleDetail gradeRuleDetail = new ZyGradeRuleDetail().getGradeRuleDetailById(id);
		if (null != gradeRuleDetail) {
			return gradeRuleDetail;
		}
		return null;
	}

	/**
	 * 修改规则细节名称
	 * 
	 * @param grade_name
	 * @param id
	 * @return
	 */
	@ResponseBody
	public CommonResult updataGradeRuleDetailName(
			@RequestParam(name = "grade_name") String grade_name,
			@RequestParam(name = "id") int id) {
		GradeRuleDetail.dao().updataGradeRuleDetailGradeName(grade_name, id);
		return CommonResult.SUCCESS;
	}

	/**
	 * 修改等级排序
	 * 
	 * @param gradeRuleDetails
	 * @return
	 */
	@ResponseBody
	public CommonResult updateGradeRuleDetailGrade(
			@RequestBody GradeRuleDetail[] gradeRuleDetails) {
		for (int i = 0; i < gradeRuleDetails.length; i++) {
			GradeRuleDetail.dao().updataGradeRuleDetailGrade(i + 10,
					gradeRuleDetails[i].getId());
		}
		for (int i = 0; i < gradeRuleDetails.length; i++) {
			GradeRuleDetail.dao().updataGradeRuleDetailGrade(i + 1,
					gradeRuleDetails[i].getId());
		}
		return CommonResult.SUCCESS;
	}

	/**
	 * 保存操作日志.
	 * 
	 * @param brandId
	 * @param gradeRule
	 */
	private void saveOprationLog(GradeRuleDetail beforeRule,
			GradeRuleDetail gradeRule, int type) {
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

		optLogService.addOperationLog(operator, beforeOperation,
				afterOperation, groupId, departmentCode, targetId, type);

	}

}
