package com.nascent.ecrpsaas.utils;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.nascent.ecrpsaas.ingest.model.TestOrder;
import com.nascent.plugins.taobao.StringUtils;

/***
 * 设置交易的属性信息(交易的数量、生成的交易编号)
 * 
 * @author pc
 *
 */
public class TradeAttribute {
	private static final String PATTERN = "[a-zA-Z]";

	public static void setAttribute(TestOrder kdTrade, String palt, String sysCustomerid)
			throws NumberFormatException, UnsupportedEncodingException {
		String outTradeId = kdTrade.get("OutTradeId").toString();
		switch (palt) {
		case "3":
			kdTrade.set("TradeStatus", setTradeStatus(kdTrade));
			break;
		case "13":
			setGuoMeiParams(kdTrade);
			break;
		default:
			break;
		}
		kdTrade.set("num", getNum(kdTrade));
		if (palt.equals("ziyan")) {
			kdTrade.set("discount_type",
					kdTrade.get("discountType") != null ? getDiscountList(kdTrade.get("discountType")) : "-");
			kdTrade.set("SysTradeId",transSysTradeId(kdTrade.get("OutTradeId").toString()));
		} else {
			kdTrade.set("SysTradeId", sysTradeId(palt, outTradeId));
		}
		kdTrade.set("SysCustomerId", sysCustomerid);
	}
	
	/**
	 * 转成系统交易id
	 * @param outTradeId
	 * @return
	 */
	public static String transSysTradeId(String outTradeId) {
		 StringBuilder sysTradeId = new StringBuilder();
		 Pattern pattern = Pattern.compile("\\d+");
		 Matcher matcher = pattern.matcher(outTradeId); 
		 while (matcher.find()) {  
			 sysTradeId.append(matcher.group(0));
		 }
		 if (sysTradeId.toString().length()>19) {
			 return sysTradeId.toString().substring(0,19);
		 } else {
			 return sysTradeId.toString();
		 }
		 
	}

	/**
	 * 设置京东的订单状态
	 * 
	 * @param kdTrade
	 * @return
	 */
	public static String setTradeStatus(TestOrder kdTrade) {
		String status = "";

		switch (kdTrade.get("TradeStatus").toString()) {
		case "WAIT_SELLER_STOCK_OUT":
			status = "WAIT_SELLER_SEND_GOODS";
			break;
		case "SEND_TO_DISTRIBUTION_CENER":
			status = "WAIT_BUYER_CONFIRM_GOODS";
			break;
		case "DISTRIBUTION_CENTER_RECEIVED":
			status = "WAIT_BUYER_CONFIRM_GOODS";
			break;
		case "WAIT_GOODS_RECEIVE_CONFIRM":
			status = "WAIT_BUYER_CONFIRM_GOODS";
			break;
		case "RECEIPTS_CONFIRM":
			status = "TRADE_FINISHED";
			break;
		case "WAIT_SELLER_DELIVERY":
			status = "WAIT_SELLER_SEND_GOODS";
			break;
		case "FINISHED_L":
			status = "TRADE_FINISHED";
			break;
		case "TRADE_CANCELED":
			status = "TRADE_CLOSED";
			break;
		case "LOCKED":
			status = "TRADE_CLOSED_BY_TAOBAO";
			break;
		default:
			break;
		}
		return status;
	}

	public static void setOrderStatus(Object orders) {
		List<TestOrder> ords = new ArrayList<>();
		if (orders instanceof List) {
			ords = (List) orders;
		}
		for (TestOrder order : ords) {
			if (order != null) {
				order.set("OrderStatus", setHisenseTradeStatus(order.get("OrderStatus")));
			}

		}
	}

