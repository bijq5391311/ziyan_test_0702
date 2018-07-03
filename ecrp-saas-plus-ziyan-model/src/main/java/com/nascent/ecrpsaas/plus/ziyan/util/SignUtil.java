package com.nascent.ecrpsaas.plus.ziyan.util;

import com.google.common.base.Charsets;
import com.google.common.base.Joiner;
import com.google.common.hash.HashFunction;
import com.google.common.hash.Hashing;

import java.util.Map;
import java.util.TreeMap;

/**
 * @Describe: 签名工具类
 * @author:   huangyuye
 * @Date:     2017-12-11
 */
public class SignUtil {

    private static final HashFunction md5 = Hashing.md5();

    /**
     * MD5(参数进行排序+secret)
     * @param params
     * @param secret
     * @return
     */
    public static String getSign(Map<String, Object> params, String secret){

        // 参数升序排列
        Map<String, Object> sortedParams = new TreeMap<>(params);

        String toVerify = Joiner.on("&").withKeyValueSeparator("=").join(sortedParams);

        // 签名
        String sign = md5.newHasher()
                .putString(toVerify, Charsets.UTF_8)
                .putString(secret, Charsets.UTF_8)
                .hash().toString();

        return sign;
    }



}
