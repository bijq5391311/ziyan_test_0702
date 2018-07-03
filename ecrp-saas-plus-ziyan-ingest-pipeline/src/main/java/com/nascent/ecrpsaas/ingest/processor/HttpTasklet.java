package com.nascent.ecrpsaas.ingest.processor;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Random;

import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.item.ExecutionContext;
import org.springframework.batch.repeat.RepeatStatus;
import com.nascent.ecrpsaas.ingest.parser.xml.CodeTag;
import com.nascent.ecrpsaas.ingest.parser.xml.FieldTag;
import com.nascent.ecrpsaas.ingest.parser.xml.HttpPaginateTag;
import com.nascent.ecrpsaas.ingest.parser.xml.HttpSignTag;
import com.nascent.plugins.taobao.StringUtils;
import com.nascent.plugins.taobao.WebUtils;
import ognl.OgnlException;

public class HttpTasklet extends BaseTasklet {

	protected String url;
	protected String method;
	private List<FieldTag> params;
	private List<FieldTag> session;
	public HttpPaginateTag paginate;
	public HttpSignTag sign;

	public CodeTag responseCode;

	ChunkContext chunkContext;
	/***
	 * 得到result的field
	 */
	public Map<String, String> fields;
	/***
	 * 输出到ctx的变量名
	 */
	String resultField;

	public HttpTasklet(String url, String api, String method) {
		if (url.endsWith("/") || api.startsWith("/")) {
			this.url = url + api;
		} else {
			this.url = url;
		}
		this.method = method.equalsIgnoreCase("POST") ? "POST" : "GET";
	}

	public HttpTasklet setParams(List<FieldTag> params) {
		this.params = params;
		return this;
	}

	public HttpTasklet setSessionParam(List<FieldTag> session) {
		this.session = session;
		return this;
	}

	public HttpTasklet setPaginParam(HttpPaginateTag paginate) {
		this.paginate = paginate;
		return this;
	}

	public HttpTasklet setSignMethod(HttpSignTag sign) {
		this.sign = sign;
		return this;
	}

	public HttpTasklet setResponseCode(CodeTag resp) {
		this.responseCode = resp;
		return this;
	}

	public HttpTasklet setMapping(Map<String, String> fields) {
		this.fields = fields;
		return this;
	}

	@Override
	public RepeatStatus execute(StepContribution contribution, ChunkContext cctx) throws Exception {
		execDates(cctx);
		return RepeatStatus.FINISHED;
	}

	private List<Object> execDates(ChunkContext cctx) throws Exception {
		List<Object> results = new ArrayList<>();
		Object prevResult = null;
		Map<String, Object> requestMap;
		do {
			requestMap = createPagingParams(cctx);
			// 获取数据已超过范围， 退出循环。 等待下次调度
			if (!isValidDate(results.size(), requestMap, cctx)) {
				super.getExecutionContext(cctx).put("startTime", null);
				break;
			}
			do {
				prevResult = createHttpRequest(requestMap, cctx);
				if (prevResult != null) {
					prevResult = extractResultFromJSON(prevResult, cctx);
					if (prevResult instanceof List) {
						results.addAll((List) prevResult);
					} else {
						results.add(prevResult);
					}
					// 分页结束，退出page++循环
					if (!isValidPage(prevResult, requestMap)) {
						break;
					}
				}
			} while (setNextPage(prevResult, requestMap, cctx));
		} while (setNextDate(requestMap, cctx));

		if (this.resultField != null) {
			super.getExecutionContext(cctx).put(this.resultField, results);
		}
		return results;
	}

	/**
	 * 移动到下一个日期请求区间
	 */
	private boolean setNextDate(Map<String, Object> requestMap, ChunkContext cctx) {
		if (null != paginate) {
			if (!StringUtils.isEmpty(paginate.nextDate)) {
				super.evalOgnl(paginate.nextDate, super.getExecutionContext(cctx), requestMap);
				return true;
			}
		}

		return false;
	}

	private boolean isValidDate(int batchSize, Map<String, Object> requestMap, ChunkContext cctx) {
		if (null != paginate) {
			if (!StringUtils.isEmpty(paginate.testDate)) {
				ExecutionContext ctx = super.getExecutionContext(cctx);
				ctx.put("http_batchSize", batchSize);

				return (boolean) super.evalOgnl(paginate.testDate, ctx, requestMap);
			}
		}
		return true;
	}

	private boolean setNextPage(Object prevResult, Map<String, Object> requestMap, ChunkContext cctx) {
		if (prevResult != null && !StringUtils.isEmpty(paginate.nextPage)) {
			Object evalOgnl = super.evalOgnl(paginate.nextPage.split(",")[1], prevResult, requestMap);
			// super.evalOgnl(paginate.nextPage,requestMap);
			requestMap.put(paginate.nextPage.split(",")[0], evalOgnl);
			return true;
		}
		return false;
	}

	/**
	 * 检查返回的数据， 判断是否需要继续向后翻页
	 */
	private boolean isValidPage(Object prevResult, Map<String, Object> requestMap) {
		if (null != paginate) {
			if (!StringUtils.isEmpty(paginate.testPage)) {
				return (boolean) super.evalOgnl(paginate.testPage, prevResult, requestMap);
			} else {
				if (prevResult == null) {
					return false;
				}
			}
		}

		return true;
	}