	/*
	 * 交易状态:TRADE_NO_CREATE_PAY(没有创建支付宝交易) WAIT_BUYER_PAY(等待买家付款)
	 * SELLER_CONSIGNED_PART(卖家部分发货) WAIT_SELLER_SEND_GOODS(等待卖家发货,即:买家已付款)
	 * WAIT_BUYER_CONFIRM_GOODS(等待买家确认收货,即:卖家已发货)
	 * TRADE_BUYER_SIGNED(买家已签收,货到付款专用) TRADE_FINISHED(交易成功)
	 * TRADE_CLOSED(付款以后用户退款成功，交易自动关闭) TRADE_CLOSED_BY_TAOBAO(付款以前，卖家或买家主动关闭交易)
	 */
	/**
	 * 设置海信交易状态
	 * 
	 * @param Tradestatus
	 * @return
	 */
	public static String setHisenseTradeStatus(int tradeStatus) {
		String status = "";
		switch (tradeStatus) {
		case 0:
			status = "WAIT_BUYER_PAY";
			break;
		case 1:
			status = "WAIT_SELLER_SEND_GOODS";
			break;
		case 2:
			status = "WAIT_BUYER_CONFIRM_GOODS";
			break;
		case 3:
			status = "TRADE_BUYER_SIGNED";
			break;
		case -1:
			status = "TRADE_CLOSED_BY_TAOBAO";
			break;
		case -2:
			status = "TRADE_CLOSED_BY_TAOBAO";
			break;
		case -3:
			status = "-3";
			break;
		case -6:
			status = "TRADE_CLOSED";
			break;
		case -7:
			status = "-7";
			break;
		case -10:
			status = "TRADE_CLOSED";
			break;
		case -13:
			status = "TRADE_CLOSED_BY_TAOBAO";
			break;
		case -14:
			status = "TRADE_CLOSED_BY_TAOBAO";
			break;
		default:
			break;
		}
		return status;
	}

	/*
	 * GuoMeiStatusMap.put("PR", "WAIT_BUYER_PAY"); GuoMeiStatusMap.put("PP",
	 * "WAIT_SELLER_SEND_GOODS"); GuoMeiStatusMap.put("EX",
	 * "WAIT_BUYER_CONFIRM_GOODS"); GuoMeiStatusMap.put("DL", "TRADE_FINISHED");
	 * GuoMeiStatusMap.put("CL", "TRADE_CLOSED"); GuoMeiStatusMap.put("RV",
	 * "WAIT_RETURN"); GuoMeiStatusMap.put("RT", "WAIT_RETURN");
	 * GuoMeiStatusMap.put("RSC", "WAIT_RETURN"); GuoMeiStatusMap.put("RSN",
	 * "WAIT_RETURN"); GuoMeiStatusMap.put("RPP", "WAIT_RETURN");
	 * GuoMeiStatusMap.put("RWA", "WAIT_RETURN"); GuoMeiStatusMap.put("RFL",
	 * "WAIT_RETURN"); GuoMeiStatusMap.put("R2C", "WAIT_RETURN");
	 * GuoMeiStatusMap.put("RCP", "TRADE_CLOSED");
	 */
	/**
	 * 设置国美交易状态
	 * 
	 * @param kdTrade
	 */
	public static void setGuoMeiParams(TestOrder kdTrade) {
		String tradeStatus = kdTrade.get("TradeStatus");
		switch (tradeStatus) {
		case "PR":
			tradeStatus = "WAIT_BUYER_PAY";
			break;
		case "PP":
			tradeStatus = "WAIT_SELLER_SEND_GOODS";
			break;
		case "EX":
			tradeStatus = "WAIT_BUYER_CONFIRM_GOODS";
			break;
		case "DL":
			tradeStatus = "TRADE_FINISHED";
			break;
		case "CL":
			tradeStatus = "TRADE_CLOSED";
			break;
		case "RCP":
			tradeStatus = "TRADE_CLOSED";
			break;
		default:
			tradeStatus = "WAIT_RETURN";
			break;
		}
		kdTrade.set("TradeStatus", tradeStatus);
	}

	/**
	 * 得到优惠信息列表
	 * 
	 * @return
	 */
	public static String getDiscountList(JSONArray discountTypeList) {
		if (discountTypeList.size() > 0) {
			String type = "";
			for (Object discount : discountTypeList) {
				type += ((JSONObject) discount).getString("discountCode") + ",";
			}
			return type.substring(0, type.length() - 1);
		} else
			return "-";
	}

	/**
	 * 统计数量
	 * 
	 * @param kdTrade
	 * @return
	 */
	public static double getNum(TestOrder kdTrade) {
		Object object = kdTrade.get("orders");
		double num = 0;
		List<TestOrder> kd = new ArrayList<>();
		if (object instanceof List) {
			kd = (List) object;
		}
		for (TestOrder order : kd) {
			if (order != null) {
				String outId = order.get("OuterId");
				if (!StringUtils.isEmpty(outId)) {
					order.set("OuterId",
							outId.indexOf("）") > -1 ? outId.substring(outId.indexOf("）") + 1, outId.length()) : outId);
				}
				num += Double.valueOf(order.get("number").toString());
			}

		}
		return num;
	}

