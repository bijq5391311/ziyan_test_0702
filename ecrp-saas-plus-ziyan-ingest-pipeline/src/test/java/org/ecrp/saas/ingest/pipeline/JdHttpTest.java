package org.ecrp.saas.ingest.pipeline;

import java.util.ArrayList;

import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.scope.context.StepContext;

import com.nascent.ecrpsaas.ingest.parser.xml.FieldTag;
import com.nascent.ecrpsaas.ingest.parser.xml.HttpPaginateTag;
import com.nascent.ecrpsaas.ingest.parser.xml.HttpSignTag;
import com.nascent.ecrpsaas.ingest.processor.HttpTasklet;
import com.nascent.ecrpsaas.ingest.processor.JdHttpTasklet;

import junit.framework.TestCase;

public class JdHttpTest extends TestCase {

	public HttpTasklet createTasklet(){
		HttpTasklet task = new JdHttpTasklet("https://api.jd.com/routerjson","","post");
		ArrayList<FieldTag> session = new ArrayList<FieldTag>();
		session.add(new FieldTag("access_token","'43906fb8-2782-4686-b030-f53d97d5b4ed'"));
		session.add(new FieldTag("app_key","'732DF245BD53F7193E9313769F1DBB73'"));
		session.add(new FieldTag("method","'360buy.order.search'"));
		session.add(new FieldTag("v","'2.0'"));
		session.add(new FieldTag("timestamp","TIMESTAMP"));
		session.add(new FieldTag("SHOPNAME","'青蛙王子'"));
		task.setSessionParam(session);
		
		ArrayList<FieldTag> params = new ArrayList<FieldTag>();
		params.add(new FieldTag("start_date","'2017-09-20 00:00:00'"));
		params.add(new FieldTag("end_date","'2017-09-21 00:00:00'"));
		params.add(new FieldTag("page","'1'"));
		params.add(new FieldTag("page_size","'10'")) ;
		params.add(new FieldTag("order_state","'FINISHED_L,WAIT_SELLER_STOCK_OUT,TRADE_CANCELED,LOCKED,WAIT_GOODS_RECEIVE_CONFIRM'"));
		
		HttpPaginateTag paging = new HttpPaginateTag();
		paging.params = params;
		task.setPaginParam(paging);
		
		HttpSignTag sign = new HttpSignTag();
		sign.name="sign";
		ArrayList<FieldTag> signs = new ArrayList<FieldTag>();
		signs.add(new FieldTag("method","METHOD"));
		signs.add(new FieldTag("access_token","ACCESS_TOKEN"));
		signs.add(new FieldTag("app_key","APP_KEY"));
		signs.add(new FieldTag("360buy_param_json","PARAMS")) ;
		signs.add(new FieldTag("appsecret","'40A712E6-7115-4CF8-8169-8BBE36CF68AC'")) ;
		sign.params = signs;
		task.setSignMethod(sign);
		
		return task;
	}
	
	public void testPost() throws Exception{
		StepContext stx = new StepContext(new StepExecution("step1",new JobExecution(1L)));
		ChunkContext cctx = new ChunkContext(stx);
		HttpTasklet task = createTasklet();
		task.execute(null,cctx);
	}
}
