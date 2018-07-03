package com.nascent.ecrpsaas.plus.ziyan.brandloyalty.vip.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nascent.ecrpsaas.base.web.BaseController;
import com.nascent.ecrpsaas.plus.vo.ConsumeOverviewVo;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.utils.model.Authorize;
import com.nascent.utils.query.TableRequest;
import com.nascent.utils.query.TableResponse;
@Controller
@Authorize
public class ConsumeOverviewController extends BaseController{
	@Authorize(order = -1)
	public  void consumeOverviewList(){
		
	}
	
	
	/**
	 * 获取数据
	 */

	// 显示表签列表
	@Authorize(order = 0)
	@ResponseBody
	public TableResponse<Record> consumeOverviewDataList(TableRequest request) {
		TableResponse<Record> overviewVos = 	ConsumeOverviewVo.dao().queryConsumeOverviewList(request);
		return overviewVos;
	}

	

}
