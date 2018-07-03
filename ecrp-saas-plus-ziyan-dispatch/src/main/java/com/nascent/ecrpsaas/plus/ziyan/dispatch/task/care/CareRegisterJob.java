package com.nascent.ecrpsaas.plus.ziyan.dispatch.task.care;

import com.nascent.ecrpsaas.plus.ziyan.care.service.ZyRegisterConcernService;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * com.nascent.ecrpsaas.plus.ziyan.dispatch.task.care
 *
 * @Author guiping.Qiu
 * @Date 2017/12/22
 */
public class CareRegisterJob {

    @Autowired
    private ZyRegisterConcernService zyRegisterConcernService;

    public synchronized void registerCareWork(){
        zyRegisterConcernService.registerCareServiceSms();
    }
}
