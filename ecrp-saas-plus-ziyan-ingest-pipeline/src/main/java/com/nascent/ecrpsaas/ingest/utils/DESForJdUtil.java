package com.nascent.ecrpsaas.ingest.utils;

import java.security.spec.AlgorithmParameterSpec;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import javax.crypto.spec.IvParameterSpec;

public class DESForJdUtil {
	private static final byte[] DESIVS = {0x12, 0x34, 0x56, 0x78, (byte) 0x90, (byte) 0xAB, (byte) 0xCD, (byte) 0xEF};
    private static final byte[] DESKEYS = {110, 97, 95, 99, 108, 111, 117, 100}; 
    //na_cloud

    public static final String ALGORITHM_DES = "DES/CBC/PKCS5Padding";
    public static AlgorithmParameterSpec iv = null;

    //private static Base64 objBase64 = null;

    static {
        iv = new IvParameterSpec(DESIVS);
        // 设置向量
        //objBase64 = new Base64();
    }

    /**
     * des加密
     *
     * @param message
     * @param key
     * @return
     * @throws Exception
     * @see [类类#方法、类#成员]
     */
    public static String encrypt(String message, String key) throws Exception {
        DESKeySpec desKeySpec = new DESKeySpec(key.getBytes("UTF-8"));
        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
        SecretKey secretKey = keyFactory.generateSecret(desKeySpec);
        Cipher cipher = Cipher.getInstance(ALGORITHM_DES);
        cipher.init(Cipher.ENCRYPT_MODE, secretKey, iv);
        byte[] pasByte = cipher.doFinal(message.getBytes("UTF-8"));
        return new String(Base64.getEncoder().encode(pasByte), "UTF-8");
    }

    public static String encrypt(String message) throws Exception {
        return encrypt(message, new String(DESKEYS));
    }

    /**
     * DES算法，解密
     *
     * @param data 待解密字符串
     * @param key  解密私钥，长度不能够小于8位
     * @return 解密后的字节数组
     * @throws Exception 异常
     */
    public static String decode(String data, String key) throws Exception {
        DESKeySpec desKeySpec = new DESKeySpec(key.getBytes("UTF-8"));
        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
        SecretKey secretKey = keyFactory.generateSecret(desKeySpec);
        Cipher cipher = Cipher.getInstance(ALGORITHM_DES);
        cipher.init(Cipher.DECRYPT_MODE, secretKey, iv);
        byte[] pasByte = cipher.doFinal(Base64.getDecoder().decode(data.getBytes("UTF-8")));
        return new String(pasByte, "UTF-8");
    }

    public static String decode(String data) throws Exception {
        return decode(data, new String(DESKEYS));
    }

    public static void main(String[] args) {
        try {
            System.out.println(DESForJdUtil.decode("cRPc/NYnWze3yn9meNPjFfQbgHmiVCgsnzFBg8PakFgYwkNocrKXlmjVSaWmyrG94nYBr4nvkNE9JA9jv7XEF3DxM9PiMcRoAdAP76b7u5AcmR+V+SX9/QJ+oFnn8XTAz4QG3T9aFsCTaMhLrKsWvfuktxJYj/bJwPaMGLhOHVLxXhUSTJL7RFAqtNyAmp3fg/wqssdgWFIq8HThubuMDDFE9Ikx2Lcqxmr1QUle1mk="));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
