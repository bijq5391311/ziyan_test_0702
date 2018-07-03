import Vue from 'vue'
import NuiJs from 'nui-js'
import './page.css'
import busMultiFilter from '../../../components/business-multi-filter/index'

Vue.use(NuiJs)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#example',
  components: {
    busMultiFilter
  },
  data () {
    return {
      loadingtable: false,
      httpActiveName: 'base',
      sqlActiveName: 'base',
      tableData: [],
      // 筛选表单数据
      multipleForm: {
        user: '',
        date: '2017-04-19',
        address: '厦门市',
        province: '',
        trade: {
          start: '0',
          end: '12'
        },
        source: '',
        logistics: ''
      },
      // 弹窗
      httpDialog: false,
      uponDialog: false,
      sqlDialog: false,
      onglDialog: false,
      shopDialog: false,
      saveDialog: false,
      javaDialog: false,
      selectMethod: '',
      selectType: '',
      // 请求参数
      params: [],
      uponIn: [],
      uponOut: [],
      selectService: '',
      standard: false,
      date1: '',
      // 选择店铺 下拉树配置项：
      shopDropTreeValue: '',
      shopDropTreeVisible: false,
      shopDropTreeList: [],
      shopDroptreeWidth: '',
      // 会员分组 下拉树配置项/end
      visiblePopover: false,
      // 树：
      data: [{
        label: '总经办总经办总经办总经办',
        children: [{
          label: '企划部企划部企划部企',
          children: []
        }, {
          label: '法务部',
          children: []
        }]
      }, {
        label: '人事行政中心',
        children: [{
          label: '人事部',
          children: []
        }, {
          label: '行政部',
          children: []
        }]
      }, {
        label: '研发中心',
        children: [{
          label: '研发一部',
          children: [{
            label: '爱互动组'
          }, {
            label: '前端组'
          }, {
            label: '智客组'
          }]
        }, {
          label: '研发二部',
          children: [{
            label: 'CRM 项目组'
          }]
        }]
      }]
    }
  },
  mounted () {
    this.getTableData()
    this.getOrgnazationShops()
  },
  methods: {
    // 会员数据
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
    },
    // 多条件筛选组件应用 event/end
    // 添加条件
    addItem (arr) {
      arr.push(arr[0])
    },
    // 删除条件
    deleteItem (arr, index) {
      arr.splice(index, 1)
    },
    // 更改服务 选择
    selectChangeService (val) {
      val === 'standard' ? this.standard = true : this.standard = false
    },
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
    }
    // 选择店铺 表单下拉树 event/end
  }
})
