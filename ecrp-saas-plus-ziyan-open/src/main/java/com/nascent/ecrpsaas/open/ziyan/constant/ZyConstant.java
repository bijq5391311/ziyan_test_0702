package com.nascent.ecrpsaas.open.ziyan.constant;

/**
 * @author FeiXiang
 * @date 2017/12/21
 * @describe 常量类
 */
public class ZyConstant {
    public static final String ZIYAN_BRAND_ID = "1"; //紫燕品牌id

    public static final Integer SYS_COUPON_STATE_VALID = 0; //有效的优惠券
    public static final Integer SYS_COUPON_STATE_INVALID = 1;   //已失效的优惠券
    public static final Integer SYS_COUPON_STATE_USED = 2;   //已核销的优惠券

    public static final Integer SYS_COUPON_CONDITIONS_OF_USE_NO_LIMIT = 0;   //不限优惠券发放数量

    public static final Integer COUPON_PURPOSE_TYPE_NO_SEND = 0; //未发放
    public static final Integer COUPON_PURPOSE_TYPE_SEND = 1;   //营销发放
    public static final Integer COUPON_PURPOSE_TYPE_EXPORT = 2;   //导出
    public static final Integer COUPON_PURPOSE_TYPE_PAGE_RECEIVE = 3;   //互动端活动发放

    public static final Integer ZY_CONSUME_VALUE_LOG_STATE_DELETE = 0; //删除
    public static final Integer ZY_CONSUME_VALUE_LOG_STATE_NORMAL = 1;   //正常

    public static final Integer COUPON_VALID_TIME_TYPE_ABSOLUTE = 0;    //优惠券有效期-绝对时间
    public static final Integer COUPON_VALID_TIME_TYPE_RELATIVE = 1;    //优惠券有效期-相对时间
}
