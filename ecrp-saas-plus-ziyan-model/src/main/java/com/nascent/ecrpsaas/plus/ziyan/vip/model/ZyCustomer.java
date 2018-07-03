package com.nascent.ecrpsaas.plus.ziyan.vip.model;

import java.util.List;
import java.util.Map;

import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.vip.model.GradeRuleDetail;
import com.nascent.ecrpsaas.vip.model.KdCustomer;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.plugins.sqlinxml.annotation.Param;
import com.nascent.plugins.sqlinxml.annotation.Select;
import com.nascent.utils.query.QueryInfo;
import com.nascent.utils.query.TableRequest;
import com.nascent.utils.query.TableResponse;
@Select()
public class ZyCustomer  extends KdCustomer{
	private static ZyCustomer customer =  new ZyCustomer();

    public static ZyCustomer dao() {
        return customer;
    }

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * 获取会员信息
	 * 
	 * @param customeId
	 * @return
	 */
	@Select
	public KdCustomer loadCustomerInfoByCustId(@Param("sys_customer_id") long customeId) {
		return null;
	}
	/**
	 * 获取会员信息
	 * 
	 * @param request
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unused" })
	public TableResponse<Record> queryList(TableRequest request) {
		String deptId = (String) request.getSearchMap().get("departmentId");
		String memberGrade = "-10";
		String selectShop = (String) request.getSearchMap().get("tradeBrand");
		if (!UtilString.isEmpty(selectShop)) {
			request.getSearchMap().put("shopCode", selectShop);
		}

		QueryInfo info = new QueryInfo("", request);
		Map map = request.getSearchMap();
		StringBuffer querySql = new StringBuffer();
		querySql.append(
				" SELECT kcb.is_right_black, kcb.score, kcb.member_grade, sum(cs.interact_times) as interact_times, "
						+ "sum(cs.pay_times) as trade_times , sum(cs.pay_amount) as  trade_amount, c.* "
						+ " from kd_customer c left join kd_operate_customer koc on koc.sys_customer_id=c.sys_customer_id "
						+ " left join kd_customer_shop_rfm cs on cs.sys_customer_id=c.sys_customer_id "
						+ " left join kd_customer_brand kcb on c.sys_customer_id=kcb.sys_customer_id " 
						);
		if (map.get("customerSort") != null && "1".equals(map.get("customerSort").toString())) {
			querySql.append(" inner join kd_customer_weixin cw on c.sys_customer_id = cw.sys_customer_id ");
		}
		querySql.append(" where c.state = 1 and c.group_id = " + map.get("group_id"));
		
		if (map.get("customer_name") != null && !UtilString.isBlank(map.get("customer_name").toString())) {
			querySql.append(" and c.customer_name like  '%" + map.get("customer_name") + "%'");
		}
		if (map.get("customerSort") != null && "1".equals(map.get("customerSort").toString())) {
			//潜客：关注微信，未下单未激活
			querySql.append(" and  c.user_type = 1 and c.is_activate = 0  ");
		}else if(map.get("customerSort") != null && "2".equals(map.get("customerSort").toString())){
			//非会员：有订单未激活
			querySql.append(" and c.user_type = 2 and c.is_activate = 0  ");
		}else if(map.get("customerSort") != null && "3".equals(map.get("customerSort").toString())){
			//会员：激活
			querySql.append(" and c.is_activate = 1  ");
		}
		if (map.get("sourceChannel") != null && !UtilString.isBlank(map.get("sourceChannel").toString())) {
			querySql.append(" and c.source_channel = '" + map.get("sourceChannel") + "' ");
		}
		if (map.get("mobile") != null && !UtilString.isBlank(map.get("mobile").toString())) {
			querySql.append(" and c.mobile like '%" + map.get("mobile") + "%'");
		}
		if (map.get("member_card") != null && !UtilString.isBlank(map.get("member_card").toString())) {
			querySql.append(" and c.member_card like '%" + map.get("member_card") + "%'");
		}
		if (map.get("user_type") != null && !UtilString.isBlank(map.get("user_type").toString())) {
			querySql.append(" and c.user_type = " + map.get("user_type"));
		}
		if (map.get("is_activate") != null && !UtilString.isBlank(map.get("is_activate").toString())) {
			querySql.append(" and c.is_activate = " + map.get("is_activate"));
		}
		if (map.get("brandId") != null && !UtilString.isBlank(map.get("brandId").toString())) {
			querySql.append(" and kcb.brand_id = " + map.get("brandId"));
		}
		if (map.get("province") != null && !UtilString.isBlank(map.get("province").toString())) {
			querySql.append(" and c.province=  '" + map.get("province")+"' ");
		}
		if (map.get("city") != null && !UtilString.isBlank(map.get("city").toString())) {
			querySql.append(" and c.city=  '" + map.get("city")+"' ");
		}
		if (map.get("district") != null && !UtilString.isBlank(map.get("district").toString())) {
			querySql.append(" and c.district= '" + map.get("district")+"' ");
		}
		if (map.get("member_grade") != null && !UtilString.isBlank(map.get("member_grade").toString())) {
			GradeRuleDetail gradeRuleDetail = GradeRuleDetail.dao().getGradeRuleDetailById(map.get("member_grade").toString());
			if(null != gradeRuleDetail){
				if(!UtilString.isEmpty(gradeRuleDetail.getGrade()+"")){
					memberGrade = gradeRuleDetail.getGrade()+"";
				}
			}
			querySql.append(" and kcb.member_grade = " + memberGrade +" and c.is_activate=1 ");
		}
		if (map.get("is_right_black") != null && !UtilString.isBlank(map.get("is_right_black").toString())) {
			querySql.append(" and kcb.is_right_black =  " + map.get("is_right_black"));
		}
		if (map.get("devStartTime") != null && !UtilString.isBlank(map.get("devStartTime").toString())) {
			String startDateTime = map.get("devStartTime").toString().replace("/", "-").replace("上午12", "00");
			String endDateTime = map.get("devEndTime").toString().replace("/", "-").replace("上午12", "23");
			querySql.append(
					" and c.develop_time >= '" + startDateTime + "' and c.develop_time <= '" + endDateTime + "'");
		}
		if (map.get("is_right_black") != null && !UtilString.isBlank(map.get("is_right_black").toString())) {
			querySql.append(" and kcb.is_right_black =  " + map.get("is_right_black"));
		}

		String score = map.get("scoreStart") == null ? "" : map.get("scoreStart").toString();
		if (!UtilString.isBlank(score) && score != "0") {
			querySql.append(" and kcb.score >= " + map.get("scoreStart") + " and kcb.score <= " + map.get("scoreEnd"));
		}

		String shopCodeStr = map.get("shopCode") == null ? "" : map.get("shopCode").toString();
		if (!UtilString.isBlank(shopCodeStr) && shopCodeStr != "0") {
			querySql.append(" and cs.shop_code in (" + shopCodeStr + ") ");
		}
		String shopCodes = map.get("shop_codes") == null ? "" : map.get("shop_codes").toString();
		if (!UtilString.isBlank(shopCodes) ) {
			querySql.append(" and cs.shop_code in (" + shopCodes + ") ");
		}

		querySql.append(" group by c.id having 1=1 ");
		
		String tradeTimesStart = map.get("tradeTimesStart") == null ? "" : map.get("tradeTimesStart").toString();
		if (!UtilString.isBlank(tradeTimesStart)) {
			querySql.append(" and sum(cs.pay_times) >= " + map.get("tradeTimesStart"));
		}
		String tradeTimesEnd = map.get("tradeTimesEnd") == null ? "" : map.get("tradeTimesEnd").toString();
		if (!UtilString.isBlank(tradeTimesEnd)) {
			querySql.append("  and sum(cs.pay_times) <= " + map.get("tradeTimesEnd"));
		}
		
		String paymentStart = map.get("paymentStart") == null ? "" : map.get("paymentStart").toString();
		if (!UtilString.isBlank(paymentStart)) {
			querySql.append(" and sum(cs.pay_amount) >= " + map.get("paymentStart") );
		}
		String paymentEnd = map.get("paymentEnd") == null ? "" : map.get("paymentEnd").toString();
		if (!UtilString.isBlank(paymentEnd)) {
			querySql.append( " and sum(cs.pay_amount) <= " + map.get("paymentEnd"));
		}
		querySql.append(" LIMIT " + request.getStart() + "," + request.getLength());

		info.setQuery(querySql.toString());
		String[] arr = querySql.toString().split("from");
		String countsql = arr[1].toString().split("LIMIT")[0];
		TableResponse<Record> tableResult = new TableResponse<>();

		List<Record> tableList = info.find();
		tableResult.setData(tableList);
		info.setQuery("select count(c.id) as count from " + countsql);
		List<Record> pageCount = info.find();
		if (pageCount.size() > 0) {
			tableResult.setRecordsTotal(pageCount.size());
		}
		return tableResult;
	}
}
