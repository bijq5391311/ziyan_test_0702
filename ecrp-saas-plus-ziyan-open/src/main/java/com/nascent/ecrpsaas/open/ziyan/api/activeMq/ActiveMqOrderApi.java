package com.nascent.ecrpsaas.open.ziyan.api.activeMq;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.nascent.ecrpsaas.base.web.BaseController;
import com.nascent.ecrpsaas.open.core.API;
import com.nascent.ecrpsaas.open.ziyan.service.ActiveMqOrderToZiyanService;
import com.nascent.utils.query.CommonResult;

/**
 * activeMq 订单信息数据获取Api
 * @author bijingQ
 *
 */
@API(check = API.Check.NULL)
@RequestMapping(path = "/api/ziyanapi/activemqorder")
public class ActiveMqOrderApi extends BaseController {
	Logger logger = LoggerFactory.getLogger(ActiveMqOrderApi.class);
	//外卖的识别号
	private String takeAway="crmDestinationWaiMaiOrder";
	//中台的识别号
	private String takeCenter="mq4Crm_SaleOrders";
	//中台退货的识别号
	private String takeRtCenter="mq4Crm_ReturnSaleOrders";
	@Autowired
	private ActiveMqOrderToZiyanService activeMqOrderToZiyanService;
	
	
	/**
	 * 外卖订单消息
	 */
	@ResponseBody
	@RequestMapping(path = "takeawayorder", method = RequestMethod.GET)
	public CommonResult  takeAwayOrder(Integer size,String startTime,String endTime){
		CommonResult result= new CommonResult(true);
		try {
			List<JSONObject> list= activeMqOrderToZiyanService.takeAwayOrder(takeAway,size != null?size:500,startTime,endTime);
			
				result.setCode("200");
				result.setMsg("成功");
				result.setResult(list);
				return result;
			
		} catch (Exception e) {
			logger.error("请求数据失败"+e);
			result.setFailed();
			result.setCode("400");
			result.setMsg("服务器发生错误");
			return result;
		}
	}
	/**
	 * 中台订单消息
	 */
	
	@RequestMapping(path = "takecenterorder", method = RequestMethod.GET)
	public CommonResult  takeCenterOrder(Integer size,String startTime,String endTime){
		CommonResult result= new CommonResult();
		try {
			List<JSONObject> list= activeMqOrderToZiyanService.takeAwayOrder(takeCenter,size != null?size:500,startTime,endTime);
					result.setCode("200");
					result.setMsg("成功");
					result.setResult(list);
					return result;
		} catch (Exception e) {
			logger.error("请求数据失败"+e);
			result.setCode("400");
			result.setMsg("服务器发生错误");
			return result;
		}
	}
	/**
	 * 中台退货订单消息
	 */

	@RequestMapping(path = "takecenterrtorder", method = RequestMethod.GET)
	public CommonResult takeCenterRtOrder(Integer size,String startTime,String endTime){
		CommonResult result= new CommonResult();
		try {
			List<JSONObject>  list= activeMqOrderToZiyanService.takeAwayOrder(takeRtCenter,size != null?size:500,startTime,endTime);
					result.setCode("200");
					result.setMsg("成功");
					result.setResult(list);
					return result;
		} catch (Exception e) {
			logger.error("请求数据失败"+e);
			result.setCode("400");
			result.setMsg("服务器发生错误");
			return result;
		}
	}
	
	/**
	 * 订单信息重新推送
	 */
	@ResponseBody
	@RequestMapping(path = "takeOrderTwice", method = RequestMethod.GET)
	public CommonResult  takeOrderTwice(Integer size,String startTime,String endTime){
		CommonResult result= new CommonResult(true);
		try {
			List<JSONObject> list= activeMqOrderToZiyanService.takeOrderTwice(size != null?size:500,startTime,endTime);
			
				result.setCode("200");
				result.setMsg("成功");
				result.setResult(list);
				return result;
			
		} catch (Exception e) {
			logger.error("请求数据失败"+e);
			result.setFailed();
			result.setCode("400");
			result.setMsg("服务器发生错误");
			return result;
		}
	}
}
