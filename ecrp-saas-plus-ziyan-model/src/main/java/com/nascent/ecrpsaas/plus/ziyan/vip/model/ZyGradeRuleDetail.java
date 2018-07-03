package com.nascent.ecrpsaas.plus.ziyan.vip.model;

import java.io.Serializable;
import java.util.List;

import com.nascent.ecrpsaas.vip.model.GradeRuleDetail;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.Param;
import com.nascent.plugins.sqlinxml.annotation.Select;
import com.nascent.utils.query.QueryInfo;


/**
 * 
 * @ClassName: ZyGradeRuleDetail 
 * @Description: TODO(等级明细表) 
 * @author jingyu.gao
 * @date 2017年10月17日 下午2:54:49 
 *
 */
@SuppressWarnings("serial")
@Select()
public class ZyGradeRuleDetail extends GradeRuleDetail implements Serializable{
	public static ZyGradeRuleDetail dao() {
        return SpringContext.me().getModel(ZyGradeRuleDetail.class);
    }
	
	@Select()
	public List<GradeRuleDetail> queryGradeRuleDetail(@Param("grade_rule_id$EQ")int grade_rule_id){
		return null;
	}
	
	@Select()
	public List<ZyGradeRuleDetail> loadGradeRuleDetail(@Param("grade_rule_id") int grade_rule_id){
		return null;
	}
	@Select()
	public ZyGradeRuleDetail getGradeRuleDetail(@Param("grade_rule_id") int grade_rule_id,@Param("grade") int grade){
		return null;
	}
	/**
	 *
	 * column zy_consume 消费值
	 */
	public void setZyConsume(Integer zyConsume){
		set("zy_consume", zyConsume);
	}
	public Integer getZyConsume() {
		return get("zy_consume");
	}

	
	public List<ZyGradeRuleDetail> loadGradeRuleDetailByGroupId(String group_id){
		return new QueryInfo("vip.GradeRuleDetail.getGraderuledetailByGroupid").addParam("group_id", group_id).find(ZyGradeRuleDetail.class);
	}
	
	@Select()
	public ZyGradeRuleDetail getGradeRuleDetailById(@Param("id") String id){
	    return null;
	}

	@Select()
	public ZyGradeRuleDetail loadRuleDetailByGrade (@Param("grade") Integer grade) {
		return null ;
	}
	
	public List<ZyGradeRuleDetail> queryGradeRuleDetailByRuleIds(String ids){
		QueryInfo info = new QueryInfo("vip.GradeRuleDetail.selectdetailByIds");
		return info.addParam("ids", ids).find(ZyGradeRuleDetail.class);
	}

	/**
	 * 
	 * @Description: TODO(查询等级明细列表) 
	 */
	@Select(limit="order by grade desc")
	public List<ZyGradeRuleDetail> queryGradeRuleDetailList(){
		return null ;
	}


}
