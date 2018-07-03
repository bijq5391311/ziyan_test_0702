define(["dsl/core/util", "vue"], function(Util, Vue) {
	function data(setting, vm) {
		var pagination = setting.pagination
		return {
			url: setting.url,
			data: [],
			status: {
				isLoading: false,
				isActionSearch: false
			},
			order: {
				orderKey: null,
				orderDir: null
			},
			pagination: {
				enable: false,
				sizeOpts: [].concat(pagination.sizeOpts),
				size: pagination.size,
				total: 0,
				page: 1
			}
		}
	}
	
	function method(setting, vm) {
		var methodMap = {
				$doSearch: function(func) {
					this.status.isActionSearch = true;
					this.pagination.page = 1;
					return func.call(this, this, this.$queryList, this.$getOtherParams);
				},
				$sizeChange: function(size) {
					if(!this.status.isActionSearch) {
						this.status.isActionSearch = true;
						this.pagination.page = 1;
						this.pagination.size = size;
						this.$reload();
					}
				},
				$pageChange: function(page) {
					this.pagination.page = page;
					if(!this.status.isActionSearch) {
						this.$reload();
					}
				},
				$sortChange: function({column, prop, order}) {
					var sortMap = {ascending: "asc", descending: "desc"};
					if(column) {
						this.order.orderKey = column.dbcolumn;
						this.order.orderDir = sortMap[order];
					} else {
						this.order.orderKey = null;
						this.order.orderDir = null;
					}
					
					this.$reload();
				},
				$reload: function() {
					var otherParams = this.$getOtherParams();
					var params = Object.assign({}, this.status.params, otherParams);
					return this.$queryList(params);
				},
				$getOtherParams: function() {
					var length = this.pagination.size;
					var start = length * (this.pagination.page - 1);
					return {
						start: start,
						length: length,
						orderKey: this.order.orderKey,
						orderDir: this.order.orderDir
					}
				},
				/**
				 * params: {start: number, length: number, orderKey: string|null, orderDir: string|null, searchMap: object}
				 */
				$queryList: function(params/*请求参数*/) {
					var vm = this;
					/**
					 * 处理请求错误
					 */
					function handleError(xhr) {
						var typeNum = Math.floor(xhr.status / 100);
						if(typeNum === 4) { //客户端/请求错误
							vm.$message.error(xhr.responseJSON.status +","+xhr.responseJSON.message || "请求数据失败，请请重试！");
						} else if(typeNum === 5) { //服务器错误
							vm.$message.error(xhr.responseJSON.status +","+xhr.responseJSON.message || "系统错误，请联系管理员！");
						} else { 
							vm.$message.error(xhr.responseJSON.message);
						}
					}
					
					//请求前对请求参数做处理
					if(typeof this.$handleParams === "function") {
						params= this.$handleParams(params);
					}
					
					//缓存请求参数
					vm.status.params = params;
					
					var url = this.url;
					
					vm.status.isLoading = true;
					return $.post(url, params).done(function(resp, ts, xhr) {
						if(resp.success === false) {
							handleError(xhr);
						} else {
							vm.$setResponse(resp);
						}
					}).fail(function(xhr, ts, err) {
						handleError(xhr);
					}).complete(function(xhr, ts) {
						vm.status.isLoading = false;
						vm.status.isActionSearch = false;
					});
				},
				/**
				 * 处理返回结果
				 * resp: {data: array, recordsFiltered: number}
				 */
				$setResponse: function(resp) {
					var vm = this;
					if(this.pagination) {
						vm.pagination.total = resp.recordsFiltered;
					}
				
					vm.data = resp.data;
				}
			};
		
		return Util.merge(methodMap, setting.methods || {});
	}
	
	
	function createTable(setting, vm) {
		var createElement = vm.$createElement;
		return createElement("el-table", {
			class: "template-table", 
			ref: "table",
			props: {
				data: vm.data, /*表格数据*/
				border: true,
				resizable: true
			},
			attrs: {
				"element-loading-icon": "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCMjNCMzlEQjRCRUYxMUU3QTRFMjhGNjZBMDREQUYzOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCMjNCMzlEQzRCRUYxMUU3QTRFMjhGNjZBMDREQUYzOSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkIyM0IzOUQ5NEJFRjExRTdBNEUyOEY2NkEwNERBRjM5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkIyM0IzOURBNEJFRjExRTdBNEUyOEY2NkEwNERBRjM5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+HsLAvwAABQlJREFUeNq0VWlsVFUU/u59982bte20UDptcVpGBrcoomAJpEYxGhaNJsQIYvQHKUGNgVQTNS7RhCjGIk2EsPhHJUTkh2AU1ESUBCJuBBcWDRWwpWUpM52205m33et5b6BAaNE/nsw3b//uWb57DsPc1bjSmP+DUqVLqdp1FOdH6xq6ouVVL9co+yvXe4zRbX/bHAj8u+2G0JptU0NfZ0etqxtfRsLhx6OQH1hSQTHm+zGS8auQ0sJsHxhr9iMIRqBcBru3Gycle39Qqoc543CVF1gpSHkJrkKuovT3E7l0B5HTW5ycpzuhOGzThm7l0eNii6nkAzo9LhDzEKFwCUYjryTC/XS8hXnE5J0QXhDarGRYzk4YyvLc1ejeWUduJ6LZlk8uifQiRiKv9mpBmOhVVDENRkA4dcKZ7hSdXddq2S9mxvqaeMBwQ96CGkfGVTvIhWkBel8QdP/IL+R12JKEvYS60rKex1p+PCvOFJZ5YFxDGsHKBHJm3ozoEcWkBKcFTMcl1ah5lJ4fKNvIWGXIWuWXeZ4m/DxMTKngnPfWojjFcMwDbn0KiYYk+qOJu06WT/w1ZBgiqGvQdYGQ4H9zTW08Y5ehI3cdggELK27aMOx5yi8eEPOVq3Q6NY6PkflmQ5md+boURHU93MLQnAzXPvdyHeEOBlkQBiscPWeGp5/J1vSOKevCk5PXYmnqUyRDHcSxxiffVCL2TPMiO5hQmea4bmUyiTR4vJrUUZyvdLHVIG891ZhSR5Jlj/xZqGrKuSr33M3r8NSkbUiO+YukE8RgphHR82lpGs66HUFL5b51e5KrM+k6F6djaZ2bhTZIudUXKKnCoeC4cg/CiU4dr2VzO29vxVszViEZ68JQNoHBYhWlVZ5Pi1VxHHp/Q2mdASyqPfbohBr1bvW5ENRgOOgGiFTKt11XSuY4wSCRH0fyxRp5NP9Rchlqx/2GQq7W30ycSJlXXqCCyPrEI2P3PfFxf/pbaVWgKtBFkE1Ze8Lml4ztCzvt2MBOZ1ZrTAyQlAZo5wkcphJNUp1YE1mOWuMIBguN7SxozWSM6Bl56LJrKLVvEHkbX1e/Y/esUE8LzHJ/MwaYiwEnsEDAXbveWI/X9DVIsF78TtI/hno0U+0/YUvRyA8jZ6W2qCJ7RhW1KXDEbcrUb1VFcYhcf89Py+KORYgrbWMsfCrWWxjb1m2FMTk8hBNuxdIAE73LxbZX7sMv2M2mIsVO4X71IwI8j6xs/IwV5VxJG407lAzNUxrbwALOkgudTGuZXocbwz1YED/0XberO30I3D2nsgv9jg5XC955FuXZsbLn+7n6N7hBO4QBNo71s9guoax7laI8UO2YzeCaop3r8mkWlL6iA9cvg5hR8YfflyPMwTvh7hV78tfED+fLWst0Gzb1CMHRbrJg5rRKbIpwJpS09+rSmub1Hc2RsIm46IRWheNmKz29vK2GjVIHIBpU0OaYF+p5dgjhGJWnhXosvG4tRfmHQ1IsZHYhpXMn7XnjUu2KFF2uWPYmF3ghqg1d2bONgHHJpeFLKaScJa5iYUrdIr9HMAVTRWebdgiC2VR4RcrRSH7iVRf66xEtP/JAkEqNOObo+8fo4G20B70kaqQib+q4CJbeYOp5jamVXnSjGVfnp8gVKI3Qh+jw9cUllSdkD62UrJVXn6LetmSleTwa6PN76Gwz4RzhBGEx3Vv1H2YvRa8U/i/7R4ABAK4QL3WFKVtqAAAAAElFTkSuQmCC' />",
				"element-loading-text": "拼命加载中"
			},
			on: {
				"sort-change": vm.$sortChange
			},
			directives:[
				{
					name:"loading",
					rawName: "v-loading.lock",
					value: (vm.status.isLoading),
					expression: "status.isLoading",
					modifiers: {"lock":true}
				}
			]
		}, createColumns(setting.columns/*列dsl集合*/, vm));
	}
	
	
	/**
	 * @param dsls 列dsl集合
	 * @param vm vue组件示例
	 */
	function createColumns(dsls, vm) {
		return dsls.map(function(dsl) {
			return createColumn(dsl, vm);
		})
	}
	
	function createColumn(option, vm) {
		var createElement = vm.$createElement;
		var type = option.type;
		var createT = null;
		switch(type) {
			case "selection": createT = createSelectionColumn; break;
			case "expand": createT = createDefaultColumn; break;
			case "default": createT = createDefaultColumn; break;
			case "action": createT = createButtonColumn; break;
			default: createT = createDefaultColumn; break;
		}
		return createT(option, vm);
	}

	/***
	 * 创建默认列node
	 */
	function createDefaultColumn(option, vm) {
		var createElement = vm.$createElement;
		var columnProp = {
			type: option.type,
			prop: option.field,
			label: option.title,
			dbcolumn: option.column,
			column: option.column,
			align: option.align,
			width: option.width,
			sortable: option.sortable ? "custom" : false,
			"show-overflow-tooltip": true
		};
		
		var template = option.template;
		if(true && (template === null || template === undefined || /^\s*$/g.test(template))) {
			return createElement("el-table-column", {props: columnProp})
		} else {
			//使用自定义模版
			return createElement("el-table-column", {
				props: columnProp,
				scopedSlots: {
					default: function(scope) {
						var render = Vue.compile("<div>" + template + "</div>", null, vm).render;
						//将scope作为一个属性，让vue模版可以直接访问(底层通过with(this)方法查找词法作用域)
						var p = Object.create(vm);
						p.scope = scope;
						return render.call(p);
					}
				}
			});
		}
	}
	
	/**
	 * 选择列
	 */
	function createSelectionColumn(option, vm) {
		var createElement = vm.$createElement;
		return createElement("el-table-column", {
			props: {
				type: "selection",
				align: "center",
				width: 30
			}
		});
	}
	
	/**
	 * 展开列vnode
	 */
	function createExpandColumn(option, vm) {
		return createDefaultColumn(option, vm);
	}
	
	/**
	 * 按钮列vnode
	 */
	function createButtonColumn(option, vm) {
		var createElement = vm.$createElement;
		var columnProp = {
			type: "default",
			label: option.title,
			align: option.align,
			width: option.width
		};
		
		var template = option.template || [];
		return createElement("el-table-column", {
			props: columnProp,
			scopedSlots: {
				default: function(scope) {
					return createColumnButtonVnode(option.template, vm, scope);
				}
			}
		});
	}
	
	/***
	 * 创建按钮vnodes
	 */
	function createColumnButtonVnode(btns, vm, scope) {
		var createElement = vm.$createElement;
		/**
		 * 过滤
		 */
		function filter(btns) {
			var p = Object.create(vm);
			p.scope = scope;
			return btns.filter(function(btn) {
				return btn.visible.call(p);
			});
		}
		
		/**
		 * 下拉按钮
		 */
		function createDropdownButton(btns) {
			var dropItem = btns.map(btn => {
				return createElement("el-dropdown-item", {
					"nativeOn": {
						click: function($event) {
							btn.func.call(vm, scope);
						}
					}
				}, [btn.name])
			});
			
			var dropWrapper = createElement("el-dropdown", {
				props: {
					"trigger": "click",
					"menu-align": "end"
				}
			}, [createElement("span",{
				"class": "el-dropdown-link"
			}, ["更多", createElement("i", {"class": "el-icon-caret-bottom el-icon--right"})]) /*更多*/, 
				createElement("el-dropdown-menu", {
					"slot": "dropdown"
				}, dropItem/*下拉选项*/) 
			]);
			
			return dropWrapper;
		}
		
		/**
		 * 文本按钮
		 */
		function createButton(btns) {
			return btns.map(btn => {
				return createElement("el-button", {
					props: {
						type: "text"
					},
					on: {
						click: function($event) {
							$event.stopPropagation();
							$event.preventDefault();
							btn.func.call(vm, scope);
						}
					}
				}, [btn.name])
			});
		}
		
		var availableBtns = filter(btns); //过滤出满足条件的按钮
		if(availableBtns.length > 2) {
			var vnodes = [];
			vnodes.push(createButton(availableBtns.slice(0, 1)));
			vnodes.push(" | ");
			vnodes.push(createDropdownButton(availableBtns.slice(1)));
			return vnodes;
		} else if(availableBtns.length == 2) {
			var vnodes = createButton(availableBtns);
			vnodes.splice(1, 0, " | ");
			return vnodes;
		} else if(availableBtns.length == 1) {
			return createButton(availableBtns);
		}
 	}
	
	
	function createPagination(option, vm) {
		if(!option || !option.enable)
			return null;
		
		var createElement = vm.$createElement;
		var pagination = vm.pagination;
		var sizeChange = vm.$sizeChange;
		var pageChange = vm.$pageChange;
		
		if(!sizeChange || !pageChange)
			throw new Error("$sizeChange或者$pageChange未定义");
		
		var props = {
			"page-sizes": pagination.sizeOpts,
			"total": pagination.total,
			"current-page": pagination.page,
			"page-size": pagination.size,
			"layout": "total, sizes, prev, pager, next, jumper"
		};
		
		return createElement("el-pagination", {
			class: "template-table-pagination",
			props: props,
			on: {
				"size-change": sizeChange,
				"current-change": pageChange
			}
		});
	}
	
	return function(setting) {
		return {
			data: function() {
				return data(setting)
			},
			method: function() {
				return method(setting);
			},
			render: function(vm) {
				var createElement = vm.$createElement;
				var enabelPage = setting.pagination && setting.pagination.enable;
				return createElement("div", {}, [
					/* 渲染表格 */
					createTable(setting, vm), 
					/* 如果启用分页才渲染分页组件 */
					enabelPage ? createPagination(setting.pagination, vm) : null 
				])
			}
		}
	}
})