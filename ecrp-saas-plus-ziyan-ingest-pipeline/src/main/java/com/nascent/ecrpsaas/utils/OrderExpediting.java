package com.nascent.ecrpsaas.utils;


import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jd.open.api.sdk.JdException;
import com.nascent.api.ApiException;
import com.nascent.ecrpsaas.ingest.model.TestOrder;
import com.nascent.plugins.taobao.StringUtils;
import com.nascent.utils.DateUtils;
/**
 * 
 * 订单催付
 * @author pc
 *
 */
public class OrderExpediting {
	
	 public static String CompanyName="";
	 public static String OutSid="";
	 
	 public static void setExpeditingAndValues(JSONObject his, TestOrder kdTrade, JSONObject shop, TestOrder ext, String score) throws JdException, ApiException, ParseException {
		 setExpeditingAndValues(his, kdTrade, shop, ext, score,"");
	 }
	 
	 public synchronized static void setExpeditingAndValues(JSONObject his, TestOrder kdTrade, JSONObject shop, TestOrder ext, String score, String hisOutSid) throws JdException, ApiException, ParseException {
		 String itemIds = "";
		 //得到所有商品id
		 String titles = "";
		 //得到所有商品名称
		 CompanyName = "";
		 //得到公司名称
		 OutSid="";
		 Object orders = kdTrade.get("orders");
		 if(orders instanceof List)
		 {	 
			// 交易商品
			for (TestOrder record : (List<TestOrder>) orders) {
				if(record !=null)
				{
					if(shop!=null) {
						if((TradeAttribute.getSysItem(record.get("OutItemId") != null ? record.get("OutItemId").toString() : "", shop.getString("plat_from_type"))).length()>18){
							record.set("SysItemId",(TradeAttribute.getSysItem(record.get("OutItemId") != null ? record.get("OutItemId").toString() : "", shop.getString("plat_from_type"))).substring(0, 6) );
							itemIds += record.get("SysItemId") + ",";
						}else{
							record.set("SysItemId",(TradeAttribute.getSysItem(record.get("OutItemId") != null ? record.get("OutItemId").toString() : "", shop.getString("plat_from_type"))));
							itemIds += record.get("SysItemId") + ",";
						}
						
					}else {
						if(TradeAttribute.getZiYanSysItem(record.get("OutItemId").toString(), kdTrade.get("TradeFrom")).length() >18){
							record.set("SysItemId",TradeAttribute.getZiYanSysItem(record.get("OutItemId").toString(), kdTrade.get("TradeFrom")).substring(0, 6));
							itemIds += record.get("SysItemId") + ",";
						}else {
							record.set("SysItemId",TradeAttribute.getZiYanSysItem(record.get("OutItemId").toString(), kdTrade.get("TradeFrom")));
							itemIds += record.get("SysItemId") + ",";
						}
						
					
					}
					
				}
		    }
	
			if (!"".equals(itemIds)) {
				itemIds = itemIds.substring(0, itemIds.length() - 1);
			}
			int i=0;
			for (TestOrder record : (List<TestOrder>) orders) {
				if(record!=null) {
				i++;
				if(i>5){
					break;
				}
				titles += record.get("title") + ",";
				}
			}
	
			if (!"".equals(titles)) {
				titles = titles.substring(0, titles.length() - 1);
				if(i>5){
					titles=titles+",......";
				}
			}
		 }
		 setLogistics(ext, shop, kdTrade, hisOutSid);
		 
		 String values=""; 
		 if(kdTrade.get("TradeFrom").equals("mendian") || kdTrade.get("TradeFrom").equals("meituan")||
				   kdTrade.get("TradeFrom").equals("eleme") || kdTrade.get("TradeFrom").equals("baidu") || kdTrade.get("TradeFrom").equals("jdhome"))
		 {
			 kdTrade.set("mark", "");
		     kdTrade.set("notify_time", "");
			 kdTrade.set("notify_status", "");
		 }else {
			 //占位符JSON
			 //催付
			 if (his==null && !"cod".equals(kdTrade.get("TradeStatus"))) {
				if (isOverdue(kdTrade.get("created"))) {
					values = waitBuyerPay(kdTrade, itemIds, titles, shop.getInteger("plat_from_type"), ext.get("TradeType").toString() );
					kdTrade.set("mark", "UrgeRemark");
					kdTrade.set("notify_time", kdTrade.get("created"));
					kdTrade.set("notify_status", "WAIT_BUYER_PAY");
				}
			 }
			 // 付款关怀
			 // 订单变更付款时间
			 if ((his==null?true:StringUtils.isEmpty(his.getString("pay_time"))) && !StringUtils.isEmpty(kdTrade.get("PayTime")) && !"cod".equals((kdTrade.get("TradeStatus")))) {
				if (isOverdue(kdTrade.get("PayTime"))) {
					values = orderRemark(kdTrade, titles);
					kdTrade.set("mark","PayConcern");
					kdTrade.set("notify_time", kdTrade.get("PayTime"));
					kdTrade.set("notify_status", "WAIT_SELLER_SEND_GOODS");
				}
			 }
			 // 发货提醒
			 // 订单变更发货时间
			 if ((his==null?true:StringUtils.isEmpty(his.getString("consign_time"))) && !StringUtils.isEmpty(kdTrade.get("ConsignTime"))) {
					if (null != ext.get("OutSid") && !"".equals(ext.get("OutSid"))) {
						if (isOverdue(kdTrade.get("ConsignTime"))) {
							values = consignNotify(kdTrade, ext.get("OutCompanyName"),ext.get("OutSid"));
							kdTrade.set("mark", "ConsignNotify");
							kdTrade.set("notify_time", kdTrade.get("ConsignTime"));	
							kdTrade.set("notify_status", "WAIT_BUYER_CONFIRM_GOODS");
						}
					}
			 }
			 // 生成确认关怀
			 if ((his==null?true:StringUtils.isEmpty(his.getString("end_time"))) && !StringUtils.isEmpty(kdTrade.get("EndTime"))
						&& "TRADE_FINISHED".equals(kdTrade.get("TradeStatus"))){
					if (isOverdue(kdTrade.get("EndTime"))) {
						values = confirmConcern(kdTrade, titles,score);
						kdTrade.set("mark", "ConfirmConcern");
						kdTrade.set("notify_time", kdTrade.get("EndTime"));	
						kdTrade.set("notify_status", "TRADE_FINISHED");
					}  
			 }
		 }
		 kdTrade.set("Values", values);
		 if("TRADE_FINISHED".equals(kdTrade.get("TradeStatus"))){
			 if(shop!=null) {
			     PointTradeManager.pointTradeType(kdTrade, shop.getInteger("plat_from_type"), ext.get("TradeType"));
			 }
			 else
			 {
				 PointTradeManager.pointTradeType(kdTrade, 0, ext.get("TradeType"));
			 }
		 }
	 }
	public  synchronized static Boolean isOverdue(String time) throws ParseException {
		long consignTime = new DateUtils(time).getTime().getTime();
		long nowTime = new DateUtils(new Date()).add(Calendar.DATE, -2).getTime().getTime();
		return consignTime - nowTime >= 0;
	}
	
