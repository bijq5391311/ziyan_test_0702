package com.nascent.ecrpsaas.utils;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceUtils;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.spring.support.RepositoryServiceImpl;
import com.nascent.plugins.taobao.StringUtils;

public class CheckSysCustomerIdCenter {
	
	@SuppressWarnings("unused")
	private static Logger logger = LoggerFactory.getLogger(CheckSysCustomerIdCenter.class);
	//获取数据库连接
	private static JdbcTemplate jdbcTemplate=null;
	
	static {
		if(jdbcTemplate==null) {
			jdbcTemplate = SpringContext.me().getBean(RepositoryServiceImpl.class).getTemplate("");
		}
	}
    
	/**
	 * 判断会员id是否存在
	 * @param isNick 账号是否存在
	 * @param mobile 手机号
	 * @param nick 平台_昵称
	 * userLoginId 用户登录Id
	 * @throws SQLException 
	 */
	public static long checkSysCustomerId(String nick, String mobile) throws SQLException {
		long sysCustomerId = 0 ;
		Connection con = DataSourceUtils.getConnection(jdbcTemplate.getDataSource());
		long findSysCustomerIdBymobile = queryFortypeAndTarget(2, mobile, con);
		long findSysCustomerIdByNick = queryFortypeAndTarget(1, nick, con);
		if(findSysCustomerIdBymobile != 0) {
		/*	if (findSysCustomerIdByNick==0) {
				if(!StringUtils.isEmpty(nick)) {
					insert(findSysCustomerIdBymobile, nick, 1, con);
				}
			}*/
			sysCustomerId = findSysCustomerIdBymobile;
		}else if (findSysCustomerIdByNick != 0) {
			/*	if(findSysCustomerIdBymobile ==0) {
					if (!StringUtils.isEmpty(mobile)) {
					insert(findSysCustomerIdByNick, mobile, 2, con);
				}
			}*/
				sysCustomerId = findSysCustomerIdByNick;
		}else {
			sysCustomerId = getId(con);
			if(!StringUtils.isEmpty(nick)) {
				insert(sysCustomerId, nick, 1, con);
			}
			if (!StringUtils.isEmpty(mobile)) {
				insert(sysCustomerId, mobile, 2, con);
			}
		}
		return sysCustomerId;
	}
	
	/**
	 * 插入数据库
	 * @param sysCustomerId
	 * @param target
	 * @param type
	 * @throws SQLException 
	 */
	public static void insert(long sysCustomerId, String target, int type, Connection con) throws SQLException{
        //logger.debug("use conn: #{}",con);
		PreparedStatement ps = null;
		try {
			ps = con.prepareStatement("insert into sys_customerid_rule(sys_customer_id, target, type) VALUES ('"+sysCustomerId+"','"+target+"','"+type+"')");
			ps.execute();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			if (ps!=null) {
				ps.close();
			}
		}
	}
	
	/**
	 * 查询会员id
	 * @param type
	 * @param target
	 * @return
	 * @throws SQLException 
	 */
	public static long queryFortypeAndTarget(int type, String target, Connection con) throws SQLException{
		ResultSet executeQuery = null;
		//logger.debug("use conn: #{}",con);
		long sysCustomerId = 0;
		try {
			executeQuery = con.createStatement().executeQuery("select sys_customer_id from sys_customerid_rule where type='"+type+"' and target='"+target+"'");
			if (executeQuery.next()) {
				sysCustomerId= executeQuery.getLong("sys_customer_id");
			}
		} catch (SQLException e) {
			throw new RuntimeException("查找会员id出错："+e);
		} finally {
			executeQuery.close();
		}
		return sysCustomerId;
	}
	
	/**
	 * 生成自增长id
	 * @return
	 * @throws SQLException 
	 */
	public static long getId(Connection con) throws SQLException{
	    PreparedStatement ps = null;
		try {
			ps = con.prepareStatement("insert  into check_sys_customer_id (timestamp) values ('"+System.nanoTime()+"')", Statement.RETURN_GENERATED_KEYS);
			ps.executeUpdate();
			ResultSet rs = ps.getGeneratedKeys();
			if (rs.next()) 
				return rs.getLong(1);
		} catch (SQLException e) {
			throw new RuntimeException("生成自增长id出错:"+e);
		} finally {
		    if (ps!=null) {
				ps.close();
			}
		}
		   return 0;
	}
}
