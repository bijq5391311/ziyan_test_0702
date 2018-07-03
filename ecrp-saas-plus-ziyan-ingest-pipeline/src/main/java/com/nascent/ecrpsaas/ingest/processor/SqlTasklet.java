package com.nascent.ecrpsaas.ingest.processor;

import java.beans.PropertyVetoException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.sql.DataSource;

import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import com.nascent.ecrpsaas.ingest.parser.StringXmlApplicationContext;
import com.nascent.ecrpsaas.ingest.parser.xml.FieldTag;
import com.nascent.ecrpsaas.ingest.parser.xml.JdbcTag;
import com.nascent.ecrpsaas.ingest.parser.xml.ResultTag;
import com.nascent.plugins.taobao.StringUtils;

import ognl.OgnlException;

public class SqlTasklet extends BaseTasklet{

	String targetName;
	public JdbcTag jdbc;
	public ResultTag resultTag;
	public String query;
	public List<FieldTag> params;
	/*
	 * 从resultset提取值，rs为ognl的root
	 */
	public Map<String,String> fields;
	
	public SqlTasklet(String query,List<FieldTag> params,ResultTag resultTag) {
		this.query=query;
		this.params=params;
		this.resultTag=resultTag;
	}
	public SqlTasklet setJdbc(JdbcTag jdbc) {
		//if(jdbc==null ||jdbc.url==null)
		//	throw new IllegalArgumentException("sql("+this.getId()+") need a valid jdbc tag!");
		this.jdbc=jdbc;
		return this;
	}
	public SqlTasklet setMapping(Map<String, String> fields) {
		this.fields = fields;
		return this;
	}
	public SqlTasklet setTarget(String targetName) {
		this.targetName=targetName;
		return this;
	}

	@Override
	public RepeatStatus execute(StepContribution contribution, ChunkContext cctx) throws Exception {
		Object result = doExecute(null,cctx);
		
		if(!StringUtils.isEmpty(targetName)) {
			super.getExecutionContext(cctx).put(targetName, result);
		}
		
		return RepeatStatus.FINISHED;
	}
	private void evalBinder(Object root,ChunkContext cctx) throws OgnlException{
		for(FieldTag field: this.params) {
			field.value =super.evalOgnl(field.bind, root, cctx);
		}
	}

	private List<HashMap<String, Object>> queryList(){
		Object[] sqlParams=null;
		if(this.params.size() > 0)
		{
		 sqlParams = this.params.stream().map(x->x.value).toArray();
		}
		List<HashMap<String, Object>> list =
			getTemplate().query(this.query,sqlParams,new RowMapper<HashMap<String,Object>>(){
	
				@Override
				public HashMap<String, Object> mapRow(ResultSet rs, int rowNum) throws SQLException {
					HashMap<String, Object> row = new HashMap<String, Object>();
					ResultSetMetaData meta = rs.getMetaData();
					int count = meta.getColumnCount();
					for(int i=1;i<=count;i++){
						row.put(meta.getColumnLabel(i),rs.getObject(i));
					}
					return row;
				}
			});
		if(logger.isDebugEnabled()) {
			logger.debug("sql({}): return '{}' records for query",this.getId(),list.size());
		}
		return list;
	}
	private HashMap<String, Object> queryRow(){
		List<HashMap<String, Object>> list = queryList();
		
		if(list.isEmpty()) {
			return new HashMap<String, Object>();
		}
		return list.get(0);
	}
	
	private Object queryScalar(){
		List<HashMap<String, Object>> list = queryList();
		if(list.isEmpty()) {
			return null;
		} else {
			/*return list.get(0).values().iterator().next();*/
			return list.get(0);
		}
	}
	
	private int executeUpdate(){
		int rows = getTemplate().update(this.query, new PreparedStatementSetter(){

			@Override
			public void setValues(PreparedStatement ps) throws SQLException {
				for(int i=0;i<params.size();i++){
					ps.setObject(i+1, params.get(i).value);
				}
			}
		});
		
		if(rows<1) {
			logger.warn("sql({}): execute '{}' rows affected",this.getId(),rows);
		} else if(logger.isDebugEnabled()){
			logger.debug("sql({}): execute '{}' rows affected",this.getId(),rows);
		}
			
		return rows;
	}
	
	/**
	 * 同一个库连接需共享连接池
	 * @return
	 */
	private JdbcTemplate getTemplate() {
		if(jdbc==null || StringUtils.isEmpty(jdbc.driver))
		{
			return new JdbcTemplate((DataSource)
					StringXmlApplicationContext.me().getBean("dataSource")
					);
		}
			
		if(CACHE_DATASOURCE==null) {
			CACHE_DATASOURCE = new ConcurrentHashMap<String,DataSource>();
		}
		
		DataSource ds = CACHE_DATASOURCE.get(jdbc.url);
		if(ds==null){
			ds = createDatasource();
			CACHE_DATASOURCE.put(jdbc.url, ds);
		}
		return new JdbcTemplate(ds);
	}
	private DataSource createDatasource(){
		ComboPooledDataSource ds = new ComboPooledDataSource();
		try {
			ds.setDriverClass(jdbc.driver);
		} catch (PropertyVetoException e) {
			logger.error("jdbc driver is not valid: "+jdbc.driver,e);
			throw new IllegalArgumentException("error jdbc driver: "+jdbc.driver);
		}
		ds.setJdbcUrl(jdbc.url);
		ds.setUser(jdbc.uid);
		ds.setPassword(jdbc.pwd);
		
		ds.setMaxPoolSize(3);
		ds.setMinPoolSize(1);
		
		if(logger.isDebugEnabled()) {
			logger.debug("sql({}): create new jdbc connection '{}'",this.getId(),jdbc.url);
		}
		return ds;
	}
	static Map<String,DataSource> CACHE_DATASOURCE;

	@Override
	protected Object doExecute(Object parent, ChunkContext cctx) throws Exception {
		Object result;
		this.evalBinder(parent,cctx);
		switch(resultTag.type){
			case "List":
				result = queryList();
				break;
			case "Int":
				result = executeUpdate();
				break;
			case "Object":
				result = queryScalar();
				break;
			case "Map":
			default:
				result = queryRow();
				break;
		}
		
		super.extractResult(result, fields, cctx);
		return result;
	}

}
