package com.nascent.ecrpsaas;

import org.springframework.boot.SpringApplication;
import org.springframework.context.annotation.ImportResource;

@ImportResource("classpath:applicationContext_local.xml")
public class Application {

    public static void main(String[] args) {
        //关闭restart classloader避免多loader造成代理类无效。
        System.setProperty("spring.devtools.restart.enabled", "false");
        //启用动态类刷新，在命令行参数添加：
        //-javaagent:springloaded-1.2.7.jar -noverify

        SpringApplication.run(Application.class, "-javaagent:springloaded-1.2.7.jar", "-noverify");
    }

}
