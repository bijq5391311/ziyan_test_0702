package com.nascent.ecrpsaas.utils;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;

import com.nascent.ecrpsaas.ingest.parser.StringXmlApplicationContext;

public class UpdateTradeState {
	private static Logger logger = LoggerFactory.getLogger(CheckSysCustomerId.class);
	//获取数据库连接
	private static JdbcTemplate jdbc = new JdbcTemplate((DataSource)StringXmlApplicationContext.me().getBean("dataSource"));
	
	public static void updateStatus(String target) {
		jdbc.execute("UPDATE kd_trade SET trade_status  = 'TRADE_CLOSED'  WHERE out_trade_id = '"+target+"' ");
	}

}
