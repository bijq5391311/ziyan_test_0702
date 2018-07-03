package com.nascent.ecrpsaas.plus.ziyan.vip;

import org.springframework.stereotype.Service;

import com.nascent.ecrpsaas.plus.ziyan.vip.model.ZyCustomer;
import com.nascent.ecrpsaas.plus.ziyan.vip.service.ZyKdCustomerService;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.utils.query.TableRequest;
import com.nascent.utils.query.TableResponse;

@Service
public class ZyKdCustomerServiceImpl implements ZyKdCustomerService {

	/**
	 * 全景数据下的会员信息表格数据
	 */
	@Override
	public TableResponse<Record> queryList(TableRequest request) {
		return ZyCustomer.dao().queryList(request);
	}
}
