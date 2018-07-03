package com.nascent.ecrpsaas.utils;

import com.nascent.ecrpsaas.ingest.model.TestOrder;

public class YouzanTradeStaus {
	
	public static void  setTradeStatus(TestOrder kdTrade) {
		String status ="";
		switch (kdTrade.getStr("TradeStatus")) {
		case "待付款":
			status ="WAIT_BUYER_PAY";
			break;
		case "待发货":
			status ="WAIT_BUYER_CONFIRM_GOODS";
			break;
		case "待成团":
			status = "WAIT_GROUP";
			break;
		case "待接单":
			status = "WAIT_ORDERS";
			break;
		case "已接单":
			status = "ORDERS_FINISHED";
			break;
		case "已发货":
			status ="WAIT_SELLER_SEND_GOODS";
			break;
		case "已完成":
			status ="TRADE_FINISHED";
			break;
		case "已关闭":
			status ="TRADE_CLOSED";
			break;
		case "退款成功":
			status ="REWARD_SUCCESS";
			break;
		default:
			break;
		}
		kdTrade.set("TradeStatus", status);
	}
}
