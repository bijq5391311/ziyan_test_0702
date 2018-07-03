({
   baseUrl:"../",
    name: "utilbuild/main",
    out: "../utilmain/util.min.js",
	exclude:['jquery',"vue","ELEMENT","nui"],
    paths: {
		"vue":"bata/js/vue/vue",
		"jquery":"bata/extensions/jquery/jquery.min",
		"nui":"bata/extensions/nui/nui", // 安装nui-js
		"ELEMENT":"bata/js/nui-js/index",
		"object-util":"ecrp/common/object-util",
		"directive":"ecrp/common/directive",
        "ns-tree": "ecrp/components/ns-tree",
		"ns-select":"ecrp/components/ns-select",
		"ns-table-column-operate-button":"renderEngineV2-1/components/ns-table-column-operate-button",
        "ns-table-operate-button": "renderEngineV2-1/components/ns-table-operate-button",
        "components": "ecrp/components/components",//==========
		"form-helper":"ecrp/common/form-helper.js",
		"ns-goods-select":"ecrp/components/ns-goods-select",
		"render-helper":"ecrp/common/render-helper",
		"ns-droptree":"ecrp/components/ns-droptree",
		"ns-brand-multi-select":"ecrp/components/ns-brand-multi-select",
		"response-util":"ecrp/common/response-util",
		"ns-cascader":"ecrp/components/ns-cascader",
		"event-manager": "ecrp/common/event-manager",
		"vue-event": "ecrp/common/vue-event",
		"common":"ecrp/common/common"
	}
})