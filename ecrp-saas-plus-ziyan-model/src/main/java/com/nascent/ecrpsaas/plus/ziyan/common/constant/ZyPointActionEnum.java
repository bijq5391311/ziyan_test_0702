package com.nascent.ecrpsaas.plus.ziyan.common.constant;

/**
 * com.nascent.ecrpsaas.plus.ziyan.common.constant
 *
 * @Author guiping.Qiu
 * @Date 2017/12/26
 */
public enum ZyPointActionEnum {

    REGISTER_POINT(7, "注册送积分");

    private ZyPointActionEnum(Integer value, String name) {
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
