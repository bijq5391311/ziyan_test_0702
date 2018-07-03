define(["vue", "nui", "jquery", "utilbuild/main"], function(Vue, Nui, $, M) {
	var vueEvent = require("vue-event");
	function httpPost(url, data, options, $this) {
		$.ajax({
			url: url,
			data: data,
			type: "post",
			dataType: options && options.type || "json",
			success: function(data,ts,xhr) {
				 if(options && options.success && typeof options.success === "function") {
				 	options.success(data, ts, xhr, $this);
				 }
			},
			error: function(xhr, ts, error) {
				if(options && options.error && typeof options.error === "function") {
				 	options.error(xhr, ts, error, $this);
				}
			},
			complete: function(xhr, ts) {
				if(options && options.complete && typeof options.complete === "function") {
				 	options.complete(data, ts, $this);
				 }
			}
		})
	}
	var tree_mixin = {};
	
	
	function isBlank(value) {
		if(value === null || value === undefined)
			return true;
		if(/^\s*$/.test(value))
			return true;
		return false;
	}
	
	function isEmpty(value) {
		if(value.length === 0)
			return true;
		else
			return false;
	}
	
	function hasKey(obj) {
		if(obj === null || obj === undefined)
			return false;
		if(Object.keys(obj).length === 0)
			return false;
		return true;
	}
	
	function getType(o) {
		if(o === null || o === undefined)
			return null;
		return o.constructor.name;
	}
	
	var table_mixin = {
		beforeMount: function() {
			if(typeof this.$beforeMount === "function") {
				this.$beforeMount(this);
			}
		},
		data: function() {
			var that = this;
			
			return {
				model: {},
				rules: {},
				state: {},
				nameMap: {},
				textToShow: {},
				_queryConfig: {
                	expand: false,
                	searched: false,
                	showCondition: false
                },
                _table: {
                	quickSearchNames: [],
                	searchMap: null,
                	quickSearchMap: {},
                	quickSearchModel: {},
                	data: [],
                	loadingtable: false,
                	_CUSTOM_: "custom",
                	table_buttons: [],
                	operate_buttons: []
                },
                _pagination: {
                	enable: true,
                	size: 15,
                	sizeOpts: [15, 50, 100, 200],
                	page: 1,
                	total: 0
                },
                _order: {
                	orderDir: undefined,
                	orderKey: undefined
                }
			}
		},
		props: {
			"button-ratio": {
				type: Number,
				default: 16
			}
		},
		computed: {
			"collapseText": function() {
				//var preText = this._data._queryConfig.expand ? "收缩" : "展开";
				//var subText = "滤选"; //this._data._queryConfig.searched ? "结果" : "滤选";
				//return `${preText}${subText}`;
				if(!this._data._queryConfig.expand) 
					return "更多条件"
				else
					return "收缩条件"
			},
			"inputRatio": function() {
				return 24 - this.buttonRatio;
			}
		},
		methods: {
			$queryList$: function(params) {
				var that = this;
				var tableConfig = this._data._table;
				tableConfig.loadingtable = true;
				httpPost(this.url, params, {
					success: function(resp) {
						that._data._table.data = resp.data;
						that._data._pagination.total = resp.recordsTotal;
						tableConfig.loadingtable = false;
					},
					error: function(xhr) {
						that.$message.error(xhr.responseJSON.status +","+xhr.responseJSON.message || "网络异常，获取数据失败！");
						tableConfig.loadingtable = false;
					},
					complete: function() {
						
					}
				}, this)
			},
			$searchAction$: function() {
				this._data._table.searchMap = $.extend(true, {}, this.model); //记录搜索的条件
				
				var prePage = this._data._pagination.page;
				
				//页码变更会触发reload动作
				this._data._pagination.page = 1;
				if(prePage === 1) 
					this.$reload();
					
				this._data._queryConfig.searched = true;
				this.$formatTextToShow$();
			},
			$resetInputAction$: function() {
				if(typeof $resetInput === "function"){
					var model = this.$resetInput(this.model);
					if(model)
						this.$set(this, "model", model);
				} else
					this.$resetInput$();
			},
			$resetInput$: function() {
				var model = this.$getOriginModel$();
				var keys = Object.keys(model);
				for(var i = 0; i < keys.length; i++) {
					this.model[keys[i]] = model[keys[i]];
				}
				this._data._queryConfig.searched = false;
				this._data._queryConfig.showCondition = false;
			},
			$editInputAction$: function() {
				this._data._queryConfig.searched = false;
				this._data._queryConfig.showCondition = false;
			},
			$clearInputAction$: function() {
				this._data._queryConfig.searched = false;
				this._data._queryConfig.expand = false;
				this._data._queryConfig.showCondition = false;
				this.$resetInput$();
				this.$set(this._data._table, "searchMap", {});
			},
			$removeFilter$: function(name) {
				var vm = this;
				if(typeof this.$removeFilter === "function") {
					this.$removeFilter(this.model, name, function(name, value) {
						vm.$delete(vm._data._table.searchMap, name);
						vm.model[name] = value;
					});
				} else {
					this.$delete(this._data._table.searchMap, name);
					this.model[name] = this.$getOriginModel$()[name];
				}
				
				this.$formatTextToShow$();
				this.$reload();
				if(Object.keys(this.textToShow).length == 0) {
					this._data._queryConfig.searched = false;
					this._data._queryConfig.expand = false;
					this._data._queryConfig.showCondition = false;
				}
			},
			$handleTabClick: function() {
				var searched = this._data._queryConfig.searched;
				var expand = this._data._queryConfig.expand;
				var showCondition = this._data._queryConfig.showCondition;
				if(expand) {
					if(searched)
						this._data._queryConfig.showCondition = !this._data._queryConfig.showCondition;
					else {
						this._data._queryConfig.expand = false;
					}
				} else {
					this._data._queryConfig.expand = true;
				}
			},
			$formatText$: function(name, value) {
				if(name in this.nameMap) {
					var info = this.nameMap[name];
					if(typeof info.instance.getText === "function") {
						var text = info.instance.getText();
						if(!isBlank(text)) {
							return {
								text: text,
								label: info.text
							};
						}
					}
				}
			},
			$resetField$: function(name, value) {
				var model = this.$getOriginModel$();
				this.$set(this.model, name, this.$getOriginModel$().name);
			},
			$reset$: function() {
				var keys = Object.keys(this.model);
				for(var i = 0; i < keys.length; i++) {
					if("function" === typeof this.resetField) {
						var value = this.resetField(keys[i], this.model[keys[i]]);
						this.$set(this.model, keys[i], value);
					}
				}
			},
			$format$: function() {
				var formatText = {};
				var keys = Object.keys(this.model);
				for(var i = 0; i < keys.length; i++) {
					if("function" === typeof this.resetField) {
						var obj = this.formatText(keys[i], this.model[keys[i]]);
						if(obj)
							formatText[keys[i]] = obj;
					}
				}
				return formatText;
			},
			$getModelForSearch$: function() {
				function excluded(model) {
					var oModel = {};
					var keys = Object.keys(model);
					for(var i = 0; i < keys.length; i++) {
						var key = keys[i];
						var value = model[key];
						switch(getType(value)) {
							case null: ;break;
							case "String": isBlank(value) ? null : oModel[key] = value;break;
							case "Object": !hasKey(value) ? null : oModel[key] = value;break;
							case "Array": isEmpty(value) ? null : oModel[key] = value;break;
							default: oModel[key] = value;break;
						}
					}
					
					return oModel;
				}
				return excluded(this.model);
			},
			$formatTextToShow$: function() {
				
				function isBlank(value) {
					if(value === null || value === undefined)
						return true;
					if(/^\s*$/.test(value))
						return true;
					return false;
				}
			
				function convert(model, nameMap) {
					var keys = Object.keys(model);
					var textToShow = {};
					for(var i = 0; i < keys.length; i++) {
						if(keys[i] in nameMap) {
							var info = nameMap[keys[i]];
							if(typeof info.instance.getText === "function") {
								var text = info.instance.getText();
								if(!isBlank(text)) {
									textToShow[keys[i]] = {
										label: info.text,
										text: info.instance.getText()
									};
								}
							} else {
								if(model[keys[i]]) {
									textToShow[keys[i]] = {
										label: info.text,
										text: model[keys[i]]
									}
								}
							}
						}
					}
					return textToShow;
				} 
				
				var textToShow = {};
				
				var $handleTextToShow = this.$handleTextToShow;
				if(typeof $handleTextToShow === "function") {
					textToShow = $handleTextToShow(this.model, this.nameMap);
				} else 
					textToShow = convert(this.$getModelForSearch$(), this.nameMap);
				
				this.$set(this, 'textToShow', textToShow);
				if(Object.keys(textToShow).length === 0) {
					this._data._queryConfig.searched = false;
					this._data._queryConfig.expand = false;
				}
			},
			$getOriginModel$: function() {
				return this.$options.data().model;
			},
			$pageChange$: function(page) {
				var _pagination = this._data._pagination;
				this._data._pagination.page = page;
				this.$reload();
			},
			$sizeChange$: function(size) {
				var pagination = this._data._pagination;
				
				pagination.size = size;
				if(pagination.page === 1) {
					this.$reload();
				} else {
					pagination.page = 1; //page的值改变会触发$pageChange$函数
				}
			},
			$orderChange$: function({column, prop, order}) {
				var dir = order === "ascending" 
					? "asc" : (order === "descending") ? "desc" : undefined;
				if(dir) {
					this._data._order.orderDir = dir;
					this._data._order.orderKey = column.dbcolumn;
				} else {
					this._data._order.orderDir = undefined;
					this._data._order.orderKey = undefined;
				}
				this.$reload();
			},
			$generateParams$: function() {
				var order = this._data._order;
				
				var pagination = this._data._pagination;
				var limit = {
					start: (pagination.page - 1) * pagination.size,
					length: pagination.size
				}
				var searchMap = $.extend(true, {}, this._data._table.searchMap);
				var params = $.extend(true, {}, order, limit, {searchMap: searchMap});
				if(typeof this.$handleParams === "function")
					return this.$handleParams(params);
				return params;
			},
			$quickSearchAction$: function($event) {
				var name = $event.path[1].__vue__.name;
				this._data._table.quickSearchMap[name] = this.quickSearchModel[name];
				this.$quickSearch$();
			},
			$quickSearch$: function() {
				this._data._table.searchMap = $.extend(true, {}, this._data._table.quickSearchMap);
				this.$reload();
			},
			$handleParams: function(params) { return params},
			$reload: function() {
				this.$queryList$(this.$generateParams$());
			},
			$search: function(params) {
				this._data._table.searchMap = $.extend(true, this._data._table.searchMap, params.searchMap);
				this.$reload();
			},
			$refresh: function() {
	            this.$refs.tree.refresh();
	        },
	        $getSelectionsOfCurrPage: function() {
	            return this.$refs.table.store.states.selection;
	        },
			"$select":$.noop,
			"$selectAll":$.noop,
			"$selectionChange":$.noop,
			"$cellMouseEnter":$.noop,
			"$cellMouseLeave":$.noop,
			"$cellClick":$.noop,
			"$cellDbclick":$.noop,
			"$rowClick":$.noop,
			"$rowContextmenu":$.noop,
			"$rowDbclick":$.noop,
			"$headerClick":$.noop,
			"$filterChange":$.noop,
			"$currentChange":$.noop,
			"$headerDragend":$.noop,
			"$expend":$.noop,
		}
	}
	
	var form_mixin = {
		methods: {
			$setModel: function(model) {
				this.$refs.form ? this.$resetFields() : null;
				this.$set(this, "model", model);
			},
			$getModel: function() {
				return $.extend(true, {}, this.model);
			},
			$resetFields: function() {
				var form = this.$refs.form;
				form.resetFields();
			},
			$valid: function(callback) {
				var form = this.$refs.form;
				form.validate(function(state){
					if(state) {
						if(typeof callback === "function")
							callback();
					}
				})
			},
			$submit: function(options) {
				var model = $.extend(true,{},this.model);
				var $this = this;
				if(options && options.handleParams && typeof options.handleParams === "function") {
					resolver(options.handleParams(model));
				} else {
					resolver(model);
				}
				
				function resolver(model) {
					var url = options && options.url || $this.url;
					if(!url)
						throw new Error("表单url未配置");
					httpPost(url, model, options, $this);
				}
			},
			$validAndSubmit: function(opt) {
				var $this = this;
				this.$valid(function() {
					$this.$submit(opt);
				});
			}
		},
		props:["uid"],
        created: function() {
          	var that = this;
          	if(Boolean(this.uid)) {
          		EventManager.register(this.uid, "setModel", function(model) {
	            	that.$setModel(model);
	          	})
          	}
        },
        beforeDestroy: function() {
        	if(this.uid)
        		EventManager.destroy(this.uid);
        }
	}
	
	return {
		vueEvent,
		httpPost,
		tree_mixin,
		table_mixin,
		form_mixin
	}
})