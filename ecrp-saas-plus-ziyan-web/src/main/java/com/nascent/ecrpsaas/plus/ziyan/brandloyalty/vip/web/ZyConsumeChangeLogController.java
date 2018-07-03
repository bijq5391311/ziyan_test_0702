package com.nascent.ecrpsaas.plus.ziyan.brandloyalty.vip.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nascent.ecrpsaas.base.web.BaseController;
import com.nascent.ecrpsaas.plus.vo.GradeVo;
import com.nascent.ecrpsaas.plus.ziyan.vip.model.ZyConsumeValueLog;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.utils.model.Authorize;
import com.nascent.utils.query.CommonResult;
import com.nascent.utils.query.TableRequest;
import com.nascent.utils.query.TableResponse;

@Authorize
@Controller
public class ZyConsumeChangeLogController extends BaseController {
	@Authorize(order = -1)
	public void zyconsumechangelogList() {
	}

	@Authorize(order = 1)
	@ResponseBody
	public TableResponse<Record> zyconsumeValueChangeLogList(TableRequest request) {
		TableResponse<Record> records = ZyConsumeValueLog.dao().queryconsumeValueLogList(request);
		return records;
	}
	
	//获取等级列表
    @ResponseBody
    public CommonResult getGradeList() {
        return new CommonResult().setResult(GradeVo.dao().queryGradeList());
    }
	

}
