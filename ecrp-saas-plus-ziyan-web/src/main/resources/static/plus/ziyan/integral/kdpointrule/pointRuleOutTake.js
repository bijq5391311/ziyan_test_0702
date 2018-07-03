require([ "vue", "nui", "jquery",
				"/public/ecrp/components/ns-goods-conditions-select.js",
				"/public/ecrp/common/common.js",
				ctx + "/public/ecrp/components/ns-droptree.js",
				ctx+"/public/ecrp/components/ns-select.js",
            ctx +'/public/ecrp/components/ns-shoplist-select.js'],
		function(Vue, Nui, $, select, common,tree,select, brand) {

            var rules = {

                /**
                 * 校验交易金额
                 */
                point_price: [{
                    validator: function  (rule, value, callback) {
						var reg=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
			    		var len = value.length;
						if(len > 7){
							return callback(new Error('请输入七位以内的交易金额(包含小数点)'));
						}
				        if (!value) {
				        	return callback(new Error('请输入交易金额'));
				        }
				        else if(!reg.test(value)){
				        	return callback(new Error('请输入包含两位小数的正数'));
				        }
				        else if (value < 0) {
				              callback(new Error('交易金额必须大于0'));
				            } else {
				              callback();
				              return true;
				            }
				      },trigger : 'change,blur'
        		}],

				/**
				 * 校验积分兑换上限
				 */
				point_limit: [{
					type: 'number',
					validator: function  (rule, value, callback) {
						var reg=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
			    		var len = value.length;
						if(len > 7){
							return callback(new Error('请输入七位以内的数据(包含小数点)'));
						}
				        if (!value) {//积分兑换上限不是必填项，允许为空
				        	callback();
				        }
				        else if(!reg.test(value)){
				        	return callback(new Error('请输入包含两位小数的正数'));
				        }
				        else if (value < 0) {
				              callback(new Error('积分上限必须大于0'));
				            } else {
				              callback();
				              return true;
				            }
				      },trigger : 'change,blur'
				}],


				/**
				 * 校验取整规则
				 */
				point_round: [{
					validator: (rule, value, callback) => {
						if (value === -1){
							callback(new Error('请选择积分取整规则'))
						} else {
							callback()
						}
					 },
					trigger : 'change,blur'
				}]
            };

            var vue = new Vue({
					el : "#integralruletackout",
					data : {
						pointRules: [],
						pointIndex: 0,
						brand_name: "",
						activeName: "0",
						brandIds: [],
						rules: rules
					},

					methods: {
						/**
						 * 初始化pointRules数据
						 */
						"initPointRules": function () {
							 debugger
							var that = this;
							$.ajax({
								url: "/integral/zytakeoutintegral/initPointRule", // 获取到拥有品牌下的规则
								data: "",
								async: false,
								type: "post",
								success: function (resp) {
									debugger
									that.$set(that, "pointRules",
											resp.result);
									if (resp.success) {
										if (resp.result !== null) {
											for (let i = 0; i < resp.result.length; ++i) {
                                                let pointLimit = ''
                                                if(resp.result[i].point_limit){
                                                    pointLimit= resp.result[i].point_limit+"";
												}
												Vue.set(that.pointRules[i], "is_open", resp.result[i].is_open);
												Vue.set(that.pointRules[i], "channel_name", resp.result[i].channel_name);
												Vue.set(that.pointRules[i], "point_price", resp.result[i].point_price + "");
												Vue.set(that.pointRules[i], "point_limit",  pointLimit);
												Vue.set(that.pointRules[i], "point_round", resp.result[i].point_round);
												Vue.set(that.pointRules[i], "f_shop_ids", resp.result[i].f_shop_ids ? resp.result[i].f_shop_ids : "");
												Vue.set(that.pointRules[i], "goods_condition",
														resp.result[i].goods_condition ? JSON.parse(resp.result[i].goods_condition) : []);
												Vue.set(that.pointRules[i], "f_sys_item_condition",
														resp.result[i].f_sys_item_condition
														? JSON.parse(resp.result[i].f_sys_item_condition) : {"title": [], "outerId": [], "cate": [], "price": []});

												//处理店铺的赋值
												if (that.pointRules[i].f_shop_ids) {
													var shopIds = resp.result[i].f_shop_ids.split(',');
													var ids = [];
                                                    for (var j = 0; j < shopIds.length; j++) {
														ids.push(shopIds[j]);
                                                    }
													Vue.set(that.pointRules[i], "resultMultilayer", ids.length);
												} else {
													Vue.set(that.pointRules[i], "resultMultilayer", 0);
												}
											}
										}
									}
								}

							})
						},

						// /选择商品
						callback: function (opts) {
                            var that = this;
							var orGoods = "";
							if (opts.goods.length > 0) {
								orGoods = opts.goods[0].id;
							}
							for (var i = 1; i < opts.goods.length; i++) {
								orGoods = orGoods + "," + opts.goods[i].id;
							}
                            that.pointRules[that.pointIndex].goods_condition = opts.goods;
                            that.pointRules[that.pointIndex].f_sys_item_ids = orGoods;
                            that.pointRules[that.pointIndex].f_sys_item_condition = opts.conditions;
						},

						/*
						 * 切换品牌tab的时候
						 */
						"clickBrandTab": function (t) {
							debugger
							var that = this;
							that.activeName = that.pointRules[t].channel_name;
							that.activeName = t;
							that.pointIndex = t;

						},

						//保存当前表单的品牌积分设置数据
						"saveData": function (index) {
							var that = this;
							that.$refs.form[index].validate(function (state) {
								if (state) {
									var rule = {
										id: that.pointRules[index].id,
										is_open: that.pointRules[index].is_open,
										point_price: that.pointRules[index].point_price,
										point_limit: that.pointRules[index].point_limit,
										point_round: that.pointRules[index].point_round,
										f_sys_item_ids: that.pointRules[index].f_sys_item_ids,
										f_shop_ids: that.pointRules[index].f_shop_ids,
										goods_condition: that.pointRules[index].goods_condition,
										f_sys_item_condition: that.pointRules[index].f_sys_item_condition
									};

									$.ajax(
											{
												url: "/integral/zytakeoutintegral/saveOrUpdate",
												type: "post",
												contentType: "application/Json",
												data: JSON.stringify(rule)
											})
											.done(
													function (resp) {
														if (resp.success === true) {
															that.$message.success(resp.msg);
															that.initPointRules();
														} else {
															that.$message.error(resp.msg);
														}

													});
								}
							});

						},

						/**
						 * 品牌店铺的打开
						 *
						 */
						handlerBrandMultilayer: function () {
							var that = this;
                            var ids = [];
                            var t = that.pointRules[that.pointIndex].f_shop_ids.split(",");
                            for (var i = 0; i < t.length; i++) {
								ids.push(t[i]);
                            }
							var args = {
								defaultCheckedKeys: ids
							};

							if (that.brandIds.length > 0) {
								this.$refs.brandMultiSelect.open(args, {brandIds: that.brandIds});
							} else {
								this.$refs.brandMultiSelect.open(args);
							}
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

                                that.pointRules[that.pointIndex].f_shop_ids = text;
                                that.pointRules[that.pointIndex].resultMultilayer = data.length;
                            }else{
                                that.pointRules[that.pointIndex].f_shop_ids =  0;
                                that.pointRules[that.pointIndex].resultMultilayer = 0;
							}
						},

					},

					mounted: function () {
						this.initPointRules();
					}
			});
        })
