package com.nascent.ecrpsaas.plus.ziyan.Integral.constant;

/**
 *积分操作类型
 * @author ZRP
 */
public enum PointOperationType {

    /* 加积分*/
    add(1,"增加") ,
    /* 减积分*/
    minus(2,"减少") ;

    PointOperationType(Integer value, String name){
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
