//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.nascent.ecrpsaas.open.core.security;

import com.nascent.ecrpsaas.open.core.API;
import com.nascent.ecrpsaas.open.ziyan.exception.CustomizeException;
import com.nascent.ecrpsaas.open.utils.ZySignUtils;
import com.nascent.utils.query.CommonResult;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

public class MD5Validator implements Validator {
    private Secret secretProxy;

    public MD5Validator(Secret secretProxy) {
        this.secretProxy = secretProxy;
    }

    public boolean validate(API apiInfo, HttpServletRequest request) {
        Map<String, String[]> paramMap = request.getParameterMap();

        CommonResult result = ZySignUtils.verify(paramMap, this.secretProxy.getSecret(paramMap));
        if (result == null) {
            return true;
        } else {
            throw new CustomizeException(result.getMsg());
        }
    }
}
