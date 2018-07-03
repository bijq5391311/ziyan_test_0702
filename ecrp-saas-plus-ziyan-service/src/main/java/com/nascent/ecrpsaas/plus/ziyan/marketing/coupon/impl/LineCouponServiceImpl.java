package com.nascent.ecrpsaas.plus.ziyan.marketing.coupon.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.nascent.ecrpsaas.base.constat.ExportLogConstant.ExportType;
import com.nascent.ecrpsaas.base.constat.ExportLogConstant.ResultState;
import com.nascent.ecrpsaas.base.constat.SystemConstat;
import com.nascent.ecrpsaas.base.util.UtilCollection;
import com.nascent.ecrpsaas.base.util.UtilDate;
import com.nascent.ecrpsaas.base.util.UtilProperties;
import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.database.model.KdExportLog;
import com.nascent.ecrpsaas.plus.ziyan.marketing.constant.CouponTypeEnum;
import com.nascent.ecrpsaas.plus.ziyan.marketing.model.SysCoupon;
import com.nascent.ecrpsaas.plus.ziyan.marketing.model.ZyCouponCustomerExt;
import com.nascent.ecrpsaas.plus.ziyan.marketing.service.LineCouponService;
import com.nascent.ecrpsaas.plus.ziyan.marketing.vo.CouponVo;
import com.nascent.ecrpsaas.plus.ziyan.util.UtilExportCSV;
import com.nascent.ecrpsaas.plus.ziyan.util.UtilGetMath;
import com.nascent.ecrpsaas.plus.ziyan.util.ZyUtilExportCSV;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.utils.model.UserSession;
import com.nascent.utils.query.QueryInfo;
import com.nascent.utils.query.TableRequest;

/**
 * @Describe: 活动审核状态同步实现类
 * @author:   huangyuye
 * @Date:     2017-11-17
 */
@Service("lineCouponService")
public class LineCouponServiceImpl implements LineCouponService {

    Logger logger = LoggerFactory.getLogger(LineCouponServiceImpl.class);
    
