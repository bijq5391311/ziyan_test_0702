package com.nascent.ecrpsaas.plus.ziyan.vip.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nascent.ecrpsaas.plus.ziyan.organization.model.ZyKdCustomer;
import com.nascent.ecrpsaas.plus.ziyan.vip.service.ZyKdCustomerService;
import com.nascent.ecrpsaas.vip.web.KdCustomerController;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.utils.query.CommonResult;
import com.nascent.utils.query.TableRequest;
import com.nascent.utils.query.TableResponse;

/**
 * @Describe: TODO
 * @Author:   mozhimin
 * @Date:     会员列表
 */
@Controller
@RequestMapping("/vip/kdcustomer")
public class ZyKdCustomerController extends KdCustomerController {
	/**
	 * 会员列表数据
	 * 
	 * @param tableRequest
	 * @return
	 */
	@ResponseBody
	public TableResponse<Record> quertKdcustomerList(TableRequest request) {
		// 获取当前登录人集团id
		request.getSearchMap().put("group_id", getSessionUser().getTenantId());
		ZyKdCustomerService kds = SpringContext.me().getBean(ZyKdCustomerService.class);
		request.getSearchMap().put("shopCode", getSessionUser().getOwnShopCodes());
		TableResponse<Record> tableResult = kds.queryList(request);

		return tableResult;
	}
	/**
	 * 会员详情，会员互动列表数据
	 * 
	 * @param tableRequest
	 * @return
	 */
	@SuppressWarnings("static-access")
	@ResponseBody
	public CommonResult loadOutActivities(String customerId){
		CommonResult commonResult = new CommonResult().SUCCESS.setResult(ZyKdCustomer.dao().loadOutActivities(customerId));
		return commonResult;
	}
}
