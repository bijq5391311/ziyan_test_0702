package com.nascent.ecrpsaas.utils;


import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.nascent.ecrpsaas.ingest.model.TestOrder;

/***
 * 交易订单金额转换（对应生成积分通知）
 * @author pc
 *
 */
public class PointTradeManager {
	/**
	 * 选择生成积分通知的平台
	 * @param kdTrade
	 * @param plat
	 */
	public static void pointTradeType(TestOrder kdTrade, Integer plat ,String tradeType) {
	   if(plat.equals(1)) {
	    	getTBTradeFinished(kdTrade, plat, tradeType);
	   }
	   else if(kdTrade.get("TradeFrom").equals("mendian") || kdTrade.get("TradeFrom").equals("meituan")||
			   kdTrade.get("TradeFrom").equals("eleme") || kdTrade.get("TradeFrom").equals("baidu") || kdTrade.get("TradeFrom").equals("jdhome"))
	   {
		   zyTradeFinished(kdTrade);
	   }
	   else {
			getOtherTradeFinished(kdTrade, plat, tradeType);
	   }
	}
	
	public static void zyTradeFinished(TestOrder kdTrade) {
		List<TestOrder> orders =new ArrayList<>();
		if(kdTrade.get("orders") instanceof List) {
			orders = kdTrade.get("orders");
		}
		List<Object> detailInfolist = new ArrayList<Object>();
		for (TestOrder order : orders) {
			TestOrder kdOrder = new TestOrder();
			kdOrder.set("OutOrderId", order.get("OutOrderId"));
			kdOrder.set("OuterId", order.get("OuterId")==null?"":order.get("OuterId"));
			kdOrder.set("SysItemId", order.get("SysItemId"));
			kdOrder.set("OrderStatus", "TradeFinished");
			kdOrder.set("OrderFrom", order.get("OrderFrom"));
			kdOrder.set("OrderPayment", order.get("price"));
			detailInfolist.add(kdOrder.toJson());
		}
		JSONArray fromObject = JSONArray.parseArray(JSON.toJSONString(detailInfolist));
		JSONObject json = new JSONObject();
		json.put("orderInfo", fromObject);
		json.put("type", kdTrade.get("TradeFrom"));
		
		kdTrade.set("orderValues",json.toString().trim());
	}
	
	/**
	 * 设置淘宝交易信息走分摊
	 * @param kdTrade
	 * @param plat
	 * @param tradeType
	 */
    public static void getTBTradeFinished(TestOrder kdTrade, Integer plat, String tradeType) {
        	
		List<TestOrder> orders =new ArrayList<>();
		if(kdTrade.get("orders") instanceof List) {
			orders = kdTrade.get("orders");
		}
		// 子订单总金额
		double subPayment = 0;
		// 子订单总金额
		for (TestOrder order : orders) {
			subPayment += Double.valueOf(order.get("price"))*  Double.valueOf(order.get("number").toString());
		}
		// 已分配金额
		double fpPayment = 0;

		List<Object> detailInfolist = new ArrayList<Object>();
		int i = 0;
		for (TestOrder order : orders) {
			if(order!=null) 
			{
				TestOrder kdOrder = new TestOrder();
	
				kdOrder.set("OutOrderId", order.get("OutOrderId"));
				kdOrder.set("OuterId", order.get("OuterId")==null?"":order.get("OuterId"));
				kdOrder.set("SysItemId", order.get("SysItemId"));
				kdOrder.set("OrderStatus", order.get("OrderStatus"));
				if (i == orders.size() - 1) {
					kdOrder.set("OrderPayment", Double.valueOf(kdTrade.get("payment"))-fpPayment);
					order.set("payment", Double.valueOf(kdTrade.get("payment"))-fpPayment);
				} else {
					double payment = 0;
					if (0 != subPayment) {
						payment = Double.valueOf(kdTrade.get("payment")) * (Double.valueOf(order.get("price")) * Double.valueOf(order.get("number").toString()) / subPayment);
						}
					// 四舍五入
					DecimalFormat fmt = new DecimalFormat("#.##");
					payment = Double.valueOf(fmt.format(payment));
					kdOrder.set("OrderPayment", payment);
					// 已分配金额
					fpPayment += payment;
					order.set("payment", payment);
				}
				kdOrder.set("OrderFrom",order.get("OrderFrom"));
				detailInfolist.add(kdOrder.toJson());
				i++;
				
			}
		}
		JSONArray fromObject = JSONArray.parseArray(JSON.toJSONString(detailInfolist));
		JSONObject json = new JSONObject();
		json.put("orderInfo", fromObject);
		json.put("type", tradeType);
		kdTrade.set("orderValues", json.toString().trim());
	}
	
