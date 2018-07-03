package com.nascent.ecrpsaas.plus.ziyan.dispatch.serviceimpl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.ZyTradeRefundService;
import com.nascent.utils.query.QueryInfo;

@Service("ZyTradeRefundServiceImpl")
public class ZyTradeRefundServiceImpl implements ZyTradeRefundService {
	Logger logger = LoggerFactory.getLogger(ZyTradeRefundServiceImpl.class);
	@Override
	public void zyTradeRefundService() {
		String sql ="UPDATE kd_refund r  "
				+ "INNER JOIN kd_trade t  "
				+ "ON r.tb_sid = t.out_trade_id "
				+ "SET r.sys_customer_id = t.sys_customer_id, "
				+ "t.trade_status = 'TRADE_CLOSED' "
				+ "WHERE r.sys_customer_id = -1 ";
		try {
			QueryInfo info = new QueryInfo("");
			info.setQuery(sql);
			info.execute();
		} catch (Exception e) {
			logger.error("退单清洗失败"+e);
		}
	}

}