    private static final String IS_OK = "isOk";
	private static final String DESCRIPTION = "description";
	/**
	 * Title:导出优惠券发放日志
	 * name:zhimin.mo
	 * return:void
	 * describe:
	 * time:2017年12月16日
	 */
	public void exportCouponAnalyzeLog(TableRequest request, UserSession session){
    	//生成导出任务
		KdExportLog exportLog = initExportLog(session);
		exportLog.save();
		QueryInfo queryInfo = new QueryInfo("marketing.sysCoupon.exportCouponExtList");
		queryInfo.addParams(request.getSearchMap());
		List<Record> couponAnalyzeList = queryInfo.find();
		// 表头名称map
		LinkedHashMap<String, String> headMap = new LinkedHashMap<String, String>();
		headMap.put("1", "优惠券名称");
		headMap.put("2", "优惠券编码");
		headMap.put("3", "券码");
		headMap.put("4", "创建时间");
		headMap.put("5", "券类型");
		headMap.put("6", "发放用户");
		headMap.put("7", "H5活动名称");
		headMap.put("8", "H5活动编码");
		headMap.put("9", "核销门店");
		headMap.put("10", "核销时间");
		headMap.put("11", "使用状态");
		headMap.put("12", "有效日期开始");
		headMap.put("13", "有效日期结束");
		String path = UtilProperties.getProperty("exportPath");///"j:\\export\\";
		String url = "excel/exportCouponLog";
		// 设置文件名称
		String fileName = "优惠券核销日志数据导出" + "-" + UtilDate.getMilliseconds();
		int resultStatus = UtilString.toInt(ResultState.IN_PRODUCTION.getValue());
		try {
			// 生成导出数据csv文件
			ZyUtilExportCSV.createCSVFile(couponAnalyzeList, headMap, path + url, fileName);
			// 文件地址
			exportLog.setDownloadAddr(url + "/" + fileName + ".csv");
			resultStatus = UtilString.toInt(ResultState.FINISHED.getValue());
		} catch (Exception e) {
			exportLog.setDownloadAddr("优惠券核销日志导出错误"+e.getMessage());
			resultStatus = UtilString.toInt(ResultState.FAILED.getValue());
		}
		exportLog.setResultState(resultStatus);
		exportLog.update();
	}
    /**
	 * Title:保存优惠券
	 * name:zhimin.mo
	 * return:Map<String,Object>
	 * describe:
	 * time:2017年12月16日
	 */
	@Override
	public Map<String, Object> saveLineCoupon(CouponVo couponVo, UserSession userSession){
		
		//优惠券
		SysCoupon sysCoupon = new SysCoupon();
		//错误信息
		Map<String, Object> result = new HashMap<String, Object>();
		result.put(IS_OK, false);
		
		if (null == couponVo) {
			result.put(DESCRIPTION, "保存失败，没有数据");
			return result;
		}
		if(UtilString.isEmpty(couponVo.getActivityName())){
			result.put(DESCRIPTION, "保存失败，请输入优惠券名称");
			return result;
		}
		//优惠券名称
		sysCoupon.setCouponName(couponVo.getActivityName());
		//优惠券类型  1：现金  2：折扣  
		sysCoupon.setCouponType(couponVo.getCondition());
		//判断优惠券的类型 1：现金券  2：折扣券
		if(CouponTypeEnum.cash == couponVo.getCondition()){
			String denomination = couponVo.getDenomination();
			if(UtilString.isEmpty(denomination)){
				result.put(DESCRIPTION, "保存失败，请输入面额");
				return result;
			}
			sysCoupon.setRightsAndInterests(denomination);
		}else if(CouponTypeEnum.discount == couponVo.getCondition()){
			String discount = couponVo.getDiscount();
			if(UtilString.isEmpty(discount)){
				result.put(DESCRIPTION, "保存失败，请输入折扣");
				return result;
			}
			sysCoupon.setRightsAndInterests(discount);
		}else{
			result.put(DESCRIPTION, "保存失败，操作错误！");
			return result;
		}
		//给sysCoupon赋值使用条件
		if(!initCashOrDiscountCoupon(couponVo, sysCoupon)){
			result.put(DESCRIPTION, "保存失败，使用条件有误！");
			return result;
		}
		if(!UtilString.isEmpty(couponVo.getShopIdStr())){
			sysCoupon.setShopIds(couponVo.getShopIdStr());
		}
		//有效时间类型  0：绝对时间  1： 固定时间
		if(0 == couponVo.getTime()){
			if(UtilString.isEmpty(couponVo.getBeginTime()) || UtilString.isEmpty(couponVo.getEndTime())){
				result.put(DESCRIPTION, "保存失败，有效时间有误！");
				return result;
			}
			/*String a = UtilDate.format(couponVo.getBeginTime(), UtilDate.DATE_PATTERN.YYYY_MM_DD_HH_MM_SS)*/
			sysCoupon.setValidTimeType(0);
			sysCoupon.setValidTimeBegin(UtilDate.getDateTime(couponVo.getBeginTime()));
			sysCoupon.setValidTimeEnd(UtilDate.getDateTime(couponVo.getEndTime()));
		}else{
			if(UtilString.isEmpty(couponVo.getRelativeTime())){
				result.put(DESCRIPTION, "保存失败，有效天数有误！");
				return result;
			}
			sysCoupon.setValidTimeType(1);
			sysCoupon.setNumberDays(Integer.parseInt(couponVo.getRelativeTime()));
		}
		if(UtilString.isEmpty(couponVo.getProductionQuantity())){
			result.put(DESCRIPTION, "保存失败，请输入正确的有效张数！");
			return result;
		}
		//张数
		sysCoupon.setCouponAmouet(Integer.parseInt(couponVo.getProductionQuantity()));
		//经销商承担系数
		if(UtilString.isEmpty(couponVo.getCoefficient())){
			result.put(DESCRIPTION, "保存失败，请输入正确的经销商承担系数！");
			return result;
		}
		sysCoupon.setCoefficient(couponVo.getCoefficient());
		//用户使用说明
		if(!UtilString.isEmpty(couponVo.getDescription())){
			sysCoupon.setDescription(couponVo.getDescription());
		}
		if(!UtilString.isEmpty(couponVo.getTitle())){
			sysCoupon.setTitle(couponVo.getTitle());
		}
		sysCoupon.setUser(userSession.getUserName());
		initCoupon(sysCoupon);
		try {
			sysCoupon.save();
			result.put(IS_OK, true);
			result.put(DESCRIPTION, SystemConstat.OperationMsg.SAVE.getName());
		} catch (Exception e) {
			result.put(DESCRIPTION, "系统错误，请重新保存");
		}
		return result;
	}
	
