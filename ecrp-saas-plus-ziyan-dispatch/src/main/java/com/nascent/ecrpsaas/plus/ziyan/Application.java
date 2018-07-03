package com.nascent.ecrpsaas.plus.ziyan;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Application {

	public static void main(String[] args) {
		ClassPathXmlApplicationContext applicationContext = new ClassPathXmlApplicationContext(
				new String[] {"classpath:applicationContext_local.xml"});
		applicationContext.refresh();
	}

}
