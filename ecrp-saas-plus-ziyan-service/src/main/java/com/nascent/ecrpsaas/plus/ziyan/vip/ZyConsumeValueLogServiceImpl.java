package com.nascent.ecrpsaas.plus.ziyan.vip;

import org.springframework.stereotype.Service;

import com.nascent.ecrpsaas.plus.ziyan.vip.model.ZyConsumeValueLog;
import com.nascent.ecrpsaas.plus.ziyan.vip.service.ZyConsumeValueLogService;
@Service("zyConsumeValueLogService")
public class ZyConsumeValueLogServiceImpl implements ZyConsumeValueLogService {

	@Override
	public void saveZyConsumeValueLog(ZyConsumeValueLog zyConsumeValueLog) {
		ZyConsumeValueLog.dao().saveOrUpdate(zyConsumeValueLog);
	} 

}
