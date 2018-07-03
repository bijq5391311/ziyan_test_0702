package com.nascent.ecrpsaas.plus.ziyan.marketing.model;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nascent.ecrpsaas.organization.model.SysShop;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.Param;
import com.nascent.plugins.sqlinxml.annotation.Select;
import com.nascent.utils.query.QueryInfo;
import com.nascent.utils.query.TableRequest;
import com.nascent.utils.query.TableResponse;


/**
 * @author jingyu.gao 
 * @date 2017年12月8日
 * @功能  
 */
@Select()
public class ZySysShop extends SysShop {
	public static ZySysShop dao() {
        return SpringContext.me().getModel(ZySysShop.class);
    }
	
	@Select()
	public  List<ZySysShop> queryIsShop(@Param("is_shop") int isShop,@Param("state") int state){
		return null;
		
	}
	
	/*
	 * 通过店铺编码获取店铺信息
	 */
	@Select()
	public ZySysShop loadSysShop(@Param("name") String name, @Param("state") int state,@Param("is_shop") int isShop){
		return null;
	}
	/**
	 * 获取线下店铺
	 * @param request
	 * @param shopCodes
	 * @return
	 */
	public TableResponse<Record> loadOutShopTree4NoRight(TableRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		QueryInfo info  = new QueryInfo("marketing.sysCoupon.loadOutShopTableNoRight", request);
		if(null != request.getSearchMap().get("brand")){
			String brand =  request.getSearchMap().get("brand").toString();
			map.put("brand", brand);
			info.addParam("brand", brand);
		}
		if(null != request.getSearchMap().get("channel")){
			String channel =  request.getSearchMap().get("channel").toString();
			map.put("channel", channel);
			info.addParam("channel", channel);
		}if(null != request.getSearchMap().get("sheng")){
			String sheng =  request.getSearchMap().get("sheng").toString();
			map.put("sheng", sheng);
			info.addParam("sheng", sheng);
		}if(null != request.getSearchMap().get("shi")){
			String shi =  request.getSearchMap().get("shi").toString();
			map.put("shi", shi);
			info.addParam("shi", shi);
		}if(null != request.getSearchMap().get("qu")){
			String qu =  request.getSearchMap().get("qu").toString();
			map.put("qu", qu);
			info.addParam("qu", qu);
		}if(null != request.getSearchMap().get("shopName")){
			String shopName =  request.getSearchMap().get("shopName").toString();
			map.put("shopName", shopName);
			info.addParam("shopName", shopName);
		}if(null != request.getSearchMap().get("shopCode")){
			String shopCode =  request.getSearchMap().get("shopCode").toString();
			map.put("shopCode", shopCode);
			info.addParam("shopCode", shopCode);
		}
		return info.paginate();
	}
}