	/**
	 * 给时间加上或减去指定毫秒，秒，分，时，天、月或年等，返回变动后的时间
	 * 
	 * @param date
	 *            要加减前的时间，如果不传，则为当前日期
	 * @param field
	 *            时间域，有Calendar.MILLISECOND,Calendar.SECOND,Calendar.MINUTE,<br>
	 *            Calendar.HOUR,Calendar.DATE, Calendar.MONTH,Calendar.YEAR
	 * @param amount
	 *            按指定时间域加减的时间数量，正数为加，负数为减。
	 * @return 变动后的时间
	 */
	public static Date add(Date date, int field, int amount) {
		if (date == null) {
			date = new Date();
		}

		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(field, amount);

		return cal.getTime();
	}
	 
	public static void setLogistics(TestOrder ext,JSONObject shop, TestOrder kdTrade, String hisOutSid) throws JdException, ApiException {
		if(shop!=null) {
			switch (shop.getInteger("plat_from_type")) {
			case 1:
				tbGetLogistics(ext, shop.getInteger("plat_from_type"));
				break;
			case 3:
				if(StringUtils.isEmpty(hisOutSid)) {
					if(!StringUtils.isEmpty(ext.get("OutSid"))) {
						jdGetLogistics(ext, shop, kdTrade.get("TradeStatus"));
					}
				}
				break;
			default:
				break;
			}
		}
	}

