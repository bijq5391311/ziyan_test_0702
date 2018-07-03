package com.nascent.ecrpsaas.plus.ziyan.common.constant;

/**
 * com.nascent.ecrpsaas.plus.ziyan.care.constant
 *
 * @Author guiping.Qiu
 * @Date 2017/12/20
 */
public enum ZyCareType {

    RegisterConcern("RegisterConcern", "注册关怀");

    private String code;
    private String name;

    ZyCareType(String code, String name) {
        this.code = code;
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public static ZyCareType getCareType(String code) {
        return ZyCareType.valueOf(code);
    }

}
