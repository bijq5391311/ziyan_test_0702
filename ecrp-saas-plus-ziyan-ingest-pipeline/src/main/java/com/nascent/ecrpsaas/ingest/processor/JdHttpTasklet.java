package com.nascent.ecrpsaas.ingest.processor;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import org.springframework.batch.core.scope.context.ChunkContext;

import com.alibaba.fastjson.JSONObject;
import com.jd.open.api.sdk.internal.util.HttpUtil;
import com.nascent.ecrpsaas.ingest.parser.xml.FieldTag;
import com.nascent.ecrpsaas.ingest.utils.DESForJdUtil;
import com.nascent.plugins.taobao.StringUtils;
import com.nascent.plugins.taobao.WebUtils;
import com.nascent.utils.SignUtils;

public class JdHttpTasklet extends HttpTasklet {
	final String KD_OPEN_URL="http://jdweb.nascent.cn/Values/DoPost";
	
	public JdHttpTasklet(String url, String api, String method) {
		super(url, api, method);
		this.url=url;
	}

	@Override
	protected Object createHttpRequest(Map<String,Object> pagingMap,ChunkContext cctx) throws Exception{
		//evalRequestParams(requestMap,cctx);
		Map<String, Object> sessionMap=new HashMap<String, Object>();
		evalSessionParams(sessionMap,cctx);
		String shopName = (String)sessionMap.get("SHOPNAME");
		sessionMap.remove("SHOPNAME");
		
		String jsonParams = JSONObject.toJSONString(pagingMap);
		evalJdSign(jsonParams,sessionMap,cctx);
		
		String jdUrl = buildUrl(this.url,sessionMap);
		
		if(logger.isDebugEnabled()){
			logger.debug("http({}): request '{}' with: \r\n{}",
					this.getId(),jdUrl,jsonParams);
		}
		
		//将JD参数重新装入map中，提交到kd开发平台
		Map<String,String> kdJdParas = new HashMap<>();
		kdJdParas.put("360buy_param_json", jsonParams);
		Map<String,String> kdRequestMap = new HashMap<>();
		kdRequestMap.put("from", "2");
		kdRequestMap.put("paras", DESForJdUtil.encrypt(
				JSONObject.toJSONString(kdJdParas)));
		kdRequestMap.put("shopName", DESForJdUtil.encrypt(shopName));
		kdRequestMap.put("url", DESForJdUtil.encrypt(jdUrl));
		
		String result = HttpUtil.doPost(KD_OPEN_URL, kdRequestMap, 30000, 30000);
		//<string xmlns="http://schemas.microsoft.com/2003/10/Serialization/"></string>
		if(result.startsWith("<string ")){
			result = result.substring(68,result.length()-9);
			result= DESForJdUtil.decode(result);
		}
		if(result.startsWith("{\"error_response\"")){
			logger.warn(url+" response: \r\n"+result);
		}else if(logger.isTraceEnabled()){
			logger.trace(url+" response: \r\n"+result);
		}
		if(this.responseCode!=null){
			return super.evalOgnl(this.responseCode.entry,
					this.responseCode.createInstance(),
					cctx);
		}
		return WebUtils.getJson(result);
	}


	
	private void evalJdSign(String paramsMap,
			Map<String,Object> sessionMap,
			ChunkContext cctx) throws IOException{
		if(sign==null || sign.params==null || sign.params.isEmpty()) {
			return;
		}
		Map<String,String> signMap = new HashMap<>();
		for(FieldTag key : sign.params){
			switch(key.bind){
				case "METHOD":
					signMap.put(key.name, this.method);
					break;
				case "URL":
					signMap.put(key.name, this.url);
					break;
				case "ACCESS_TOKEN":
					signMap.put(key.name, (String)sessionMap.get(key.name));
					break;
				case "APP_KEY":
					signMap.put(key.name, (String)sessionMap.get(key.name));
					break;
				case "PARAMS":
					signMap.put(key.name, paramsMap);
					break;
				default:
					signMap.put(key.name, (String)super.evalOgnl(key.bind, cctx));
					break;
			}
		}
		String secret = signMap.get("appsecret");
		signMap.remove("appsecret");
		
		sessionMap.put(sign.name,
				SignUtils.getSign(signMap, secret,true));
	}
	
	public static String buildUrl(String url,Map<String, Object> params){
		// 第一步：检查参数是否已经排序
		String[] keys = params.keySet().toArray(new String[0]);
		Arrays.sort(keys);

		// 第二步：把所有参数名和参数值串在一起
		StringBuilder query = new StringBuilder();
		for (String key : keys) {
			String value = params.get(key).toString();
			if (!StringUtils.isEmpty(key) && !StringUtils.isEmpty(value)) {
				query.append("&").append(key).append("=").append(value);
			}
		}
		
		if(url.indexOf("?")>0){
			return url+query.toString();
		}else{
			return url+"?"+query.substring(1).toString();
		}
	}
}
