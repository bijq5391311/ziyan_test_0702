require.config({
	baseUrl:assetsPublicPath || "/public/bata",
	paths:{
		"vue":"/static/core/libs/vue",
		"jquery":"lib/js/jquery.min",
        "bootstrap": "lib/js/bootstrap.min",
		"nui":"r/nui",// 安装nui-js
		"ELEMENT":"lib/js/index",
        "cookie": "extensions/cookie/jquery.cookie",
        "scrollMonitor": "extensions/scrollMonitor/scrollMonitor",
        "hoverIntent": "extensions/hoverIntent/jquery.hoverIntent",
        "TweenMax": "extensions/TweenMax/TweenMax.min",
        "perfectScrollbar": "extensions/perfectScrollbar/perfectScrollbar",
		"ecrp": "extensions/ecrp/js/xenon",
		"zTree": "extensions/zTree/jquery.ztree.all.min",
		
		//G2
		"g2":"/static/core/libs/g2",
		//拖拽插件
		"sortablejs":"/static/core/libs/sortablejs"
	},
	shim:{
        "bootstrap": ["jquery"],
		"scrollMonitor": ["jquery"],
		"perfectScrollbar": ["css!extensions/components.min.css"],
		"zTree": ["jquery","css!extensions/zTree/metroStyle/metroStyle.css"]
		},
	waitSeconds: 0
	
})


