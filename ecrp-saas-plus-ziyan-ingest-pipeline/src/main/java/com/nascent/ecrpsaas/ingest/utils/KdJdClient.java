package com.nascent.ecrpsaas.ingest.utils;



import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.springframework.core.SpringProperties;

import com.alibaba.fastjson.JSONObject;
import com.jd.open.api.sdk.DefaultJdClient;
import com.jd.open.api.sdk.JdException;
import com.jd.open.api.sdk.internal.parser.Parser;
import com.jd.open.api.sdk.internal.parser.ParserFactory;
import com.jd.open.api.sdk.internal.util.CodecUtil;
import com.jd.open.api.sdk.internal.util.HttpUtil;
import com.jd.open.api.sdk.request.JdRequest;
import com.jd.open.api.sdk.response.AbstractResponse;

public class KdJdClient extends DefaultJdClient{
	 private static final String JD_SERVER_URL = SpringProperties.getProperty("jdServerUrl");
	 private static final String KD_SERVER_URL = SpringProperties.getProperty("kdServerUrl");
     public static final String CHARSET_UTF8 = "UTF-8";
     private static final String JSON_PARAM_KEY = SpringProperties.getProperty("jsonParamKey");
     private static final String OTHER_PARAM_KEY = "other";
     private static final String FROM = "2";
	 
	// jd server url
	    private String serverUrl;
	    private String accessToken;
	    private int connectTimeout = 30 * 1000;
	    private int readTimeout = 30 * 1000;
	    private String appKey;
	    private String fuzz;
	    private String appSecret;
	    private String shopName;
	    
	/**
     * 构造函数
     * @param accessToken
     * @param appKey
     * @param appSecret
     * @param shopName
     */
    public KdJdClient(String accessToken, String appKey, String appSecret, String shopName) {
        super("https://api.jd.com/routerjson", accessToken, appKey, appSecret);
        if (null == accessToken || "".equals(accessToken)) {
            throw new RuntimeException("accessToken is null");
        }
        if (null == appKey || "".equals(appKey)) {
            throw new RuntimeException("appKey is null");
        }
        if (null == appSecret || "".equals(appSecret)) {
            throw new RuntimeException("appSecret is null");
        }
        if (null == shopName || "".equals(shopName)) {
            throw new RuntimeException("shopName is null");
        }
        this.serverUrl = JD_SERVER_URL;
        this.accessToken = accessToken;
        this.appKey = appKey;
        this.appSecret = appSecret;
        this.shopName = shopName;
    }
    
    /**
     * 重写jd client exceute
     * @param request
     * @param <T>
     * @return
     * @throws JdException
     */
    @Override
    public <T extends AbstractResponse> T execute(JdRequest<T> request) throws JdException {
    	   Document document = null;
           try {
               // 组装jd请求url
               String url = buildUrl(request);
               Map<String, String> params = new HashMap();
               String json = request.getAppJsonParams();
               params.put(JSON_PARAM_KEY, json);
               if (request.getOtherParams() != null) {
                   params.put(OTHER_PARAM_KEY, request.getOtherParams());
               }
               // 包装参数
               Map<String, String> param = new HashMap();
               param.put("from", FROM);
               param.put("paras", DESForJdUtil.encrypt(JSONObject.toJSONString(params)));
               param.put("shopName", DESForJdUtil.encrypt(this.shopName));
               param.put("url", DESForJdUtil.encrypt(url));
               // 请求客道服务器
               String rsp = HttpUtil.doPost("http://jdweb.nascent.cn/Values/DoPost", param, this.connectTimeout, this.readTimeout);
               if (null != rsp && !"".equals(rsp)) {
                   // 解析返回结果
                   document = DocumentHelper.parseText(rsp);
                   String value = document.getStringValue();
                   rsp = DESForJdUtil.decode(value);
               }
               AbstractResponse resp = parse(rsp, request.getResponseClass());
               StringBuffer sb = new StringBuffer();
               sb.append(url).append("&").append(JSON_PARAM_KEY).append("=").append(json);
               resp.setUrl(sb.toString());
               return (T) resp;
           } catch (Exception e) {
               throw new JdException(e);
           }
    }
    
    /**
     * 构建jd url
     * @param request
     * @param <T>
     * @return
     * @throws Exception
     */
    private <T extends AbstractResponse> String buildUrl(JdRequest<T> request) throws Exception {
        Map<String, String> sysParams = request.getSysParams();
        Map<String, String> pmap = new TreeMap();
        pmap.put(JSON_PARAM_KEY, request.getAppJsonParams());
        sysParams.put("method", request.getApiMethod());
        sysParams.put("access_token", this.accessToken);
        sysParams.put("app_key", this.appKey);
        if (this.fuzz != null) {
            sysParams.put("jos_result_fuzz", this.fuzz);
        }
        pmap.putAll(sysParams);
        String sign = sign(pmap, this.appSecret);

        sysParams.put("sign", sign);
        StringBuilder sb = new StringBuilder(this.serverUrl);
        sb.append("?");
        sb.append(HttpUtil.buildQuery(sysParams, CHARSET_UTF8));
        return sb.toString();
    }

    /**
     * 解析
     *
     * @param rsp
     * @param responseClass
     * @param <T>
     * @return
     * @throws JdException
     */
    private <T extends AbstractResponse> T parse(String rsp, Class<T> responseClass) throws JdException {
        Parser parser = null;
        if (this.serverUrl.endsWith("json")) {
            parser = ParserFactory.getJsonParser();
        } else {
            parser = ParserFactory.getXmlParser();
        }
        return parser.parse(rsp, responseClass);
    }
    
    /**
     * 签名
     *
     * @param pmap
     * @param appSecret
     * @return
     * @throws Exception
     */
    private String sign(Map<String, String> pmap, String appSecret) throws Exception {
        StringBuilder sb = new StringBuilder(appSecret);
        for (Map.Entry<String, String> entry : pmap.entrySet()) {
            String name = entry.getKey();
            String value = entry.getValue();
//            if (UtilString.areNotEmpty(new String[] {name, value})) {
//                sb.append(name).append(value);
//            }
            if(null!=name && null!=value){
            	  sb.append(name).append(value);
            }
        }
        sb.append(appSecret);
        String result = CodecUtil.md5(sb.toString());
        return result;
    }
    
}