	public static void jdGetLogistics(TestOrder ext, JSONObject shop,String tradeStatus) throws JdException, ApiException {
		if(tradeStatus.equals("SELLER_CONSIGNED_PART") || tradeStatus.equals("WAIT_SELLER_SEND_GOODS")
		|| tradeStatus.equals("TRADE_BUYER_SIGNED") || tradeStatus.equals("TRADE_FINISHED")) {
			Logistics.getLogistics(ext, shop);
		}
	}

	public static void tbGetLogistics(TestOrder ext,  int platFromType) {
		 JSONArray jsonArray =  ext.get("OutCompanyName");
		 if(jsonArray!=null) {
			for (int i = 0; i < jsonArray.size(); i++) {
				JSONObject jsonObject = jsonArray.getJSONObject(i);
				String name = jsonObject.get("logistics_company")!=null?jsonObject.get("logistics_company").toString():"";
				if(name!=null && name !="")
				{
					CompanyName = name;
					OutSid=jsonObject.get("invoice_no")!=null?jsonObject.get("invoice_no").toString():"";
					break;
				}
			 }
		}
			 ext.set("OutCompanyName", CompanyName);
			 ext.set("OutSid", OutSid); 
	 }
	   // 生成订单催付
	 public static String waitBuyerPay(TestOrder kdTrade,String itemIds,String titles,int platFromType,String tradeType) {
		    StringBuffer sb = new StringBuffer();
			sb.append("{ ");
			sb.append("\"{Nick}\":" + "\"" + kdTrade.get("OutNick") + "\"" + ",");
			sb.append("\"{ReceiverName}\":" + "\"" + kdTrade.get("ReceiverName") + "\"" + ",");
			sb.append("\"{ReceiverAddress}\":" + "\"" + kdTrade.get("ReceiverAddress") + "\"" + ",");
			sb.append("\"{TradeId}\":" + "\"" + kdTrade.get("OutTradeId") + "\"" + ",");
			sb.append("\"{Payment}\":" + "\"" + kdTrade.get("payment") + "\"" + ",");
			sb.append("\"{Created}\":" + "\"" + kdTrade.get("created") + "\"" + ",");
			sb.append("\"{AlipayNo}\":" + "\"" + kdTrade.get("BuyerAlipayNo") + "\"" + ",");
			sb.append("\"{ItemIDs}\":" + "\"" + itemIds + "\"" + ",");
			sb.append("\"{TradeFrom}\":" + "\"" + kdTrade.get("TradeFrom") + "\"" + ",");
			sb.append("\"{GoodsTitle}\":" + "\"" + titles + "\"" + ",");
			if(platFromType==1 || platFromType==16){
				sb.append("\"{UrgeLink}\":" + "\"http://trade.taobao.com/trade/pay.htm?biz_order_id=" + kdTrade.get("OutTradeId") + "\""+ ",");
			}else if(platFromType==12){
				sb.append("\"{UrgeLink}\":" + "\"http://my.yhd.com/order/finishOrder.do?orderCode=" + kdTrade.get("OutTradeId") + "\""+ ",");
			}else{
				sb.append("\"{UrgeLink}\":" + "\"\""+ ",");
			}
			sb.append("\"{Type}\":" + "\"" + tradeType + "\"");
			sb.append("  }");
			return sb.toString();
	 }
	   // 付款备注 付款关怀
	 public static String orderRemark(TestOrder kdTrade,String titles) {
		    StringBuffer sb = new StringBuffer();
			sb.append("{ ");
			sb.append("\"{Nick}\":" + "\"" + kdTrade.get("OutNick") + "\"" + ",");
			sb.append("\"{Name}\":" + "\"" + kdTrade.get("ReceiverName") + "\"" + ",");
			sb.append("\"{ReceiverAddress}\":" + "\"" + kdTrade.get("ReceiverAddress") + "\"" + ",");
			sb.append("\"{TradeId}\":" + "\"" + kdTrade.get("OutTradeId") + "\"" + ",");
			sb.append("\"{Payment}\":" + "\"" + kdTrade.get("payment") + "\"" + ",");
			sb.append("\"{AlipayNo}\":" + "\"" + kdTrade.get("BuyerAlipayNo") + "\"" + ",");
			sb.append("\"{GoodsTitle}\":" + "\"" + titles + "\"" + ",");
			sb.append("\"{PayTime}\":" + "\"" + kdTrade.get("PayTime") + "\"");
			sb.append("  }");
			return sb.toString();
	 }
	 
