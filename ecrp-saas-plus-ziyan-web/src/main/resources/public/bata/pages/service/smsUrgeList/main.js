import Vue from 'vue'
import NuiJs from 'nui-js'
import businessMultiSelect from '../../../components/business-multi-select/index'
import busToggles from '../../../components/business-toggles/index'
import busMultiFilter from '../../../components/business-multi-filter/index'

Vue.use(NuiJs)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#example',
  components: {
    businessMultiSelect,
    busToggles,
    busMultiFilter
  },
  data () {
    return {
      tableData: [], // 默认表格
      tableEmptyTip: '暂无数据', // 表格数据为空时的提示语
      currentPage4: 4,
      smsDialogVisible: false,  // 新增短信发货提醒弹窗
      // 表单校验配置项
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        region: [
          {required: true, message: '请选择活动区域', trigger: 'change'}
        ],
        date1: [
          {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
        ],
        date2: [
          {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
        ],
        type: [
          {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
        ],
        resource: [
          {required: true, message: '请选择活动资源', trigger: 'change'}
        ],
        desc: [
          {required: true, message: '请填写活动形式', trigger: 'blur'}
        ]
      },
      // 表单校验配置项
      options3: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      selectedOptions: [],
      // 多层级店铺选择配置项
      dataOnline: [
        {
          'label': '天猫',
          'id': 1,
          'children': [
            {
              'label': '晨光官方旗舰店',
              'id': 2,
              'children': []
            },
            {
              'label': 'mg晨光上海专卖店',
              'id': 5
            },
            {
              'label': 'mg晨专卖店',
              'id': 15
            },
            {
              'label': 'mg专卖店',
              'id': 16
            },
            {
              'label': 'mg晨专卖店',
              'id': 18
            },
            {
              'label': 'mg专卖店',
              'id': 16
            }
          ]
        },
        {
          'label': '京东',
          'id': 6,
          'children': [
            {
              'label': 'MG晨光文具旗舰店',
              'id': 7
            }
          ]
        },
        {
          'label': '有赞',
          'id': 8,
          'children': [
            {
              'label': '晨光文具',
              'id': 9
            }
          ]
        },
        {
          'label': '当当',
          'id': 11,
          'children': [
            {
              'label': 'MG晨光文具旗舰店',
              'id': 121
            },
            {
              'label': 'MG晨光文具旗舰店',
              'id': 122
            },
            {
              'label': 'MG晨光文具旗舰店',
              'id': 123
            },
            {
              'label': 'MG晨光文具旗舰店',
              'id': 124
            },
            {
              'label': 'MG晨光文具旗舰店',
              'id': 125
            },
            {
              'label': 'MG晨光文具旗舰店',
              'id': 126
            },
            {
              'label': 'MG晨光文具旗舰店',
              'id': 127
            }
          ]
        }
      ],
      onlineProps: {
        children: 'children',
        label: 'label'
      },
      dataLine: [],
      lineProps: {
        children: 'children',
        label: 'label'
      },
      checkAll: false, // 线上是否全选
      isIndeterminate: false,
      defaultCheckedKeys: [5, 8], // 默认选中的项
      defaultCheckedAll: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], // 全部选中的项
      resultMultilayer: '',
      dialogMultilyaerVisible: false,
      multiNames: '',
      // 多层级店铺选择配置项/end

      // 选择店铺 下拉树配置项：
      shopDropTreeValue: '',
      shopDropTreeVisible: false,
      shopDropTreeList: [],
      shopDroptreeWidth: '',
      // 选择店铺 下拉树配置项/end
      level: 'level1',
      time: 'time1',
      formRadio: '',
      smsValidateForm: {
        mission: ''
      },
      defaultSelect: '',
      defaultSelect2: [],

      // 会员分组 下拉树配置项：
      dropTreeValue: '',
      dropTreeVisible: false,
      dropTreeList: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      droptreeWidth: '',
      // 会员分组 下拉树配置项/end

      // 选择商品
      goodaData: [{
        name: '玖拾玖度 张义超 个性拼接民族风松紧带休闲长裤 99331008',
        code: 'SZ233080003'
      }, {
        name: '粉色字母花刺绣螺纹长袖上衣 13AW-SY16',
        code: 'SL532209002'
      }, {
        name: '麻灰猫头鹰刺绣长袖上衣 13AW-SY18',
        code: 'SL532020007'
      }, {
        name: '黄色蜜蜂刺绣包臀半裙 13AW-QZ02',
        code: 'SZ233080003'
      }, {
        name: '彩色小鸟印花半裙 13AW-QZ07',
        code: 'SL532090004'
      }, {
        name: '白色蜜蜂刺绣连衣裙 SL532020008',
        code: 'SM833060008'
      }],
      dialogChooseGoodsVisible: false,
      dialogChooseConditionVisible: false,
      // /end 选择商品
      // 选择条件
      chooseCondition: {
        name: [{
          value: '',
          rule: 'and'
        }, {
          value: '',
          rule: 'or'
        }],
        code: [{
          value: '',
          rule: 'and'
        }],
        price: [{
          start: '',
          end: '',
          rule: 'and'
        }],
        cate: [{
          select: '',
          rule: 'or'
        }]
      },
      // /end 选择条件

      visible2: false,

      valueDate1: '',
      limit: 'limit1',
      delivery: false,
      formCheck: [],
      valueTime1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      gridData: [{
        date: '小于等于1小时：',
        number: '0',
        rate: '0.00%'
      }, {
        date: '1小时-2小时：',
        number: '0',
        rate: '0.00%'
      }, {
        date: '2小时-1天：',
        number: '0',
        rate: '0.00%'
      }, {
        date: '大于1天：',
        number: '0',
        rate: '0.00%'
      }]
    }
  },
  mounted () {
    this.getTableData()
    // 获取线上店铺
    // this.getShopOnline()
    // 获取线下店铺
    this.getShopLine()
    this.getOrgnazationShops()
    // 选中店铺数量
    this.resultMultilayer = this.defaultCheckedKeys.length
    this.isIndeterminate = this.defaultCheckedKeys.length > 0
  },
  methods: {
    // 默认获取表格数据
    getTableData () {
      window.fetch('http://192.168.1.24:8071/templateBeta/tableData.json').then((response) => {
        return response.json()
      }).then((json) => {
        this.tableData = json
      }).catch((ex) => {
        console.log('parsing failed', ex)
      })
    },
    // 获取线上店铺
    // getShopOnline () {
    //   window.fetch('http://192.168.1.24:8071/templateBeta/shopOnline.json').then((response) => {
    //     return response.json()
    //   }).then((json) => {
    //     this.dataOnline = json
    //   }).catch((ex) => {
    //     console.log('parsing failed', ex)
    //   })
    // },
    // 获取线下店铺
    getShopLine () {
      window.fetch('http://192.168.1.24:8071/templateBeta/shopLine.json').then((response) => {
        return response.json()
      }).then((json) => {
        this.dataLine = json.data
      }).catch((ex) => {
        console.log('parsing failed', ex)
      })
    },
    // 品牌店铺
    getOrgnazationShops () {
      window.fetch('http://192.168.1.24:8071/templateBeta/orgnazationShops.json').then((response) => {
        return response.json()
      }).then((json) => {
        this.shopDropTreeList = json.data
      }).catch((ex) => {
        console.log('parsing failed orgnazationShops.json', ex)
      })
    },
    // 当前页显示页码总数
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    // 页码切换
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    // 显示"新增实时催付"窗口
    handerlSmsDialogVisible () {
      this.smsDialogVisible = true
      this.showToggles = true
    },
    // 多层级店铺选择 event
    // 显示多层级店铺选择器窗口
    handerlMultilayerVisible () {
      this.dialogMultilyaerVisible = true
    },
    handleCheckAllChange (event) {
      this.$refs.online.setCheckedKeys(event.target.checked ? this.defaultCheckedAll : [])
      this.isIndeterminate = false
    },
    handleCheckChange (value) {
      let checkedCount = this.$refs.online.getCheckedNodes().length
      this.checkAll = checkedCount === this.defaultCheckedAll.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.defaultCheckedAll.length
    },
    // 保存选中结果
    saveMultilayerSelect () {
      this.resultMultilayer = this.$refs.online.getCheckedNodes().length
      this.defaultCheckedKeys = this.$refs.online.getCheckedNodes()
      this.dialogMultilyaerVisible = false
    },
    cancleMultilayerSelect () {
      this.defaultCheckedKeys = this.defaultCheckedKeys
      this.dialogMultilyaerVisible = false
    },
    // 多层级店铺选择 event/end
    // 表单验证
    submitSmsForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.smsDialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 表单验证 event/end

    // 表单下拉树 event
    handleShowDropTree () {
      this.droptreeWidth = this.$refs.droptreeinput.$el.clientWidth
    },
    handleSelectValue (data) {
      this.dropTreeVisible = false
      this.dropTreeValue = data.label
    },
    // 表单下拉树 event/end
    // 选择店铺 表单下拉树 event
    handleShowShopDropTree () {
      this.shopDroptreeWidth = this.$refs.shopDropTreeInput.$el.clientWidth
    },
    handleShopSelectValue (data) {
      this.shopDropTreeVisible = false
      this.shopDropTreeValue = data.label
    },
    handleSaveShopSelect () {
      this.shopDropTreeVisible = false
      console.log(this.$refs.shopDropTree.getCheckedNodes())
      let selectArray = this.$refs.shopDropTree.getCheckedNodes()
      let resultArray = []
      selectArray.forEach((data) => {
        resultArray.push(data.label)
      })
      console.log(resultArray)
      this.shopDropTreeValue = resultArray.join(',')
    },
    // 选择店铺 表单下拉树 event/end
    submitSearch () {
      console.log('提交筛选')
    },
    resetSearch () {
      console.log('重置筛选条件')
    },
    cleanSearch () {
      console.log('清空筛选条件')
      // 重新获取表格数据
      this.getTableData()
    },
    recoverSearch () {
      console.log('修改筛选条件')
    },
    // 选择商品弹窗 event
    showChooseDialog () {
      this.dialogChooseGoodsVisible = true
      this.$nextTick(() => {
        // 右侧选择条件结果区域最高高度（决定滚动区域）
        setTimeout(() => {
          this.$refs.tmpChooseScroll.$el.children[0].style.maxHeight = this.$refs.conditionItem.$el.clientHeight + 'px'
        }, 100)
      })
    },
    // 选择商品弹窗 event/end,
    // 选择条件弹窗 event
    showChooseDialog2 () {
      this.dialogChooseConditionVisible = true
      this.$nextTick(() => {
        // 右侧选择条件结果区域最高高度（决定滚动区域）
        // this.$refs.tmpChooseScroll2.$el.children[0].style.maxHeight = this.$refs.conditionItem2.$el.clientHeight - this.$refs.tmpChooseScroll2.$el.offsetTop - 10 + 'px'
      })
    },
    // 添加条件
    addItem (arr) {
      arr.push(arr[0])
    },
    // 删除条件
    deleteItem (arr, index) {
      arr.splice(index, 1)
    }
    // 选择条件弹窗 event/end
  }
})
