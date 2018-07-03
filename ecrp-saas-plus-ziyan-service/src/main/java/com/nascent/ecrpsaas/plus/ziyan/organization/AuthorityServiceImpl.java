package com.nascent.ecrpsaas.plus.ziyan.organization;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.nascent.ecrpsaas.base.constat.SystemConstat;
import com.nascent.ecrpsaas.base.exception.ParameterException;
import com.nascent.ecrpsaas.base.exception.constant.ParameterExceptionErrorCode;
import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.plus.ziyan.organization.model.ZyPlatfrom;
import com.nascent.ecrpsaas.plus.ziyan.organization.model.ZySysPosition;
import com.nascent.ecrpsaas.plus.ziyan.organization.service.AuthorityService;
/**
 * @author mozhimin
 * @date 2018年1月19日
 * @功能 紫燕组织架构管理接口实现层 
 */
@Service("authorityService")
public class AuthorityServiceImpl implements AuthorityService {
	/**获取岗位的平台权限
	 * Title:AuthorityService.java
	 * name:zhimin.mo
	 * return:CommonResult
	 * describe:
	 * time:2018年1月18日
	 */
	public List<String> queryPlatfromAuthorityList(String positionCode){
		
		List<String> idList = new ArrayList<String>();
		
		ZySysPosition position = ZySysPosition.dao().loadSysPosition(positionCode);
		if(null == position){
			return idList;
		}
		String platfromValue = position.getPlatfromValue();
		if(UtilString.isEmpty(platfromValue)){
			return idList;
		}
		
		List<ZyPlatfrom> platfromList = ZyPlatfrom.dao().queryPlatfromByValue(platfromValue);
		if(null == platfromList){
			return idList;
		}
		for(ZyPlatfrom platfrom : platfromList){
			idList.add(platfrom.getid()+"");
		}
		return idList;
	}
	/**
	 * 根据岗位，平台id 更新岗位的平台权限
	 * Title:AuthorityService.java
	 * name:zhimin.mo
	 * return:String
	 * describe:
	 * time:2018年1月19日
	 */
	public String saveOrUpdateZySysPosition(String[] platfromIds,String code) throws ParameterException{
		String platfromIdStr = "";
		String platfromValueStr = "";
		if(!UtilString.isEmptyOrNullWildcard(code)){
			 if(null != platfromIds && platfromIds.length > 0){
				platfromIdStr = StringUtils.join(platfromIds, ",");
				platfromValueStr = ZyPlatfrom.dao().loadPlatfromValueStr(platfromIdStr);
			}
			if(null == platfromValueStr){
				throw new ParameterException(ParameterExceptionErrorCode.ILLEGAL_VALUE.getCode(),"请选择正确的平台");
			}
			ZySysPosition position = ZySysPosition.dao().loadSysPosition(code);
			if(null == position){
				throw new ParameterException(ParameterExceptionErrorCode.ILLEGAL_VALUE.getCode(),"岗位不存在");
			}
			position.setPlatfromValue(platfromValueStr);
			position.update();
			return SystemConstat.OperationMsg.UPDATE.getName();
		}else{
			throw new ParameterException(ParameterExceptionErrorCode.ILLEGAL_VALUE.getCode(),"必须选择岗位");
		}
	}

}
