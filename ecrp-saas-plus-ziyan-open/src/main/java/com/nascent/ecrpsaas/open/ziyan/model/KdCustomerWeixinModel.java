package com.nascent.ecrpsaas.open.ziyan.model;

import com.nascent.ecrpsaas.base.util.UtilDate;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.ArModel;
import com.nascent.plugins.sqlinxml.annotation.Select;
import com.nascent.plugins.sqlinxml.annotation.TableBind;
import com.nascent.utils.query.QueryInfo;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * @author FeiXiang
 * @date 2017/12/22
 * @describe
 */
@Component
@Select()
@TableBind(name = "kd_customer_weixin", pk = "id")
public class KdCustomerWeixinModel extends ArModel<ZyConsumeValueLogModel> {
    private static final long serialVersionUID = 1L;

    public static KdCustomerWeixinModel dao() {
        return SpringContext.me().getBean(KdCustomerWeixinModel.class);
    }

    public Long getSysCustomerIdByOpenId(String openId) {
        Record record = new QueryInfo("kdCustomerWeixin.getSysCustomerIdByOpenId").addParam("openId", openId).findOne();
        return record == null ? null : record.get("sys_customer_id");
    }
    /**
     * 通过手机号获取sys_customer_id
     * Title:KdCustomerWeixinModel.java
     * name:zhimin.mo
     * return:Long
     * describe:
     * time:2018年3月10日
     */
    public Long getSysCustomerIdByMobile(String mobile) {
        Record record = new QueryInfo("kdCustomerWeixin.getSysCustomerIdByMobile").addParam("mobile", mobile).findOne();
        return record == null ? null : record.get("sys_customer_id");
    }

    /**
     * 微互动-获取会员消费值统计和优惠券数量相关信息的接口
     *
     * @param openId 微信openId
     * @return Record:
     * accountingForGrowthValue	Double	消费值占比
     * totalGrowthValue    BigDecimal	总消费值
     * tradeGrowthValue	BigDecimal	消费成长值
     * memberGrade	Integer	等级值
     * tradePoints	BigDecimal	消费积分
     * notUseCouponNum	Integer	未使用优惠券数量
     * expiredCouponNum	Integer	已过期优惠券数量
     * usedCouponNum	Integer	已使用优惠券数量
     * pointResetMsg    Long 当日清空积分
     */
    public Record getCustomerInfoByOpenId(String openId) {
        Date timeStart = UtilDate.parseDate(UtilDate.formatDate(new Date()));
        return new QueryInfo("kdCustomerWeixin.getCustomerInfoByOpenId").addParam("openId", openId).addParam("timeStart", timeStart).addParam("timeEnd", UtilDate.addDay(timeStart, 1)).findOne();
    }
}
