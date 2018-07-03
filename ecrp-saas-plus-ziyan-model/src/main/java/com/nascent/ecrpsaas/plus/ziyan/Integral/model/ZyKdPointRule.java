package com.nascent.ecrpsaas.plus.ziyan.Integral.model;

import com.nascent.ecrpsaas.model.KdPointRule;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.Param;
import com.nascent.plugins.sqlinxml.annotation.Select;

/**
 * @author jingyu.gao
 */
@Select()
public class ZyKdPointRule extends KdPointRule {

  /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
public static ZyKdPointRule dao() {
      return SpringContext.me()
        .getModel(ZyKdPointRule.class);
  }

  /**
   * 根据渠道获取规则信息
   */
@Select()
public  ZyKdPointRule loadZyKdPointRuleByChannel(@Param("zy_channel")String channel){
	return null;
}
    /**
     * 排除聚划算
     * @return
     */
    public Integer getIsJhs() {
        return this.get("is_jhs");
    }
    public void setIsJhs(Integer isJhs) {
        this.set("is_jhs", isJhs);
    }
    
    /**
     * 渠道 zy_channel
     */
    public String getZyChannel(){
    	 return this.get("zy_channel");
    }
    public void setZyChannel(String zyChannel) {
        this.set("zy_channel", zyChannel);
    }
    
/**
 * 渠道名称 channel_name
 */
    public String getChannelName(){
   	 return this.get("channel_name");
   }
   public void setChannelName(String channelName) {
       this.set("channel_name", channelName);
   }    
}