package com.nascent.ecrpsaas;

import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter4;
import com.nascent.ecrpsaas.open.core.security.AccessIP;
import com.nascent.ecrpsaas.open.core.security.DefaultValidatorAdapter;
import com.nascent.ecrpsaas.open.core.security.IPFilterHandler;
import com.nascent.ecrpsaas.open.core.security.Secret;
import com.nascent.ecrpsaas.open.core.springboot.APIHandlerInterceptor;
import com.nascent.plugins.spring.boot.ArModelRequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Configuration
@EnableAutoConfiguration
public class WebMvcConfiguration extends WebMvcConfigurationSupport {
	
	@Autowired
	private RequestMappingHandlerAdapter adapter;

	/**
	 * 确保ArModel参数绑定是在解析器的头部
	 */
	@PostConstruct
	public void prioritizeCustomArgumentMethodHandlers () {
	  //new SpringContext((ConfigurableListableBeanFactory)this.getApplicationContext().getAutowireCapableBeanFactory());
	  
	  List<HandlerMethodArgumentResolver> argumentResolvers = 
	      new ArrayList<> (adapter.getArgumentResolvers ());
	  
	  argumentResolvers.add(0,
		  new com.nascent.plugins.spring.boot.ArModelMethodArgumentResolver(null)
		  );
	  adapter.setArgumentResolvers(argumentResolvers);
	}

	@Override
	protected void addInterceptors(InterceptorRegistry registry) {
		/*
		 * TODO 
		 * 配置api接口ip访问控制
		 * 配置密钥获取方法
		 * */
		registry.addInterceptor(new APIHandlerInterceptor(new DefaultValidatorAdapter(new IPFilterHandler(new AccessIP() {
			@Override
			public String getWhiteList(HttpServletRequest request) {
				return "*.*.*.*";
			}
			
			@Override
			public String getBlackList(HttpServletRequest request) {
				return "";
			}
			
		}), new Secret() {
			@Override
			public String getSecret(Map<String, String[]> paramMap) {
				return "123456";
			}
		})));
		
		super.addInterceptors(registry);
	}
	
    @Bean
    public InternalResourceViewResolver defaultViewResolver() {
        return new InternalResourceViewResolver();
    }
    
    /**
     * 启用自动路径注册： /module/controller/action
     */
    @Override
    protected RequestMappingHandlerMapping createRequestMappingHandlerMapping() {
        return new ArModelRequestMapping();
    }

    @Override
    protected void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
    	FastJsonHttpMessageConverter4 msgConverter = new FastJsonHttpMessageConverter4();
    	
    	ArrayList<MediaType> medias = new ArrayList<MediaType>();
    	medias.add(MediaType.APPLICATION_JSON_UTF8);
    	msgConverter.setSupportedMediaTypes(medias);
    	
    	msgConverter.getFastJsonConfig().setSerializerFeatures(
    				SerializerFeature.WriteDateUseDateFormat,
    				SerializerFeature.WriteMapNullValue);
    	converters.add(msgConverter);
	}
    
    @Override
    protected RequestMappingHandlerAdapter createRequestMappingHandlerAdapter() {
    	// TODO Auto-generated method stub
    	return new com.nascent.ecrpsaas.open.core.springboot.RequestMappingHandlerAdapter();
    }
    
    @Override
    protected void addResourceHandlers(ResourceHandlerRegistry registry) {
    	registry.addResourceHandler("/static/**","/public/**")
    		.addResourceLocations(CLASSPATH_RESOURCE_LOCATIONS);
    	
    }
    
    private static final String[] CLASSPATH_RESOURCE_LOCATIONS = {
            "classpath:/META-INF/resources/", "classpath:/resources/",
            "classpath:/static/", "classpath:/public/" };

    
}
