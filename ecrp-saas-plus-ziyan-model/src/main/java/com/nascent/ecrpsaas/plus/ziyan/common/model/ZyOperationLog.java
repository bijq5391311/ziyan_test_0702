package com.nascent.ecrpsaas.plus.ziyan.common.model;

import com.nascent.ecrpsaas.database.model.KdOperationLog;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.Select;
import com.nascent.utils.query.TableRequest;
import com.nascent.utils.query.TableResponse;

/**
 * @author zhourongping
 * @Date 2017/11/6
 * @功能
 */
@Select
public class ZyOperationLog extends KdOperationLog {
    public static ZyOperationLog dao() {
        return SpringContext.me().getModel(ZyOperationLog.class);
    }

    @Select(id="common.operationLog.queryOperationLogList")
    public TableResponse<Record> queryOperationLogList(TableRequest request) {
        return null;
    }
}
