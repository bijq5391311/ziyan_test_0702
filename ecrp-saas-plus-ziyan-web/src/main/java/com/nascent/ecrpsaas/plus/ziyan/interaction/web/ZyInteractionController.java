package com.nascent.ecrpsaas.plus.ziyan.interaction.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nascent.ecrpsaas.base.util.UtilProperties;
import com.nascent.ecrpsaas.base.web.BaseController;
import com.nascent.ecrpsaas.plus.ziyan.common.service.ZyUserService;
import com.nascent.ecrpsaas.plus.ziyan.constant.InteractionAction;
import com.nascent.utils.model.Authorize;

/**
 * 互动跳转Controller
 */
@Authorize
@Controller
@RequestMapping("/interaction/zyinteraction")
public class ZyInteractionController extends BaseController {

    @Autowired
    ZyUserService userService;

    @RequestMapping(value = "/interactionList/{type}")
    public String interactionList(@PathVariable("type") Integer type, Model model) {
        if (null != type) {
            //请求地址
            model.addAttribute("url",
                    UtilProperties.getProperty("interactionUrl"));
            //登录token
            model.addAttribute("loginToken",
                    UtilProperties.getProperty("interactionLoginToken"));
            //shopId
            model.addAttribute("shopId",
                    UtilProperties.getProperty("interactionShopId"));
            //请求key(根据点击的菜单请求对应的页面)
            model.addAttribute("controllerKey",
                    InteractionAction.interactionActionMap.get(type));
            //用户账号
            model.addAttribute("userName",
                    this.getCurrentUser().getUserCode());
            //用户类型
            model.addAttribute("userType","0");
        }
        return "/interaction/zyinteraction/interactionList";
    }
    @RequestMapping("/interactionIndex/{type}")
    public String interactionIndex(@PathVariable("type") Integer type,Model model){
        //请求地址
        model.addAttribute("url",
                UtilProperties.getProperty("interactionUrl"));
        //shopId
        model.addAttribute("shopId",
                UtilProperties.getProperty("interactionShopId"));
        //登录token
        model.addAttribute("loginToken",
                UtilProperties.getProperty("interactionLoginToken"));
        //请求key(根据点击的菜单请求对应的页面)
        model.addAttribute("controllerKey",
                InteractionAction.interactionActionMap.get(type));
        //用户账号
        model.addAttribute("userName",
                this.getCurrentUser().getUserCode());
        //用户类型
        model.addAttribute("userType","0");
        return "/interaction/zyinteraction/interactionIndex";
    }

}
