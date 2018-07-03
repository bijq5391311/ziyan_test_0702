package com.nascent.ecrpsaas.utils;

import java.util.List;
import org.springframework.core.SpringProperties;
import com.alibaba.fastjson.JSONObject;
import com.jd.open.api.sdk.JdException;
import com.jd.open.api.sdk.request.etms.EtmsTraceGetRequest;
import com.jd.open.api.sdk.response.etms.EtmsTraceGetResponse;
import com.jd.open.api.sdk.response.etms.TraceApiDto;
import com.nascent.api.ApiException;
import com.nascent.api.DefaultKdClient;
import com.nascent.api.KdClient;
import com.nascent.api.request.LogisticsTraceReqDto;
import com.nascent.api.response.LogisticsTraceRespDto;
import com.nascent.ecrpsaas.ingest.model.TestOrder;
import com.nascent.ecrpsaas.ingest.utils.KdJdClient;

/***
 * 获取物流信息
 * @author pc
 *
 */
public class Logistics {
	/**
	 * 淘宝访问接口访问地址
	 */
	private static String tbUrl = SpringProperties.getProperty("appUrl");
	public static void getLogistics(TestOrder ext, JSONObject shop) throws JdException, ApiException{
		switch (shop.getString("plat_from_type")) {
		case "1": 
			tbLogistics(ext, shop);
			break;
		case "3":
			jdLogistics(ext, shop);	
			break;
		case "11":
			kdtLogistics(ext, shop);
			break;
		default:
			break;
		}
	}

	private static void kdtLogistics(TestOrder kdTrade, JSONObject shop) {
		
	}

	public static void jdLogistics(TestOrder kdTrade, JSONObject shop) throws JdException {
		EtmsTraceGetRequest request = new EtmsTraceGetRequest();
			request.setWaybillCode(kdTrade.get("OutSid").toString());
		KdJdClient kdJdClient = new KdJdClient(shop.getString("access_token"), shop.getString("app_key"), shop.getString("app_secret"), shop.getString("name"));
		EtmsTraceGetResponse response = kdJdClient.execute(request);
		List<TraceApiDto> traceApiDtos = response.getTraceApiDtos();
		if(traceApiDtos.size()>0) {
			kdTrade.set("ConsignTime", traceApiDtos.get(0).getOpeTime());
		}
	}

	public static void tbLogistics(TestOrder kdTrade, JSONObject shop) throws ApiException {
		LogisticsTraceReqDto request = new LogisticsTraceReqDto();
	    request.setTid(Long.valueOf(kdTrade.get("OutTradeId").toString()));
	    request.setIsSplit("0");
	    KdClient kdclient = new DefaultKdClient(tbUrl, shop.getString("app_key"), shop.getString("app_secret"));
		LogisticsTraceRespDto response = kdclient.execute(request, shop.getString("access_token"));
		if(response.getIsOK()=="true") {
			kdTrade.set("OutCompanyName", response.getLogisticsTraceData().getLogisticsTrace().getResponse().getCompanyName());
			kdTrade.set("OutSid", response.getLogisticsTraceData().getLogisticsTrace().getResponse().getOutSid());
		}
	}
	
	public static void tbLogistics() throws ApiException {
		/*LogisticsTraceReqDto request = new LogisticsTraceReqDto();
	    request.setTid(46174446989665362L);
	    request.setIsSplit("0");
	    KdClient kdclient = new DefaultKdClient(tbUrl, "client032", "52D0728A-3D7A-450E-B7E2-19332EC7BC48");
		LogisticsTraceRespDto response = kdclient.execute(request, "372P1Y0f1P163y3y0e253L1E3x3f3L180k2h371A1c2T3d2m3R3v2k1_3s1Q3q2X162D1E1M3S1J0v1E0A3S2u1N1P0N2w043m2u2-2j3e1Z3w3Y3o2c3T3H2z1O3w0W3i3h0P0w1A1u2A103P1r0G3w081V0g2T0u0B3m0g3f0W14132w0r1j1d3d3o3C0R1V0x112S0F1M3k1G0v1F3k2t3N2P1J321R2E2a1Q1u0f0I2S2m3O2U2Y3T3h1J3Y3V14011U2d20141O1P1O1-1f0y2a3L1A3Z341a202Q3L3Q0j1z0a3w1g0h2p0m2B320Y191_3b2p1W0I001F091K130U0f3u1P240A2w2S2r1I1_322y0_0S2t0q3m2p0N1X0X193k010W3H3O1M2O1J0Z0d2V1n");
	    System.out.println(response);*/
	}
	
	public static void jdLogistics() throws ApiException, JdException {
		/*EtmsTraceGetRequest request = new EtmsTraceGetRequest();
		request.setWaybillCode("VC360552052441");
	    KdJdClient kdJdClient = new KdJdClient("c0612fc9-0169-4baf-80f9-8b3041461c2f", "732DF245BD53F7193E9313769F1DBB73", "c0796fef63e34750bd4af74bef765fbe", "海一家旗舰店");
	    EtmsTraceGetResponse response = kdJdClient.execute(request);
	    List<TraceApiDto> traceApiDtos = response.getTraceApiDtos();*/
	    
	}
	
	public static void main(String[] args) throws ApiException, JdException {
		jdLogistics();
	}
}
