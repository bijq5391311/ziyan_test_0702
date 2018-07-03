/**
 * File:    KdCustomer.java
 * Author:  Crabo Yang
 * Company: Nascent
 * Created: 2017-07-11 18:11:23
 * table:  kd_customer
 * NOTE:   
 */
package com.nascent.ecrpsaas.open.ziyan.model;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.nascent.ecrpsaas.base.model.BaseModel;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.Select;
import com.nascent.plugins.sqlinxml.annotation.TableBind;
import com.nascent.utils.query.QueryInfo;

@SuppressWarnings("serial")
@Select()
@TableBind(name = "kd_customer", pk = "id")
public class KdCustomerToZY extends BaseModel<KdCustomerToZY> {

	public static KdCustomerToZY dao() {
		return SpringContext.me().getModel(KdCustomerToZY.class);
	}
	/**
	 * Title:通过会员卡号查询会员ID
	 * name:zhimin.mo
	 * return:Long
	 * describe:
	 * time:2017年12月24日
	 */
	public Long queryCustomerIdByMemberCard(String card) {
        QueryInfo queryInfo = new QueryInfo("api.zyKdCustomer.queryCustomerIdByMemberCard");
        Record customer = queryInfo.addParam("memberCard", card)
        		.findOne();
        if(null == customer){
        	return null;
        }
        return customer.getLong("customerId");
    }
		
	/**
	 * 
	 * column: id
	 */
	public int getId() {
		return get("id", -1);
	}

	public void setId(int id) {
		set("id", id);
	}

	/**
	 * 1 正常 0删除 column: state
	 */
	public int getstate() {
		return get("state", -1);
	}

	public void setstate(int state) {
		set("state", state);
	}

	/**
	 * 创建时间 column: create_time
	 */
	public Date getCreateTime() {
		return get("create_time");
	}

	public void setCreateTime(Date createTime) {
		set("create_time", createTime);
	}

	/**
	 * 修改时间 column: update_time
	 */
	public Date getUpdateTime() {
		return get("update_time");
	}

	public void setUpdateTime(Date updateTime) {
		set("update_time", updateTime);
	}

	/**
	 * 集团ID column: group_id
	 */
	public int getGroupId() {
		return get("group_id");
	}

	public void setGroupId(int groupId) {
		set("group_id", groupId);
	}

	/**
	 * 系统内客户ID,由ECRM系统生成 column: sys_customer_id
	 */
	public long getSysCustomerId() {
		return get("sys_customer_id");
	}

	public void setSysCustomerId(long sysCustomerId) {
		set("sys_customer_id", sysCustomerId);
	}

	/**
	 * 会员卡 column: member_card
	 */
	public String getMemberCard() {
		return get("member_card");
	}

	public void setMemberCard(String memberCard) {
		set("member_card", memberCard);
	}

	/**
	 * 客户姓名 column: customer_name
	 */
	public String getCustomerName() {
		return get("customer_name");
	}

	public void setCustomerName(String customerName) {
		set("customer_name", customerName);
	}

	/**
	 * 性别 -1未知，0：女，1：男 column: sex
	 */
	public int getsex() {
		return get("sex", -1);
	}

	public void setsex(int sex) {
		set("sex", sex);
	}

	/**
	 * 客户类型 :1-意向客户、2-成交客户等 column: user_type
	 */
	public int getUserType() {
		return get("user_type", -1);
	}

	public void setUserType(int userType) {
		set("user_type", userType);
	}

	/**
	 * 生日 column: birthday
	 */
	public Date getbirthday() {
		return get("birthday");
	}

	public void setbirthday(Date birthday) {
		set("birthday", birthday);
	}

	/**
	 * 身份证 column: idcard
	 */
	public String getidcard() {
		return get("idcard");
	}

	public void setidcard(String idcard) {
		set("idcard", idcard);
	}

	/**
	 * 电话 column: telphone
	 */
	public String gettelphone() {
		return get("telphone");
	}

	public void settelphone(String telphone) {
		set("telphone", telphone);
	}

	/**
	 * 手机 column: mobile
	 */
	public String getmobile() {
		return get("mobile");
	}

	public void setmobile(String mobile) {
		set("mobile", mobile);
	}

	/**
	 * 邮箱 column: email
	 */
	public String getemail() {
		return get("email");
	}

	public void setemail(String email) {
		set("email", email);
	}

	/**
	 * 邮编 column: zip
	 */
	public String getzip() {
		return get("zip");
	}

	public void setzip(String zip) {
		set("zip", zip);
	}

	/**
	 * 国家 column: country
	 */
	public String getcountry() {
		return get("country");
	}

	public void setcountry(String country) {
		set("country", country);
	}

	/**
	 * ( 省) column: province
	 */
	public String getprovince() {
		return get("province");
	}

	public void setprovince(String province) {
		set("province", province);
	}

	/**
	 * 市 column: city
	 */
	public String getcity() {
		return get("city");
	}

	public void setcity(String city) {
		set("city", city);
	}

	/**
	 * 区 column: district
	 */
	public String getdistrict() {
		return get("district");
	}

	public void setdistrict(String district) {
		set("district", district);
	}

	/**
	 * 地址 column: address
	 */
	public String getaddress() {
		return get("address");
	}

	public void setaddress(String address) {
		set("address", address);
	}

	/**
	 * 发展时间 column: develop_time
	 */
	public Date getDevelopTime() {
		return get("develop_time");
	}

	public void setDevelopTime(Date developTime) {
		set("develop_time", developTime);
	}

	/**
	 * QQ号 column: qq
	 */
	public String getqq() {
		return get("qq");
	}

	public void setqq(String qq) {
		set("qq", qq);
	}

	/**
	 * 微博账号 column: weibo
	 */
	public String getweibo() {
		return get("weibo");
	}

	public void setweibo(String weibo) {
		set("weibo", weibo);
	}

	/**
	 * 是否激活 1 激活，0 未激活 column: is_activate
	 */
	public Integer getIsActivate() {
		return get("is_activate");
	}

	public void setIsActivate(Integer isActivate) {
		set("is_activate", isActivate);
	}

	/**
	 * 客道公众号openId
	 * 
	 * @param kdOpenId
	 */
	public void setKdOpenId(String kdOpenId) {
		set("kd_open_id", kdOpenId);
	}

	public String getKdOpenId() {
		return get("kd_open_id");
	}

	/**
	 * 获取互动积分
	 * 
	 * @param customerId
	 * @return
	 */
	public List<Record> loadOutActivities(String customerId) {
		QueryInfo info = new QueryInfo("customer.database.loadOutActivities");
		info.addParam("sys_customer_id", customerId);
		List<Record>  listResult = info.find(); 
		for (Record record : listResult) {
			if(record.get("interact_times").toString().equals("0")){
				record.set("first_interact_time", "-");
				record.set("last_interact_time", "-");
			}
		}
		return listResult;
	}

	public List<Record> fianTrad(Map<String, Object> map) {
		QueryInfo info = new QueryInfo("customer.database.fianTrad");
		info.addParams(map);
		return info.find();
	}
}