require(["vue", "nui", "jquery",
         "/public/dslParser/grid/gridPlugin.js",
         "utilbuild/main","moment"
     	],function(Vue, Nui, $, mixin, t, moment) {
    [#th:block th:with="grid = ${__#{render.grid.get('#ctx', offlineCouponListExt_table)}__}"]
    	var tableOption = [#th:block th:insert="../public/ecrp/render2/grid::render(${grid})"][/th:block]
    [/th:block]

    Vue.component("offlineCouponListExt_table", tableOption);
    
    var rules={};
    var methods = {
		"handlerParam":function(params){
	        if(params.searchMap){
	        	debugger
	        	var time = params.searchMap.timeRange;
	        	if(time !== undefined && time !== ""){
	        		var startTime = time[0];
	        		var endTime = time[1];
	        		params.searchMap.startTime = startTime;
        			params.searchMap.endTime = endTime;
        			delete params.searchMap.timeRange;
	        	}
	        }
	        var that = this;
	    	//初始化加载数据  
            $.ajax({
                url:'/marketing/zyofflinecoupon/couponAnalyze',
                data:params,
                type:'POST', //GET
                async:false,    //或false,是否异步
                success:function(date){
                	debugger
                	for(var i=0; i<date.length; i++){
                		if(1 == date[i].couponType){
                			//已发放
                    		that.favorCash.total = date[i].sentAmount;
                			//已核销
                    		that.favorCash.verification = date[i].verification;
                			//未使用
                    		that.favorCash.unused = date[i].sentAmount - date[i].verification;
                			//类型
                    		that.favorCash.typeCount = date[i].count;
                		}else if(2 == date[i].couponType){
                			//已发放
                			that.favorDiscount.total = date[i].sentAmount;
                			//已核销
                			that.favorDiscount.verification = date[i].verification;
                			//未使用
                			that.favorDiscount.unused = date[i].sentAmount - date[i].verification;
                			//类型
                			that.favorDiscount.typeCount = date[i].count;
                		}
                	}
                }
            })
	        return params;
		},
    }
    var watch= {}
    var favorForm={
		//发放总量
		total:0,
		//已核销
		verification:0,
		//未使用
		unused:0,
		//类型统计
		typeCount:0
    }
    var vue = new Vue({
        el: '#app',
        data : function data() {
        	return{
	        	//现金
        		favorCash: Object.assign({
        			condition:1
				},favorForm),
				//折扣
				favorDiscount: Object.assign({
        			condition:2
				},favorForm)
        	}
        },
        watch:watch,
		methods: methods,
	    mounted: function(){
	    	var that = this;
	    	//初始化加载数据  
            $.ajax({
                url:'/marketing/zyofflinecoupon/couponAnalyze',
                type:'POST', //GET
                async:false,    //或false,是否异步
                success:function(date){
                	debugger
                	for(var i=0; i<date.length; i++){
                		if(1 == date[i].couponType){
                			//已发放
                    		that.favorCash.total = date[i].sentAmount;
                			//已核销
                    		that.favorCash.verification = date[i].verification;
                			//未使用
                    		that.favorCash.unused = date[i].sentAmount - date[i].verification;
                			//类型
                    		that.favorCash.typeCount = date[i].count;
                		}else if(2 == date[i].couponType){
                			//已发放
                			that.favorDiscount.total = date[i].sentAmount;
                			//已核销
                			that.favorDiscount.verification = date[i].verification;
                			//未使用
                			that.favorDiscount.unused = date[i].sentAmount - date[i].verification;
                			//类型
                			that.favorDiscount.typeCount = date[i].count;
                		}
                	}
                }
            })
	    }
    });
})