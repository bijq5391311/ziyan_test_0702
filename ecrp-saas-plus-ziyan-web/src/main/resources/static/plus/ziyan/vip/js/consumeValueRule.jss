require(["vue", "nui", "jquery", "/public/dslParser/grid/gridPlugin.js", "utilbuild/main", "moment",
         "/public/ecrp/components/ns-goods-conditions-select.js",
         ctx + "/public/ecrp/components/ns-goods-select.js",
         "/public/ecrp/common/common.js",
           ctx +"/public/ecrp/components/ns-shoplist-select.js"], 
		function(Vue, Nui, $, mixin, _, moment,cSelect,select,common,shop) {
           
	/**
	 * 消费值规则model
	 */
	var consumeValueRule = {
		is_open : 0 ,				//是否开启规则
        f_right_black: 0,			//是否排除权益黑名单
		is_jhs : 0 ,				//是否排除聚划算
		is_post_fee : 0 ,			//是否排除运费
		consume_value_round : 0 ,
		decay_time :0,			
		f_shop_ids : "",			//排除店铺id
		goods_condition : [],		//排除商品展示内容
		f_sys_item_ids : "",		//排除商品编号
		f_sys_item_condition : {},	//排除商品条件
		goodsConsumeItem : [] , 		//成长值选中的商品
		itemConsumeValue : []		//
	} ;
	
	/**
	 * vue基础方法
	 */
	var methods = {
			"handlerParam":function(params){
				return params ;
			},

        /**
		 * 处理操作日志参数
         * @param params
         * @returns {*}
         */
        handlerLogParam: function (params) {
            if(params.searchMap){
                var time = params.searchMap.createTime;
                if(time != undefined && time != ""){
                    var startTime = time[0] !== null? moment(time[0]).format('YYYY-MM-DD HH:mm:ss'):"";
                    var endTime = time[1]!== null? moment(time[1]).format('YYYY-MM-DD HH:mm:ss'):"";
                    params.searchMap.startTime = startTime;
                    params.searchMap.endTime = endTime;
                    delete params.searchMap.createTime;
                }
            }else{
                params.searchMap = {};
            }
            params.searchMap.type = 10; //成长值规则日志类型
            return params;
        },
	};
	
	var methodsExt = {
		"initconsumeValueRule":function(){
			debugger
			var that = this ;
			$.ajax({
				url : "/vip/consumevaluerule/initConsumeValueRule",
				async : false,
				type : "post",
				success : function(resp){
					if (resp.result) {
						debugger
						Vue.set(that.consumeValueRule,"id", resp.result.id);
						Vue.set(that.consumeValueRule,"is_open", resp.result.is_open);
						Vue.set(that.consumeValueRule,"f_right_black", resp.result.f_right_black);
						Vue.set(that.consumeValueRule,"is_jhs", resp.result.is_jhs);
						Vue.set(that.consumeValueRule,"consume_value_price", resp.result.consume_value_price);
						Vue.set(that.consumeValueRule,"consume_value_limit", resp.result.consume_value_limit);
						Vue.set(that.consumeValueRule,"consume_value_round", resp.result.consume_value_round);
						Vue.set(that.consumeValueRule,"f_shop_ids", resp.result.f_shop_ids ? resp.result.f_shop_ids : "");
						Vue.set(that.consumeValueRule,"f_sys_item_ids", resp.result.f_sys_item_ids ? resp.result.f_sys_item_ids : "");
						Vue.set(that.consumeValueRule,"decay_time", resp.result.decay_time);
						Vue.set(that.consumeValueRule,"decay_value", resp.result.decay_value);
						Vue.set(that.consumeValueRule,"goods_condition", resp.result.goods_condition == null ? []: JSON.parse(resp.result.goods_condition));
						Vue.set(that.consumeValueRule,"goodsConsumeItem", resp.result.item_consume_value == null ? []: JSON.parse(resp.result.item_consume_value));
						Vue.set(that.consumeValueRule,"itemConsumeValue", resp.result.item_consume_value == null ? []: JSON.parse(resp.result.item_consume_value));
						Vue.set(that.consumeValueRule,"f_sys_item_condition",resp.result.f_sys_item_condition == null ? {
							"title" : [],
							"outerId" : [],
							"cate" : [],
							"price" : []
						}: JSON.parse(resp.result.f_sys_item_condition));

						// 处理店铺的赋值
						if (that.consumeValueRule.f_shop_ids) {
							var shopIds = resp.result.f_shop_ids.split(',');
							var ids = [];
							for (var j = 0; j < shopIds.length; ++j) {
								ids.push(shopIds[j]);
							}
							Vue.set(that.consumeValueRule, "resultMultilayer", ids.length);
						} else {
							Vue.set(that.consumeValueRule, "resultMultilayer", 0);
						}
					}
				}
			});
		},
		//商品选择之后的处理
		callback : function(opts) {
			var orgoods = "";
			if (opts.goods.length > 0) {
				orgoods = opts.goods[0].id;
			}
			for (var i = 1; i < opts.goods.length; i++) {
				orgoods = orgoods + "," + opts.goods[i].id;
			}
			this.consumeValueRule.goods_condition = opts.goods;
			this.consumeValueRule.f_sys_item_ids = orgoods;
			this.consumeValueRule.f_sys_item_condition = opts.conditions;
		},
		/**
		 * 品牌店铺的打开
		 *
		 */
		handlerBrandMultilayer: function () {
			var ids = [];
			var t = this.consumeValueRule.f_shop_ids.split(",");
			for (var i = 0; i < t.length; i++) {
				ids.push(t[i]);
			}
			var args = {
				defaultCheckedKeys: ids
			};
			this.$refs.brandMultiSelect.open(args);
		},
		/**
		 * 品牌店铺的回调
		 *
		 */
		doBrandMultilayer: function (opts) {
			var that = this;
			var data = opts.data;
			var ids = "";
			if(data.length >= 0) {
				for (var i = 0; i < data.length; ++i) {
					ids += data[i];
					ids += ",";
				}
				var text = ids.substring(0, ids.length - 1);

				that.consumeValueRule.f_shop_ids = text;
				that.consumeValueRule.resultMultilayer = data.length;
			}else{
				// that.consumeValueRule.f_shop_ids =  0;
				that.consumeValueRule.resultMultilayer = 0;
			}
		},
		saveRule : function(){
			debugger
			var _this = this ;
			var flag = true ;
			for (var i=0;i<_this.consumeValueRule.itemConsumeValue.length;i++){
				_this.$refs.consumeValueRuleForm.validate(function (state) {
					if(!state){
						flag = state ;
					}
				}) ;
			}
			if(!flag){
				return false ;
			}
			_this.$refs.consumeValueRuleForm.validate(function(valid){
				if(valid){
					// 赋值选中的商品(这里不能绑定)
					_this.consumeValueRule.goods_condition = _this.$refs.choosegoods1.confirmGoodsData ;
					var rule = {} ;
					rule.id = _this.consumeValueRule.id ;
					rule.is_open = _this.consumeValueRule.is_open ;
					rule.f_right_black = _this.consumeValueRule.f_right_black ;
					rule.consume_value_price =  _this.consumeValueRule.consume_value_price ;
					rule.consume_value_limit =  _this.consumeValueRule.consume_value_limit ;
					rule.consume_value_round =  _this.consumeValueRule.consume_value_round ;
					rule.decay_value =  _this.consumeValueRule.decay_value ;
					rule.is_jhs = _this.consumeValueRule.is_jhs ;
					rule.decay_time = _this.consumeValueRule.decay_time ;
					rule.f_shop_ids = _this.consumeValueRule.f_shop_ids;
					rule.goods_condition = JSON.stringify(_this.consumeValueRule.goods_condition);
					rule.f_sys_item_ids = _this.consumeValueRule.f_sys_item_ids;
					rule.f_sys_item_condition = JSON.stringify(_this.consumeValueRule.f_sys_item_condition);
					var item = [] ;
					for(var i=0;i<_this.consumeValueRule.itemConsumeValue.length;i++){
						if($.trim(_this.consumeValueRule.itemConsumeValue[i].consumeValue) != "" &&
								typeof (_this.consumeValueRule.itemConsumeValue[i].consumeValue) != 'undefined' ){
							item.push(_this.consumeValueRule.itemConsumeValue[i]) ;
						}
					}
					rule.item_consume_value = JSON.stringify(item);

					$.ajax({
						url : "/vip/consumevaluerule/saveOrUpdateConsumeValueRule",
						type : "post",
						async: false ,
						data : rule
					}).done(
					function(resp) {
						if (resp.success === true) {
							_this.$message.success(resp.msg);
							_this.initconsumeValueRule();
						} else {
							_this.$message.error(resp.msg);
						}
					});

				}
			})
		},
		/**
		 * 消费值打开商品弹出框
		 */
		handlerSelectItem: function () {
			var args = {
			};
			this.$refs.selectItems.open(args);
		},
		/**
		 * 消费值商品选择回调
		 * @param opts
		 */
		doSelectItem: function (opts) {
			debugger
			var _this = this ;
			var itemConsumeValue = [] ;
			for (var i = 0; i < opts.goods.length; i++) {
				var item = {} ;
				item.id = opts.goods[i].id ;
				item.title = opts.goods[i].title ;
				for(var j=0;j < _this.consumeValueRule.itemConsumeValue.length;j++){
					if(_this.consumeValueRule.itemConsumeValue[j].id == item.id){
						item.consumeValue = _this.consumeValueRule.itemConsumeValue[j].consumeValue ;
					}
				}
				itemConsumeValue.push(item) ;
			}
			_this.consumeValueRule.goodsConsumeItem = opts.goods;
			_this.consumeValueRule.itemConsumeValue = itemConsumeValue ;
		}
	};
	
	/**
	 * 两位小数校验
	 */
	var commonValueReg = (rule, value, callback) => {
		var val = $.trim(value) ;
		var regex = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/; 
		var len = val.length;
		if(len > 7){
			return callback(new Error('请输入七位以内的数(包含小数点)'));
		}
		 
        if (!val) {
        	return callback(new Error('该项为必填项'));
        }
        else if(!regex.test(val)){
        	return callback(new Error('请输入至多保留两位小数的数'));
        }
        else {
             callback();
        }
    };
    
    /**
	 * 兑换上限校验
	 */
	var consumeValueLimit = function(rule, value, callback){
		var val = $.trim(value) ;
		var regex = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/; 
		var len = val.length;
		if(len > 7){
			return callback(new Error('请输入七位以内的数(包含小数点)'));
		}
        if (!val) {//允许为空
        	callback();
        }
        else if(!regex.test(val)){
        	return callback(new Error('请输入至多保留两位小数的数'));
        }
        else {
             callback();
        }
    };

    /**
     * 衰减时间校验
     */
    decayTimeCheck = (rule, value, callback) => {
		var reg=/(^[1-9]{1}[0-9]*$)|(^[0-9]*\$)/;
        if (!value) {
          return callback(new Error('天数不能为空'));
        }
        else if(!reg.test(value)){
        	return callback(new Error('请输入大于0且为整数'));
        }
         else {
              callback();
            }
      };
	
    /**
     * 校验规则
     */
	var rules = {
			consume_value_price : [{
				type : "number",
				validator : commonValueReg ,
				trigger : "change,blur"
			}],
			consume_value_limit : [{
				validator : consumeValueLimit,
				trigger : "change,blur"
			}],
        	decay_time : [{
                validator : decayTimeCheck ,
            	trigger : "blur"
        	}] ,
			decay_value : [{
				validator : decayTimeCheck ,
				trigger : "blur"
			}] ,
			consumeValue : [{
                type : "number",
                validator : commonValueReg ,
                trigger : "blur"
			}]

	};
	
	/**
	 * vue对象
	 */
	var vue = new Vue({
		el: "#consumeValueRule",		//挂载dom元素id
		data : function data() {
        	return {
        		consumeValueRule : consumeValueRule,
        		rules : rules ,
                operationLog : "operationLog",
                activeName: "consumeValueRuleName",
                consumeValueRuleName: "consumeValueRuleName",
				offlineChannelPrefix : "" , 				// 线下渠道前缀
        		commonValueReg : (rule, value, callback) => {
        			var val = $.trim(value);
        			var regex = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/; 
        			var len = val.length;
					if(len > 7){
						return callback(new Error('请输入七位以内的消费值(包含小数点)'));
					}
        			if (!val) {
        				return callback(new Error('请输入单笔交易消费值兑换上限'));
        			}
        			else if(!regex.test(val)){
        				return callback(new Error('请输入至多保留两位小数的数'));
        			}
        			else {
        				callback();
        			}
    		    }
        	}
		},
		methods : Object.assign({},methodsExt,methods) ,
		mounted : function(){
			/* 初始化规则 */
			this.initconsumeValueRule();
		}
	});
		
	
})