	/**
	 * 得到系统订单编号
	 * 
	 * @param plat
	 * @param outTradeId
	 * @return
	 */
	public static String sysTradeId(String plat, String outTradeId) {
		String outTradeid = "";
		String sysTradeId = "";
		if (Pattern.compile(PATTERN).matcher(outTradeId).find()) {
			outTradeid = String.valueOf((int) outTradeId.charAt(0)) + outTradeId.substring(1, outTradeId.length());
		} else
			outTradeid = outTradeId;
		sysTradeId = plat + outTradeid;
		if (sysTradeId.length() > 18) {
			sysTradeId = sysTradeId.substring(0, 18);
		} else {
			sysTradeId = "";
			for (int i = 0; i < 18 - plat.length() - outTradeid.length(); i++) {
				sysTradeId += 0;
			}
			sysTradeId = plat + sysTradeId + outTradeid;
		}
		return sysTradeId;
	}

	// 得到系统客户编号
	public static String sysCustomerId(String sysCustomerId) throws UnsupportedEncodingException {
		StringBuffer sb = new StringBuffer();
		byte[] bytes = sysCustomerId.getBytes("utf-8");
		for (byte b : bytes) {
			sb.append(b);
		}
		String sb1 = sb.toString().replace("-", "");
		if (sb1.length() <= 16) {
			for (int i = 0; i < 18 - sb1.length(); i++) {
				sb1 += 0;
			}
		} else {
			sb1 = sb1.substring(0, 16);
		}
		return sb1.toString();
	}

	/**
	 * 设置紫燕系统商品id
	 * 
	 * @param itemId
	 * @param plat
	 * @return
	 */
	public synchronized static String getZiYanSysItem(String itemId, String plat) {
		String sysItemId = "";
		switch (plat) {
		case "mendian":
			sysItemId = "10";
			break;
		case "meituan":
			sysItemId = "20";
			break;
		case "eleme":
			sysItemId = "30";
			break;
		case "baidu":
			sysItemId = "40";
			break;
		case "jdhome":
			sysItemId = "50";
			break;
		default:
			break;
		}
		if ((sysItemId + itemId).length() <= 18) {
			return (sysItemId + itemId);
		} else {
			return (sysItemId + itemId).substring(0, 18);
		}

	}

	/**
	 * 设置系统商品id
	 * 
	 * @param itemId
	 * @param plat
	 * @return
	 */
	public synchronized static String getSysItem(String itemId, String plat) {
		String sysItemId = plat + itemId;
		if (Pattern.compile(PATTERN).matcher(itemId).find()) {
			return String.valueOf(sysItemId.hashCode());
		}
		if (sysItemId.length() >= 18) {
			sysItemId.substring(0, 18);
		} else {
			sysItemId = "";
			int platLength = plat.length();
			int itemLength = itemId.length();
			for (int i = 0; i < 18 - platLength - itemLength; i++) {
				sysItemId += "0";
			}
			sysItemId = plat + sysItemId + itemId;
		}
		if(sysItemId.length() >18){
			sysItemId = sysItemId.substring(0, 18);
		}
		return sysItemId;
	}

	public static String setOrderSkuProperties(String arrays) {
		String properties = "";
		if (!StringUtils.isEmpty(arrays)) {
			JSONArray json = JSONArray.parseArray(arrays);
			for (Object object : json) {
				JSONObject attr = (JSONObject) object;
				properties += attr.get("attrKey") + ":" + attr.get("attrVal") + ",";
			}
		}
		return properties;
	}

	public static String setSkuProperties(JSONArray arrays) {
		String properties = "";
		for (Object object : arrays) {
			JSONObject attr = (JSONObject) object;
			properties += attr.get("attrKey") + ":" + attr.get("attrVal") + ",";
		}
		return properties.substring(0, properties.length() > 0 ? properties.length() - 1 : properties.length());
	}

	public static String changeF2Y(Integer amount) throws Exception {
		if (amount != 0)
			return BigDecimal.valueOf(Long.valueOf(amount)).divide(new BigDecimal(100)).toString();
		else
			return "0";
	}
}
