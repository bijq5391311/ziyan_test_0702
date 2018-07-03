package com.nascent.ecrpsaas.open.ziyan.service.impl;

import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.BooleanUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.nascent.ecrpsaas.base.util.wechat.UtilWeixin;
import com.nascent.ecrpsaas.base.util.wechat.WXResponse;
import com.nascent.ecrpsaas.base.vo.touch.WxTemplateVo;
import com.nascent.ecrpsaas.open.ziyan.model.ZyWxConcernDao;
import com.nascent.ecrpsaas.open.ziyan.model.vo.ZyCustomerWeCat;
import com.nascent.ecrpsaas.open.ziyan.service.ZySendWxConcernService;
import com.nascent.utils.query.CommonResult;

/**
 * Write class comments here
 * <p>
 * User: Bijq
 * Date: 2018/3/26 11:53
 * version $Id: ZySendWxConcernServiceImpl.java, v1.0  11:53 Exp $
 */
@Service
public class ZySendWxConcernServiceImpl implements ZySendWxConcernService {
	private static Logger log = LoggerFactory.getLogger (ZySendWxConcernServiceImpl.class);

	@Override
	public CommonResult sendWxConcern (String wxTemplateType, String customerMobile, Map<String, ? extends Object> valuesMap) {
		CommonResult commonResult = new CommonResult();
		//查询用户信息和appKey，openId和所属品牌
		ZyCustomerWeCat zyCustomerWeCat = getWXCustomer(customerMobile);
		if (zyCustomerWeCat == null) {
			log.info (commonResult.setFailed().setMsg ("未查到该用户微信相关信息").getMsg ());
			return commonResult;
		}
		Integer brandId = zyCustomerWeCat.getBrandId ();
		String appKey = zyCustomerWeCat.getAppKey ();
		String openId = zyCustomerWeCat.getOpenId ();
		//获取微信模板
		WxTemplateVo wxTemplateVo = getWxTemplateForAppByType (wxTemplateType, appKey);
		//调用接口发送模板消息
		WXResponse wxResponse = UtilWeixin.sendMessage (wxTemplateVo, (Map<String, Object>) valuesMap, appKey, openId, brandId);
		if (BooleanUtils.isFalse (wxResponse.getSuccess ())) {
			log.info (commonResult.setFailed ().setMsg (wxResponse.getMessage ()).getMsg ());
			if (wxResponse.getErrorCode () != null) {
				commonResult.setCode (wxResponse.getErrorCode ().toString ());
			}
			return commonResult;
		}
		return commonResult;
	}



	// 查询关怀模板
	private WxTemplateVo getWxTemplateForAppByType (String WxTemplateType, String appKey) {
		List<WxTemplateVo> wxTemplateExtendsVos = ZyWxConcernDao.dao ().queryWXTemplateInfo (WxTemplateType,appKey);
		if (CollectionUtils.isNotEmpty (wxTemplateExtendsVos)) {
			return wxTemplateExtendsVos.get (0);
		}
		return null;
	}
	//查询用户信息和appKey，openId和所属品牌
	public ZyCustomerWeCat getWXCustomer(String mobile){
		List<ZyCustomerWeCat> zyCustomerWeCatVo = ZyWxConcernDao.dao ().queryWXCustomer(mobile);
		if (CollectionUtils.isNotEmpty (zyCustomerWeCatVo)) {
			return zyCustomerWeCatVo.get (0);
		}
		return null;
	}

}
