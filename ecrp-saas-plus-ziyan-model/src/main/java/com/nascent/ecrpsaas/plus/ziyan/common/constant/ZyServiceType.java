package com.nascent.ecrpsaas.plus.ziyan.common.constant;

/**
 * package com.nascent.ecrpsaas.plus.ziyan.common.constant
 *
 * @Author guiping.Qiu
 * @Date 2017/12/26
 */
public enum ZyServiceType {
    ZY_HUDONG_CUSTOMER_DOWNLOAD(500, "紫燕互动会员下载"),
    Zy_HUDONG_POINT_LOG_DOWNLOAD(501,"紫燕互动积分日志下载");

    private ZyServiceType(Integer value, String name) {
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
