package com.nascent.ecrpsaas.ingest.utils;

import com.google.common.base.Charsets;
import com.google.common.base.Joiner;
import com.google.common.hash.HashFunction;
import com.google.common.hash.Hashing;
import java.util.Map;
import java.util.TreeMap;

public abstract class SignUtils
{
  private static final HashFunction md5 = Hashing.md5();
  private static final String SECRET = "my.secret";

  public static String HisenseSign(Map<String, Object> params, String appSecret)
  {
    Map sortedParams = new TreeMap(params);

    String toVerify = Joiner.on('&').withKeyValueSeparator("=").join(sortedParams);

    String sign = md5.newHasher()
      .putString(toVerify, Charsets.UTF_8)
      .putString(appSecret, Charsets.UTF_8)
      .hash()
      .toString();
    return sign;
  }
}