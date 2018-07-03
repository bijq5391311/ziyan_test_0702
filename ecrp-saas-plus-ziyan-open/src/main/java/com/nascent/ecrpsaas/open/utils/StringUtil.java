package com.nascent.ecrpsaas.open.utils;

/**
 * @author FeiXiang
 * @date 2017/12/22
 * @describe
 */
public class StringUtil {
    public static boolean isEmpty(String str) {
        return str == null || str.isEmpty();
    }

    public static boolean isEmpty(Long l) {
        return l == null;
    }
}