	/**
	 * 淘宝积分 
	 * @param kdTrade
	 */
	public static void getTBTradeFinished_(TestOrder kdTrade, Integer plat, String tradeType) {
		List<TestOrder> orders =new ArrayList<>();
		if(kdTrade.get("orders") instanceof List) {
			orders = kdTrade.get("orders");
		}
		List<Object> detailInfolist = new ArrayList<Object>();
		for (TestOrder order : orders) {
			TestOrder kdOrder = new TestOrder();
			kdOrder.set("OutOrderId", order.get("OutOrderId"));
			kdOrder.set("OuterId", order.get("OuterId")==null?"":order.get("OuterId"));
			kdOrder.set("SysItemId", order.get("SysItemId"));
			kdOrder.set("OrderStatus", "TradeFinished");
			kdOrder.set("OrderFrom", order.get("OrderFrom"));
			kdOrder.set("OrderPayment", Double.valueOf(order.get("payment")));
			if (!"TRADE_FINISHED".equals(order.get("OrderStatus"))) {
				kdOrder.set("OrderStatus", "TradeClosed");
				kdOrder.set("OrderPayment", 0);
			}
			detailInfolist.add(kdOrder.toJson());
		}
		JSONArray fromObject = JSONArray.parseArray(JSON.toJSONString(detailInfolist));
		JSONObject json = new JSONObject();
		json.put("orderInfo", fromObject);
		json.put("type", tradeType);
		
		kdTrade.set("orderValues",json.toString().trim());
	}
	
	/**
	 * 其他平台积分
	 * @param kdTrade
	 */
	public static void getOtherTradeFinished(TestOrder kdTrade, Integer plat, String tradeType) {
		
		List<TestOrder> orders =new ArrayList<>();
		if(kdTrade.get("orders") instanceof List) {
			orders = kdTrade.get("orders");
		}
		// 子订单总金额
		double subPayment = 0;
		// 子订单总金额
		for (TestOrder order : orders) {
			subPayment += Double.valueOf(order.get("price"))*  Double.valueOf(order.get("number").toString());
		}
		// 已分配金额
		double fpPayment = 0;

		List<Object> detailInfolist = new ArrayList<Object>();
		int i = 0;
		for (TestOrder order : orders) {
			if(order!=null) 
			{
				TestOrder kdOrder = new TestOrder();
	
				kdOrder.set("OutOrderId", order.get("OutOrderId"));
				kdOrder.set("OuterId", order.get("OuterId")==null?"":order.get("OuterId"));
				kdOrder.set("SysItemId", order.get("SysItemId"));
				kdOrder.set("OrderStatus", "TradeFinished");
	
				if (i == orders.size() - 1) {
					kdOrder.set("OrderPayment", Double.valueOf(kdTrade.get("payment"))-fpPayment);
					order.set("payment", Double.valueOf(kdTrade.get("payment"))-fpPayment);
				} else {
					double payment = 0;
					if (0 != subPayment) {
						payment = Double.valueOf(kdTrade.get("payment")) * (Double.valueOf(order.get("price")) * Double.valueOf(order.get("number").toString()) / subPayment);
						}
					// 四舍五入
					DecimalFormat fmt = new DecimalFormat("#.##");
					payment = Double.valueOf(fmt.format(payment));
					kdOrder.set("OrderPayment", payment);
					// 已分配金额
					fpPayment += payment;
					order.set("payment", payment);
				}
	
				/*if (!"TRADE_FINISHED".equals(order.get("OrderStatus"))) {
					kdOrder.set("OrderStatus", "TradeClosed");
					kdOrder.set("OrderPayment", 0);
					order.set("payment", 0);
				}*/
				kdOrder.set("OrderFrom",order.get("OrderFrom"));
				detailInfolist.add(kdOrder.toJson());
				i++;
				
			}
		}
		
		JSONArray fromObject = JSONArray.parseArray(JSON.toJSONString(detailInfolist));
		JSONObject json = new JSONObject();
		json.put("orderInfo", fromObject);
		json.put("type", tradeType);
		kdTrade.set("orderValues", json.toString().trim());
	}
}
