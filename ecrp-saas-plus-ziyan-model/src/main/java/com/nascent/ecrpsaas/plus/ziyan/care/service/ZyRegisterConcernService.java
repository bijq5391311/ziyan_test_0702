package com.nascent.ecrpsaas.plus.ziyan.care.service;

import com.nascent.ecrpsaas.plus.ziyan.care.vo.CareRegisterVo;
import com.nascent.utils.model.UserSession;

/**
 * com.nascent.ecrpsaas.plus.ziyan.organization.service
 *
 * @Author guiping.Qiu
 * @Date 2017/12/21
 */

public interface ZyRegisterConcernService{

    /**
     * 保存注册关怀
     * @param registerVo
     * @param userSession
     * @return
     */
   String saveOrUpdateRegisterConcernSms(CareRegisterVo registerVo, UserSession userSession);


    /**
     * 生成注册关怀通知
     * @param mobile
     * @param CustomerName
     * @param sysCustomerId
     * @param shopCode
     * @param outNick
     */
    void generateRegisterCareNotify(String mobile,String CustomerName
            ,long sysCustomerId,String shopCode,String outNick,int groupId);

    /**
     * 注册关怀服务
     */
   void registerCareServiceSms();
}
