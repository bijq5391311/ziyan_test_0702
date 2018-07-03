require(["vue", "nui", "jquery", "moment"
    ,"/public/dslParser/grid/gridPlugin.js",
    "utilbuild/main", "/public/ecrp/common/common.js",
    "/public/ecrp/components/ns-select.js",
    "/public/ecrp/common/object-util.js",
    "/public/ecrp/common/response-util.js"],
        function(Vue, Nui, $,mixin,util,moment, common) {
            /** 输出表格组件选项  */
            [#th:block th:with="grid = ${__#{render.grid.get('#ctx', care_register_table)}__}"]
            var tableOption = [#th:block th:insert="../public/ecrp/render2/grid::render(${grid})"][/th:block]
                [/th:block]
                Vue.component("ns-table", tableOption);

        var vm = new Vue({
            el: "#app",
            data: function () {
                return {
                     smsModel:{
                         topic:"",
                         careTime: "",
                         smsTemplate: "",
                         smsSignature: "",
                         spId:"",
                         couponId: "",
                         integral:"",
                         isShare: 0,
                         couponAmount: "",
                     },
                    state:{
                        tagPatterns:[
                           // { key:"{Nick}", text:"昵称"},
                            //{ key:"{Name}", text:"姓名"},
                            { key:"{CustomerCenterLink}", text:"会员中心链接"},
                        ],
                        smsCount: 1,
                        smsTotalLength: 0,
                        smsOneLength: 70,
                        id:0,
                    },
                    editFormTitle:"",
                    visible:false,
                    loading: false,
                    //模板类型 0短信 1邮件 2微信
                    patternType: -1,
                    //短信通道下拉数据
                    smsSpList: [],
                    //签名下拉数据
                    signatureList: [],
                    couponList:[],
                    saveType: "add",
                    currFormRef: "",
                    currModel: "",
                    careType: "RegisterConcern",
                    smsRules:{
                        topic:[{
                                required: true,
                                message: "请输入任务名称",
                                trigger: "blur"
                            },
                            {
                                min: 0,
                                max: 100,
                                message: "已超过可输入长度",
                                trigger: "change"
                            },
                            {
                                validator: (rule, value, callback)=>{
                                    $.post("/care/careauto/hasTopicExist",
                                    {
                                            id: vm.state.id,
                                            topic: value,
                                            typeMark: vm.careType
                                    }).done((resp)=>{
                                        ResponseUtil.check(resp, vm, "", ()=>{
                                            callback();
                                        },
                                        ()=>{
                                            callback(new Error("任务名称已存在，请重新输入"));
                                        })
                                    })
                                },
                                trigger: "blur"
                            }],
                        smsTemplate: [{
                            required: true,
                            message: "请输入短信内容",
                            trigger: "blur"
                        }],
                        couponId: [{
                            required: true,
                            message: "请选择优惠券",
                            type: "integer",
                            trigger: "change"
                        }],
                        smsSignature:[{
                                required: true,
                                message: "请选择签名",
                                trigger: "change"
                         }],
                        spId:[{
                                required: true,
                                message: "请选择通道",
                                trigger: "change"
                        }],
                        careTime:[{
                            validator: function(rule,value,callback){
                                if(value){
                                    if(!common.isNumber(value)){
                                        callback(new Error("格式不正确，请输入整数"));
                                    }else{
                                        callback();
                                    }
                                }else{
                                     callback();
                                }
                            },
                            trigger: "blur"

                        }],
                        couponAmount:[{
                            validator: function(rule,value,callback){
                                if(value){
                                    if(!common.isNumber(value)){
                                     callback(new Error("格式不正确，请输入整数"));
                                    }else{
                                        if(parseInt(value) > 0){
                                            callback();
                                        }else{
                                            callback(new Error("必须大于0"));
                                        }
                                    }
                                }else{
                                     callback(new Error("请输入数量"));
                                }
                            },
                            trigger: "blur"
                        }],
                        integral:[{
                            validator: function(rule,value,callback){
                              if(value){
                                    if(!common.isNumber(value)){
                                        callback(new Error("格式不正确，请输入整数"));
                                    }else{
                                        callback();
                                    }
                              }else{
                                    callback();
                              }

                            },
                            trigger: "blur"
                        }]
                    },
                }
            },
            methods:{
                //关怀规则状态改变
                stateChange:function (call,currValue,id) {
                    var that = this.$refs.table;
                    var info;
                    var respInfo;
                    var state = 1;
                    if(currValue == 1){
                        info = "是否确定关闭该任务？";
                        respInfo = '关闭';
                        state = 0;
                    }else{
                        info = "是否确定开启该任务？";
                        respInfo = '启用';
                    }
                    this.$confirm(info, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(function(){
                        $.post("/care/careauto/updateStateInCareAuto", {id: id,state: state})
                        .done(function(resp) {
                        ResponseUtil.check(resp, that, respInfo,function(){call();});
                    });
                }).catch(function () {})
                },
                deleteCare: function (row) {
                    var that = this;
                    that.$confirm('是否确定删除该关怀任务?', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(function() {
                        $.post("/care/careauto/deleteCareAutoPattern", { id: row.id })
                            .done(function(resp) {
                            ResponseUtil.check(resp, that, "删除"
                            ,function () {
                                that.$refs.table.$reload();
                            });
                        });
                    }).catch(function(){});
                },
                //短信条数统计
                smsCount: function(value){
                     this.state.smsTotalLength = value.length + this.smsModel.smsSignature.length;
                        if(this.state.smsTotalLength > 70){
                            this.state.smsCount = parseInt(this.state.smsTotalLength/67) +1;
                        }else{
                              this.state.smsCount = 1;
                        }
                        if(this.state.smsCount > 1 || this.state.smsTotalLength == 67){
                            this.state.smsOneLength = 67;
                        }else{
                             this.state.smsOneLength = 70;
                        }
                },
                //保存
                save: function(){
                    this.$refs[this.currFormRef].validate(function(valid){
                        if(valid){
                             $.post("/care/zycareregister/saveOrUpdateRegCare",vm.smsHandleParams())
                                .done(function(resp){
                                    if(resp.success){
                                        vm.$message.success(resp.msg);
                                        vm.visible = false;
                                        vm.$refs.table.$reload();
                                    }else{
                                         vm.$message.error(resp.msg);
                                    }
                                })
                        }
                    })
                },
                //获取详情
                getCareById:function(id){
                    var that = this;
                    that.loading = true;
                     $.post("/care/careauto/getCareAutoPatternById", { id: id,type: that.careType })
                        .done(function (resp) {
                			       if(resp.success){
                			            if(that.patternType == 0){
                			                that.displaySmsData(resp.result);
                			            }
                			       }else{
                			         that.$message.error("获取数据失败")
                			       }
                			       that.loading = false;
                			  })
                },
                //回显短信表单数据
                displaySmsData: function(data){
                       var json =  eval( "(" + data.patternString + ")");
                        this.smsModel.topic = data.topic;
                         this.smsModel.careTime = json.CareTime;
                         this.smsModel.smsTemplate =  json.SMSTemplate;
                         this.smsModel.smsSignature =  data.smsSignature;
                         this.smsModel.spId = data.spId + "";
                         this.smsModel.couponAmount = json.CouponAmount;
                         this.smsModel.couponId = parseInt(json.CouponID);
                         this.smsModel.id = data.id;
                         this.smsModel.integral= json.Integral;
                         this.smsModel.isShare = data.isShare;
                },
                //处理提交参数
                smsHandleParams(){
                    var param = $.extend({},this.smsModel);
                    var registerCare  = {};
                    registerCare.id = param.id ? param.id : 0;
                    registerCare.smsTemplate = param.smsTemplate;
                    registerCare.couponID = param.couponId;
                    registerCare.couponAmount = param.couponAmount;
                    registerCare.careTime = param.careTime ? param.careTime :0;
                    registerCare.integral = param.integral ? param.integral :0;
                    param = ObjectUtil.toMap(param,"care");
                    return Object.assign(param,registerCare);
                },
                //关闭弹窗之后
                closeAfter: function(){
                    this.resetForm();
                },
                resetForm(ref){
                    //Vue.set(this,currModel,this.$options.data()[form.model]);
                    this.$refs[this.currFormRef].resetFields();
                },
                getDropdownData(){
                    $.post("/care/zycareregister/getDropdownData")
                        .done(function(resp){
                           if(resp.success){
                                vm.smsSpList = resp.result.smsSpList ? resp.result.smsSpList : [];
                                vm.signatureList = resp.result.signatureList ? resp.result.signatureList : [];
                                vm.couponList =  resp.result.couponList ? resp.result.couponList : [];
                           }else{
                                vm.$message.error("获取下拉数据出错");
                           }
                        })
                },
                //短信占位符
                smsPattern: function(value){
                    this.smsModel.smsTemplate += value;
                },
                editCareForm(row){
                    if(row){
                        this.editFormTitle = "修改短信注册关怀";
                        this.saveType = "edit";
                        this.state.id = row.id;
                        this.patternType = row.pattern_type;
                        this.getCareById(row.id);
                    }else{
                        this.editFormTitle = "新增短信注册关怀";
                         this.saveType = "add";
                    }
                    this.visible = true;
                }

            },
            mounted: function(){
                this.getDropdownData();
            },
            watch: {
                "smsModel.smsSignature": function(val){
                    this.smsCount(this.smsModel.smsTemplate);
                },
                "patternType": function(val){
                    if(val == 0){
                        this.currModel = "smsModel";
                         this.currFormRef = "smsForm";
                    }else if(val == 2){
                        this.currModel = "wxModel";
                        this.currFormRef = "wxForm";
                    }
                },
                "smsModel.smsTemplate": function(val){
                    this.smsCount(val);
                }
            }
        })
    })