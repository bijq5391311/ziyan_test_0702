package com.nascent.ecrpsaas.plus.ziyan.organization.service;

import java.util.List;

import com.nascent.ecrpsaas.base.exception.ParameterException;

/**
 * @author mozhimin
 * @date 2018年1月19日
 * @功能  紫燕组织架构管理接口
 */
public interface AuthorityService {
	/**获取岗位的平台权限
	 * Title:AuthorityService.java
	 * name:zhimin.mo
	 * return:CommonResult
	 * describe:
	 * time:2018年1月18日
	 */
	List<String> queryPlatfromAuthorityList(String positionCode);
	/**
	 * 根据岗位，平台id 更新岗位的平台权限
	 * Title:AuthorityService.java
	 * name:zhimin.mo
	 * return:String
	 * describe:
	 * time:2018年1月19日
	 */
	String saveOrUpdateZySysPosition(String[] platfromIds,String code) throws ParameterException;
}
