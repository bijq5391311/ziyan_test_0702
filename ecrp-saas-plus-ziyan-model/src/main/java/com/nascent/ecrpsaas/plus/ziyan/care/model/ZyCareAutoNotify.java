package com.nascent.ecrpsaas.plus.ziyan.care.model;

import com.nascent.ecrpsaas.care.model.CareAutoNotify;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.Param;
import com.nascent.plugins.sqlinxml.annotation.Select;

import java.util.List;

/**
 * com.nascent.ecrpsaas.plus.ziyan.care.model
 *
 * @Author guiping.Qiu
 * @Date 2017/12/22
 */
@Select
public class ZyCareAutoNotify  extends CareAutoNotify{

    public static ZyCareAutoNotify dao(){
        return SpringContext.me().getModel(ZyCareAutoNotify.class);
    }


    @Select
    public List<ZyCareAutoNotify> queryCareNotifyList(@Param("mobile_status$EQ") int mobileStatus
            ,@Param("mark$EQ") String mark){
        return null;
    }
}
