package com.nascent.ecrpsaas.open.ziyan.model;

import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.ArModel;
import com.nascent.plugins.sqlinxml.annotation.Select;
import com.nascent.plugins.sqlinxml.annotation.TableBind;
import com.nascent.utils.query.QueryInfo;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * @author FeiXiang
 * @date 2017/12/23
 * @describe
 */
@Component
@Select()
@TableBind(name = "zy_consume_value_log", pk = "id")
public class ZyConsumeValueLogModel extends ArModel<ZyConsumeValueLogModel> {
    private static final long serialVersionUID = 1L;

    public static ZyConsumeValueLogModel dao() {
        return SpringContext.me().getBean(ZyConsumeValueLogModel.class);
    }

    public long getCount(Map<String, Object> params) {
        return new QueryInfo("zyConsumeValueLog.getCount").addParams(params).count();
    }

    public List<Record> findList(Map<String, Object> params) {
        return new QueryInfo("zyConsumeValueLog.findList").addParams(params).find();
    }
}
