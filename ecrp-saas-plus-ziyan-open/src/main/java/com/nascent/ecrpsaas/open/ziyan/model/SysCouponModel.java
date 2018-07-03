package com.nascent.ecrpsaas.open.ziyan.model;

import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.ArModel;
import com.nascent.plugins.sqlinxml.annotation.Select;
import com.nascent.plugins.sqlinxml.annotation.TableBind;
import com.nascent.utils.query.QueryInfo;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.Map;


/**
 * @author FeiXiang
 * @date 2017/12/21
 * @describe
 */
@Component
@Select()
@TableBind(name = "sys_coupon", pk = "id")
public class SysCouponModel extends ArModel<SysCouponModel> {
    private static final long serialVersionUID = 1L;

    public static SysCouponModel dao() {
        return SpringContext.me().getBean(SysCouponModel.class);
    }

    /**
     * 获取有效的优惠券
     */
    public SysCoupon getValidCouponByCouponId(String couponId) {
        List<SysCoupon> list = new QueryInfo("sysCoupon.getSysCouponByCouponId").addParam("couponId", couponId).findT(SysCoupon.class);
        return list.size() > 0 ? list.get(0) : null;
    }
    /**
     * 获取有效的优惠券
     */
    public synchronized SysCoupon getPageCouponByCouponId(String couponId) {
        List<SysCoupon> list = new QueryInfo("sysCoupon.getSysCouponByCouponId").addParam("couponId", couponId).findT(SysCoupon.class);
        return list.size() > 0 ? list.get(0) : null;
    }

    public Record getByCouponId(Long couponId) {
        return new QueryInfo("sysCoupon.queryCouponByCouponId").addParam("couponId", couponId).findOne();
    }

    /**
     * @param shopId 非必传，不传则查所有
     */
    public List<Record> findListByShopId(Long shopId) {
        return new QueryInfo("sysCoupon.findListByShopId").addParam("shopId", shopId).find();
    }

    public int sendCoupon(Integer id) {
        return new QueryInfo("sysCoupon.sendCoupon").addParam("id", id).execute();
    }

    public static class SysCoupon {
        private Integer id;
        private Integer state; // 状态   0 有效 1 已失效
        private Date updateTime; // 更新时间
        private Date createTime; // 创建时间
        private String couponName; // 优惠券名称
        private Long couponId; // 优惠券ID
        private Integer type; // 优惠券生成子编码 0：未生成  1：正在生成  2：生成完成
        private Integer couponType; // 类型1 现金 2 折扣 3 礼品
        private String rightsAndInterests; // 权益
        private Integer validTimeType; // 绝对时间 0，相对时间 1
        private Date validTimeBegin; // 有效时间开始
        private Date validTimeEnd; // 有效时间结束
        private Integer numberDays; // 相对天数
        private String shopIds; // 指定店铺集合
        private Integer couponAmouet; // 张数 -1：无限张
        private Integer sentAmount; // DEFAULT 0  已发放张数
        private Integer cancelAfterVerification; // DEFAULT 0  已核销
        private Integer conditionsOfUse; // 使用条件  0：不限 1：订单满
        private Integer fullOrPlusMoney; // DEFAULT 0  满金额
        private String appointGoodsIds; // DEFAULT ''  指定商品集合（用逗号间隔）
        private String user; // 创建人
        private String coefficient; // 经销商承担系数
        private String description; //用户使用说明
        private String title; //客服使用备注

        public SysCoupon() {
        }

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public Integer getState() {
            return state;
        }

        public void setState(Integer state) {
            this.state = state;
        }

        public Date getUpdateTime() {
            return updateTime;
        }

        public void setUpdateTime(Date updateTime) {
            this.updateTime = updateTime;
        }

        public Date getCreateTime() {
            return createTime;
        }

        public void setCreateTime(Date createTime) {
            this.createTime = createTime;
        }

        public String getCouponName() {
            return couponName;
        }

        public void setCouponName(String couponName) {
            this.couponName = couponName;
        }

        public Long getCouponId() {
            return couponId;
        }

        public void setCouponId(Long couponId) {
            this.couponId = couponId;
        }

        public Integer getType() {
            return type;
        }

        public void setType(Integer type) {
            this.type = type;
        }

        public Integer getCouponType() {
            return couponType;
        }

        public void setCouponType(Integer couponType) {
            this.couponType = couponType;
        }

        public String getRightsAndInterests() {
            return rightsAndInterests;
        }

        public void setRightsAndInterests(String rightsAndInterests) {
            this.rightsAndInterests = rightsAndInterests;
        }

        public Integer getValidTimeType() {
            return validTimeType;
        }

        public void setValidTimeType(Integer validTimeType) {
            this.validTimeType = validTimeType;
        }

        public Date getValidTimeBegin() {
            return validTimeBegin;
        }

        public void setValidTimeBegin(Date validTimeBegin) {
            this.validTimeBegin = validTimeBegin;
        }

        public Date getValidTimeEnd() {
            return validTimeEnd;
        }

        public void setValidTimeEnd(Date validTimeEnd) {
            this.validTimeEnd = validTimeEnd;
        }

        public Integer getNumberDays() {
            return numberDays;
        }

        public void setNumberDays(Integer numberDays) {
            this.numberDays = numberDays;
        }

        public String getShopIds() {
            return shopIds;
        }

        public void setShopIds(String shopIds) {
            this.shopIds = shopIds;
        }

        public Integer getCouponAmouet() {
            return couponAmouet;
        }

        public void setCouponAmouet(Integer couponAmouet) {
            this.couponAmouet = couponAmouet;
        }

        public Integer getSentAmount() {
            return sentAmount;
        }

        public void setSentAmount(Integer sentAmount) {
            this.sentAmount = sentAmount;
        }

        public Integer getCancelAfterVerification() {
            return cancelAfterVerification;
        }

        public void setCancelAfterVerification(Integer cancelAfterVerification) {
            this.cancelAfterVerification = cancelAfterVerification;
        }

        public Integer getConditionsOfUse() {
            return conditionsOfUse;
        }

        public void setConditionsOfUse(Integer conditionsOfUse) {
            this.conditionsOfUse = conditionsOfUse;
        }

        public Integer getFullOrPlusMoney() {
            return fullOrPlusMoney;
        }

        public void setFullOrPlusMoney(Integer fullOrPlusMoney) {
            this.fullOrPlusMoney = fullOrPlusMoney;
        }

        public String getAppointGoodsIds() {
            return appointGoodsIds;
        }

        public void setAppointGoodsIds(String appointGoodsIds) {
            this.appointGoodsIds = appointGoodsIds;
        }

        public String getUser() {
            return user;
        }

        public void setUser(String user) {
            this.user = user;
        }

        public String getCoefficient() {
            return coefficient;
        }

        public void setCoefficient(String coefficient) {
            this.coefficient = coefficient;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }
    }


}