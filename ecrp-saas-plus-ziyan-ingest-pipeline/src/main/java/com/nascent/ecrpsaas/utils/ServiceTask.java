package com.nascent.ecrpsaas.utils;

import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;

import com.nascent.ecrpsaas.ingest.model.KdCustomerRfmCountTemp;
import com.nascent.ecrpsaas.ingest.model.TestOrder;
import com.nascent.ecrpsaas.ingest.parser.StringXmlApplicationContext;

public class ServiceTask
{
  private static JdbcTemplate jdbc = new JdbcTemplate((DataSource)StringXmlApplicationContext.me().getBean("dataSource"));

  public static void setRFM(String code, String SysCustomerId)
  {
    StringBuffer sb = new StringBuffer();
    sb.append("INSERT INTO kd_customer_rfm_count_temp(shop_code,sys_customer_id,field,select_sql) values");
    sb.append("('" + code + "','" + SysCustomerId + "','order_times','select COUNT(0) from kd_trade where sys_customer_id =" + SysCustomerId + "  and  shop_code = " + code + "')");
    sb.append(",('" + code + "','" + SysCustomerId + "','order_amount','select SUM(payment) from kd_trade where sys_customer_id =" + SysCustomerId + " and  shop_code = " + code + " ')");
    sb.append(",('" + code + "','" + SysCustomerId + "','last_order_time','select MAX(created) from kd_trade where sys_customer_id =" + SysCustomerId + " and  shop_code = " + code + "')");
    sb.append(",('" + code + "','" + SysCustomerId + "','pay_times','SELECT COUNT(0) FROM kd_trade k where k.trade_status!=\"WAIT_BUYER_PAY\" and k.trade_status!=\"TRADE_NO_CREATE_PAY\" and k.trade_status!=\"TRADE_CLOSED_BY_TAOBAO\" and k.sys_customer_id =" + SysCustomerId + " and  shop_code = " + code + "')");
    sb.append(",('" + code + "','" + SysCustomerId + "','pay_amount','SELECT SUM(payment) FROM kd_trade k where k.trade_status!=\"WAIT_BUYER_PAY\" and k.trade_status!=\"TRADE_NO_CREATE_PAY\" and k.trade_status!=\"TRADE_CLOSED_BY_TAOBAO\" and k.sys_customer_id =" + SysCustomerId + " and  shop_code = " + code + "')");
    sb.append(",('" + code + "','" + SysCustomerId + "','last_pay_time','SELECT MAX(pay_time) FROM kd_trade k where k.sys_customer_id =" + SysCustomerId + " and  shop_code = " + code + "')");
    sb.append(",('" + code + "','" + SysCustomerId + "','trade_times','SELECT COUNT(pay_time) FROM kd_trade k where k.trade_status=\"TRADE_FINISHED\" and k.sys_customer_id =" + SysCustomerId + " and  shop_code = " + code + "')");
    sb.append(",('" + code + "','" + SysCustomerId + "','trade_amount','SELECT SUM(payment) FROM kd_trade k where k.trade_status=\"TRADE_FINISHED\" and k.sys_customer_id =" + SysCustomerId + " and  shop_code = " + code + "')");
    sb.append(",('" + code + "','" + SysCustomerId + "','last_trade_time','SELECT MAX(end_time) FROM kd_trade k where  k.trade_status=\"TRADE_FINISHED\" and k.sys_customer_id =" + SysCustomerId + " and  shop_code = " + code + "')");
    sb.append(",('" + code + "','" + SysCustomerId + "','first_pay_time','SELECT MIN(pay_time) FROM kd_trade k where k.sys_customer_id =" + SysCustomerId + " and  shop_code = " + code + "')");
    sb.append(",('" + code + "','" + SysCustomerId + "','first_order_time','SELECT MIN(created) FROM kd_trade k where k.sys_customer_id =" + SysCustomerId + " and  shop_code = " + code + "')");
    sb.append(",('" + code + "','" + SysCustomerId + "','price_unit','select SUM(payment)/if(COUNT(DISTINCT sys_trade_id)=0,1,COUNT(DISTINCT sys_trade_id)) FROM kd_trade k where k.trade_status  not in (\"WAIT_BUYER_PAY\",\"TRADE_CLOSED\",\"TRADE_CLOSED_BY_TAOBAO\") and k.sys_customer_id =" + SysCustomerId + " and  shop_code = " + code + "')");
    sb.append(",('" + code + "','" + SysCustomerId + "','item_unit','select SUM(number)/if(COUNT(DISTINCT sys_trade_id)=0,1,COUNT(DISTINCT sys_trade_id)) from kd_order k where k.order_status not in (\"WAIT_BUYER_PAY\",\"TRADE_CLOSED\",\"TRADE_CLOSED_BY_TAOBAO\") and  k.sys_customer_id =" + SysCustomerId + " and  shop_code = " + code + "')");
    sb.append(",('" + code + "','" + SysCustomerId + "','refund_times','select count(0) from kd_refund k where  k.sys_customer_id =" + SysCustomerId + " and  shop_code = " + code + "')");
    sb.append(",('" + code + "','" + SysCustomerId + "','refund_amount','select SUM(tb_refund_fee) from kd_refund  k where k.sys_customer_id =" + SysCustomerId + " and  shop_code = " + code + "')");
    sb.append(",('" + code + "','" + SysCustomerId + "','min_single_buy_num','select min(num) from kd_trade k where k.trade_status not in (\"WAIT_BUYER_PAY\",\"TRADE_CLOSED\",\"TRADE_CLOSED_BY_TAOBAO\") and k.sys_customer_id =" + SysCustomerId + " and  shop_code = " + code + "')");
    sb.append(",('" + code + "','" + SysCustomerId + "','max_single_buy_num','select max(num) from kd_trade k where k.trade_status not in (\"WAIT_BUYER_PAY\",\"TRADE_CLOSED\",\"TRADE_CLOSED_BY_TAOBAO\") and k.sys_customer_id =" + SysCustomerId + " and  shop_code = " + code + "')");
    sb.append(",('" + code + "','" + SysCustomerId + "','min_single_buy_amount','select min(payment) from kd_trade k where  k.trade_status not in (\"WAIT_BUYER_PAY\",\"TRADE_CLOSED\",\"TRADE_CLOSED_BY_TAOBAO\") and k.sys_customer_id =" + SysCustomerId + " and  shop_code = " + code + "')");
    sb.append(",('" + code + "','" + SysCustomerId + "','max_single_buy_amount','select max(payment) from kd_trade k where  k.trade_status not in (\"WAIT_BUYER_PAY\",\"TRADE_CLOSED\",\"TRADE_CLOSED_BY_TAOBAO\") and k.sys_customer_id =" + SysCustomerId + " and  shop_code = " + code + "')");
    sb.append(",('" + code + "','" + SysCustomerId + "','buy_total_num','select SUM(num) from kd_trade k where k.trade_status not in (\"WAIT_BUYER_PAY\",\"TRADE_CLOSED\",\"TRADE_CLOSED_BY_TAOBAO\") and k.sys_customer_id =" + SysCustomerId + " and  shop_code = " + code + "')");
    sb.append(",('" + code + "','" + SysCustomerId + "','count_unit','SELECT DATEDIFF(MAX(k.pay_time), MIN(k.pay_time))/ (COUNT(DISTINCT TO_DAYS(k.pay_time))-1) FROM kd_trade k WHERE k.pay_time IS NOT NULL and k.trade_status!=\"TRADE_CLOSED\" and k.sys_customer_id =" + SysCustomerId + " and  shop_code = " + code + "')");
    jdbc.batchUpdate(new String[] { sb.toString() });
  }

