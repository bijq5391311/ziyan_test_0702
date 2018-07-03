package com.nascent.ecrpsaas.open.ziyan.model;

import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.ArModel;
import com.nascent.plugins.sqlinxml.annotation.Select;
import com.nascent.plugins.sqlinxml.annotation.TableBind;
import com.nascent.utils.query.QueryInfo;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @author FeiXiang
 * @date 2017/12/23
 * @describe
 */
@Component
@Select()
@TableBind(name = "grade_rule_detail", pk = "id")
public class GradeRuleDetailModel extends ArModel<GradeRuleDetailModel> {
    private static final long serialVersionUID = 1L;

    public static GradeRuleDetailModel dao() {
        return SpringContext.me().getBean(GradeRuleDetailModel.class);
    }

    public List<Record> findListByBrandId(String brandId) {
        return new QueryInfo("gradeRuleDetail.findListByBrandId").addParam("brandId", brandId).find();
    }

}
