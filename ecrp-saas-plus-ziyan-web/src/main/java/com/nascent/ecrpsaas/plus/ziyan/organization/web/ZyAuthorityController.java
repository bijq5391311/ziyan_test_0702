package com.nascent.ecrpsaas.plus.ziyan.organization.web;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nascent.ecrpsaas.base.exception.ParameterException;
import com.nascent.ecrpsaas.base.exception.constant.ParameterExceptionErrorCode;
import com.nascent.ecrpsaas.base.util.TreeNode;
import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.organization.web.AuthorityController;
import com.nascent.ecrpsaas.plus.ziyan.marketing.service.LineCouponService;
import com.nascent.ecrpsaas.plus.ziyan.organization.model.ZyPlatfrom;
import com.nascent.ecrpsaas.plus.ziyan.organization.model.ZySysPosition;
import com.nascent.ecrpsaas.plus.ziyan.organization.service.AuthorityService;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.utils.model.Authorize;
import com.nascent.utils.query.CommonResult;

/**
 * 系统管理-》权限管理
 * @author mozhimin
 * @date 2018年1月18日
 * @功能  
 */
@Authorize
@Controller
@RequestMapping("/organization/authority")
public class ZyAuthorityController extends AuthorityController {
	
	private AuthorityService authorityService = SpringContext.me().getBean(AuthorityService.class);
	
	/**
	 * 生成平台功能权限树
	 * Title:ZyAuthorityController.java
	 * name:zhimin.mo
	 * return:CommonResult
	 * describe:
	 * time:2018年1月19日
	 */
	@Authorize( order = 1)
	@ResponseBody
	public CommonResult loadPlatfromTree(){
		TreeNode tree = ZyPlatfrom.dao().loadPlatfromTree();
		
		return new CommonResult().setResult(tree.getChildren());
	}
	/**
	 * 根据岗位获取平台权限列表
	 * Title:ZyAuthorityController.java
	 * name:zhimin.mo
	 * return:CommonResult
	 * describe:
	 * time:2018年1月19日
	 */
	@Authorize( order = 1)
	@ResponseBody
	public CommonResult queryPlatfromAuthorityList(String positionCode) throws ParameterException{
		if(UtilString.isEmptyOrNullWildcard(positionCode)){
			throw new ParameterException(ParameterExceptionErrorCode.REQUIRED_VALUE.getCode(), ParameterExceptionErrorCode.REQUIRED_VALUE.getDescription());
		}
		//获取平台的ID集合
		List<String> idList = authorityService.queryPlatfromAuthorityList(positionCode);
		
		return new CommonResult().setResult(idList);
	}
	/**
	 * 根据岗位，平台id 更新岗位的平台权限
	 * Title:ZyAuthorityController.java
	 * name:zhimin.mo
	 * return:CommonResult
	 * describe:
	 * time:2018年1月19日
	 */
	@Authorize(order = 3)/*,actionKey="queryPlatfromAuthorityList"*/
	@ResponseBody
	public CommonResult saveOrUpateZySysPosition(@RequestParam(name = "platfromIds[]",required = false) String[] platfromIds,
			String code) throws ParameterException {
		String message = authorityService.saveOrUpdateZySysPosition(platfromIds, code);
		return new CommonResult().setMsg(message);
	}
}
