package com.nascent.ecrpsaas.open.ziyan.model.vo;

import java.io.Serializable;
import java.util.Date;

/**
 * @author FeiXiang
 * @date 2017/12/20
 * @describe
 */
public class CouponVo implements Serializable {
    private String couponName;  //优惠券名称
    private String couponType;  //优惠券类型
    private String couponRights;    //优惠券权益
    private String conditions;  //优惠券使用条件
    private String instructions;    //优惠券使用说明
    private Date startTime; //生效时间
    private Date endTime;   //失效时间
    private Integer totalNum;   //总数
    private Integer remainNum;  //剩余数量

    public String getCouponName() {
        return couponName;
    }

    public void setCouponName(String couponName) {
        this.couponName = couponName;
    }

    public String getCouponType() {
        return couponType;
    }

    public void setCouponType(String couponType) {
        this.couponType = couponType;
    }

    public String getCouponRights() {
        return couponRights;
    }

    public void setCouponRights(String couponRights) {
        this.couponRights = couponRights;
    }

    public String getConditions() {
        return conditions;
    }

    public void setConditions(String conditions) {
        this.conditions = conditions;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Integer getTotalNum() {
        return totalNum;
    }

    public void setTotalNum(Integer totalNum) {
        this.totalNum = totalNum;
    }

    public Integer getRemainNum() {
        return remainNum;
    }

    public void setRemainNum(Integer remainNum) {
        this.remainNum = remainNum;
    }
}
