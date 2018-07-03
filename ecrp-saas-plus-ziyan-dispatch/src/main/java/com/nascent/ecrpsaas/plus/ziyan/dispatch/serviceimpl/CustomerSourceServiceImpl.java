package com.nascent.ecrpsaas.plus.ziyan.dispatch.serviceimpl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.CustomerSourcService;
import com.nascent.utils.query.QueryInfo;

@Service("CustomerSourceServiceImpl")
public class CustomerSourceServiceImpl implements CustomerSourcService {
	Logger logger = LoggerFactory.getLogger(CustomerSourceServiceImpl.class);
	@Override
	public void customerSourService() {
		String sql ="UPDATE kd_customer kc inner JOIN (select c.sys_customer_id,t.trade_from from kd_customer c inner join kd_trade t on c.sys_customer_id = t.sys_customer_id "
  +"where c.source_channel = '-' and t.create_time > DATE_SUB(CURDATE(),INTERVAL 1 DAY) AND t.trade_from is not null "
  +"group by t.sys_customer_id) kt ON kc.sys_customer_id = kt.sys_customer_id SET kc.source_channel = kt.trade_from WHERE kc.source_channel = '-'";
		try {
			QueryInfo info = new QueryInfo("");
			info.setQuery(sql);
			info.execute();
			logger.info("****************************************成功*************************");
		} catch (Exception e) {
			logger.error("更新客户表的用户来源字段失败"+e);
		}
	}

}
