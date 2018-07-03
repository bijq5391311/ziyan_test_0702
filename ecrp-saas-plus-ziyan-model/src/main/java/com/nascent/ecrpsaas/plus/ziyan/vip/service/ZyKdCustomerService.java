package com.nascent.ecrpsaas.plus.ziyan.vip.service;

import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.utils.query.TableRequest;
import com.nascent.utils.query.TableResponse;


public interface ZyKdCustomerService {
	
	/**
	 * 全景数据下会员信息表数据
	 * @param request
	 * @return
	 */
	TableResponse<Record> queryList(TableRequest request);
	
}