	   // 发货提醒
	   // 订单变更发货时间
	 public static String consignNotify(TestOrder kdTrade,String outCompanyName,String outSid) {
		    StringBuffer sb = new StringBuffer();
			sb.append("{ ");
			sb.append("\"{Nick}\":" + "\"" + kdTrade.get("OutNick") + "\"" + ",");
			sb.append("\"{Name}\":" + "\"" + kdTrade.get("ReceiverName") + "\"" + ",");
			sb.append("\"{OutSid}\":" + "\"" + outSid + "\"" + ",");
			sb.append("\"{CompanyName}\":" + "\"" + outCompanyName + "\"" + ",");
			sb.append("\"{TradeId}\":" + "\"" + kdTrade.get("OutTradeId") + "\"" + ",");
			// 关怀增加了优先支付宝配置，需添加支付宝号 zhengjianyang
			sb.append("\"{AlipayNo}\":" + "\"" + kdTrade.get("BuyerAlipayNo") + "\"" + ",");
			sb.append("\"{ConsignTime}\":" + "\"" + kdTrade.get("ConsignTime") + "\"");
			sb.append("  }");
			return sb.toString();
	 }
	 
	   // 生成确认关怀
	 public static String confirmConcern(TestOrder kdTrade,String titles,String score) {
		 StringBuffer sb = new StringBuffer();
			sb.append("{ ");
			sb.append("\"{Nick}\":" + "\"" + kdTrade.get("OutNick") + "\"" + ",");
			sb.append("\"{Name}\":" + "\"" + kdTrade.get("ReceiverName") + "\"" + ",");
		    sb.append("\"{TradeId}\":" + "\"" + kdTrade.get("OutTradeId") + "\"" + ",");
			// 关怀增加了优先支付宝配置，需添加支付宝号 zhengjianyang
			sb.append("\"{AlipayNo}\":" + "\"" + kdTrade.get("BuyerAlipayNo") + "\"" + ",");
			sb.append("\"{CurIntegral}\":" + "\"" + score + "\"" + ",");
			//当前积分(kdTrade.get("CurIntegral"))
			sb.append("\"{IntegralChange}\":" + "\"" + 0 + "\"" + ",");
			//设置积分变更kdTrade.get("IntegralChange")
			sb.append("\"{Payment}\":" + "\"" + kdTrade.get("payment") + "\"" + ",");
			sb.append("\"{GoodsTitle}\":" + "\"" + titles + "\"" + ",");
			sb.append("\"{EndTime}\":" + "\"" + kdTrade.get("EndTime") + "\"");sb.append("  }");
			return sb.toString();
	 }
	 public static void main(String[] args) {
		System.out.println(Calendar.getInstance().getTimeInMillis());
	}
}
