package com.nascent.ecrpsaas.open.ziyan.api.customer;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.nascent.ecrpsaas.base.web.BaseController;
import com.nascent.ecrpsaas.open.core.API;
import com.nascent.ecrpsaas.open.ziyan.model.vo.CustomerToZiYanVO;
import com.nascent.utils.query.CommonResult;

/**
 * 用户信息 接口
 */
@API(check = API.Check.NULL)
@RequestMapping(path = "/api/ziyanapi/customertoziyan")
public class customerToZYApi extends BaseController {
	Logger logger = LoggerFactory.getLogger(customerToZYApi.class);

	 @RequestMapping(path = "getCustomerInfo", method = {RequestMethod.GET, RequestMethod.POST})
	public CommonResult getCustomerInfo(String memberCard,String mobile) {
		 //参数校验
		 try {
			if(!memberCard.isEmpty() || !mobile.isEmpty()){
				 List<CustomerToZiYanVO> list =CustomerToZiYanVO.dao().getCustomerToZiYan(memberCard, mobile);
				 	
					if(list !=null && list.size()>0){
						for (CustomerToZiYanVO customerToZiYanVO : list) {
							customerToZiYanVO.setBalance(0.00);
							return CommonResult.SUCCESS.setCode("200").setMsg("成功!").setResult(customerToZiYanVO);
						}
					}
					return CommonResult.SUCCESS.setFailed().setCode("400").setMsg("暂时查询不到结果!");
			 }
			return CommonResult.SUCCESS.setFailed().setCode("400").setMsg("参数错误!");
		} catch (Exception e) {
			logger.error("会员信息To紫燕发生异常:"+e);
			return CommonResult.SUCCESS.setFailed().setCode("400").setMsg("系统发生错误!");
		}
	}
}
