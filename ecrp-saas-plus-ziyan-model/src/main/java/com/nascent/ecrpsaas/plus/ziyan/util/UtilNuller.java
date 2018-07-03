package com.nascent.ecrpsaas.plus.ziyan.util;

import java.math.BigDecimal;

public class UtilNuller {

    /**
     * 把object转成Double
     * @param name
     * @return
     */
    public static Double getDouble(Object name) {
        if (null == name || "".equals(name)) {
            return 0.0;
        } else {
            return Double.parseDouble(name.toString().trim());
        }
    }
    /**
     * 把object转成BigDecimal
     * @param name
     * @return
     */
    public static BigDecimal getBigDecimal(Object name) {
        if (null == name || "".equals(name)) {
            return new BigDecimal("0");
        } else {
            return BigDecimal.valueOf(getDouble(name));
        }
    }

}
