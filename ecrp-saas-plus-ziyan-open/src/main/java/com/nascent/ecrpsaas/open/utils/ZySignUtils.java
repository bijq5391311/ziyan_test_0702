//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.nascent.ecrpsaas.open.utils;

import com.nascent.ecrpsaas.open.ziyan.exception.CustomizeException;
import com.nascent.plugins.taobao.StringUtils;
import com.nascent.plugins.taobao.WebUtils;
import com.nascent.utils.CyptoUtils;
import com.nascent.utils.query.CommonResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import sun.misc.BASE64Encoder;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Map;

public abstract class ZySignUtils {
    private static final Logger log = LoggerFactory.getLogger(ZySignUtils.class);
    static final String SIGN_KEY = "sign";
    static final String NONCE_KEY = "nonce";
    static CommonResult FAIL_RESULT = (new CommonResult(false)).setCode("INVALID_SIGN").setMsg("请求参数校验错误！");

    public ZySignUtils() {
    }

    public static String getSign(Map<String, Object> params, String secret, boolean twiceSecret) throws IOException {
        String[] keys = (String[])params.keySet().toArray(new String[0]);
        Arrays.sort(keys);
        StringBuilder query = new StringBuilder(secret);
        String[] var8 = keys;
        int var7 = keys.length;

        for(int var6 = 0; var6 < var7; ++var6) {
            String key = var8[var6];
            String value = (String)params.get(key);
            if (!StringUtils.isEmpty(key) && !StringUtils.isEmpty(value)) {
                query.append(key).append(value);
            }
        }

        if (twiceSecret) {
            query.append(secret);
        }

        return CyptoUtils.encryptMD5(query.toString());
    }

    public static String EncoderByMd5(String str) throws NoSuchAlgorithmException, UnsupportedEncodingException {
        //确定计算方法
        MessageDigest md5=MessageDigest.getInstance("MD5");
        BASE64Encoder base64en = new BASE64Encoder();
        //加密后的字符串
        String newstr=base64en.encode(md5.digest(str.getBytes("utf-8")));
        return newstr;
    }

    public static String getSign(String url, String methodType, Map<String, String> params, String appsecret) throws IOException {
        String result = null;
        String[] keys = (String[])params.keySet().toArray(new String[0]);
        Arrays.sort(keys);
        StringBuilder query = new StringBuilder();
        query.append(methodType + "&" + WebUtils.encode(url));
        StringBuilder query2 = new StringBuilder();
        String[] var11 = keys;
        int var10 = keys.length;

        String keySpec;
        for(int var9 = 0; var9 < var10; ++var9) {
            keySpec = var11[var9];
            String value = (String)params.get(keySpec);
            query2.append(keySpec).append("=").append(value).append("&");
        }

        query2.deleteCharAt(query2.length() - 1);
        query.append("&" + WebUtils.encode(query2.toString()).replace("+", "%20").replace("*", "%2A").replace("(", "%28").replace(")", "%29"));

        try {
            if (params.get("oauth_accesstoken") != null) {
                keySpec = WebUtils.encode(appsecret) + "&" + WebUtils.encode((String)params.get("oauth_accesstoken"));
            } else {
                keySpec = WebUtils.encode(appsecret);
            }

            return CyptoUtils.encodeWithHMAC(keySpec, query.toString());
        } catch (Exception var13) {
            throw new IOException(var13.getMessage());
        }
    }

    public static CommonResult verify(Map<String, String[]> params, String secret) {
        if(!params.containsKey("sign")){
            CommonResult commonResult = new CommonResult();
            commonResult.setFailed();
            commonResult.setMsg("参数sign不能为空！");
            return commonResult;
        }


        StringBuilder request = new StringBuilder(secret);
        String[] keys = (String[])params.keySet().toArray(new String[0]);
        Arrays.sort(keys);
        String[] var11 = keys;
        int var10 = keys.length;

        for(int var9 = 0; var9 < var10; ++var9) {
            String key = var11[var9];
            if (!"sign".equals(key)) {
                request.append(key).append(((String[])params.get(key))[0]);
            }
        }

        try {
            if (((String[])params.get("sign"))[0].equals(CyptoUtils.encryptMD5(request.toString()))) {
                return null;
            }
        } catch (Exception var12) {
            throw new CustomizeException("签名校验失败！");
        }

        CommonResult commonResult = new CommonResult();
        commonResult.setFailed();
        commonResult.setMsg("签名校验失败！");
        return commonResult;
    }

    public static CommonResult verify(String url, String methodType, Map<String, String[]> params, String appsecret) {
        if (params.containsKey("sign") && params.containsKey("nonce")) {
            String result = null;
            String[] keys = (String[])params.keySet().toArray(new String[0]);
            Arrays.sort(keys);
            StringBuilder query = new StringBuilder();
            query.append(methodType + "&" + WebUtils.encode(url));
            StringBuilder query2 = new StringBuilder();
            String[] var11 = keys;
            int var10 = keys.length;

            String keySpec;
            for(int var9 = 0; var9 < var10; ++var9) {
                keySpec = var11[var9];
                if (!"sign".equals(keySpec)) {
                    String value = ((String[])params.get(keySpec))[0];
                    query2.append(keySpec).append("=").append(value).append("&");
                }
            }

            query2.deleteCharAt(query2.length() - 1);
            query.append("&" + WebUtils.encode(query2.toString()).replace("+", "%20"));

            try {
                keySpec = WebUtils.encode(appsecret);
                if (((String[])params.get("sign"))[0].equals(CyptoUtils.encodeWithHMAC(keySpec, query.toString()))) {
                    return null;
                }
            } catch (Exception var13) {
                var13.printStackTrace();
            }

            return FAIL_RESULT;
        } else {
            return FAIL_RESULT;
        }
    }
}
