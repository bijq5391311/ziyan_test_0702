package com.nascent.ecrpsaas.plus.ziyan.care.vo;

import com.nascent.ecrpsaas.care.model.CareAutoPattern;

/**
 * com.nascent.ecrpsaas.vo
 *
 * @Author guiping.Qiu
 * @Date 2017/12/21
 */
public class CareRegisterVo {

    CareAutoPattern  care;
    Double  integral;
    Integer  careTime;
    String smsTemplate;
    String couponID;
    Integer couponAmount;


    public CareAutoPattern getCare() {
        return care;
    }

    public void setCare(CareAutoPattern care) {
        this.care = care;
    }

    public Double getIntegral() {
        return integral;
    }

    public void setIntegral(Double integral) {
        this.integral = integral;
    }

    public Integer getCareTime() {
        return careTime;
    }

    public void setCareTime(Integer careTime) {
        this.careTime = careTime;
    }

    public String getSmsTemplate() {
        return smsTemplate;
    }

    public void setSmsTemplate(String smsTemplate) {
        this.smsTemplate = smsTemplate;
    }

    public String getCouponID() {
        return couponID;
    }

    public void setCouponID(String couponID) {
        this.couponID = couponID;
    }

    public Integer getCouponAmount() {
        return couponAmount;
    }

    public void setCouponAmount(Integer couponAmount) {
        this.couponAmount = couponAmount;
    }
}
