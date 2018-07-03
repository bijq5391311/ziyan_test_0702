package com.nascent.ecrpsaas.plus.ziyan.marketing.constant;


import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @author mozhimin
 * @Date 2017/12/16
 * @功能 优惠券类型
 */
public class CouponTypeEnum {

    public static final Integer cash = 1;

    public static final Integer discount = 2;

    public static Map<Integer, String> operationLogMap = new LinkedHashMap<Integer, String>() {

        private static final long serialVersionUID = 1L;

        {
            put(cash, "现金券");
            put(discount, "折扣券");
        }
    };
}
