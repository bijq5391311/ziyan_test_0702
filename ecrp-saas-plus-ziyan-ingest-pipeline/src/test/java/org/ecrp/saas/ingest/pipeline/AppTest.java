package org.ecrp.saas.ingest.pipeline;

import java.nio.file.Paths;
import java.util.HashMap;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.job.builder.FlowBuilder;
import org.springframework.batch.core.job.flow.Flow;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.core.launch.support.SimpleJobLauncher;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.repository.support.MapJobRepositoryFactoryBean;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.batch.support.transaction.ResourcelessTransactionManager;
import org.springframework.core.task.SyncTaskExecutor;
import org.springframework.transaction.jta.JtaTransactionManager;
import org.springframework.util.Assert;

import com.nascent.ecrpsaas.ingest.model.TestOrder;
import com.nascent.ecrpsaas.ingest.parser.TaskletDefine;
import com.nascent.ecrpsaas.ingest.processor.MappingTasklet;
import com.nascent.plugins.sqlinxml.SqlKit;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

/**
 * Unit test for simple App.
 */
public class AppTest 
    extends TestCase
{
    /**
     * Create the test case
     *
     * @param testName name of the test case
     */
    public AppTest( String testName )
    {
        super( testName );
    }

    /**
     * @return the suite of tests being tested
     */
    public static Test suite()
    {
        return new TestSuite( AppTest.class );
    }

    public void testParser()
    {
    	String path = Paths.get(SqlKit.getConfigRoot(),"node-def.xml").toString();
    	TaskletDefine def = TaskletDefine.readXml(path);
    }
    /**
     * Rigourous Test :-)
     * @throws Exception 
     */
    public void testApp() throws Exception
    {
    	SimpleJobLauncher launcher = new SimpleJobLauncher();
    	try {
    		this.jobRepository = new MapJobRepositoryFactoryBean().getObject();
			launcher.setJobRepository(this.jobRepository);
			launcher.setTaskExecutor(new SyncTaskExecutor());
			
			this.jobBuilderFactory = new JobBuilderFactory(this.jobRepository);
			this.stepBuilderFactory = new StepBuilderFactory(this.jobRepository,
						new ResourcelessTransactionManager());
		} catch (Exception e) {
			e.printStackTrace();
		}
    	JobParameters p = new JobParameters();
    	JobExecution result = launcher.run(job(),p);
    	
        assertTrue( result.isStopping() );
    }
    
    private JobRepository jobRepository;
    private JobBuilderFactory jobBuilderFactory;
    private StepBuilderFactory stepBuilderFactory;

    public Step createStep(Tasklet task) {
        return stepBuilderFactory.get("task"+task.hashCode())
            .tasklet(task)
            .build();
      }
    
    public Job job() throws Exception {
    	FlowBuilder<Flow> flowBuilder = new FlowBuilder<>("flow1");
    	Flow flow = flowBuilder
    		.start(createStep(getSource()))
    		.next(createStep(getStep1()))
    		.next(createStep(getStep2()))
    		.end();
    	
        return jobBuilderFactory.get("job1")
            .incrementer(new RunIdIncrementer())
            .start(flow)
            .end().build();
      }
    
    public Tasklet getSource(){
    	HashMap<String,Object> obj = new HashMap<String,Object>();
    	obj.put("buyernick","boc001");
    	obj.put("EMail","b01@alipay.com");
    	
    	HashMap<String,Object> receiver = new HashMap<String,Object>();
    	receiver.put("city", "厦门市");
    	receiver.put("phone", "138599098233");
    	
    	obj.put("receiver", receiver);
    	Tasklet t = new Tasklet(){
			@Override
			public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
				chunkContext.getStepContext()
				.getStepExecution()
				.getJobExecution()
				.getExecutionContext()
					.put("order", obj);
				return RepeatStatus.FINISHED;
			}
    		
    	};
    	return t;
    }
    
    public MappingTasklet getStep1(){
    	HashMap<String,String> mappings = new HashMap<String,String>();
    	mappings.put("name", "#order['buyernick']");
    	mappings.put("address", "#order['receiver']['city']");
    	return new MappingTasklet("target_order",TestOrder.class.getName())
    			.setMappings(mappings);
    }
    public MappingTasklet getStep2(){
    	HashMap<String,String> mappings = new HashMap<String,String>();
    	mappings.put("email", "#order['EMail']");
    	mappings.put("mobile", "#order['receiver']['phone']");
    	return new MappingTasklet("target_order",TestOrder.class.getName())
    			.setMappings(mappings);
    }
}
