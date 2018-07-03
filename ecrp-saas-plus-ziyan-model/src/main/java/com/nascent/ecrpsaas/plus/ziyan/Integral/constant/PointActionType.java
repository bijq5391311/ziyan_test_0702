package com.nascent.ecrpsaas.plus.ziyan.Integral.constant;

/**
 * @author zhourongping
 * @Date 2017/11/5
 * @功能 积分动作类型
 */
public enum PointActionType {

    trade(1, "交易积分"),
    marketing(2, "营销送积分"),
    reset(3, "系统积分清零"),
    refund(4, "退款扣减积分"),
    clear(5, "用户积分清零"),
    interaction(6, "互动积分"),
    deduction(7,"抵现扣减积分"),
    deductionCancel(8," 撤销抵现积分");


    PointActionType(Integer value, String name) {
        this.value = value;
        this.name = name;
    }

    private Integer value;
    private String name;

    public Integer getValue() {
        return value;
    }

    public String getName() {
        return name;
    }

}
