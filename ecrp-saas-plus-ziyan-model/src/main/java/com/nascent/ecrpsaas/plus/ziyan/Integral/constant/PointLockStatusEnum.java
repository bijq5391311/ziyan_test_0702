package com.nascent.ecrpsaas.plus.ziyan.Integral.constant;

/**
 * @author zhourongping
 * @Date 2017/12/12
 * @功能 积分锁定类型
 */
public enum PointLockStatusEnum {
    LOCKED(1, "已锁定"), CONFIRM(2, "确认扣除"), CANCEL(3, "已撤销");

    PointLockStatusEnum(Integer value, String name) {
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
