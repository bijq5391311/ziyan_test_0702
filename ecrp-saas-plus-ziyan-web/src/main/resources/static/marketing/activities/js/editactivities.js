require(["vue", "nui", "jquery","moment",
	"/static/marketing/activities/js/button/analysis.js",
    "/static/marketing/activities/js/button/coupon.js",
    "/static/marketing/activities/js/button/couponCare.js",
    "/static/marketing/activities/js/button/email.js",
    "/static/marketing/activities/js/button/file.js",
    "/static/marketing/activities/js/button/filter.js",
    "/static/marketing/activities/js/button/integral.js",
    "/static/marketing/activities/js/button/integralActivities.js",
    "/static/marketing/activities/js/button/join.js",
    "/static/marketing/activities/js/button/pick.js",
    "/static/marketing/activities/js/button/property.js",
    "/static/marketing/activities/js/button/red.js",
    "/static/marketing/activities/js/button/sms.js",
    "/static/marketing/activities/js/button/sub.js",
    "/static/marketing/activities/js/button/switch.js",
    "/static/marketing/activities/js/button/taobaoPromotion.js",
    "/static/marketing/activities/js/button/union.js",
    "/static/marketing/activities/js/button/user.js",
    "/public/ecrp/components/ns-droptree.js",
    "/public/ecrp/components/ns-select.js",
    "/public/ecrp/components/ns-brand-multi-select.js",
    "/static/marketing/activities/js/button/weixin.js",
	"/static/marketing/activities/js/button/shopCoupon.js"
	], function(Vue, Nui, $,moment) {

   window.vm = new Vue({
        el:"#editMxgraph",
        data: {
        	rules:{
        		shortLink:[{
                    validator: (rule, value, callback) => {
                    	var reg=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
                    	if(!reg.test(value)){
                    		callback(new Error("不是正确的网址，请注意检查一下"));
                    	}else {
                          callback();
                        }
                    }
              }]
        	},
        	shortLinkDialog:false,
        	
        	ShortUrl:{
        		shortLink:"",
        	},
        	shortLink:"",
        	url:{
        		oldUrl:"https://www.baidu.com",
        		newUrl:"http://9crm.cn/59bTS"
        	},
        	dsize:'small',
        	ban_disabled:false,
        	title:"流程设计",
        	editAccess:false,
        	currentView:'user-component',
        	style:'',
        	node:[],
        	dialogWidth:"",
            index:'',
            nodeid:"",
            nodedatamap:new Map(),
            nodejson:{},
            nodeedges:{}
        },
       created:function(){
            if(window.taskValues){
                this.nodejson = window.taskValues;
            }
       },
       mounted: function () {
    	   this.ban_disabled = Boolean($('#hidCanEdit').val()=='0');
       },
        methods:{
        	closeShortLink:function(){
        		this.shortLinkDialog = false;
        	},
        	createShortLink:function(){
        		var that = this;
        		var value = this.$root.$refs.oldLink.value;
        		if(value != ""){
        			$.ajax({
        				url:"/base/common/createShortLink",
        				data:{url:value},
        				type:"get",
        				success:function(data){
        					if(data.success){
        						that.url.oldUrl = value;
        						that.url.newUrl = data.result;
        					}
        				}
        			})
        		}else{
        			that.$notify.error({
        		          title: '错误',
        		          message: '输入地址不合法'
        		    });
        		}
//        		this.$root.$refs.oldLink
        	},
        	saveEdit:function(){
        		var that = this;
        		that.$root.$refs.component.$refs.contentform.validate(function(valid){
        			if(valid){
        			if(that.style == 'filter')
                   			that.$refs.component.loadSql();

        			if(that.style == 'property'){//如果是修改属性节点  需要去掉没操作的数据
        				var obj = that.$refs.component.Node;
        				//基础属性
        				var CameraAttributeArr = obj.CameraAttribute;
        				//自定义属性
        				var CustomPropertiesArr = that.$refs.component.CustomPropertiesMap;
        				//集团属性
        				var GroupAttributesArr = obj.GroupAttributes;
        				that.$refs.component.Node.spliceList = [];
        				that.$refs.component.Node.spliceList4CameraAttribute = [];

        				if(obj.sendTime == ''){
        					obj.sendTime = new Date();

        				}
        				for(var i=0; i<CameraAttributeArr.length; i++){//基础属性
        					if(!CameraAttributeArr[i].is_show && CameraAttributeArr[i].model==""){
        						that.$refs.component.Node.spliceList4CameraAttribute.push(CameraAttributeArr[i])
        						CameraAttributeArr.splice(i,1);
        						--i;
        					}
        				}

        				if(GroupAttributesArr.length>0){//处理集团属性
        					for(var i=0; i<GroupAttributesArr.length; i++){
        						that.$refs.component.Node.spliceList.push(GroupAttributesArr[i])
        						if(GroupAttributesArr[i].model=='' && GroupAttributesArr[i].disabled == 0){
        							GroupAttributesArr.splice(i,1);
        							--i;
        						}
        					}

        				}

        				if(CustomPropertiesArr){ // 处理自定义属性
        					obj.CustomProperties = [];
        					for ( var value in CustomPropertiesArr) {
        						var arr = CustomPropertiesArr[value];
        						for (var i = 0; i < arr.length; i++) {
        							if(arr[i].model!=='' || arr[i].show_select){
        								obj.CustomProperties.push(arr[i]);
        							}
								}
							}
        				}



        			}


               		 var node = $.extend(true, {}, that.$refs.component.Node);

                       var node = $.extend(true, {}, that.$refs.component.Node);
                       if(typeof(that.$root.$refs.component.nodelList)!="undefined"){
                 			 var nodeIdArr = that.$root.$refs.component.nodelList;
                 			node.nodeSeq ="";
                 			for (var i = 0; i < nodeIdArr.length; i++) {

                 				node.nodeSeq+=nodeIdArr[i].source.id;
                 				if(i!=nodeIdArr.length-1){
                 					node.nodeSeq+=","
                 				}

  						}

                 		 }
                       that.$root.node[that.style]=node;
                       that.$root.nodedatamap.set(that.nodeId,JSON.stringify(node));
                       that.$root.nodejson[that.nodeId] = node;

                       //保存打标
                       var allCells = currentGraph.getChildCells(currentGraph.getDefaultParent());
                       for (var i = 0; i < allCells.length; i++) {
                           if (!allCells[i].isEdge()) {
                               if(that.nodeId == allCells[i].getId()){
                                   var tipDate = "";
                                   if (that.style == "filter" || that.style =='user' || that.style =='sms' || that.style =='email'
                                       || that.style =='integral' || that.style =='integralActivities' || that.style =='red' || that.style =='coupon') {
                                       if ($("#hidActivityMode").val() == "1") {
                                           tipDate = "<span  cid='" + that.nodeId + "' class='nodeDateTip'>延时: " + node.marketingDelayHour + " 小时</span><br/>";
                                       } else {
                                           tipDate = "<span cid='" + that.nodeId + "' class='nodeDateTip'>" + moment(node.sendTime).format('YYYY-MM-DD HH:mm:ss') + '</span><br/>';
                                       }
                                   } else {
                                       tipDate = "<span cid='" + that.nodeId + "' class='nodeDateTip'></span>";
                                   }
                                   tipDate += '<code>'+ node.nodeName + '</code>';
                                   allCells[i].setValue(tipDate);
                                   window.DoDesign.setNodeIcon(currentGraph, allCells[i], 1);
                                   break;
                               }
                           }
                       }
                       that.editAccess=false;
        			}
        		})
        	},
        	isView:function(){
        		this.editAccess=true;
        		if(this.style !== 'filter'){
        			this.dseize="small";
        			this.dialogWidth=""
        		}
        		if(this.style == 'email' || this.style == 'sms'){
        			this.dialogWidth="820";
        		}
        		this.currentView=this.style+'-component';
        		this.index = this.$root.nodeId;
        		if(this.$refs.component){
                    this.$refs.component.setNodeData();
                }
        	},
        	replaceTime:function(time){
        		return moment(time).format('YYYY-MM-DD hh:mm:ss')
        	},
        	updateTitle:function(value){
        		if(typeof(value)!=='undefined'){
        			switch(value){
        				case ("analysis"):
        					this.title="分析节点"
        					break;
        				case ("user"):
        					this.title = "会员分组节点"
        					break;
        				case ("union"):
        					this.title="合并节点"
        					break;
        				case ("switch"):
        					this.title="排重节点"
        					break;

        				case ("couponCare"):
        					this.title=""
        					break;
        				case ("email"):
        					this.title="邮件节点"
        					break;
        				case ("sms"):
        					this.title="短信节点"
        					break;
        				case ("red"):
        					this.title="支付宝红包节点"
        					break;
        				case ("file"):
        					this.title="导入会员节点"
        					break;
        				case ("filter"):
        					this.title="筛选节点"
        						this.dialogWidth="820"
        						break;
        				case ("integral"):
        					this.title="积分节点"
        						break;
        				case ("integralActivities"):
        					this.title="积分活动节点"
        						break;
        				case ("coupon"):
        					this.title="淘系优惠券节点"
        						break;
        				case ("taobaoPromotion"):
        					this.title="淘系定向优惠券节点"
        						break;
        				case ("property"):
        					this.title="属性修改节点"
        						break;
        				case ("join"):
        					this.title="交集节点"
        						break;
        				case ("pick"):
        					this.title="抽取节点"
        						break;
        				case ("sub"):
        					this.title="排除节点"
        						break;
        				case ("weixin"):
        					this.title="微信节点"
        						break;
        				case ("shopCoupon"):
        					this.title="门店优惠券节点"
        						break;
        				case (""):
        					this.title=""
        						break;

        			}
        		}
        	},
            nodeNotifySuccess:function (msg) {
                this.$notify({
                    title: '成功',
                    message:msg,
                    type: 'success'
                });
            },
            nodeNotifyError:function (msg) {
                this.$notify.error({
                    title: '错误',
                    message:msg
                });
            },
            nodeNotifyWarning:function (msg) {
                this.$notify.error({
                    title: '警告',
                    message:msg,
                    type: 'warning'
                });
            },
        	closeEditDialog:function(){

             this.editAccess=false;
        		 this.$refs.component.$refs.contentform.resetFields();
        	},


            // 选择店铺回调
            doBrandMultilayer: function(opts){
//                this.state.resultMultilayer = opts.data.length;
            	this.$root.$refs.component.shopLength = opts.data.length;
            	this.$root.$refs.component.Node.shoops = opts.data;
//            	var shopCode = '';
//            	if(opts.data.length > 0 ){
//            		for(var i =0; i<opts.data.length; i++){
//            			shopCode += opts.data[i];
//            			if(i != opts.data.length-1){
//            				shopCode += ','
//            			}
//            		}
//            	}

            	this.$root.$refs.component.shopCode = opts.data;



            }
        }

    });
})