	/**
	 * Title:封装现金券或者折扣券的满足条件数据
	 * name:zhimin.mo
	 * return:Map<String,Object>
	 * describe:
	 * time:2017年12月16日
	 */
	public Boolean initCashOrDiscountCoupon(CouponVo couponVo, SysCoupon sysCoupon){
		//使用条件类型 0：不限  1 订单满足
		if(1 == couponVo.getCondi()){
			sysCoupon.setConditionsOfUse(1);
			if(UtilString.isEmpty(couponVo.getGiveCondition()) && UtilString.isEmpty(couponVo.getItemIdStr())){
				return false;
			}
			if(!UtilString.isEmpty(couponVo.getGiveCondition())){
				sysCoupon.setFullOrPlusMoney(Integer.parseInt(couponVo.getGiveCondition()));
			}
			if(!UtilString.isEmpty(couponVo.getItemIdStr())){
				sysCoupon.setAppointGoodsIds(couponVo.getItemIdStr());
			}
		}else{
			sysCoupon.setConditionsOfUse(0);
		}
		return true;
	}
	/**
	 * Title:封装优惠券的基础数据
	 * name:zhimin.mo
	 * return:Map<String,Object>
	 * describe:
	 * time:2017年12月16日
	 */
	public void initCoupon(SysCoupon sysCoupon){
		sysCoupon.setState(0);
		sysCoupon.setUpdateTime(new Date());
		sysCoupon.setCreateTime(new Date());
		sysCoupon.setCouponId(System.currentTimeMillis());
	}
	/**
	 * Title:导出优惠券，且生产优惠券编码
	 * name:zhimin.mo
	 * return:Map<String,Object>
	 * describe:
	 * time:2017年12月20日
	 */
	@Override
	public Map<String, Object> exportCoupon(SysCoupon coupon,Long couponId, Integer couponCount, UserSession userSession, KdExportLog exportLog){
		//返回信息的封装
		Map<String, Object> result = new HashMap<String, Object>();
		result.put(IS_OK, false);
		//时间点
		Date date = new Date();
		//时间戳
		Long key = System.currentTimeMillis();
		
		//基础验证
		if(1 == coupon.getState()){
			result.put(DESCRIPTION, "导出失败，优惠券已被停用");
			return result;
		}
		if(0 == coupon.getValidTimeType()){
			if(date.getTime() > coupon.getValidTimeEnd().getTime()){
				result.put(DESCRIPTION, "导出失败，优惠券信息已过期");
				return result;
			}
		}
		//总张数
		int couponAmouet = coupon.getCouponAmouet();
		//已发放张数
		int sentAmount = coupon.getSentAmount();
		if(couponAmouet >= 0){
			if((couponAmouet-sentAmount-couponCount) < 0){
				result.put(DESCRIPTION, "导出失败，优惠券可导出数量不足");
				return result;
			}
		}
		//基础验证通过，更改优惠券的已生成数量
		coupon.setSentAmount(sentAmount + couponCount);
		coupon.setType(0);
		coupon.update();
		
		//封装有效时间
		Date validTimeBegin;
		Date validTimeEnd;
		//当为有效天数时 ，开始时间为现在时间，结束时间为选择时间加上有效天数
		if(1 == coupon.getValidTimeType()){
			int numberDays = coupon.getNumberDays();
			long time = date.getTime(); 
			Long day =  24L * 60 * 60 * 1000 * numberDays; 
			time += day; 
			validTimeBegin = date;
			validTimeEnd =  new Date(time);
		}else{
			validTimeBegin = coupon.getValidTimeBegin();
			validTimeEnd =  coupon.getValidTimeEnd();
		}
		
		//将couponId转换为时间,得到年份月份，如：201708
		String yearMonth = UtilGetMath.getYearMonth(couponId);
		
		//优惠券编码详情
		List<ZyCouponCustomerExt> list = new ArrayList<ZyCouponCustomerExt>();
		
		//导出详情
		/*List<ExportCouponVo> exportList = new ArrayList<ExportCouponVo>();*/
		List<Map<String, String>> exportData = UtilCollection.createArrayList();
		Random ran=new Random();
		for(int i = 0; i < couponCount; i++){
			//导出对象
			/*ExportCouponVo export = new ExportCouponVo();*/
			Map<String, String> map = new LinkedHashMap<String, String>();
			//编码详情对象
			ZyCouponCustomerExt couponCustomerExt = initZyCouponCustomerExt(couponId, yearMonth, validTimeBegin, validTimeEnd, key, map);
			exportData.add(map);
			list.add(couponCustomerExt);
			try {
				Thread.sleep(ran.nextInt(5));
			} catch (InterruptedException e) {
			}
		}
		boolean ok = false;
		try {
			ok = ZyCouponCustomerExt.dao().insert(list);
		} catch (Exception e) {
			ok = false;
		}
		//批量保存优惠券编码对象，当保存失败时，提示导出失败，服务器错误
		if(!ok){
			//得到优惠券信息，将已发放数量减去这次导出的数量
			SysCoupon sysCoupon = SysCoupon.dao().queryCouponByCouponId(couponId);
			sysCoupon.setSentAmount(sysCoupon.getSentAmount() - couponCount);
			sysCoupon.update();
			result.put(DESCRIPTION, "导出失败，服务器错误");
			return result;
		}
		//开始导出模板
		// 表头名称map
		LinkedHashMap<String, String> headMap = new LinkedHashMap<String, String>();
		headMap.put("1", "优惠券ID");
		headMap.put("2", "优惠券编码");
		headMap.put("3", "有效开始时间");
		headMap.put("4", "有效结束时间");
		//得到导出的绝对地址
		/*String path = this.getClass().getClassLoader().getResource("").getPath()+"export"+"/";
		path = path.substring(1);*/
		//String path = "src/main/resources/public/templates/";
		String path = UtilProperties.getProperty("exportPath");///"j:\\export\\";
		String url = "excel/coupon";
		// 设置文件名称
		String fileName = "优惠券编码导出" + "-" + coupon.getCouponName()
				+ UtilDate.getMilliseconds();
		try {
			// 生成导出数据csv文件
			UtilExportCSV.createCSVFile(exportData, headMap, path + url, fileName);
			// 文件地址
			exportLog.setDownloadAddr(url + "/" + fileName + ".csv");
			result.put(IS_OK, true);
			return result;
			
		} catch (Exception e) {
			result.put(DESCRIPTION, "导出失败，生成文件错误");
			return result;
		}
	}
	/**
	 * Title:初始化优惠券详情和给导出信息集合赋值
	 * name:zhimin.mo
	 * return:ZyCouponCustomerExt
	 * describe:
	 * time:2017年12月21日
	 */
	private ZyCouponCustomerExt initZyCouponCustomerExt(Long couponId, String yearMonth, Date validTimeBegin, Date validTimeEnd, Long key, Map<String, String> map){
		ZyCouponCustomerExt coupon = new ZyCouponCustomerExt();
		
		//24位随机数
		String couponCode = UtilGetMath.getCouponCodeMath(yearMonth);
		
		//封装优惠券详情信息
		coupon.setUpdateTime(new Date());
		coupon.setCreateTime(new Date());
		coupon.setCouponId(couponId);
		coupon.setCouponCode(couponCode);
		coupon.setValidTimeBegin(validTimeBegin);
		coupon.setValidTimeEnd(validTimeEnd);
		coupon.setPurposeType(2);
		coupon.setExportIdentification(key);
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		//封装优惠券导出信息
		map.put("1", couponId+"\t");
		map.put("2", couponCode+"\t");
		map.put("3", sdf.format(validTimeBegin)+"\t");
		map.put("4", sdf.format(validTimeEnd)+"\t");
		
		return coupon;
	}
	
	/**
	 * Title:生成导出日志
	 * name:zhimin.mo
	 * return:KdExportLog
	 * describe:
	 * time:2017年12月21日
	 */
	@Override
	public KdExportLog initExportLog(UserSession userSession) {
		KdExportLog kdExportLog = new KdExportLog();
		kdExportLog.setResultState(UtilString.toInt(ResultState.IN_PRODUCTION.getValue()));
		kdExportLog.setsource(99);
		kdExportLog.setExportType(ExportType.CSV.getValue().intValue());
		kdExportLog.setCarameJson("");
		kdExportLog.setCreateAccout(userSession.getUserCode());
		kdExportLog.setUserId(UtilString.toInt(userSession.getUserId()));
		return kdExportLog;
	}
}
