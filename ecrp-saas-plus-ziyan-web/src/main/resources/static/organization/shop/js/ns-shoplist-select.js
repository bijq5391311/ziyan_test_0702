
define(['jquery', 'vue', 'nui','/public/ecrp/components/zy-ns-area.js','/public/ecrp/common/common.js','/public/ecrp/subdivision/components/ns-cascader.js'], function ($, Vue, nui,areas,common) {

	
	var $busTogglesTemplate = `<div class="tmp-toggles">
    <div class="tmp-choose__content"  ref="toggleContent">
      <slot></slot>
    </div>
    <div class="tmp-toggles__footer" v-show="isOverflow"
         @click="handleToggleFooter"
         @mouseenter="hovering = true"
         @mouseleave="hovering = false">
      <transition name="arrow-slide">
        <i :class="[toggleIconClass, { 'hovering': hovering }]"></i>
      </transition>
      <transition name="text-slide">
        <span v-show="hovering">{{ controlText }}</span>
      </transition>
    </div>
  </div>`
		
	Vue.component("bus-toggles",{
		template: $busTogglesTemplate,
		data () {
		      return {
		        isExpanded: false,
		        isOverflow: false,
		        hovering: false
		      }
		    },
		    props: {
		      maxHeight: {
		        type: Number,
		        default: 180
		      }
		    },
		    computed: {
		      // 选择商品 列表展开收缩切换结构 状态值
		      toggleIconClass () {
		        return this.isExpanded ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
		      },
		      controlText () {
		        return this.isExpanded ? '收缩' : '展开'
		      }
		      // 选择商品 列表展开收缩切换结构 状态值/end
		    },
		    methods: {
		      showToggleModel () {
		        if (this.$refs.toggleContent.clientHeight > this.maxHeight || this.$refs.toggleContent.clientHeight === 0) {
		          // 设置内容区域高度超出隐藏
		          this.$refs.toggleContent.style.overflow = 'hidden'
		          this.$refs.toggleContent.style.maxHeight = this.maxHeight + 'px'
		          // 显示底部
		          this.isOverflow = true
		        }
		      },
		      handleToggleFooter () {
		        this.isExpanded = !this.isExpanded
		        if (this.isExpanded) {
		          this.$refs.toggleContent.removeAttribute('style')
		        } else {
		          this.$refs.toggleContent.style.overflow = 'hidden'
		          this.$refs.toggleContent.style.maxHeight = this.maxHeight + 'px'
		        }
		      }
		    },
		    mounted () {
		      this.showToggleModel()
		    }
	})
	
	
	
	var $template = `
					<!-- 选择店鋪结果列表 列表展开收缩切换结构-->
					<div>
                   
                     <!--   <bus-toggles :max-height="190" >
                          <el-row class="tmp-choose" >
                            <el-col :span="24">
                              <div class="tmp-choose__title"><el-button type="primary" @click="open">选择店铺</el-button><span  class="total">已选择{{confirmGoodsData.length}}家店铺</span></div>
                              <ul class="tmp-choose__goods">
                                <li v-for="(goods,index) in confirmGoodsData" >
                                  <span class="g-name">{{goods.title}}</span>
                                </li>
                              </ul>
                            </el-col>
                          </el-row>
                        </bus-toggles>
                         /end 选择店铺结果列表 列表展开收缩切换结构-->
                        <!-- 选择店铺弹窗结构 -->
          <el-dialog :vetically="true" title="选择店铺" v-model="chooseGoodsVisible" content-min-height="475px" size="middle" :modal-append-to-body="false"  class="g-wrapper" custom-class="condition-dialog"  :close-on-click-modal="false" @close="goodsClose"  nesting>
           <div  v-loading="goodsLoading"  
                    element-loading-icon="<img src='../../public/bata/images/logo.png'>"
                    element-loading-text="拼命加载中">
            <el-row class="tmp-choose__condition"  :gutter="20">
              <el-col :span="15"  class="condition-left" ref="conditionItem">
                <el-form :inline="true" :model="model" ref="goodsForm" >
                <el-form-item>
                <el-form-grid>店铺品牌：</el-form-grid>
                <el-form-grid>
                	<el-select v-model="brandValue"   placeholder="请选择" class="is-gray">
                                <el-option :label="brand.k" :value="brand.v" v-for="(brand,index) in brands" :key="index"></el-option>
                    </el-select>
                </el-form-grid>
                 <el-form-item>
                 	<el-form-grid>店铺地区：</el-form-grid>
                 	<el-form-grid width="380">
                         <el-form-item prop="address">
                             <ns-area v-showRequired
                                v-model="Adress">
                             </ns-area>
                         </el-form-item>
                     </el-form-grid>
                 </el-form-item>
                  <el-form-item  label="门店名称：">
                    <el-form-grid  width="163">
                       <el-input v-model="shopName" placeholder="请输入门店名称"></el-input>
                    </el-form-grid>
                    <el-form-grid>门店编码：</el-form-grid>
                    <el-form-grid>
                        <el-input v-model="shopCode" placeholder="请输入门店编码"></el-input>
                    </el-form-grid>
                  </el-form-item>
                  
                  <el-form-item class="el-block condition-control">
                    <el-form-grid>
                      <el-button type="primary" @click="ns_search">搜索</el-button>
                      <el-button @click="ns_reset">重置</el-button>
                    </el-form-grid>
                  </el-form-item>
                </el-form>
                <el-table ref="goodsTable" :data="shopsData" 
                  @select="selectRow" 
                  @select-all="selectAll" 
                 :key="ns_pagination.currPage"
                 	v-loading="tableLoading"  
                    element-loading-icon="<img src='../../public/bata/images/logo.png'>"
                    element-loading-text="拼命加载中">
                 <el-table-column  type="selection" width="40" align="center"> </el-table-column>
                 <el-table-column property="id" label="店铺ID" show-overflow-tooltip></el-table-column>
                  <el-table-column property="label" label="店铺名称" show-overflow-tooltip></el-table-column>
                  <el-table-column property="code" label="店铺编码" show-overflow-tooltip width="120"></el-table-column>
                </el-table>
                <el-pagination v-if="ns_pagination.enable"
                  class="template-table-pagination"
                  layout="prev, pager, next"
                  :page-size="ns_pagination.currSize"
                  :current-page="ns_pagination.currPage"
                  :total="ns_pagination.total"
                  @current-change="pageChange">
                </el-pagination>
                </template>
              </el-col>
              <el-col :span="9" class="condition-right">
                <div class="tmp-choose__result">
                  <p class="title">已选择了{{goodsSelectedData.length}}家店铺</p>
                  <el-scrollbar ref="tmpChooseScroll"
                                wrap-class="tmp-choose__scroll">
                    <ul class="tmp-choose__goods">
                      <li v-for="(goods,index) in goodsSelectedData">
                        <span class="g-name">{{goods.label}}</span>
                        <a @click="deleteSelectedGoods('goodsSelectedData',index,goods.code)"><i class="g-delete bui-delete"></i></a>
                      </li>
                    </ul>
                  </el-scrollbar>
                </div>
              </el-col>
            </el-row>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="()=>{ this.chooseGoodsVisible = false}">取消</el-button>
              <el-button type="primary" @click="saveGoods">确定</el-button>
            </div>
          </el-dialog>
          <!-- /end 选择商品弹窗结构 -->
          
          
          </div>

	`;

	
	// 分页对象
	var ns_pagination = {
		enable: true,
		total: 0,
		currPage: 1,
		currSize: 10
	};
	// 排序
	
	var ns_order = {
		orderKey: "os.create_time",
		orderDir: "desc"
	};

	/**
	 * 表格固定方法
	 *
	 */
	var built_in_methods = {
		//表格页数条数改变
		sizeChange: function (val) {
			this.ns_pagination.currSize = val;
			this.ns_pagination.currPage = 1;
			this.reload();
		},
		//当前页改变
		pageChange: function (val) {
			this.tableLoading = true;
			this.ns_pagination.currPage = val;
			this.reload();
		},
		//重置分页信息
		resetPagination: function(){
			this.ns_pagination = {
					enable: false,
					total: 0,
					currPage: 1,
					currSize: 10
				};
		},
		search: function (params) {
			this.ns_pagination.currPage = 1;
			this.searchMap = Object.assign({}, params);
			this.reload();
		},
		reload: function () {
			var limit = this.ns_limit;
			var order = this.ns_order;
			var params = Object.assign({}, limit, order, {searchMap: this.searchMap});
			this.ns_table_ajax(params);
		},
        //转换sys_item_id 为id
		changeItemIdToID: function(param){
			var shopsData = [];
			param.map(function (item) {
                item.id = item.id;
                shopsData.push(item);
            })
			return shopsData;
		},
		ns_table_ajax: function (params) {
			var _this = this;
			$.post(_this.goodsTableUrl,params).done(function (resp) {
				if (resp.success && resp.result.data.length > 0){
					_this.$set(_this,'shopsData',_this.changeItemIdToID(resp.result.data));
					_this.$set(_this.ns_pagination,"total",resp.result.recordsTotal);
					_this.$set(_this.ns_pagination,"enable",true);
					
				} else {
					_this.shopsData = [];
					_this.$set(_this.ns_pagination,"enable",false);
				}
				setTimeout(()=>{
					_this.goodsLoading = false;
					_this.conditionLoading = false;
				},200)
				if(_this.chooseGoodsVisible){
					_this.$nextTick(function(){
						_this.toggleSelection(_this.goodsSelectedData,_this.shopsData);
					})
				}
				_this.tableLoading = false;
			}).fail(function (resp) {
				console.log(resp.msg);
				_this.$nextTick(function(){
					setTimeout(()=>{
						_this.goodsLoading = false;
						_this.conditionLoading = false;
					},200)
				})
				_this.tableLoading = false;
			});
		},
		ns_search: function () {
			var params = {
					brand : this.brandValue,
					channel: this.channelValue.value,
					sheng: this.Adress[0]?this.Adress[0]:"",
					shi: this.Adress[1]?this.Adress[1]:"",
					qu: this.Adress[2]?this.Adress[2]:"",
					shopCode: this.shopCode,
					shopName: this.shopName,
			}
			this.search(params);
		},
		// 重置查询条件
		ns_reset: function () {
			this.$set(this,"channelValue",{text:"",value:""});
			this.$set(this,"brandValue",'');
			this.$set(this,"Adress",[]);
			this.$set(this,"shopName",'');
			this.$set(this,"shopCode",'');
			this.$set(this,"searchMap", this.$options.data().searchMap);
            this.searchMap.shopCode = this.shopCode;
			this.reload();
		},
	}
	
	var originalCondition ={
			title: [{
				value: "",
				condition: ""
			}],
			outerId: [{
				value: ""
			}],
			price:[{
				minPrice: "",
				maxPrice: "",
				condition: ""
			}],
			cate: [{
				cateName: "",
				cid: "",
				condition: "",
				cateVisible: false
			}]
	}

	
	var props = {
		goods: {
			type: Array,
			default: function(){
				return []
			}
		},
		conditions: {
			type: Object,
			default: function(){
				return originalCondition
			}
		},
		goodsMaxCount: {
			type: Number,
			default: function(){
				return 500;
			}
		},
		showConditionsSelect:{
			type: Boolean,
			default: function(){
				return false;
			}
		},
		goodsTableUrl: {
			type: String,
			default:function(){
				return ctx + "/organization/shop/queryOutShopTreeNew";
			}
		},
		goodsCategoryUrl:{
			type: String,
			default:function(){
				return ctx+"";
			},
		},
		goodsDetailsUrl:{
			type: String,
			default:function(){
				return ctx+ "";
			}
		},
        shopCodes:{
            type: Array,
            default:function(){
                return [];
            }
        }
	};

	/**
	 * 自定义方法
	 * 
	 */
	var $methods = {
		//删除已选择商品
		deleteSelectedGoods: function($dataName,index,code){
			this.$data[$dataName].splice(index,1);
			//表格是否渲染
			if(this.$refs.goodsTable){
				for(var i = 0; i < this.shopsData.length; i++ ){
					if(code === this.shopsData[i].code){
						this.$refs.goodsTable.toggleRowSelection(this.shopsData[i],false);
						break;
					}
				}
			}	
		},
        changeCity:function(data){
			var that = this;
			if(data == 'sheng'){
				that.shi = '';
				that.qu = '';
			}else if(data == 'shi'){
                that.qu = '';
			}else if(data == 'qu'){

			}
		},
        changeChannel:function(data){
        	var that  = this;
            if(data == 'firstchannel'){
				that.secondchannel = '';
				that.thirdchannel = '';
            }else if(data == 'secondchannel'){
                that.thirdchannel = '';
            }else if(data == 'thirdchannel'){

            }
		},
	
		// tree 方法
		filterNode: function (value, data) {
			if (!value) {
				return true;
			}
			if (data.label) {
				return data.label.indexOf(value) !== -1;
			}
			return false;
		},
		//显示浮层时触发
		showPopover(type,dropTree,index){
			if(type){
				this.$refs[dropTree][index].setCheckedKeys(String(this.chooseCondition.cate[index].cid).split(','));
			}else{
				if(this.model.cate && this.model.cate != '')
					this.$refs.cateDropTreeInGoods.setCheckedKeys(String(this.model.cate).split(','));
			}
			
		},
		//隐藏浮层触发
		hidePopover(type,dropTree,index){
			if(type){
				this.$refs[dropTree][index].setCheckedKeys(String(this.chooseCondition.cate[index].cid).split(','));
			}else{
				this.$refs.cateDropTreeInGoods.setCheckedKeys([]);
			}
		},
		//价格验证
		conditionPriceValid(rule,val,callback,index){ 
    		if(parseInt(this.chooseCondition.price[index].minPrice) > parseInt(this.chooseCondition.price[index].maxPrice)){
    			callback(new Error(""));
    			this.$notify.warning("最小价格不能大于最大价格");
    		}
    		else
    			callback();
    	 },
    	 //商品价格验证
    	 goodsPriceValid(rule,val,callback){
    		 if(parseInt(this.model.minPrice) > parseInt(this.model.maxPrice)){
     			callback(new Error(" "));
     			this.$notify.warning("最小价格不能大于最大价格");
     		}
     		else
     			callback();
    	 },
    	 //价格限制输入
    	 limitInput(name){
    		 this.model[name]= this.LimitInputNumber(this.model[name]);	
    	 },
    	 //输入大于零小数点只有两位得数字
    	 LimitInputNumber(data){
    		 data = data.replace(/[^\d\.]/g,'');
    		 var index = data.indexOf('.');
    		 if(index != -1){
    			 data = data.substring(0,index+1)+data.substr(index+1,2).replace(/[^\d]/g,'');
    		 }
    		 return data;
    	 },
    	 //下拉树点击
    	 dropTreeNodeClick(data){
    		 this.model.cate = data.code;
    		 this.model.cateName = data.label;
    		 this.cateDropTreeVisible = false;
    	 },
		//打开选择商品弹窗
		open: function(args,key){


			this.chooseGoodsVisible = true;
			var shopCodeList = [];
      args.defaultCheckedKeys.map(function (item) {
        shopCodeList.push({code: item})
      })
      this.$set(this,"shopsData",[].concat(shopCodeList));
     this.$set(this,'goodsSelectedData',[].concat(shopCodeList));
			this._init();
		},

		//初始化回显条件
		initConditions(conditions){
			debugger
			if (!conditions.title || conditions.title.length == 0) {
				conditions.title = [{
						value:"",
						condition:""
				}]
			}
			if(!conditions.price || conditions.price.length == 0){
				conditions.price = [{
						minPrice:"",
						maxPrice:"",
						condition:""
				}]
			}
			if(!conditions.cate || conditions.cate.length == 0){
				conditions.cate = [{
						cid:"",
						condition:"",
						cateName:"",
						cateVisible:""
				}]
			}
			for(var i = 0 ;i <this.chooseCondition.cate.length; i++){
				this.chooseCondition.cate[i].cateVisible = false;	
				var cids = []
				if(this.chooseCondition.cate[i].cid != '')
					cids = this.chooseCondition.cate[i].cid.split(",");
				if(this.dropTreeList.length >0)
					this.$refs.cateDropTreeInCondition[i].setCheckedKeys(cids);		
			}
		},
		// 初始化方法
		_init: function () {
			this.ns_search();
			this.resetPagination();
		},
		
		/**
		 * 关闭
		 */
		goodsClose: function () {
			this.$set(this,"model",this.$options.data().model);
			this.$data.goodsVisible = false;
			this.goodsLoading =true;
		},
		conditionClose: function(){
			 this.$set(this,'chooseCondition',this.$options.data().chooseCondition); 
			 this.conditionLoading =true;
		},
		//保存商品
		saveGoods: function(){
			var goods = this.$data.goodsSelectedData
			if(goods.length > this.goodsMaxCount){
				this.$notify.warning("最多选择"+this.goodsMaxCount+"件商品");
			}else{
				this.$set(this,'confirmGoodsData',[].concat(goods));
				this.callback();
				this.$data.chooseGoodsVisible = false;
			}
		},
		//保存条件
		saveCondition: function(){
			var conditions = $.extend(true, {},this.$data.chooseCondition);
			this.confirmConditionData = conditions;
			this.conditionLength = this.hasConditionLen(this.confirmConditionData);
			this.callback();
			this.$data.chooseConditionVisible = false;
		},
		/**
		 * 回调
		 */
		callback: function () {
			var opts = {};
			 opts.data =  this.handleGoodsData(this.confirmGoodsData);
			 this.$root.type = "0";
			this.$emit('callback', opts);
			this.$set(this,"confirmGoodsData",[]);
		},
		// 选择商品下拉树 
		handleGoodsShowDropTree: function () {
			this.droptreeWidth = this.$refs.goodsDropTreeInput.$el.clientWidth;
		},
		//选择条件下拉树
		handleConditionShowDropTree: function (index) {
			this.droptreeWidth = this.$refs.conditionDroptreeInput[index].$el.clientWidth;
		},
		//删除条件
		deleteCondition: function(type,index){
			delete this.confirmConditionData[type].splice(index,1);
			this.conditionLength = this.hasConditionLen(this.confirmConditionData);
		},
		//下拉树确定选中
		confirmCheck: function(dropTree,type,index){
			var checkArr = [];
			if(type != 'condition'){
				checkArr = this.$refs[dropTree].getCheckedNodes();
			}else{
				checkArr = this.$refs[dropTree][index].getCheckedNodes();
			}
			var checkArrLabel = [];
			var checkArrCode = [];
			for (var i = 0; i < checkArr.length; i++) {
				checkArrLabel.push(checkArr[i].label);
				checkArrCode.push(checkArr[i].code);
			}
			var cate=checkArrCode.join(',');
			if(type != 'condition'){
				this.model.cateName = checkArrLabel.join(',');
				this.model.cate = cate; 
				this.cateDropTreeVisible = false;
			}else{
				this.$set(this.chooseCondition.cate[index],"cid",cate);
				this.$set(this.chooseCondition.cate[index],"cateName", checkArrLabel.join(','));
				this.$refs['conditionpopover'][index].showPopper = false;
			}
		},
		// 添加条件
	    addItem (arr,conditionName,index) {
		  this.chooseCondition[conditionName][index].condition = 'and';
	      arr.push($.extend(true,{},originalCondition[conditionName][0]));
	    },
	    // 删除条件
	    deleteItem (arr, index) {
	      arr.splice(index, 1)
	    },

		//点击下拉树输入框图标触发
	   	 handleIconClick(){
	   		 this.model.cateName = '';
	   		 this.model.cate = '';
	   	 },
		//商品预览
		goodsPreview: function(){
			var titles="";
			var params = {
				searchMap: {
					conditions: JSON.stringify(this.chooseCondition)
				}
			}
			this.search(params);
		},
		
		//数组去重
		uniqueArray: function (array){ 
			var r = []; 
			for(var i = 0, l = array.length; i < l; i++) { 
				for(var j = i + 1; j < l; j++) 
					if (array[i].code === array[j].code)
						j = ++i; 
						r.push(array[i]); 
			} 
			return r; 
		},
		//处理返回的条件数据
		handleConditionData: function(data){
			var conditions = $.extend(true,{},data);
			conditions.cate.map((item,index)=>{
				delete item.cateVisible;
				delete item.cateName;
			})
			return conditions;
		},
		//处理返回的商品数据
		handleGoodsData: function(data){
            var shopCodes = [];
            if(data.length > 0){

                for(var i =0;i<data.length;i++ ){
					var treenode = {};
                	treenode.checked = false;
                	treenode.children = null;
                	treenode.code = null;
                	treenode.disabled = false;
                	treenode.ext1 = "0";
                	treenode.ext2 = null;
                	treenode.ext3 = null;
                	treenode.icon = null;
                	treenode.id = data[i].id;
                	treenode.isShopShopIcon = "0";
                	treenode.label = data[i].label;
                	treenode.map = null;
                	treenode.mark = false;
                	treenode.parentId = null;
                	treenode.platFormName = null;
                	treenode.ref = null;
                	treenode.showAdd = null;
                	treenode.showDelete = null;
                	treenode.showEdit = null;
                	treenode.code = data[i].code;
					shopCodes.push(treenode);
                }

			}
			// data.map((item,index)=>{
			// 	goods.push({id:item.id,title:item.title,outItemId:item.out_item_id});
			// })
			return shopCodes;
		},
		//计算条件数量
		hasConditionLen: function(conditions){
			var len = 0;
			conditions.title.map((item,i)=>{
					if(item.value != ''){
						len +=1; 
					}
			})
			conditions.outerId.map((item,i)=>{
					if(item.value != ''){
						len+=1; 
					}
			})
			conditions.price.map((item,i)=>{
					if(item.minPrice != '' && item.maxPrice != ''){
						len +=1; 
					}
			})
			conditions.cate.map((item,i)=>{
					if(item.cateName != '' && item.cid != ''){
						len +=1; 
					}
			})
			return len;
		},
		//重置数据
		resetData: function(){
			this.$set(this,"confirmConditionData",this.$options.data().confirmConditionData);
			this.$set(this,"chooseCondition",this.$options.data().chooseCondition);
			this.$set(this,"goodsSelectedData",this.$options.data().goodsSelectedData);
			this.$set(this,"confirmGoodsData",this.$options.data().confirmGoodsData);
			this.callback();
		},
		//商品列表回显
		toggleSelection: function(selected,rows){
			debugger
			for(var i = 0; i<rows.length; i++){
				for(var j = 0; j<selected.length; j++){
					if(selected[j].code > 100000){
						if(rows[i].code == selected[j].code ){
							this.$refs.goodsTable.toggleRowSelection(rows[i],true);
				            selected[j].label = rows[i].label;
				            selected[j].code = rows[i].code;
				            selected[j].id = rows[i].id;
				            break;
						}
					}else{
						if(rows[i].id == selected[j].code ){
							this.$refs.goodsTable.toggleRowSelection(rows[i],true);
				            selected[j].label = rows[i].label;
				            selected[j].code = rows[i].code;
				            selected[j].id = rows[i].id;
				            break;
						}
					}
					
				}
			}
		},
		//选中某行
		selectRow: function(selected,row){
			debugger
			var showSelectedList = this.goodsSelectedData;
			var check = false;
			for(var i = 0; i< selected.length; i++){
				if(selected[i].code == row.code){
					check = true;
					break;
				}
			}
			if(check){
				showSelectedList.push(row);
			}else{
				//删除未勾选商品数据
				for(var j = 0; j < showSelectedList.length; j++){
					if(showSelectedList[j].code == row.code){
						this.deleteSelectedGoods('goodsSelectedData',j,showSelectedList[j].code);
						break;
					}			
				}
			}
		},
		//表格勾选所有数据
		selectAll: function(selected){
			var goodsList = this.shopsData;
			var selectList = this.goodsSelectedData;
			if(selected.length == 0){
				for(var i = 0; i< goodsList.length; i++)
					this.selectRow(selected,goodsList[i]);
			}else{
				this.goodsSelectedData =this.uniqueArray(this.goodsSelectedData.concat(selected));
			}
		}
	};
	var computed = {
			"ns_limit": function(){
				return {
					start: (this.ns_pagination.currPage-1)*this.ns_pagination.currSize,
					length: this.ns_pagination.currSize
				}
			}
		};
	var mounted = function () {	
		var that = this;
		that.area =  areas.result;
		if(that.goods.length > 0){
            that.$set(that,"confirmGoodsData",[].concat(that.goods));
		}

		$.ajax({
			url:"/base/common/queryBrandList",
			data:"",
			type:"post",
			async:false,
			success:function(result){
				if(result.success){
					that.brands = result.result;
				}
			}
		});
	};
	var created = function () {
	};
	var watch = {
		//商品条件下拉树过滤
		"goodsFilter": function(val){
			this.$refs.cateDropTreeInGoods.filter(val);
		},
		//监听条件下拉树过滤
		"conditionsFilter": function(val){
			for(var i = 0;i < val.length; i++){
				this.$refs.cateDropTreeInCondition[i].filter(val[i]);
			}
		},
		//监听回传商品
		"goods": function(val){
			if(val instanceof Array){
				this.$set(this,"goodsSelectedData",[].concat(val));
				this.$set(this,"confirmGoodsData",[].concat(val));
			}else{
				throw new Error("商品数据类型初始化错误");
			}
			
		}
		

	};
	// 商品选择组件定义
	Vue.component("ns-shoplist-select", {
		template: $template,
		data:function (){
			return {
				shopsData: [],//商品列表数据
				chooseGoodsVisible: false, 
				chooseConditionVisible: false,
				chooseCondition: originalCondition,
				model:{
					title: "",
					outerId: "",
					cate:"",
					cateName: "",
					minPrice: null,
					maxPrice: null
				},
				area:[],		//省市区集合
				Props:{
					value:"label"


				},
				channelValue:{   //渠道
					text:"",
					value:""
				},
				brands:[],
				brandValue:"",		//品牌
				Adress:[],
				citys:[],			//城市
				shopName:"",       //门店名称
				shopCode:"",       //门店编码
				goodsFilter: "", //商品分类下拉树过滤文本
				conditionsFilter: [], //条件商品分类下拉树过滤文本
				goodsSelectedData: [], // 选中的商品表格数据
				confirmGoodsData: [], //确认选择的商品数据
				confirmConditionData: {
					title:"",
					outerId:"",
					cate:[],
					price:[],
				},//确认保存条件的数据
				goodsConditionData: [], // 选中的条件
				ns_pagination: ns_pagination, // 分页参数
				ns_order: ns_order, // 排序
				custom: "custom",
				searchMap: {
					title: "",
					outerId: "",
					minPrice: "",
					maxPrice: "",
					cate: "",
					shopCodes:''
				},
				goodsSku: [],
				// 下拉树配置项：
				cateDropTreeVisible: false,
				dropTreeList: [],
				droptreeWidth: '',
				conditionLength: 0, //已选择条件的数量
				// 下拉树配置项/end
				conditionLoading: true,
				goodsLoading: true,
				tableLoading: false,
			}
		},
		methods: Object.assign(built_in_methods, $methods),
		props: props,
		created:created,
		mounted: mounted,
		computed: computed,
		watch: watch
	});

});