	private Object extractResultFromJSON(Object json, ChunkContext cctx) {
		if (json == null) {
			return null;
		}
		HashMap<String, Object> obj = new HashMap<>();
		for (Entry<String, String> field : this.fields.entrySet()) {
			obj.put(field.getKey(), super.evalOgnl(field.getValue(), json, cctx));

			if (resultField == null) {
				resultField = field.getKey();
			}
			if (this.fields.size() == 1) {
				return obj.get(field.getKey());
			}
		}
		return obj;
	}

	protected Object createHttpRequest(Map<String, Object> requestMap, ChunkContext cctx) throws Exception {
		evalRequestParams(requestMap, cctx);
		evalSessionParams(requestMap, cctx);

		Map<String, String> stringMap = new HashMap<>(requestMap.size());
		requestMap.entrySet().forEach(x -> stringMap.put(x.getKey(), x.getValue().toString()));
		evalSignParams(stringMap, cctx);

		if (logger.isDebugEnabled()) {
			logger.debug("http({}): request '{}' with: \r\n{}", this.getId(), url, stringMap);
		}
		String result;
		if ("POST".equals(this.method)) {
			result = WebUtils.doPost(url, stringMap, 30000, 30000);
		} else {
			result = WebUtils.doGet(url, stringMap);
		}
		if (logger.isTraceEnabled()) {
			logger.trace(url + " response: \r\n" + result);
		}
		if (this.responseCode != null) {
			return super.evalOgnl(this.responseCode.entry, this.responseCode.createInstance(), cctx);
		}
		return WebUtils.getJson(result);
	}

	/**
	 * 1. 根据分页参数，判断是否需要创建请求
	 * 
	 * @return 请求参数表
	 */
	private Map<String, Object> createPagingParams(ChunkContext cctx) {
		Map<String, Object> request = new HashMap<String, Object>();
		if (paginate == null || paginate.params == null || paginate.params.isEmpty()) {
			return request;
		}
		evalMapping(request, paginate.params, cctx);

		return request;
	}

	private void evalRequestParams(Map<String, Object> requestMap, ChunkContext cctx) {
		if (params == null || params.isEmpty()) {
			return;
		}
		evalMapping(requestMap, params, cctx);
	}

	protected void evalSessionParams(Map<String, Object> requestMap, ChunkContext cctx)
			throws OgnlException, UnsupportedEncodingException {
		if (session == null || session.isEmpty()) {
			return;
		}
		for (FieldTag key : session) {
			switch (key.bind) {
			case "TIMESTAMP":
				requestMap.put(key.name, String.valueOf(System.currentTimeMillis()));
				break;
			case "NONCE":

				requestMap.put(key.name, String.valueOf(new Random().nextInt(Integer.MAX_VALUE)));
				break;
			case "JDTIMESTAMP":
				requestMap.put(key.name, URLEncoder.encode(
						LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")), "UTF-8"));
				break;
			default:
				requestMap.put(key.name, this.evalOgnl(key.bind, requestMap, cctx));
				break;
			}
		}
	}

	private void evalSignParams(Map<String, String> requestMap, ChunkContext cctx) throws IOException {
		if (sign == null || sign.params == null || sign.params.isEmpty()) {
			return;
		}
		Map<String, Object> signMap = new HashMap<>();
		for (FieldTag key : sign.params) {
			switch (key.bind) {
			case "METHOD":
				signMap.put(key.name, this.method);
				break;
			case "URL":
				signMap.put(key.name, this.url);
				break;
			case "PARAMS":
				signMap.put(key.name, requestMap);
				break;
			default:
				signMap.put(key.name, super.evalOgnl(key.bind, cctx));
				break;
			}
		}
		String signMethod = "T(com.nascent.utils.SignUtils).getSign(#url,#method,#params,#appsecret)";
		if ("MD5".equals(sign.method)) {
			signMethod = "T(com.nascent.utils.SignUtils).getSign(#params,#appsecret)";
		} else if (sign.method.indexOf("#") > 0) {
			signMethod = sign.method;
		} else if (sign.method.equals("HisenseMd5"))
			signMethod = "T(com.nascent.ecrpsaas.ingest.utils.SignUtils).HisenseSign(#params,#appsecret)";
		String signString = (String) super.evalOgnl(signMethod, signMap);
		requestMap.put(sign.name, signString);
	}

	private void evalMapping(Map<String, Object> requestMap, List<FieldTag> fields, ChunkContext cctx) {
		for (FieldTag entry : fields) {

			if (entry.name.length() < 2) {
				// 不存在返回值 ， 仅执行方法
				this.evalOgnl(entry.bind, requestMap, cctx);
			} else {
				requestMap.put(entry.name, this.evalOgnl(entry.bind, requestMap, cctx));
			}

			if (logger.isTraceEnabled()) {
				logger.trace("http({}): setValue {}='{}'({})", this.getId(), entry.name, requestMap.get(entry.name),
						entry.bind);
			}
		}
	}

	@Override
	protected Object doExecute(Object parent, ChunkContext cctx) throws Exception {
		return execDates(cctx);
	}

}
