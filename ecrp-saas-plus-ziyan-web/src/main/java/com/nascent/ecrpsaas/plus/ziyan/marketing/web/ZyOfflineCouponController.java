package com.nascent.ecrpsaas.plus.ziyan.marketing.web;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nascent.ecrpsaas.base.constat.ExportLogConstant.ResultState;
import com.nascent.ecrpsaas.base.constat.SystemConstat;
import com.nascent.ecrpsaas.base.util.TreeNode;
import com.nascent.ecrpsaas.base.util.UtilDate;
import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.base.web.BaseController;
import com.nascent.ecrpsaas.database.model.KdExportLog;
import com.nascent.ecrpsaas.plus.ziyan.marketing.model.SysCoupon;
import com.nascent.ecrpsaas.plus.ziyan.marketing.model.ZyOutShop;
import com.nascent.ecrpsaas.plus.ziyan.marketing.model.ZySysShop;
import com.nascent.ecrpsaas.plus.ziyan.marketing.service.LineCouponService;
import com.nascent.ecrpsaas.plus.ziyan.marketing.vo.CouponAnalyzeVo;
import com.nascent.ecrpsaas.plus.ziyan.marketing.vo.CouponVo;
import com.nascent.ecrpsaas.plus.ziyan.marketing.vo.KdGoodsVo;
import com.nascent.ecrpsaas.plus.ziyan.marketing.vo.ZyShopVo;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.utils.model.Authorize;
import com.nascent.utils.query.CommonResult;
import com.nascent.utils.query.TableRequest;
import com.nascent.utils.query.TableResponse;


/**
 * @author mozhimin
 * @date 2017年12月8日
 * @功能  线下优惠券的新增与列表等功能
 */
@Authorize
@Controller
public class ZyOfflineCouponController extends BaseController {

