package com.nascent.ecrpsaas.plus.ziyan.util;

import java.util.ArrayList;
import java.util.List;

/**
 * @Describe: TODO List工具类
 * @Author:   huangyuye
 * @Date:     2017-10-26
 */
public class UtilList {

    /**
     * @Describe: TODO list判空
     * @Date:     2017-10-26
     * @param     list
     */
    public static boolean isEmpty (List<?> list) {
        if (null != list && list.size() > 0) {
            return false ;
        }
        return true ;
    }

    /**
     * 分割集合
     * @param list
     * @param size
     * @return
     */
    public static List<List<?>> getSplitList(List<?> list , int size) {
        List<List<?>> returnList = new ArrayList<>();
        if (isEmpty(list)) {
            return returnList;
        }
        /* 集合大小 */
        int listSize = list.size();
        /* 取余获得分割数量 */
        int num = listSize % size == 0 ? listSize / size : (listSize / size + 1);
        /* 集合元素集合开始位置 */
        int start;
        /* 集合元素结束为止 */
        int end;
        for (int i = 1;i <= num;i++) {
            start = (i-1) * size;
            end = i * size > listSize ? listSize : i * size;
            System.out.println(start + ":" + end);
            returnList.add(list.subList(start, end));
        }

        return returnList;
    }


}
