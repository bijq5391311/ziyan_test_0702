package com.nascent.ecrpsaas.plus.ziyan;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.PropertySource;

@PropertySource("classpath:/spring.properties")
@PropertySource("classpath:/redis.properties")
@ImportResource("classpath:applicationContext.xml")
public class Application {

    public static void main(String[] args) {
        AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext(
                Application.class);
    }

}
