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
      activeNameTab: 'first',
      tableData: [],
      dialogVisible: false,
      dialogDetailVisible: false,
      defaultSelect: 'sel1',
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
      }
    }
  },
  mounted () {
    this.getTableData()
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
    closeDialog () {
      this.dialogVisible = false
    },
    selectType (button) {
      this.selected = button.currentTarget.getElementsByTagName('span')[0].innerText
    },
    openDialog () {
      this.dialogVisible = true
    },
    handleSwitch (val) {
      console.log('权益黑名单：' + val)
    },
    // /end 会员数据
    // begin 商品数据
    openGoodsDialog () {
      this.goodsVisible = true
    },
    // /end 会员数据,
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
    // 多条件筛选组件应用 event/end
  }
})