	private LineCouponService lineCouponService = SpringContext.me().getBean(LineCouponService.class);
	/**
	 * Title:跳转到下线优惠券功能页面
	 * name:zhimin.mo
	 * return:void
	 * describe:
	 * time:2017年12月8日
	 */
	public void offlineCouponList() {
    }
	/**
	 * Title:跳转到线下优惠券发放详情日志页面
	 * name:zhimin.mo
	 * return:void
	 * describe:
	 * time:2017年12月26日
	 */
	public void offlineCouponExtLogList() {
    }
    /**
     * Title:获取线下优惠券列表
     * name:zhimin.mo
     * return:TableResponse<Record>
     * describe:
     * time:2017年12月8日
     */
    @Authorize(order=1)
    @ResponseBody
	public TableResponse<Record> queryOfflineCoupon(TableRequest request){
		return SysCoupon.dao().findList(request);
	}
    /**
     * Title:获取线下优惠券发放详情列表
     * name:zhimin.mo
     * return:TableResponse<Record>
     * describe:
     * time:2017年12月8日
     */
    @Authorize(order=1)
    @ResponseBody
	public TableResponse<Record> queryOfflineCouponExt(TableRequest request){
    	return  SysCoupon.dao().findCouponExtList(request);
	}
    /**
     * Title:获取优惠券发放统计详情
     * name:zhimin.mo
     * return:TableResponse<Record>
     * describe:
     * time:2017年12月8日
     */
    @Authorize(order=1)
    @ResponseBody
	public List<CouponAnalyzeVo> couponAnalyze(TableRequest request){
    	return  SysCoupon.dao().couponAnalyze(request);
	}
    /**
     * Title:导出优惠券发放日志
     * name:zhimin.mo
     * return:TableResponse<Record>
     * describe:
     * time:2017年12月8日
     */
    @Authorize(order=1)
    @ResponseBody
	public void exportCouponAnalyzeLog(TableRequest request){
    	lineCouponService.exportCouponAnalyzeLog(request,getCurrentUser());
	}
    /**
	 * 新增优惠活动
	 * 
	 * @param umpActivitiesVo
	 * @return
	 */
	@Authorize(order = 3)
	@ResponseBody
	public CommonResult saveCoupon(CouponVo couponVo) {
		//返回值的状态
    	String isOk = "isOk";
		CommonResult cResult = new CommonResult();
		Map<String, Object> result = lineCouponService.saveLineCoupon(couponVo, getCurrentUser());
		if ((boolean) result.get(isOk) == false) {
			cResult.setFailed();
		}
		cResult.setMsg((String) result.get("description")); 
		return cResult;
	}
    /**
	 * 获取线下店铺树.
	 * @return
	 */
	@Authorize(order=1)
	@ResponseBody
	public CommonResult queryOutShopTree(){
		TreeNode treeNode = ZyOutShop.dao().queryLineShopTree();
		List<TreeNode> olist = new ArrayList<>();
		olist.add(treeNode);
		return new CommonResult().setResult(olist);
	}
	@ResponseBody
    public CommonResult queryShopTree4New(TableRequest request) {
        String shopCodes = getCurrentUser().getOwnShopCodes();
        return new CommonResult().setResult(ZyShopVo.dao().loadShopTree4New(request, shopCodes));
    }
	/**
	 * 获取线下店铺new
	 * @return
	 */
	@ResponseBody
	public  CommonResult queryOutShopTreeNew(TableRequest request){
		return new CommonResult().setResult(ZySysShop.dao().loadOutShopTree4NoRight(request));
	}
    /**
     * Title:设置优惠券是否生效
     * name:zhimin.mo
     * return:CommonResult
     * describe:
     * time:2017年12月18日
     */
    @Authorize(order = 3)
    @ResponseBody
    public CommonResult updateCouponStatus(Long couponId, int state) {
        SysCoupon coupon = SysCoupon.dao().queryCouponByCouponId(couponId);
        coupon.setUpdateTime(new Date());
        coupon.setState(state);
        coupon.update();
        return new CommonResult().setMsg(SystemConstat.OperationMsg.UPDATE.getName());
    }
	/**
	 * Title:获取优惠券详情
	 * name:zhimin.mo
	 * return:CommonResult
	 * describe:
	 * time:2017年12月18日
	 */
	@Authorize(order =1)
	@ResponseBody
	public CommonResult getCouponDetail(Long couponId){
		Record coupon = SysCoupon.dao().queryCouponByCouponIdRecord(couponId);
		String goodsIdStr = coupon.getStr("appoint_goods_ids").trim();
		List<KdGoodsVo> goodsList = new ArrayList<KdGoodsVo>();
		if(!UtilString.isEmpty(goodsIdStr)){
			goodsList = KdGoodsVo.dao().queryGoodsByIds(goodsIdStr);
		}
		String shopNames = "";
		if(!UtilString.isEmpty(coupon.getStr("shop_ids"))){
			shopNames = ZyOutShop.dao().queryGoodsNameStr(coupon.getStr("shop_ids"));
		}
		
		coupon.set("itemList", goodsList);
		coupon.set("shopNames", shopNames);
		return new CommonResult().setResult(coupon);
	}
    /**
     * Title:导出优惠券编码
     * name:zhimin.mo
     * return:void
     * describe:
     * time:2017年12月21日
     */
    @ResponseBody
    public void exportCoupon(String couponName, Long couponId, Integer couponAmouet) throws Exception {
    	//返回值的状态
    	String isOk = "isOk";
    	//生成导出任务
		KdExportLog exportLog = lineCouponService.initExportLog(getCurrentUser());
		//优惠券验证
		if(null == couponAmouet){
    		exportLog.setResultState(UtilString.toInt(ResultState.FAILED.getValue()));
    		exportLog.setDownloadAddr("保存失败，优惠券数量不能为空");
    		exportLog.save();
    		return;
        }
		if(null == couponId){
			exportLog.setResultState(UtilString.toInt(ResultState.FAILED.getValue()));
    		exportLog.setDownloadAddr("保存失败，优惠券ID不存在");
    		exportLog.save();
    		return;
        }
		//通过优惠券ID获得优惠券对象
        SysCoupon coupon = SysCoupon.dao().queryCouponByCouponId(couponId);
        if(null == coupon){
        	exportLog.setResultState(UtilString.toInt(ResultState.FAILED.getValue()));
    		exportLog.setDownloadAddr("保存失败，优惠券不存在");
    		exportLog.save();
    		return;
        }
        coupon.setType(1);
        coupon.update();
		exportLog.save();
		
    	//生成会员编码且导出
		Map<String, Object> result = lineCouponService.exportCoupon(coupon, couponId, couponAmouet, getCurrentUser(), exportLog);
		
		//返回值状态
		int resultStatus = UtilString.toInt(ResultState.IN_PRODUCTION.getValue());
		if ((boolean) result.get(isOk) == false) {
			resultStatus = UtilString.toInt(ResultState.FAILED.getValue());
			exportLog.setDownloadAddr("优惠券编码导出错误："+(String)result.get("description") + "-" + couponName + UtilDate.getMilliseconds());
		}else{
			resultStatus = UtilString.toInt(ResultState.FINISHED.getValue());
		}
		exportLog.setResultState(resultStatus);
		exportLog.update();
    }
}