  public static List<KdCustomerRfmCountTemp> setRFM(TestOrder trade) {
    List<KdCustomerRfmCountTemp> rfm = new ArrayList<KdCustomerRfmCountTemp>();
    rfm.add(new KdCustomerRfmCountTemp("order_times", "select COUNT(0) from kd_trade where sys_customer_id =" + trade.get("SysCustomerId")));
    rfm.add(new KdCustomerRfmCountTemp("order_amount", "select SUM(payment) from kd_trade where sys_customer_id =" + trade.get("SysCustomerId")));
    rfm.add(new KdCustomerRfmCountTemp("last_order_time", "select MAX(created) from kd_trade where sys_customer_id =" + trade.get("SysCustomerId")));
    rfm.add(new KdCustomerRfmCountTemp("pay_times", "SELECT COUNT(0) FROM kd_trade k where k.trade_status!='WAIT_BUYER_PAY' and k.trade_status!='TRADE_NO_CREATE_PAY'and k.trade_status!='TRADE_CLOSED_BY_TAOBAO' and k.sys_customer_id =" + trade.get("SysCustomerId")));
    rfm.add(new KdCustomerRfmCountTemp("pay_amount", "SELECT SUM(payment) FROM kd_trade k where k.trade_status!='WAIT_BUYER_PAY' and k.trade_status!='TRADE_NO_CREATE_PAY'and k.trade_status!='TRADE_CLOSED_BY_TAOBAO' and k.sys_customer_id =" + trade.get("SysCustomerId")));
    rfm.add(new KdCustomerRfmCountTemp("last_pay_time", "SELECT MAX(pay_time) FROM kd_trade k where k.sys_customer_id =" + trade.get("SysCustomerId")));
    rfm.add(new KdCustomerRfmCountTemp("trade_times", "SELECT COUNT(pay_time) FROM kd_trade k where k.trade_status='TRADE_FINISHED' and k.sys_customer_id =" + trade.get("SysCustomerId")));
    rfm.add(new KdCustomerRfmCountTemp("trade_amount", "SELECT SUM(payment) FROM kd_trade k where k.trade_status='TRADE_FINISHED' and k.sys_customer_id =" + trade.get("SysCustomerId")));
    rfm.add(new KdCustomerRfmCountTemp("last_trade_time", "SELECT MAX(end_time) FROM kd_trade k where  k.trade_status='TRADE_FINISHED'and k.sys_customer_id =" + trade.get("SysCustomerId")));
    rfm.add(new KdCustomerRfmCountTemp("first_pay_time", "SELECT MIN(pay_time) FROM kd_trade k where k.sys_customer_id =" + trade.get("SysCustomerId")));
    rfm.add(new KdCustomerRfmCountTemp("first_order_time", "SELECT MIN(created) FROM kd_trade k where k.sys_customer_id =" + trade.get("SysCustomerId")));
    rfm.add(new KdCustomerRfmCountTemp("price_unit", "select SUM(payment)/if(COUNT(DISTINCT sys_trade_id)=0,1,COUNT(DISTINCT sys_trade_id)) FROM kd_trade k where k.trade_status  not in ('WAIT_BUYER_PAY','TRADE_CLOSED','TRADE_CLOSED_BY_TAOBAO') and k.sys_customer_id =" + trade.get("SysCustomerId")));
    rfm.add(new KdCustomerRfmCountTemp("item_unit", "select SUM(number)/if(COUNT(DISTINCT sys_trade_id)=0,1,COUNT(DISTINCT sys_trade_id)) from kd_order k where k.order_status not in ('WAIT_BUYER_PAY','TRADE_CLOSED','TRADE_CLOSED_BY_TAOBAO') and  k.sys_customer_id =" + trade.get("SysCustomerId")));
    rfm.add(new KdCustomerRfmCountTemp("refund_times", "select count(0) from kd_refund k where  k.sys_customer_id =" + trade.get("SysCustomerId")));
    rfm.add(new KdCustomerRfmCountTemp("refund_amount", "select SUM(tb_refund_fee) from kd_refund  k where k.sys_customer_id =" + trade.get("SysCustomerId")));
    rfm.add(new KdCustomerRfmCountTemp("min_single_buy_num", "select min(num) from kd_trade k where k.trade_status not in ('WAIT_BUYER_PAY','TRADE_CLOSED','TRADE_CLOSED_BY_TAOBAO') and k.sys_customer_id =" + trade.get("SysCustomerId")));
    rfm.add(new KdCustomerRfmCountTemp("max_single_buy_num", "select max(num) from kd_trade k where k.trade_status not in ('WAIT_BUYER_PAY','TRADE_CLOSED','TRADE_CLOSED_BY_TAOBAO') and k.sys_customer_id =" + trade.get("SysCustomerId")));
    rfm.add(new KdCustomerRfmCountTemp("min_single_buy_amount", "select min(payment) from kd_trade k where  k.trade_status not in ('WAIT_BUYER_PAY','TRADE_CLOSED','TRADE_CLOSED_BY_TAOBAO') and k.sys_customer_id =" + trade.get("SysCustomerId")));
    rfm.add(new KdCustomerRfmCountTemp("max_single_buy_amount", "select max(payment) from kd_trade k where  k.trade_status not in ('WAIT_BUYER_PAY','TRADE_CLOSED','TRADE_CLOSED_BY_TAOBAO') and k.sys_customer_id =" + trade.get("SysCustomerId")));
    rfm.add(new KdCustomerRfmCountTemp("buy_total_num", "select SUM(num) from kd_trade k where k.trade_status not in ('WAIT_BUYER_PAY','TRADE_CLOSED','TRADE_CLOSED_BY_TAOBAO') and k.sys_customer_id =" + trade.get("SysCustomerId")));
    rfm.add(new KdCustomerRfmCountTemp("count_unit", "SELECT DATEDIFF(MAX(k.pay_time), MIN(k.pay_time))/ (COUNT(DISTINCT TO_DAYS(k.pay_time))-1) FROM kd_trade k WHERE k.pay_time IS NOT NULL and k.trade_status!='TRADE_CLOSED' and k.sys_customer_id =" + trade.get("SysCustomerId")));
    return rfm;
  }

  public static void setREC(String code, String SysCustomerId) {
    String update_sql = "update kd_customer_plat_rec_list  SET last_use_time = (select max(created) from kd_trade k where k.sys_customer_id = " + 
      SysCustomerId + " and shop_code= \"" + code + "\")," + 
      "use_times = (select COUNT(0) from kd_trade k where k.sys_customer_id = " + SysCustomerId + " and shop_code=\"" + code + "\")," + 
      "pay_times = (select COUNT(pay_time) from kd_trade k where k.trade_status!=\"WAIT_BUYER_PAY\" and k.trade_status!=\"TRADE_NO_CREATE_PAY\" and k.trade_status!=\"TRADE_CLOSED_BY_TAOBAO\" and k.sys_customer_id = " + SysCustomerId + " and shop_code=\"" + code + "\")," + 
      "last_pay_time = (select max(pay_time) from kd_trade k where k.sys_customer_id = " + SysCustomerId + " and shop_code=\"" + code + "\")" + 
      " where shop_code=\"" + code + "\" and sys_customer_id=" + SysCustomerId;
    jdbc.execute("insert into kd_customer_rfm_update_task(update_sql) values('" + update_sql + "')");
  }

  public static void main(String[] args)
  {
  }
}