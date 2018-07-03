define(["vue", "nui", "dsl/core/grid-dsl", "dsl/plugins/table2", "dsl/core/util", "dsl/plugins/button", "dsl/plugins/quick-search", "dsl/plugins/extend-form", "dsl/plugins/top-bar", "dsl/plugins/tree", "dsl/plugins/chart2", "/public/bata/extensions/vue-echarts/vue-echarts.js"], 
		function(Vue, Nui, toSetting, createTable, Util, createButton, createQuickSearch, createExtendForm, createTopBar, createTree, genChartOption, busEcharts) {	
	/**
	 * 
	 * */
	function detected(setting) {
		if(!setting.table)
			throw new Error("找不到table的配置");
		
		var pluginMap = {};
		pluginMap.table = genTableOption(setting.table);
		
		var topBarOption = genTableTopBarOption(setting.button, setting.quickSearch, setting.extendForm, setting);
		if(topBarOption)
			pluginMap.topBar = topBarOption;
		
		var treeOption = genTreeOption(setting.tree);
		if(setting.tree && setting.tree.enable && treeOption) 
			pluginMap.tree = treeOption;
		
//		需求变动，废弃
//		if(setting.chart && setting.chart.enable) 
//			pluginMap.chart = genChartOption(setting.chart);
		
		return pluginMap;
	}
	
	function genTableOption(setting) {
		return createTable(setting)
	}
	
	function genTableTopBarOption(buttonSetting, quickSearchSetting, extendFormSetting, setting) {
		if(extendFormSetting && extendFormSetting.inputs.length > 0)
			extendFormSetting.enable = true;
		
		return createTopBar(createButton(buttonSetting), createQuickSearch(null), createExtendForm(extendFormSetting), setting);
	}
	
	function genTreeOption(setting) {
		return createTree(setting);
	}
	
//	function genChartOption(setting) {
//		return createChart(setting);
//	}
	var chartTypeMap = {
		"table": {
			name: "表格",
			class: "bui-biaoge"
		},
		"bar": {
			name: "柱形图",
			class: "bui-zhuzhuangtu"
		},
		"pie": {
			name: "饼图",
			class: "bui-bingtu"
		},
		"line": {
			name: "线图",
			class: "bui-quxiantu"
		}
	}
	
	function createTag(createElement, option, vm, index) {
		return createElement("a", {
			on: {
				click: function() {
					vm.siderTabClick(index)
				}
			} 
		}, [
			createElement("i", {staticClass: option.class ||　chartTypeMap[option.type].class}),
			createElement("span", {}, [option.name || chartTypeMap[option.type].name])
		])
	}
	
	
	var methods = {
		// --------------- 高级表格与图表单的滚屏效果相关事件 ---------------
	    // 通用
	    // @description描述：设置内容区(可视区域)高度，用于el-scrollbar有效可视高度
	    // @param参数：element 指定元素，native 是否是原生的标签
	    setContentLimitHeight: function(element, native) {
	      let elOffsetTop = this.$el.offsetTop // 当前实例距离顶部距离（等同于顶部导航的高度）
	      let menuHeight = 46                  // 页面当中有tab页签时，对其赋值46，没有时置0
	      let footerPadding = 20               // 内容区域最底部下方间距，固定20，除非更改UI规则此值视情况面更改
	      let rightOffsetTop = 0               // 右侧内容区父级标签距离上一级间距
	      let scrollbarMargin = 0              // 使用el-scrollbar标签才有值
	      // 非原生标签，使用了el-scrollbar组件
	      if (!native) {
	        scrollbarMargin = parseInt(element.style.marginRight) // 滚动条组件内容对标签设置了margin-right="-XXpx"的值
	        if (element.parentNode.parentNode) {
	          rightOffsetTop = element.parentNode.parentNode.offsetTop
	        }
	      }
	      let limitHeight = document.body.offsetHeight - (elOffsetTop + rightOffsetTop + menuHeight + footerPadding + scrollbarMargin)
	      element.style.maxHeight = limitHeight + 'px'
	      return limitHeight + scrollbarMargin // 需要再减去外滚动区域的margin-right = -17
	    },
	    // 通用
	    // @description描述：获得内容区（如el-scroll）相应的 scrollTop等  参数：element 指定元素
	    getSiderParam: function(element) {
	      let scrollTop = element.scrollTop
	      let offsetHeight = element.offsetHeight
	      let scrollHeight = element.scrollHeight
	      let scrollbarMargin
	      if (element.style.marginRight) {
	        scrollbarMargin = parseInt(element.style.marginRight)
	      }
	      return {
	        'scrollTop': scrollTop,
	        'offsetHeight': offsetHeight,
	        'scrollHeight': scrollHeight,
	        'scrollbarMargin': scrollbarMargin
	      }
	    },
	    // 通用
	    // @description描述：获取需要用的滚屏的节点列表（如ul）相应的offsetTop与内容高度等
	    // @param参数：elemnet:指定滚屏列表（页）集合
	    getSiderItems: function(element) {
	      let itemOffsetTopArray = []        // 需要获取每个li的offsetTop
	      let itemChildHeightArray = []      // 需要获取每个li的内子节点的高度总和offsetHeight
	      for (let h = 0; h < element.children.length; h++) {
	        itemOffsetTopArray.push(element.children[h].offsetTop)
	        // 存在子节点时，将所有子节点占用的高度累加
	        if (element.children[h].children.length > 0) {
	          let child = element.children[h].children
	          let total = 0
	          for (let c = 0; c < child.length; c++) {
	            total += child[c].offsetHeight
	          }
	          itemChildHeightArray.push(total)
	        }
	      }
	      return {
	        itemEle: element.children,       // 指定节点的各子节点(children)数组
	        itemOffset: itemOffsetTopArray,  // 指定节点的各子节点(children)的offsetTop数组
	        itemHeight: itemChildHeightArray // 指定节点的各子节点(children)的实际内容区高度数组
	      }
	    },
	    // 通用
	    // @description描述：设置平滑滚动效果
	    // @param参数：elemnet:指定滚动区域元素，toNext：下一个目的区域（下一页）的offsetTop
	    siderMove: function(element, toNext) {
	      let value = toNext
	      let diff = element.scrollTop - value
	      const setMovefun = function callee () {
	        diff = diff / 1.2 | 0
	        element.scrollTop = value + diff
	        if (diff) this.itv = setTimeout(callee, 16)
	      }
	      setMovefun()
	    },
	    // 通用
	    // @description描述：重新绘制图表（对tab切换，或者首次滚动加载图表时，图表的高度无法及时应用父级100%高度）
	    // 通用 - 监听事件，包括scroll及mousewheel（指定滚动元素区域添加滚动）
	    // @param参数：ele：滚动元素， scrollFn： 滚动scroll监听事件， mousewheelFn：鼠标滚轮监听事件
	    listenerEvent: function(ele, scrollFn, mousewheelFn) {
	      // 右侧区域监听滚动变化
	      ele.addEventListener('scroll', scrollFn, true)
	      // 右侧区域监听鼠标滚动变化 - 翻屏
	      // 浏览器兼容 判断 (谷歌 addEventListener mousewheel /IE attachEvent mousewheel / FF addEventListener DOMMouseScroll)
	      if (navigator.userAgent.indexOf('Firefox') > -1) {
	        ele.addEventListener('DOMMouseScroll', mousewheelFn, false)
	      } else if (document.addEventListener) {
	        ele.addEventListener('mousewheel', mousewheelFn, true)
	      } else if (document.attachEvent) {
	        ele.attachEvent('onmousewheel', mousewheelFn)
	      } else {
	        ele.onmousewheel = mousewheelFn
	      }
	    },
	    setEchartHeight (height) {
	        // 创建针对echart高度配置的页面样式
	        const nod = document.createElement('style')
	        const cssStr = '.tmp-sider__echarts.echarts{ height:' + height + 'px !important;}'
	        nod.type = 'text/css'
	        if (nod.styleSheet) {         // ie下
	          nod.styleSheet.cssText = cssStr
	        } else {
	          nod.innerHTML = cssStr       // 或者写成 nod.appendChild(document.createTextNode(str))
	        }
	        document.getElementsByTagName('head')[0].appendChild(nod)
	      },
	    // 通用
	    // @description描述：鼠标滚轮事件
	    // @param参数：e：底层事件， scrollEle 滚动区域元素（el-scrollbar），itemEle: 用于滚动翻屏列表，validHeight:滚动区域有效高度
	    mousewheelEvent: function(e, scrollEle, itemEle, scrollHeight) {
	      // 如果不加时间控制，滚动会过度灵敏，一次翻好几屏
	      let startTime = 0 // 翻屏开始时间
	      let endTime = 0   // 翻屏结束时间
	      startTime = new Date().getTime()
	      // 重新绘制图表，高度做了变化
	      // 获取滚动方向，向上1还是向下-1
	      let that = this
	      let delta = e.wheelDelta / 120 || -e.detail / 3
	      clearTimeout(this.itv) // 先清空定时器
	      if ((endTime - startTime) < -400) {
	        const ev = e
	        this.itv = setTimeout(function () {
	          let scrollContent = scrollEle
	          let scrollItemParam = that.getSiderItems(itemEle) // 每个li的offsetTop与子节点高度总和数组
	          // 重新对高度进行赋值
	          for (let j = 0; j < scrollItemParam.itemHeight.length; j++) {
	            if (scrollItemParam.itemHeight[j] > scrollHeight) {
	              // 超过一屏且不满足一屏的倍数时，对其进行补上高度（基于有效区域高度的整倍数）
	              scrollItemParam.itemEle[j].style.height = scrollHeight * Math.ceil(scrollItemParam.itemHeight[j] / scrollHeight) + 'px'
	            } else {
	              scrollItemParam.itemEle[j].style.height = scrollHeight + 'px'
	            }
	          }
	          let nextScreenfun = function () {
	            if (delta < 0) {
	              current++
	              if (current > scrollItemParam.itemOffset.length - 1) current = scrollItemParam.itemOffset.length - 1
	            }
	            if (delta > 0) {
	              current--
	              if (current < 0) current = 0
	            }
	            that.siderMove(scrollContent, scrollItemParam.itemOffset[current])
	            endTime = new Date().getTime()
	          }
	          if (scrollItemParam.itemHeight[current] > that.validHeight) {
	            ev.preventDefault()
	            // 内容大于视口
	            // 判断何时开始做滚屏
	            if (scrollContent.scrollTop >= (scrollItemParam.itemHeight[current]) || (scrollItemParam.itemHeight[current - 1])) {
	              nextScreenfun()
	            }
	          } else {
	            // 内容小于视口
	            nextScreenfun()
	          }
	        }, 100)
	      } else {
	        // 阻止事件冒泡，也就是scroll 无法监听到
	        e.preventDefault()
	      }
	    },
	 // 通用
	    // @description描述：因加载时高度对其估了赋值，所以需要重新绘制图表
	    resetEchart: function() {
	    	var vm = this;
	    	Object.keys(vm.$refs).map(function(key) {
	    		if(key.startsWith("_chart_"))
	    			vm.$refs[key].resize();
	    	})
//	      this.$refs.quxianEchart.resize(this.option)
//	      this.$refs.zhuzhuangEchart.resize(this.option2)
	    },
	    // 左侧菜单 元素点击
	    // @param参数： （数组）序号
	    siderTabClick: function(index) {
	      let scrollContent = this.$refs.siderRightScroll.$el.children[0]
	      let scrollItemParam = this.getSiderItems(this.$refs.siderContentItem)
	      this.siderActive(index)
	      this.siderMove(scrollContent, scrollItemParam.itemOffset[index])
	    },
	    // 左侧菜单 元素当前选中判断
	    // @param参数： 序号
	    siderActive: function(index) {
	      // 获取 refs="siderTabs"下的所有a 标签，判断是否对其添加类 'is-active'
	      let itemArray = this.getSiderItems(this.$refs.siderTabs).itemEle
	      for (let a = 0; a <= itemArray.length; a++) {
	        // 获取出现的数据中，会出现一个多余的项undefined，所以需要将其排除
	        if (itemArray[a]) {
	          if (a === index) {
	            itemArray[a].className = 'is-active'
	          } else {
	            itemArray[a].className = ''
	          }
	        }
	      }
	    },
	    // 右侧内容：滚动监听事件(scroll)，更改refs="siderTabs"下元素的选中状态
	    siderScrollEvent () {
	      let scrollContentParam = this.getSiderParam(this.$refs.siderRightScroll.$el.children[0])
	      let scrollItemParam = this.getSiderItems(this.$refs.siderContentItem)
	      // 需要加一层判断是否到达底部 offsetHeight + scrollTop + scrollbarMargin >= scrollHeight
	      // 如果到达底部,也把当前选中状态赋值给最后一个节点块
	      if (scrollContentParam.scrollTop >= scrollItemParam.itemOffset[2]) {
	        this.siderActive(2)
	      } else if (scrollContentParam.scrollTop >= scrollItemParam.itemOffset[1]) {
	        this.siderActive(1)
	      } else {
	        this.siderActive(0)
	      }
	      // 当到达顶部时，当前页清零
	      if (scrollContentParam.scrollTop === 0) {
	        current = 0
	      }
	    },
	    // 右侧内容：滚动监听事件（mousewheel），翻页（屏）效果
	    siderMousewheelEvent (event) {
	      // 指定元素
	      this.mousewheelEvent(event, this.$refs.siderRightScroll.$el.children[0], this.$refs.siderContentItem, this.validHeight)
	    },
	    siderScrollEvent2 () {
	      console.log(current)
	    },
	    siderMousewheelEvent2 (event) {
	      this.mousewheelEvent(event, this.$refs.siderRightScroll2.$el.children[0], this.$refs.siderContentItem2, this.validHeight)
	    }
	}
	
	return function(dsl, option) {
		var setting = toSetting(dsl);
		var pluginMap = detected(setting);
		
		var dataFcs = []; // data function
		var methodFcs = [];
		Object.keys(pluginMap).map(function(key) {
			var plugin = pluginMap[key];
			if(plugin && plugin.data)
				dataFcs.push(plugin.data);
			if(plugin && plugin.method)
				methodFcs.push(plugin.method);
		});
		
		//创建数据，合并数据
		var data = function() {
			var _data = {
				form: {
					inputNodeMap: {},
					dslMap: {}
				},
				validHeight: ""
			};
			dataFcs.map(function(dataFc) {
				_data = Util.merge(_data, dataFc())
			});
			return _data;
		}
		
		methodFcs.map(function(methodFc) {
			methods = Util.merge(methods, methodFc());
		})
		
		var renderMainZone = function(vm) {
			return [pluginMap.table.render(vm)];
		};
//		test 数据
//		var chartOptions = [{
//			type: "bar",
//			row: {name: "Code", label: "类型"},
//			cols: [{name: "ID", label: "类1"}]
//		},{
//			type: "line",
//			row: {name: "Code", label: "类型"},
//			cols: [{name: "ID", label: "类1"}],
//		}]
		var chartOptions = dsl.chart.charts;
		
		var render = function(createElement) {
			var vm = this;
			var content = [createElement("div", {
				staticClass: "template-layout-right"
			}, [
				pluginMap.topBar.render(this),
				createElement("div", {}, renderMainZone(this))
			])];
			
			var chartTags = [createTag(createElement, {class: "bui-biaoge", name: "表格"}, vm, 0)];
	
			var charts = [createElement("li", {
				staticClass: "tmp-sider__item",
				staticStyle: {
					height: vm.validHeight + "px"
				}
			}, content)];
			
			chartOptions.map(function(option, index) {
				chartTags.push(createTag(createElement, option, vm, index + 1));
				charts.push(createElement("li", {
					staticClass: "tmp-sider__item",
					staticStyle: {
						height: vm.validHeight + "px"
					}
				}, [createElement("bus-echarts", {
					staticStyle: {
						height: "100%",
						width: "100%"
					},
					staticClass: "tmp-sider__echarts",
					props: {
						"auto-resize": true,
						options: genChartOption(option.type, vm.data, option),
					},
					ref: "_chart_" + index
				})]));
			})
			
			return createElement("div", {
				staticClass: "template-layout"
			}, [createElement("div", {
					staticClass: "tmp-sider"
				}, [
					createElement("div", {staticClass: "tmp-sider__tab", ref: "siderTabs"}, chartTags),
					createElement("el-scrollbar", {
						staticClass: "tmp-sider__content",
						props: {
							"outsider": true
						},
						ref: "siderRightScroll"
					}, [
						createElement("ul", {staticClass: "tmp-sider__list", ref: "siderContentItem"}, charts)
					])
				])]);
		};
		
		return {
			components: {
				"bus-echarts": {
					mixins: [busEcharts],
					mounted: function() {
					}
				}
			},
			data: data,
			methods: methods,
			render: render,
			directives: {
				"input-node": {
					bind: function(el, binding, vnode, oldvnode) {
						var vm = vnode._vm;
						var dsl = vnode._dsl;
						delete vnode._vm;
						delete vnode._dsl;
						vm.form.inputNodeMap[dsl.name] = vnode;
						vm.form.dslMap[dsl.name] = dsl;
					}
				}
			},
			mounted: function() {
				if(typeof this.$init === "function") {
					this.$init(this);
				} else if(this.options && this.options.$init 
						&& typeof this.options.$init === "function") {
					this.options.$init(this);
				} else {
					this.$reload();
				}
				
			    let that = this
			    // 对指定ref="siderRightScroll"区域添加滚动监听事件
			    // 如果此滚屏放入tab内，内里需要在tab-click内执行此段内容（注意元素标签的变化\图表重绘对应的标签且对应的scroll及mousewheel对应的事件也需重新指定），或者放到监听activeName事件下。
			    that.$nextTick(() => {
			      let listenerEle = that.$refs.siderRightScroll.$el.children[0] // 添加滚动监听的元素
			      addEventListener('resize', function () {
			        // 屏幕大小变化重新设置滚动内容区最大高度值(右侧区域)
			        that.validHeight = that.setContentLimitHeight(listenerEle)
			        // 设置图表高度
			        that.setEchartHeight(that.validHeight)
			      }, false)
			      that.$nextTick(() => {
			        // 设置滚动内容区最大高度值(右侧区域)
			        that.validHeight = that.setContentLimitHeight(listenerEle)
			        // 设置图表高度
			        that.setEchartHeight(that.validHeight)
			        // 重绘图表
			        that.resetEchart();
			        //that.resetEchart([{'name': 'quxianEchart', 'option': this.option}, {'name': 'zhuzhuangEchart', 'option': this.option2}])
			        // 添加监听事件
			        that.listenerEvent(listenerEle, that.siderScrollEvent, that.siderMousewheelEvent)
			      })
			    })
			}
		}
	}
});

