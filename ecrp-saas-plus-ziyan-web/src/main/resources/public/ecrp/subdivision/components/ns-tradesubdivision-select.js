/**
 * 交易分层组件
 *
 * */
define(['jquery', 'vue', 'nui',"/public/ecrp/components/ns-item-conditions-select.js", "/public/ecrp/components/ns-shoplist-select.js","/public/ecrp/components/ns-select.js"], function ($, Vue, nui) {

	var $template = `
	<el-dialog  ref="nsTradeSubdivision" 
		 title="交易分层"  v-model="dialogTradeVisible" :close-on-click-modal="false" :modal-append-to-body="false" size="large">
	<el-form ref="tradeComponent" :model="model" placement="right" label-width="90px" >
	<el-form-item label="客户订单：">
		<el-form-grid size="xxs">
			   <el-select v-model="model.manzu"  placeholder="请选择" class="el-select__gray">
               <el-option label="满足" value="0"></el-option>
               <el-option label="不满足" value="1"></el-option>
				</el-select>
		</el-form-grid>
		<el-form-grid>以下条件</el-form-grid>
	</el-form-item>
           <el-row>
             <el-col :span="12">
	<el-form-item label="时间选择：">
		<el-form-grid>
		  <el-radio-group v-model="model.timetype" >
			<el-radio label="1">绝对时间</el-radio>
			<el-radio label="2">相对时间</el-radio>
		  </el-radio-group>
		</el-form-grid>  
	</el-form-item>
	<el-form-item label="下单时间：">
	<el-form-grid  v-if="model.timetype == 1">
	 	<el-date-picker :editable="false"  v-model="model.orderdatebegin" type="date" placeholder="选择日期时间"></el-date-picker>
	</el-form-grid>
	<el-form-grid v-if="model.timetype == 1">~</el-form-grid>
	<el-form-grid  v-if="model.timetype == 1">
 		<el-date-picker :editable="false"  v-model="model.orderdateend" type="date" placeholder="选择日期时间"></el-date-picker>
 	</el-form-grid>
	<el-form-grid v-if="model.timetype == 2">
		<el-form-grid>距离当前</el-form-grid>
		<el-form-grid size="sm">
		 <el-row>
           <el-col :span="11">
             <el-input type="number" v-model="model.orderdaybegin" placeholder="" :max="5000" class="text-right"></el-input>
           </el-col>
           <el-col :span="2" class="text-center">~</el-col>
           <el-col :span="11">
             <el-input  v-model="model.orderdayend" placeholder="" :max="5000" class="text-right"></el-input>
           </el-col>
         </el-row>
         </el-form-grid>
         <el-form-grid>天</el-form-grid>
         
         <!-- 
                   <el-form-grid size="xs">
           <el-time-picker v-model="model.ordertimebegin"></el-time-picker>
         </el-form-grid>
         <el-form-grid>~</el-form-grid>
                   <el-form-grid size="xs">
           <el-time-picker v-model="model.ordertimeend"></el-time-picker>
         </el-form-grid>
         -->
       </el-form-grid>
	</el-form-item>	
		
	<el-form-item label="付款时间：">
	
	<el-form-grid  v-if="model.timetype == 1">
		<el-date-picker :editable="false"  v-model="model.paydatebegin" type="date" placeholder="选择日期时间"></el-date-picker>
	</el-form-grid>
	<el-form-grid v-if="model.timetype == 1">~</el-form-grid>
	<el-form-grid  v-if="model.timetype == 1">
 		<el-date-picker :editable="false"  v-model="model.paydateend" type="date" placeholder="选择日期时间"></el-date-picker>
 	</el-form-grid>
	<el-form-grid v-if="model.timetype == 2">
		<el-form-grid>距离当前</el-form-grid>
		<el-form-grid size="sm">
		 <el-row>
           <el-col :span="11">
             <el-input type="number" v-model="model.paydaybegin" placeholder="" :max="5000" class="text-right"></el-input>
           </el-col>
           <el-col :span="2" class="text-center">~</el-col>
           <el-col :span="11">
             <el-input  v-model="model.paydayend" placeholder="" :max="5000" class="text-right"></el-input>
           </el-col>
         </el-row>
         </el-form-grid>
         <el-form-grid>天</el-form-grid>
         <!-- 
                   <el-form-grid size="xs">
           <el-time-picker v-model="model.paytimebegin"></el-time-picker>
         </el-form-grid>
         <el-form-grid>~</el-form-grid>
                   <el-form-grid size="xs">
           <el-time-picker v-model="model.paytimeend"></el-time-picker>
         </el-form-grid>
         -->
       </el-form-grid>
	
	</el-form-item>
	<el-form-item label="发货时间：">
	<el-form-grid  v-if="model.timetype == 1">
		<el-date-picker :editable="false"  v-model="model.deliverydatebegin" type="date" placeholder="选择日期时间"></el-date-picker>
	</el-form-grid>
	<el-form-grid v-if="model.timetype == 1">~</el-form-grid>
	<el-form-grid  v-if="model.timetype == 1">
 		<el-date-picker :editable="false"  v-model="model.deliverydateend" type="date" placeholder="选择日期时间"></el-date-picker>
 	</el-form-grid>
	<el-form-grid v-if="model.timetype == 2">
		<el-form-grid>距离当前</el-form-grid>
		<el-form-grid size="sm">
		 <el-row>
           <el-col :span="11">
             <el-input type="number" v-model="model.deliverydaybegin" placeholder="" :max="5000" class="text-right"></el-input>
           </el-col>
           <el-col :span="2" class="text-center">~</el-col>
           <el-col :span="11">
             <el-input  v-model="model.deliverydayend" placeholder="" :max="5000" class="text-right"></el-input>
           </el-col>
         </el-row>
         </el-form-grid>
         <el-form-grid>天</el-form-grid>
         <!--
                   <el-form-grid size="xs">
           <el-time-picker v-model="model.deliverytimebegin"></el-time-picker>
         </el-form-grid>
         <el-form-grid>~</el-form-grid>
                   <el-form-grid size="xs">
           <el-time-picker v-model="model.deliverytimeend"></el-time-picker>
         </el-form-grid>
         -->
       </el-form-grid>
	</el-form-item>
	<el-form-item label="结束时间：">
	<el-form-grid  v-if="model.timetype == 1">
		<el-date-picker :editable="false"  v-model="model.finaldatebegin" type="date" placeholder="选择日期时间"></el-date-picker>
	</el-form-grid>
	<el-form-grid v-if="model.timetype == 1">~</el-form-grid>
	<el-form-grid  v-if="model.timetype == 1">
 		<el-date-picker :editable="false"  v-model="model.finaldateend" type="date" placeholder="选择日期时间"></el-date-picker>
 	</el-form-grid>
	<el-form-grid v-if="model.timetype == 2">
		<el-form-grid>距离当前</el-form-grid>
		<el-form-grid size="sm">
		 <el-row>
           <el-col :span="11">
             <el-input type="number" v-model="model.finaldaybegin" placeholder="" :max="5000" class="text-right"></el-input>
           </el-col>
           <el-col :span="2" class="text-center">~</el-col>
           <el-col :span="11">
             <el-input  v-model="model.finaldayend" placeholder="" :max="5000" class="text-right"></el-input>
           </el-col>
         </el-row>
         </el-form-grid>
         <el-form-grid>天</el-form-grid>
         <!--
                   <el-form-grid size="xs">
           <el-time-picker v-model="model.finaltimebegin"></el-time-picker>
         </el-form-grid>
         <el-form-grid>~</el-form-grid>
                   <el-form-grid size="xs">
           <el-time-picker v-model="model.finaltimeend"></el-time-picker>
         </el-form-grid>
         -->
       </el-form-grid>
	</el-form-item>
	
	
<el-form-item label="次数：" class="el-inline-block">
 <el-form-grid size="sm">
   <el-row>
     <el-col :span="11">
       <el-input type="number" v-model="model.timesbegin"  :max="5000" class="text-right"></el-input>
     </el-col>
     <el-col :span="2" class="text-center">~</el-col>
     <el-col :span="11">
       <el-input placeholder=""  v-model="model.timesend" :max="5000" class="text-right"></el-input>
     </el-col>
   </el-row>
 </el-form-grid>
                 <el-form-grid class="text-warning">
                   <el-tooltip effect="light" placement="right">
                     <i class="bui-info"></i>
                     <div slot="content">次数是以下单时间进行统计（次数为同一用户当天购买多次只算一次购买）</div>
                   </el-tooltip>
                 </el-form-grid>
               </el-form-item>
               <el-form-item label="件数：">
 <el-form-grid size="sm">
   <el-row>
     <el-col :span="11">
       <el-input type="number" v-model="model.piecebegin" placeholder="" :max="5000" class="text-right"></el-input>
     </el-col>
     <el-col :span="2" class="text-center">~</el-col>
     <el-col :span="11">
       <el-input placeholder="" v-model="model.pieceend"  :max="5000" class="text-right"></el-input>
     </el-col>
   </el-row>
 </el-form-grid>
                 <el-form-grid class="text-warning">
                   <el-tooltip effect="light" placement="right">
                     <i class="bui-info"></i>
                     <div slot="content">件数是以下单时间进行统计</div>
                   </el-tooltip>
                 </el-form-grid>
               </el-form-item>
               <el-form-item label="金额：">
 <el-form-grid size="sm">
   <el-row>
     <el-col :span="11">
       <el-input type="number" v-model="model.moneybegin" placeholder="" :max="5000" class="text-right"></el-input>
     </el-col>
     <el-col :span="2" class="text-center">~</el-col>
     <el-col :span="11">
       <el-input placeholder="" v-model="model.moneyend" :max="5000" class="text-right"></el-input>
     </el-col>
   </el-row>
 </el-form-grid>
 <el-form-grid class="text-warning">
   <el-tooltip effect="light" placement="right">
     <i class="bui-info"></i>
                     <div slot="content">金额是以下单时间进行统计</div>
   </el-tooltip>
 </el-form-grid>
</el-form-item>
             </el-col>
             <el-col :span="12">
 <el-form-item label="订单类型：">
 <el-form-grid size="xmd">
 	<ns-select 
	url="/base/common/queryDataDictionary4Select?type=orderType"  
	placeholder="请选择"
	    v-model="model.tradetype"
	    ref="tradetype"  clearable
	    filterable></ns-select>
 </el-form-grid>
</el-form-item>	
 <el-form-item label="单笔订单金额：">
 <el-form-grid size="sm">
   <el-row>
     <el-col :span="11">
       <el-input type="number"  v-model="model.trademoneybegin" placeholder="" :max="5000" class="text-right"></el-input>
     </el-col>
     <el-col :span="2" class="text-center">~</el-col>
     <el-col :span="11">
       <el-input placeholder=""  v-model="model.trademoneyend" :max="5000" class="text-right"></el-input>
     </el-col>
   </el-row>
 </el-form-grid>
 <el-form-grid>单笔订单件数：</el-form-grid>
 <el-form-grid size="sm">
   <el-row>
     <el-col :span="11">
       <el-input type="number"  v-model="model.tradepiecebegin" placeholder="" :max="5000" class="text-right"></el-input>
     </el-col>
     <el-col :span="2" class="text-center">~</el-col>
     <el-col :span="11">
       <el-input placeholder="" v-model="model.tradepieceend" :max="5000" class="text-right"></el-input>
     </el-col>
   </el-row>
 </el-form-grid>
</el-form-item>	
	
<el-form-item label="订单状态：">
 <el-form-grid size="lg">
	<ns-select 
	url="/base/common/queryDataDictionary4Select?type=tradeStatus"  
	placeholder="请选择"
	    v-model="model.tradestatelist"
	    ref="tradestatelist" 
	     multiple></ns-select>
 </el-form-grid>
</el-form-item>
<el-form-item label="预定状态：" v-if="model.tradetype == 'step'">
<el-form-grid size="xmd">
<el-select v-model="model.reservetype" ref="reservetype"  multiple  placeholder="请选择">
<el-option label="定金未付，尾款未付" value="定金未付，尾款未付"></el-option>
<el-option label="定金已付，尾款未付" value="定金已付，尾款未付"></el-option>
<el-option label="定金已付，尾款已付" value="定金已付，尾款已付"></el-option>
</el-option>
</el-select>
</el-form-grid>
</el-form-item>
<el-form-item label="邮费：">
 <el-form-grid>
   <el-radio-group v-model="model.postage" >
     <el-radio label="0" >不限</el-radio>
     <el-radio label="1" >邮费区间</el-radio>
   </el-radio-group>
 </el-form-grid>
 <el-form-grid size="sm" v-show="model.postage == '1'">
   <el-row>
     <el-col :span="11">
       <el-input type="number" v-model="model.postagebegin" placeholder="" :max="5000" class="text-right"></el-input>
     </el-col>
     <el-col :span="2" class="text-center">~</el-col>
     <el-col :span="11">
       <el-input placeholder="" v-model="model.postageend" :max="5000" class="text-right"></el-input>
     </el-col>
   </el-row>
 </el-form-grid>
</el-form-item>
<el-form-item label="优惠券：">
 <el-form-grid>
   <el-radio-group v-model="model.coupon" >
     <el-radio label="0">不限</el-radio>
     <el-radio label="1">优惠金额</el-radio>
   </el-radio-group>
 </el-form-grid>
 <el-form-grid size="xmd" v-show="model.coupon == '1'">
   <el-input v-model="model.couponmoney"  placeholder="多个以;隔开"></el-input>
 </el-form-grid>
</el-form-item>

<el-form-item label="备注旗帜：">
 <el-form-grid>
   <el-radio-group v-model="model.markflag">
     <el-radio label="-1">不限</el-radio>
     <el-radio label="0"><i class="bui-flag text-gray"></i></el-radio>
     <el-radio label="1"><i class="bui-flag text-danger"></i></el-radio>
     <el-radio label="2"><i class="bui-flag text-warning"></i></el-radio>
     <el-radio label="3"><i class="bui-flag text-success"></i></el-radio>
     <el-radio label="4"><i class="bui-flag text-info"></i></el-radio>
     <el-radio label="5"><i class="bui-flag text-purple"></i></el-radio>
   </el-radio-group>
 </el-form-grid>
</el-form-item>
<el-form-item label="订单备注：">
                 <el-form-grid block>
   <el-input type="textarea" v-model="model.trademark" placeholder="请输入订单备注"></el-input>
 </el-form-grid>
</el-form-item>
<el-form-item label="订单渠道来源：">
<el-button type="primary" @click="openShopSelect1()"><i class="bui-select-shops"></i> 选择店铺</el-button>
<el-form-grid v-if="chooseShopCode.length > 0">
已经选择了<b class="text-danger">{{chooseShopCode.length}}</b>家店铺
</el-form-grid> 
<ns-shoplist-select ref="brandTree1" :url="brand4shopurl" @callback="doBrandMultilayer1" nesting></ns-shoplist-select>
  </el-form-item>
  <el-form-item label="终端：">
 <el-form-grid size="xmd">
   <ns-select 
	url="/base/common/queryDataDictionary4Select?type=terminal"  
	placeholder="请选择"
	    v-model="model.tagend"
	   
	    ref="tagend" 
	    filterable multiple></ns-select>
 </el-form-grid>
 </el-form-item>
             </el-col>
           </el-row>

	<el-form-item label="订单商品：">
	<ns-item-conditions-select ref="choosegoods"
       @callback="goodscallback" 
       
       :goods="model.goods_ids"
       :conditions="model.goods_condition"
       >
	</ns-item-conditions-select>
	</el-form-item>

	</el-form>
	
  
   <div slot="footer" class="dialog-footer">
       <el-button @click.native="close">取消</el-button>
       <el-button type="primary" @click.native="callback">确定</el-button>
   </div>
</el-dialog>
	`;

	// 缓存组件vue对象
	var gsVue = null;
	// 分页对象
	var ns_pagination = {
		enable: true,
		total: 0,
		currPage: 1,
		currSize: 10
	};
	// 排序
	var ns_order = {
		orderKey: "",
		orderDir: ""
	};

	/**
	 * 工具类
	 */
	class _util_ {
		static getLimit() {
			if (this.ns_pagination.enable) {
				return {
					start: (this.ns_pagination.currPage - 1) * this.ns_pagination.currSize,
					length: this.ns_pagination.currSize
				}
			} else {
				return {
					start: 0,
					length: 1000
				}
			}
		}

		static getOrder() {
			return this.ns_order;
		}

	}

	/**
	 * 添加数据
	 * @param targetRows 最终数据
	 * @param sourceRows 源数据
	 */
	function addRows(targetRows, sourceRows) {
	}

	/**
	 * 添加条件数据
	 * 
	 * @param targetRows
	 * @param row
	 */
	function addConditionRows(targetRows, row) {
		if (row.text) {
			var exist = false;
			for (var i = 0; i < targetRows.length; i++) {
				if (row.title == targetRows[i].title && row.text == targetRows[i].text) {
					exist = true;
					break;
				}
			}
			if (!exist) {
				targetRows.push(row);
			}
		}
	}

	/**
	 * 从给定的数据删除数据
	 * @param rows 目标数据
	 * @param delRows 需要删除的数据
	 */
	function removeRows(rows, delRows) {
		for (var i = 0; i < delRows.length; i++) {
			for (var j = 0; j < rows.length; j++) {
				if (delRows[i].id === rows[j].id) {
					rows.splice(j, 1);
				}
			}
		}
	}

	/**
	 * 是否包含某一条数据
	 * 
	 * @param rows
	 * @param row
	 * @returns {boolean} 存在返回true，反之
	 */
	function hasRow(rows, row) {
		var exist = false;
		for (var i = 0; i < rows.length; i++) {
			if (rows[i].id === row.id) {
				exist = true;
				break;
			}
		}
		return exist;
	}

	/**
	 * 表格固定方法
	 *
	 */
	const built_in_methods = {
		sizeChange: function (val) {
			this.ns_pagination.currSize = val;
			this.ns_pagination.currPage = 1;
			this.reload();
		},
		pageChange: function (val) {
			this.ns_pagination.currPage = val;
			this.reload();
		},
		search: function (param) {
			this.ns_pagination.currPage = 1;
			this.searchMap = Object.assign({}, param);
			this.reload();
		},
		reload: function () {
			var limit = _util_.getLimit.call(this);
			var order = _util_.getOrder.call(this);
			var param = Object.assign({}, limit, order, this.searchMap);
			this.ns_table_ajax(param);
		},
		ns_table_ajax: function (param) {
			var that = this;
			$.post(that.url.table, param).done(function (resp) {
				function getData(resp) {
					var data = [];
					for (var i = 0; i < resp.data.length; i++) {
						data.push(resp.data[i]);
					}
					return data;
				}
				that.ns_pagination.total = resp.recordsTotal;
				that.gsData = getData(resp);
				// 等待表格渲染数据完成
				setTimeout(function () {
					that.toggleSelection();
				}, 50);
			}).fail(function (resp) {
				console.log(resp);
			})
		},
		ns_search: function () {
			this.search({searchMap: this.model});
		},
		// 重置查询条件
		ns_reset: function () {
			this.$data.model = {
				title: "",
				outerId: "",
				categoryId: null,
				categoryName: "",
				minPrice: null,
				maxPrice: null,
				manzu:"0",
				relation:"and",
				timetype:"1",
				orderdatebegin:"",
				orderdateend:"",
				orderdaybegin:"",
				orderdayend:"",
				ordertimebegin:"",
				ordertimeend:"",
				paydatebegin:"",
				paydateend:"",
				paydaybegin:"",
				paydayend:"",
				paytimebegin:"",
				paytimeend:"",
				deliverydatebegin:"",
				deliverydateend:"",
				deliverydaybegin:"",
				deliverydayend:"",
				deliverytimebegin:"",
				deliverytimeend:"",
				finaldatebegin:"",
				finaldateend:"",
				finaldaybegin:"",
				finaldayend:"",
				finaltimebegin:"",
				finaltimeend:"",
				timesbegin:"",
				timesend:"",
				piecebegin:"",
				pieceend:"",
				moneybegin:"",
				moneyend:"",
				tradetype:"",
				tradetypeValue:"",
				tradetypelist:[],
				trademoneybegin:"",
				trademoneyend:"",
				tradepiecebegin:"",
				tradepieceend:"",
				tradestatelist:[],
				tradestatelistValue:"",
				postage:"",
				postageend:"",
				coupon:"",
				couponmoney:"",
				markflag:"",
				trademark:"",
				tradechannelbrand:"",
				tradechannelbrandValue:"",
				tradechannelbrandlist:[],
				tradechannelshop:"",
				tradechannelshoplist:[],
				tagend:[],
				tagendValue:"",
				baohan:"",
				reservetype:[],
				reservetypeValue:"",
				goods_condition:{"title":[],"outerId":[],"cate":[],"price":[]},
				goods_ids:[],
				goods_names:""
			};
		},
		/**
		 * 当用户手动勾选数据行的 Checkbox 时触发的事件
		 * @param selection
		 * @param row
		 */
		selectHandle: function (selection, row) {
			var exist = hasRow(selection, row);
			if (!exist) {
				removeRows(this.$data.gsSelectedData, [row]);
			} else {
				addRows(this.$data.gsSelectedData, [row]);
			}
		},
		/**
		 * 当用户手动勾选全选 Checkbox 时触发的事件
		 * @param selection 选中的数组 （长度等于0表示全不选，大于0表示全选）
		 */
		selectAllHandle: function (selection) {
			if (selection.length == 0) {
				removeRows(this.$data.gsSelectedData, this.$data.gsData);
			} else {
				addRows(this.$data.gsSelectedData, this.$data.gsData);
			}
		},
		handleDetail: function (index, row) {
			alert(JSON.stringify(row.title));
		},
		/**
		 * 删除选中的商品
		 * @param index
		 * @param row
		 */
		delHandle: function (index, row) {
			this.$data.gsSelectedData.splice(index, 1);
			this.toggleSelection();
		},
		/**
		 * 删除选中的条件
		 * @param index
		 * @param row
		 */
		delConditionHandle: function (index, row) {
			this.$data.gsConditionData.splice(index, 1);
		},
		ns_saveCondition: function () {
			this.$data.activeName = "second";
			var row = {};
			row.title = "商品名称";
			row.text = this.$data.model.title;
			row.value = this.$data.model.title;
			addConditionRows(this.$data.gsConditionData, row);
			row = {};
			row.title = "商品编码";
			row.text = this.$data.model.outerId;
			row.value = this.$data.model.outerId;
			addConditionRows(this.$data.gsConditionData, row);
			row = {};
			row.title = "商品分类";
			row.text = this.$data.model.categoryName;
			row.value = this.$data.model.categoryId;
			addConditionRows(this.$data.gsConditionData, row);
			row = {};
			row.title = "价格区间";
			var price = "";
			if (this.$data.model.minPrice && this.$data.model.maxPrice) {
				price = this.$data.model.minPrice;
				price = price + "~" + this.$data.model.maxPrice;
				row.text = price;
				row.value = {
					minPrice: this.$data.model.minPrice,
					maxPrice: this.$data.model.maxPrice
				};
				addConditionRows(this.$data.gsConditionData, row);
			} else {
				if (this.$data.model.minPrice || this.$data.model.maxPrice) {
					this.$message({
						message: '请填写完整价格区间',
						type: 'warning'
					});
				}
			}
		},
		// 切换左边表格数据选中状态
		toggleSelection: function () {}
	};

	/**
	 * 数据对象
	 *
	 */
	var $data = function () {
		return {
			activeName: "first",
			editOrInsert:"",
			chooseShopCode:[],
			model: {
				title: "",
				outerId: "",
				categoryId: null,
				categoryName: "",
				minPrice: null,
				maxPrice: null,
				
			},
			callbackData:{},
			dialogTradeVisible: false,
			gsData: [], // 未选择的商品表格数据
			gsSelectedData: [], // 选中的商品表格数据
			gsConditionData: [], // 选中的条件
			ns_pagination: ns_pagination, // 分页参数
			ns_order: ns_order, // 排序
			custom: "custom",
			rules: {},
			searchMap: {},
			expand: false,
			searchValue: "",
			searchName: "",
			url: {
				table: ctx + "/base/common/queryItemPage"
			},
			// 下拉树配置项：
			dropTreeLable: '',
			dropTreeVisible: false,
			dropTreeList: [],
			droptreeWidth: '',
			brand4shopurl:"/base/common/getSysBrandShopListByUserId?id=0"
		}
	};

	/**
	 * 自定义方法
	 * 
	 */
	var $methods = {
			/**
			 * 店铺选择组件方法
			 * 
			 */
			doBrandMultilayer1: function(opt){
				var that = this;
				var opts = opt.data;
				that.$set(that,"chooseShopCode",opts);
				that.$set(that.model,"tradechannelbrandlist",opts);
				
			},
			//打开选择店铺
			openShopSelect1: function(){
			    var that = this;
			    var args = {
			        defaultCheckedKeys: []
			    }
			    if(that.$root.userId == ""){
			    	that.brand4shopurl = "/base/common/getSysBrandArray4Shop";
			    }else{
			    	 that.brand4shopurl = "/base/common/getSysBrandShopListByUserId?id="+that.$root.userId;
			    }
			    args.defaultCheckedKeys = that.chooseShopCode;
			    that.$nextTick(function(){
			    that.$refs.brandTree1.open(args);
			    });
			},
		// 初始化方法
		_init: function () {
			gsVue.ns_reset();
			gsVue.ns_pagination = {
				enable: true,
				total: 0,
				currPage: 1,
				currSize: 10
			};
			this.$data.activeName = "first";
			this.$data.gsSelectedData = [];
			this.$data.gsConditionData = [];
			gsVue.initDropTree();
		},
		/**
		 * 打开
		 */
		open: function (args) {
			var _this = this;
			gsVue._init();
			var opts = {};
			_this.model  = $.extend(_this.model, args);
			_this.$data.dialogTradeVisible = true;
			_this.$data.gsConditionData = opts.conditionData;
			// 延迟50ms，解决右边表格滚动条位置显示问题
			setTimeout(function () {
				addRows(_this.$data.gsSelectedData, opts.data);
				gsVue.reload();
			}, 50);
		},
		/**
		 * 关闭
		 */
		close: function () {
			this.$data.gsSelectedData = [];
			this.$data.gsConditionData = [];
			gsVue.ns_reset();
			this.$refs.tradestatelist.refresh();
			this.$refs.tagend.refresh();
			this.model.tagend = [];
			this.$set(this.model,"tagend",[]);
			this.$set(this.model,"tradestatelist",[]);
			this.model.tradestatelist = [];
			this.$refs.tradeComponent.resetFields();
			this.$data.dialogTradeVisible = false;
		},
		/**
		 * 回调
		 */
		callback: function () {
			
			this.$emit('callback', this.$data.model,this.editOrInsert);
			this.$data.dialogTradeVisible = false;
		},
		/**
		 * 商品数据回调
		 */
		goodscallback: function (opts) {
			Vue.set(this.$data.model,"goods_condition",opts.conditions);
			Vue.set(this.$data.model,"goods_ids",opts.goods);
			this.callbackData = opts;
		},
		// 表单下拉树 event
		handleShowDropTree: function () {
			this.droptreeWidth = this.$refs.droptreeInput.$el.clientWidth;
		},
		handleSelectValue: function (data) {
			this.model.categoryId = data.id;
			this.model.categoryName = data.label;
			this.dropTreeVisible = false;
		},
		// 表单下拉树 event/end
		handleRemove: function (file, fileList) {
			console.log(file, fileList);
		},
		handlePreview: function (file) {
			console.log(file);
		},
		// 初始化下拉树
		initDropTree: function () {
			var _this = this;
			$.post(ctx + "/base/common/querySellerCidTreeNode", {}).done(function (resp) {
				if (resp && resp.result && resp.result.children) {
					_this.dropTreeList = resp.result.children;
				} else {
					_this.dropTreeList = [];
				}
			}).fail(function (resp) {
				console.log(resp);
			});
		}
	};

	// 交易分层组件定义
	Vue.component("ns-tradesubdivision-select", {
		template: $template,
		data: $data,
		methods: Object.assign(built_in_methods, $methods),
		props: {},
		created: function () {
			
		},
		mounted: function () {
			gsVue = this;
		}
	});

});