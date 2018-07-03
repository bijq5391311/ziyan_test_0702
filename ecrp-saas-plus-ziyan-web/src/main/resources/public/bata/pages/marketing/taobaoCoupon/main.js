import Vue from 'vue'
import NuiJs from 'nui-js'
import './page.css'
import busToggles from '../../../components/business-toggles/index'
import busMultiFilter from '../../../components/business-multi-filter/index'

Vue.use(NuiJs)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#example',
  components: {
    busToggles,
    busMultiFilter
  },
  data () {
    return {
      activeName: 'first',
      tableData: [], // 默认表格
      tableEmptyTip: '暂无数据', // 表格数据为空时的提示语
      currentPage4: 4,
      favorDialogVisible: false,  // 新增优惠活动 弹窗
      // 表单校验配置项
      favorForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        levelOptions: [{
          value: 'brand1',
          label: '品牌1',
          children: [{
            value: 'level1',
            label: '普通会员'
          }, {
            value: 'level2',
            label: '高级会员'
          }, {
            value: 'level3',
            label: 'VIP会员'
          }, {
            value: 'level4',
            label: '至尊VIP'
          }]
        }, {
          value: 'brand2',
          label: '品牌2',
          children: [{
            value: 'level1',
            label: '普通会员'
          }, {
            value: 'level2',
            label: '高级会员'
          }, {
            value: 'level3',
            label: 'VIP会员'
          }, {
            value: 'level4',
            label: '至尊VIP'
          }]
        }],
        radio: '',
        radioRule: 'pay',
        radioCount: 'count',
        select: ''
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
      levelSelected: [],
      showDiscount: true, // 打折
      // 表单校验配置项
      // 选择店铺 下拉树配置项：
      shopDropTreeValue: '',
      shopDropTreeVisible: false,
      shopDropTreeList: [],
      shopDroptreeWidth: '',
      // 会员分组 下拉树配置项/end
      // 添加人群
      addMemberName: 'cus',
      addMemberVisible: false,
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
      // 分析 配置项
      analysisVisible: false
      // 分析 配置项/end
    }
  },
  mounted () {
    this.getTableData()
    this.getOrgnazationShops()
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
      this.favorDialogVisible = true
      this.showToggles = true
    },
    // 表单验证
    submitSmsForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.favorDialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 表单验证 event/end
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
    // 满就送礼 表单 下拉
    changeCount (val) {
      if (val === 'discount') {
        this.showDiscount = true
      } else if (val === 'count') {
        this.showDiscount = false
      }
    },
    // 满就送礼 表单 下拉 event/end
    // 会员分组 下拉树 event
    handleShowDropTree () {
      this.droptreeWidth = this.$refs.droptreeinput.$el.clientWidth
    },
    handleSelectValue (data) {
      this.dropTreeVisible = false
      this.dropTreeValue = data.label
    },
    // 会员分组 下拉树 event/end
    // 多条件筛选组件应用 event
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
    }
  }
})

