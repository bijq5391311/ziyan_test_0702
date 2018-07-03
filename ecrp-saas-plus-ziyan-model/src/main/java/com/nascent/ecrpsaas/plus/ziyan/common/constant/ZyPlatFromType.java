package com.nascent.ecrpsaas.plus.ziyan.common.constant;

/**
 * @Describe: 平台类型 需要保证与产品化的PlatFromType枚举不冲突
 * @author:   huangyuye
 * @Date:     2017-12-12
 */
public enum ZyPlatFromType {
    ZY_MALL(900,"紫燕商城");
    ZyPlatFromType(Integer value, String name){
        this.value=value;
        this.name=name;
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
