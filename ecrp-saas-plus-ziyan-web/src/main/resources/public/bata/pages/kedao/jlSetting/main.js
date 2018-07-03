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
      activeName: 'first',
      tableData: [],
      currentPage4: 4,
      multipleForm: {
        user: '',
        date: '',
        address: '',
        province: ''
      },
      multipleSearchCollapse: true,
      multipleFilterStatus: true,
      addDialogVisible: false,
      addForm: {
        defaultSelect: '',
        formRadio: '',
        formFlag: '',
        formCheck: [],
        options2: [{
          label: '江苏',
          cities: []
        }, {
          label: '浙江',
          cities: []
        }],
        props: {
          value: 'label',
          children: 'cities'
        }
      }
    }
  },
  mounted () {
    this.getTableData()
  },
  methods: {
    getTableData () {
      window.fetch('http://192.168.1.24:8071/templateBeta/tableData.json').then((response) => {
        return response.json()
      }).then((json) => {
        this.tableData = json
      }).catch((ex) => {
        console.log('parsing failed', ex)
      })
    },
    // 筛选
    filterSubmit () {
      if (this.formInline.user) {
        const newList = []
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].name.indexOf(this.formInline.user) >= 0) {
            newList.push(this.tableData[i])
          }
        }
        this.tableData = newList
      } else {
        this.getTableData()
      }
    },
    // 表格行多选择
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage4 = val
      console.log(`当前页: ${val}`)
    },  // 多条件筛选组件应用 event
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
    addDialog () {
      this.addDialogVisible = true
    },
    handleItemChange (val) {
      console.log('active item:', val)
      setTimeout(() => {
        if (val.indexOf('江苏') > -1 && !this.addForm.options2[0].cities.length) {
          this.addForm.options2[0].cities = [{
            label: '南京'
          }]
        } else if (val.indexOf('浙江') > -1 && !this.addForm.options2[1].cities.length) {
          this.addForm.options2[1].cities = [{
            label: '杭州'
          }]
        }
      }, 300)
    }
  }
})

