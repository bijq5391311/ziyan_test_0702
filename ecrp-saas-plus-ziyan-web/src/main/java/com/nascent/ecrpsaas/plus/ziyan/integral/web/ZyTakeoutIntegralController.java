package com.nascent.ecrpsaas.plus.ziyan.integral.web;

import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nascent.ecrpsaas.base.constat.SystemConstat;
import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.base.web.BaseController;
import com.nascent.ecrpsaas.plus.ziyan.Integral.model.ZyKdPointRule;
import com.nascent.ecrpsaas.plus.ziyan.marketing.model.ZySysShop;
import com.nascent.utils.model.Authorize;
import com.nascent.utils.query.CommonResult;
@Authorize
@Controller("/integral/zytakeoutintegral")
@RequestMapping("/integral/zytakeoutintegral")
public class ZyTakeoutIntegralController extends BaseController{
	@Authorize(order = 0)
	@RequestMapping("/zyPointRuleTakeoutList")
	public void zyPointRuleTakeoutList() {
	}
	
	

	/**
	 * 保存
	 */
	@ResponseBody
	@RequestMapping("/saveOrUpdate")
	public CommonResult saveOrUpdate(@RequestBody ZyKdPointRule kdPointRule) {
		kdPointRule.saveOrUpdate(kdPointRule);
		return CommonResult.SUCCESS.setResult(kdPointRule).setMsg(SystemConstat.OperationMsg.UPDATE.getName());
	}

	/**
	 * 加载规则
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/initPointRule")
	public CommonResult initPointRule() {
		CommonResult commonResult = new CommonResult(true);
		// 记录积分规则信息
		Set<ZyKdPointRule> rules = new HashSet<ZyKdPointRule>();
		// 根据渠道获取渠道信息
		ZySysShop sysShop = ZySysShop.dao().loadSysShop("外卖平台", SystemConstat.STATE_1, SystemConstat.STATE_0);
		if (null != sysShop) {
			String channelName = sysShop.getname();
			String code = sysShop.getcode();
			// 默认生成一条规则
			ZyKdPointRule zyKdPointRule = ZyKdPointRule.dao().loadZyKdPointRuleByChannel(code);
			if (null == zyKdPointRule) {
				zyKdPointRule = new ZyKdPointRule();
				zyKdPointRule.setChannelName(channelName);
				zyKdPointRule.setPointPrice(UtilString.parseStrtoBigDecimal("1"));
				zyKdPointRule.setZyChannel(code);
				zyKdPointRule.setPointRound(0);
				zyKdPointRule.save();
			}
			rules.add(zyKdPointRule);
			commonResult.setResult(rules);
		}
		return commonResult;
	}


}
