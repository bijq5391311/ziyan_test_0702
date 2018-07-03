package com.nascent.ecrpsaas.plus.ziyan.care.model;

import com.nascent.ecrpsaas.care.model.CareAutoPattern;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.Select;
import com.nascent.utils.query.QueryInfo;

import java.util.List;

/**
 * com.nascent.ecrpsaas.plus.ziyan.care.model
 *
 * @Author guiping.Qiu
 * @Date 2017/12/25
 */
@Select
public class ZyCareAutoPattern extends CareAutoPattern{

    public static ZyCareAutoPattern dao() {
        return SpringContext.me().getModel(ZyCareAutoPattern.class);
    }


    /**
     * 查找审核通过且开启的关怀规则
     *
     * @param typeMark
     * @param patternType
     * @return
     */
    public List<CareAutoPattern> queryValidatedAndEnableList(String typeMark
            , int patternType) {
        QueryInfo queryInfo = new QueryInfo("care.ZyCare.queryValidatedList");
        queryInfo.addParam("typeMark", typeMark).addParam("patternType", patternType);
        return queryInfo.find(CareAutoPattern.class);
    }
}
