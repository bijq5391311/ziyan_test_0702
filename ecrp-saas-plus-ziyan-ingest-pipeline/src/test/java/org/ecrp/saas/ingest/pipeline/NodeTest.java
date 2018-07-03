package org.ecrp.saas.ingest.pipeline;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobInstance;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.scope.context.StepContext;

import com.nascent.ecrpsaas.ingest.parser.TaskletDefine;
import com.nascent.ecrpsaas.ingest.processor.BaseTasklet;
import com.nascent.plugins.sqlinxml.SqlKit;

import junit.framework.TestCase;

public class NodeTest extends TestCase{
	public void testApp() throws Exception
    {
		ChunkContext cctx = new ChunkContext(new StepContext(
				new StepExecution("step1",new JobExecution(
						new JobInstance(1L,"job1"),null))));
		
		Path root = Paths.get(SqlKit.getConfigRoot(),"node-def.xml");
		List<BaseTasklet> tasks = TaskletDefine.parseTasklets("job1:",root.toString());
		for(BaseTasklet task : tasks){
			task.execute(null, cctx);
		}
    }
}
