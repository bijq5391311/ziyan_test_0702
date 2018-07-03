package com.nascent.ecrpsaas.plus.ziyan.common.constant;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @author zhourongping
 * @Date 2017/11/5
 * @功能 操作日志类型
 */
public class OperationLogEnum {

    public static final Integer memberGrade = 1;

    public static final Integer pointRule = 2;

    public static final Integer pointBank = 9;

    public static final Integer grouthValueRule = 10;

    public static Map<Integer, String> operationLogMap = new LinkedHashMap<Integer, String>() {

        private static final long serialVersionUID = 1L;

        {
            put(memberGrade, "会员等级规则");
            put(pointRule, "积分规则");
            put(pointBank, "积分银行");
            put(grouthValueRule, "成长值规则");
        }
    };

    public static Map<Integer, String> isOpenMap = new LinkedHashMap<Integer, String>(){
        {
            put(0, "未启用");
            put(1, "启用");
        }
    };

    public static Map<Integer, String> isIncludeMap = new LinkedHashMap<Integer, String>(){
        {
            put(0, "不包含");
            put(1, "包含");
        }
    };

    public static Map<Integer, String> pointRoundMap = new LinkedHashMap<Integer, String>(){
        {
            put(0, "向上取整");
            put(1, "向下取整");
            put(2, "四舍五入");
            put(3, "保留两位小数");
        }
    };

    public static Map<Integer, String> excludeEnumMap = new LinkedHashMap<Integer, String>(){
        {
            put(0, "不排除");
            put(1, "排除");
        }
    };
}
