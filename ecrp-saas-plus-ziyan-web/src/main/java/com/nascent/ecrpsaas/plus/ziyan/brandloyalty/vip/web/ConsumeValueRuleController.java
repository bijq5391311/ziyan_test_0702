package com.nascent.ecrpsaas.plus.ziyan.brandloyalty.vip.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nascent.ecrpsaas.base.constat.SystemConstat;
import com.nascent.ecrpsaas.base.web.BaseController;
import com.nascent.ecrpsaas.plus.ziyan.vip.model.ZyConsumeValueRule;
import com.nascent.utils.model.Authorize;
import com.nascent.utils.model.UserSession;
import com.nascent.utils.query.CommonResult;

/**
 * 
 * @ClassName: GrouthValueRuleController 
 * @Description: (消费值规则控制层)
 * @author yuye.huang
 * @date 2017年10月10日 下午1:54:27 
 *
 */
@Authorize
@Controller
@RequestMapping("/vip/consumevaluerule/")
public class ConsumeValueRuleController extends BaseController{

	/**
	 * @Description: (消费值规则首页)
	 */
	@RequestMapping("/consumeValueRule")
	public void consumeValueRule(){}
	
	/**
	 * @Description: (初始化消费规则)
	 */
	@ResponseBody
	@RequestMapping("/initConsumeValueRule")
	public CommonResult initConsumeValueRule() {
	    UserSession user = 	getCurrentUser();
		CommonResult cResult = new CommonResult();
		ZyConsumeValueRule consumeValueRule = ZyConsumeValueRule.dao().loadConsumeValueRule();
        if(null == consumeValueRule){
        	consumeValueRule =  new ZyConsumeValueRule();
        	consumeValueRule.setShopIdsCodes(user.getOwnShopCodes());
        	consumeValueRule.save();
        }
		return cResult.setResult(consumeValueRule);
	}
	
	/**
	 * @Description: (保存等级规则)
	 * @param hxGrouthValueRule
	 * @return CommonResult
	 */
	@Authorize(order = 3)
	@ResponseBody
	@RequestMapping("/saveOrUpdateConsumeValueRule")
	public CommonResult saveOrUpdateConsumeValueRule(ZyConsumeValueRule zyConsumeValueRule){
		ZyConsumeValueRule.dao().saveOrUpdate(zyConsumeValueRule);
		return CommonResult.SUCCESS.setResult(zyConsumeValueRule).setMsg(SystemConstat.OperationMsg.UPDATE.getName());
	}
	
	
}
