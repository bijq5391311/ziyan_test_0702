package com.nascent.ecrpsaas.open.ziyan.service;

import com.nascent.utils.query.CommonResult;

import java.util.Map;

/**
 * @Author qian.chen
 * @Date 2018/03/26
 */

public interface ZySendWxConcernService {

    /**
     * 发送关怀通知
     *
     * @param wxTemplateType 关怀模板类型
     * @param customerMobile 用户手机号码
     * @param valuesMap 交易信息集合
     */
    CommonResult sendWxConcern (String wxTemplateType, String customerMobile, Map<String, ? extends Object> valuesMap);

}
