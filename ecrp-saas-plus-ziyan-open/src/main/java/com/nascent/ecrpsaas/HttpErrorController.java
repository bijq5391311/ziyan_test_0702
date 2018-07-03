package com.nascent.ecrpsaas;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.BasicErrorController;
import org.springframework.boot.autoconfigure.web.ErrorAttributes;
import org.springframework.boot.autoconfigure.web.ErrorProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.Map;

@Controller
@RequestMapping("${server.error.path:${error.path:/error}}")
public class HttpErrorController extends BasicErrorController {

	@Autowired
    public HttpErrorController(ErrorAttributes errorAttributes) {
        super(errorAttributes, getSetting());
    }
	private static ErrorProperties getSetting(){
		ErrorProperties prop = new ErrorProperties();
		prop.setIncludeStacktrace(ErrorProperties.IncludeStacktrace.ON_TRACE_PARAM);
		return prop;
	}
	@Override
	@RequestMapping(path="",produces = "text/html")
	public ModelAndView errorHtml(HttpServletRequest request,
			HttpServletResponse response) {
		HttpStatus status = getStatus(request);
		Map<String, Object> model = Collections.unmodifiableMap(getErrorAttributes(
				request, isIncludeStackTrace(request, MediaType.TEXT_HTML)));
		int iStatus = status.value();
		if(iStatus<202) {
			iStatus=400;
		}
		
		response.setStatus(iStatus);
		ModelAndView modelAndView = resolveErrorView(request, response, status, model);
		return (modelAndView == null ? new ModelAndView("message", model) : modelAndView);
	}
	
	@Override
	@RequestMapping("")
	@ResponseBody
	public ResponseEntity<Map<String, Object>> error(HttpServletRequest request) {
		Map<String, Object> body = getErrorAttributes(request,
				isIncludeStackTrace(request, MediaType.ALL));
		HttpStatus status = getStatus(request);
		body.put("code", status.name());
		body.put("success", false);
		
		String ex = (String)body.get("exception");
		if(ex!=null){
			if(ex.indexOf("ArgumentException")>-1){
				body.put("msg",body.get("message"));
			}else if(ex.indexOf("ActiveRecordException")>-1){
				body.put("msg","数据库执行错误，请重试！");
			}if(ex.indexOf("FormatException")>-1){
				body.put("msg","输入的格式无效："+body.get("message"));
			}else{
				body.put("msg","请求发生异常："+body.get("message"));
			}
		} else {
			body.put("msg",body.get("message"));
		}
		
		if(status.value()==401){
			//SC_UNAUTHORIZED
			body.put("msg","您未被授权访问该资源，请联系管理员！");
		}
		
		return new ResponseEntity<Map<String, Object>>(body, status);
	}
}
