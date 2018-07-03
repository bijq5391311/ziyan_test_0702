package com.nascent.ecrpsaas.plus.ziyan.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;


/**
 * @author 生成随机数
 * @date 2017年12月20日
 * @功能  
 */
public class UtilGetMath {

    private UtilGetMath() {
        // 防止外部创建实例
    }

    /**
     * Title:获取优惠券编码，20位
     * name:zhimin.mo
     * return:String  年月日
     * describe:
     * time:2017年12月21日
     */
    public static String getCouponCodeMath(String yearMonth) {
    	//13位
		Long millis = System.currentTimeMillis();
		
		//生成5位随机数
		Random ran=new Random();
		int index = ran.nextInt(10);
		if(0 == index){
			index = 9;
		}
		int math = index * 10000 + ran.nextInt(9999);
		return yearMonth+ millis + math;
    }
    
    /**
     * Title:通过时间戳获取年份月份
     * name:zhimin.mo
     * return:Date
     * describe:
     * time:2017年12月20日
     */
    public static String getYearMonth(Long time) {
    	//将couponId转换为时间
		Date couponDate = new Date(time);
        Calendar c = Calendar.getInstance();
        c.setTime(couponDate);
        int year = c.get(Calendar.YEAR);
        int month = c.get(Calendar.MONTH) + 1;
        String yearMonth = "" + year + month;
        if(month < 10){
        	yearMonth = year + "0" + month;
        }
		return yearMonth;
    }
}
