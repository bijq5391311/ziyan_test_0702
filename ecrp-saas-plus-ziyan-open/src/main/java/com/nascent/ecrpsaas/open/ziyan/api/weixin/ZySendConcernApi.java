package com.nascent.ecrpsaas.open.ziyan.api.weixin;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nascent.ecrpsaas.base.web.BaseController;
import com.nascent.ecrpsaas.open.core.API;
import com.nascent.ecrpsaas.open.ziyan.model.vo.ZyWeChatTemple;
import com.nascent.ecrpsaas.open.ziyan.service.ZySendWxConcernService;
import com.nascent.utils.query.CommonResult;

/**
 * 发送微信关怀模板消息
 * <p>
 * User: bijq
 * Date: 2018/3/26 10:36
 * version $Id: ZySendConcernController.java, v 0.1 10:36 Exp $
 */

@API(check = API.Check.NULL)
@RequestMapping("/api/ziyanapi/sendconcern")
public class ZySendConcernApi extends BaseController {
	private static Logger log = LoggerFactory.getLogger(ZySendConcernApi.class);

	@Autowired
	private ZySendWxConcernService sendWxConcernService;

	/**
	 * 发送关怀通知
	 *
	 * @param
	 * @return
	 */
	// 例如 紫燕门店POS消费通知 的 wxTemplateType 对应为 PayConcern
	@ResponseBody
	@RequestMapping(value = "/{wxTemplateType}/{customerMobile}", produces = {"application/json;charset=UTF-8"},method = RequestMethod.POST)
	public CommonResult sendConcern (@PathVariable("wxTemplateType") String wxTemplateType,@PathVariable("customerMobile") String customerMobile,ZyWeChatTemple zyWeChatTemple) {
		log.info ("准备推送微信模板消息...类型{}，用户号码{}。", wxTemplateType, customerMobile);
		//组织map参数
		Map<String,Object> valueMap= new HashMap<String,Object>();
		//参数校验
		CommonResult commonResult = new CommonResult();
		commonResult.setFailed().setCode ("400");
		try {
			if (StringUtils.isEmpty (wxTemplateType)) {
				return commonResult.setMsg ("路径参数（模板类型）不能为空");
			}
			if (StringUtils.isEmpty (customerMobile)) {
				return commonResult.setMsg ("路径参数（手机号码）不能为空");
			}
			log.info("参数信息"+"payMent:"+zyWeChatTemple.getPayMent()+"payTime:"+zyWeChatTemple.getPayTime()+"payType:"+zyWeChatTemple.getPayType()+"shopName"+zyWeChatTemple.getShopName());
			valueMap.put("first", "尊敬的用户"+customerMobile+"，您本次消费明细如下:");
			valueMap.put("remark", "感谢您的使用。");
			valueMap.put("{payMent}",zyWeChatTemple.getPayMent());
			valueMap.put("{payType}", zyWeChatTemple.getPayType());
			valueMap.put("{shopName}",zyWeChatTemple.getShopName());
			valueMap.put("{tradeId}", zyWeChatTemple.getTradeId());
			valueMap.put("{payTime}", zyWeChatTemple.getPayTime());
			
			CommonResult result = sendWxConcernService.sendWxConcern (wxTemplateType, customerMobile, valueMap);
			if (result == null) {
				return commonResult.setMsg ("系统错误");
			}
			if (result.isSuccess ()) {
				log.info ("模板消息推送成功");
				return result.setCode ("200").setMsg ("模板消息推送成功");
			}else{
				return commonResult.setCode (result.getCode () == null ? "400" : result.getCode ()).setMsg (result.getMsg () == null ? "未知错误" : result.getMsg ());
			}
		} catch (Exception e) {
			log.error ("推送微信模板消息异常:" + e);
			return commonResult.setMsg("系统错误");
		}
	}
}
