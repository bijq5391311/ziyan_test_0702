package com.nascent.ecrpsaas.plus.ziyan.Integral.constant;

/**
 * @author zhourongping
 * @Date 2017/12/12
 * @功能 积分锁定类型
 */
public enum PointLockTypeEnum {
    REFUND(1, "退单"), DEDUCTION(2, "积分抵现");

    PointLockTypeEnum(Integer value, String name) {
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
