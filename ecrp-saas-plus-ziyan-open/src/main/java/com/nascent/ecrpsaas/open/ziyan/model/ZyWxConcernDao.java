package com.nascent.ecrpsaas.open.ziyan.model;

import java.util.List;

import com.nascent.ecrpsaas.base.constat.SystemConstat;
import com.nascent.ecrpsaas.base.vo.touch.WxTemplateVo;
import com.nascent.ecrpsaas.open.ziyan.model.vo.ZyCustomerWeCat;
import com.nascent.utils.query.QueryInfo;

/**
 * Write class comments here
 * <p>
 * User: ChenQian
 * Date: 2018/3/26 9:48
 * version $Id: ZyWxConcernDao.java, v 0.1  9:48 Exp $
 */
public class ZyWxConcernDao {
	private static final ZyWxConcernDao ZY_WX_CONCERN_DAO = new ZyWxConcernDao ();

	public static ZyWxConcernDao dao(){
		return ZY_WX_CONCERN_DAO;
	}

	public List<WxTemplateVo> queryWXTemplateInfo (String wxTemplateType, String appKey) {
		QueryInfo queryInfo = new QueryInfo ("zy.weixin.sendWxConcern.queryWxTemplateByAppKeyAndType")
				.addParam ("appKey", appKey)
				.addParam ("type", wxTemplateType)
				.addParam ("state", SystemConstat.STATE_1);
		List<WxTemplateVo> wxTemplateExtendsVos = queryInfo.findT (WxTemplateVo.class);
		if (wxTemplateExtendsVos != null && wxTemplateExtendsVos.size () > 0) {
			return wxTemplateExtendsVos;
		}
		return null;
	}
	public List<ZyCustomerWeCat> queryWXCustomer(String mobile){
		QueryInfo queryInfo = new QueryInfo("zy.weixin.sendWxConcern.queryWXCustomerByMobile")
		.addParam("mobile", mobile)
		.addParam("state", 1);
		List<ZyCustomerWeCat> zyCustomerWeCatVo = queryInfo.findT(ZyCustomerWeCat.class);
		if (zyCustomerWeCatVo != null && zyCustomerWeCatVo.size() > 0) {
			return zyCustomerWeCatVo;
		}
		return null;
		
	}


}
