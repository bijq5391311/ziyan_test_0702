import Vue from 'vue'
import NuiJs from 'nui-js'
import moment from 'moment'
import './page.css'
import businessPopoverSelect from '../../../components/business-popover-select/index'

Vue.use(NuiJs)
Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.component('bus-festival-set', {
  data () {
    return {
      visible: false,
      formName: '',
      formRadio: '永久',
      active: false
    }
  },
  props: {
    day: Number,
    month: Number,
    year: Number,
    date: String,
    total: Number,
    show: Boolean
  },
  methods: {
    getCellData (day, month, year, date) {
      console.log(day)
      console.log(month)
      console.log(year)
      console.log(date)
    },
    addClass () {
      this.active = true
    },
    showMessage (type, msg) {
      this.$message({
        type: type,
        message: msg
      })
    },
    deleteFun () {
      this.active = true
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.active = false
        this.showMessage('success', '删除成功')
      }).catch(() => {
        this.active = false
        this.showMessage('info', '已取消删除')
      })
    },
    removeClass () {
      this.active = false
    }
  },
  template: '<div class="tmp-festival" :class="{\'is-active\': active }">' +
  '<el-popover popper-class="tmp-popover-add" title="设置节日" trigger="click" placement="bottom" width="250" v-model="visible" @show="addClass" @hide="removeClass">' +
  '<el-form>' +
  ' <el-form-item label="名称：">' +
  ' <el-form-grid size="xmd">' +
  ' <el-input placeholder="请输入节日名称" v-model="formName"></el-input>' +
  ' </el-form-grid>' +
  ' </el-form-item>' +
  ' <el-form-item label="类型：">' +
  '<el-form-grid size="xmd"><el-radio-group  v-model="formRadio"><el-radio label="永久"></el-radio><el-radio label="一次性"></el-radio></el-radio-group>' +
  '</el-form-grid>' +
  '</el-form-item>' +
  '</el-form><el-button size="small" slot="reference" v-show="!show">设置节日</el-button><el-button size="small" slot="reference" v-show="show" :class="{ active: show }" class="delete-content"><span class="total">{{total}}</span><span class="delete-btn" @click="deleteFun()">删除节日</span></el-button>' +
  '<div class="tmp-popover-footer">' +
  '<el-button size="mini" type="text" @click="visible = false">取消</el-button>' +
  '<el-button type="primary" size="mini" @click="visible = false, getCellData({day}, {month}, {year}, {date})">确定</el-button>' +
  '</div>' +
  '</el-popover>' +
  '</div>'
})
new Vue({
  el: '#example',
  data () {
    return {
      activeName: 'first',
      activityData: {},
      currentYear: '',
      currentMonth: '',
      thisYear: '',
      thisMonth: '',
      year: {
        disabled: true
      },
      tags: ['意向购买的客户标签', '意向购买客户', '十月促销的新客户', '中秋聚划算分组标签', '十月促销客户', '意向购买的标签', '十月促销的新客户标签', '中秋聚划算分组'],
      paramEditVisible: false,
      paramActive: 'set',
      paramCollapse: ['1'],
      tableData: [],
      paramLableWidth: '80px',
      paramForm: {
        formRadio: '',
        formCheck: []
      },
      active: true,
      items: [
        {
          title: '国庆节',
          status: false,
          date: '2017-12-01',
          isOpen: true,
          list: [
            {message: '国庆节'},
            {message: '红红火火惚红红火火恍恍惚惚红红火火恍恍惚惚红红火火惚红红火火恍恍惚惚红红火火恍恍惚惚红红火火惚红红火火恍火恍恍惚惚红红火火惚红红火火恍恍惚惚红红火火恍恍惚惚'},
            {message: '红红火火惚红红火火恍恍惚惚红红火火恍恍惚惚红红火火惚红红火火恍恍惚惚红红火火恍恍惚惚红红火火惚红红火火恍恍惚惚'},
            {message: '红红火火惚红红火火恍恍惚惚红红火火恍恍恍惚惚'}
          ]
        },
        {
          title: '十点节',
          status: true,
          date: '2017-12-04',
          isOpen: false,
          list: [
            {message: '十点节'},
            {message: '红红火火惚红红火火恍恍惚惚红红火火恍恍惚惚红红火火惚红红火火恍恍惚惚红红火火恍恍惚惚红红火火惚红红火火恍火恍恍惚惚红红火火惚红红火火恍恍惚惚红红火火恍恍惚惚'},
            {message: '红红火火惚红红火火恍恍惚惚红红火火恍恍惚惚红红火火惚红红火火恍恍惚惚红红火火恍恍惚惚红红火火惚红红火火恍恍惚惚'},
            {message: '红红火火惚红红火火恍恍惚惚红红火火恍恍恍惚惚'}
          ]
        },
        {
          title: '十乐节',
          status: true,
          date: '2017-12-28',
          isOpen: true,
          list: [
            {message: '十乐节'},
            {message: '红红火火惚红红火火恍恍惚惚红红火火恍恍惚惚红红火火惚红红火火恍恍惚惚红红火火恍恍惚惚红红火火惚红红火火恍火恍恍惚惚红红火火惚红红火火恍恍惚惚红红火火恍恍惚惚'},
            {message: '红红火火惚红红火火恍恍惚惚红红火火恍恍惚惚红红火火惚红红火火恍恍惚惚红红火火恍恍惚惚红红火火惚红红火火恍恍惚惚'},
            {message: '红红火火惚红红火火恍恍惚惚红红火火恍恍恍惚惚'}
          ]
        },
        {
          title: '十一乐节',
          status: true,
          date: '2017-12-30',
          isOpen: false,
          list: [
            {message: '十一乐节'},
            {message: '红红火火惚红红火火恍恍惚惚红红火火恍恍惚惚红红火火惚红红火火恍恍惚惚红红火火恍恍惚惚红红火火惚红红火火恍火恍恍惚惚红红火火惚红红火火恍恍惚惚红红火火恍恍惚惚'},
            {message: '红红火火惚红红火火恍恍惚惚红红火火恍恍惚惚红红火火惚红红火火恍恍惚惚红红火火恍恍惚惚红红火火惚红红火火恍恍惚惚'},
            {message: '红红火火惚红红火火恍恍惚惚红红火火恍恍恍惚惚'}
          ]
        }
      ],
      festival: [
        {date: '2017-09-23', name: '九零节', total: 13},
        {date: '2017-10-23', name: '十零节', total: 27},
        {date: '2017-12-01', name: '国庆节', total: 33},
        {date: '2017-12-04', name: '十一二点节', total: 5},
        {date: '2017-12-28', name: '十乐节', total: 6},
        {date: '2017-12-30', name: '十一乐节', total: 10}
      ],
      // 显示详情
      dialogFormVisible: false,
      // 详情信息表单数据
      tableForm: {
        date: '',
        name: '',
        address: '',
        province: ''
      },
      dialogVisible: false,
      favorForm: {
        radioRule: '',
        radio: ''
      }
    }
  },
  components: {
    businessPopoverSelect
  },
  computed: {
    // 设置跳转今年按钮的disabled
    disabledYear () {
      if (this.currentYear === new Date().getFullYear()) {
        return true
      } else {
        return false
      }
    },
    // 设置跳转本月按钮的disabled
    disabledMonth () {
      if (this.currentMonth === new Date().getMonth() + 1) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    this.getMarketingActivity()
    // 初始化日期展开
    this.expansionCollapse(this.items)
    this.getTableData()
    this.thisYear = this.$refs.activityCalendar.date.getFullYear()
    this.thisMonth = this.$refs.activityCalendar.date.getMonth() + 1
    this.$nextTick(() => {
      // body视图高度 - （当前声明区域#example距离浏览器顶部高度offsetHeight + 当前滚动区域顶部距离父级结构的间距大小 offsetTop + tab页签高度
      let leftLimitHeight1 = document.body.offsetHeight - (this.$el.offsetTop + this.$refs.layoutLeftScroll1.$el.offsetTop + 10)
      let leftLimitHeight2 = document.body.offsetHeight - (this.$el.offsetTop + this.$refs.layoutLeftScroll2.$el.offsetTop + 10)
      // 左侧栏高度固定
      this.$refs.layoutLeftScroll1.$el.children[0].style.height = leftLimitHeight1 + 'px'
      this.$refs.layoutLeftScroll2.$el.children[0].style.maxHeight = leftLimitHeight2 + 'px'
      // this.$refs.layoutLeftScroll1.$el.children[0].style.oveflowY = 'scroll'
      // this.$refs.layoutLeftScroll2.$el.children[0].style.oveflowY = 'scroll'
      this.$refs.layoutLeft.style.height = leftLimitHeight1 + 'px'
      this.$refs.movableShaft.style.height = leftLimitHeight2 + 'px'
    })
  },
  methods: {
    handleClose (name) {
      this.$confirm('是否删除标签' + name + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getMarketingActivity () {
      window.fetch('http://192.168.1.24:8071/templateBeta/marketingActivity.json').then((response) => {
        return response.json()
      }).then((json) => {
        this.activityData = json.data
      }).catch((ex) => {
        console.log('parsing failed', ex)
      })
    },
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
    getListData (day, date) {
      let listData
      let dayData
      this.festival.forEach((item, index) => {
        if (date === item.date) {
          listData = true
          dayData = item
        }
      })
      return {listData, dayData}
    },
    dateCellRenderMarket (h, day, month, year, date) {
      const curentData = this.getListData(day, date)
      if (!curentData.listData) {
        return h('bus-festival-set', {
          props: {
            day: day,
            month: month,
            year: year,
            date: date,
            data: this.activityData,
            show: false
          }
        })
      } else {
        return h('bus-festival-set', {
          props: {
            day: day,
            month: month,
            year: year,
            date: date,
            data: this.activityData,
            total: curentData.dayData.total,
            show: true
          }
        })
      }
    },
    // 日历年份变更 事件
    activityYearChange (year) {
      this.currentYear = year
    },
    // 日历月份变更 事件
    activityMonthChange (month) {
      this.currentMonth = month + 1
    },
    // 当前年月跳转
    gotoCurrent (year, month) {
      if (month) {
        // 跳转到本月
        this.$refs.activityCalendar.date.setFullYear(year)
        this.$refs.activityCalendar.date.setMonth(month - 1)
        this.$refs.activityCalendar.resetDate()
      } else {
        // 跳转到今年
        this.$refs.activityCalendar.date.setFullYear(year)
        this.$refs.activityCalendar.resetDate()
      }
    },
    // 属性修改
    paramEdit () {},
    // 日历单元格点击
    handelCalendar (val) {
      console.log(val)
      const date = moment(val).format('YYYY-MM-DD')
      this.movableCollapse(this.items, date)
    },
    // 添加数据
    addRow (index, rows) {
      this.dialogFormVisible = true
      document.body.appendChild(this.$refs.editDialog.$el)
    },
    // 编辑数据
    editRow (index, rows) {
      this.dialogFormVisible = true
      // document.body.appendChild(this.$refs.editDialog.$el)
    },
    // 删除数据
    delRow (index, rows) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.showMessage('success', '删除成功')
        rows.splice(index, 1)
      }).catch(() => {
        this.showMessage('info', '已取消删除')
      })
    },
    showMessage (type, msg) {
      this.$message({
        type: type,
        message: msg
      })
    },
    //  删除活动
    handleDeleteItem () {
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
    },
    // 折叠面板
    movableCollapse (item, date) {
      const that = this.items
      const _this = this
      if (date) {
        that.forEach(function (item, index) {
          if (item.date === date) {
            Vue.set(item, 'active', true)
            _this.$nextTick(() => {
              _this.$refs.layoutLeftScroll2.$el.children[0].scrollTop = _this.$refs.movableShaft.children[index].offsetTop
            })
          }
        })
      } else {
        this.$nextTick(function () {
          if (event.currentTarget.className === 'movable-icon active') {
            Vue.set(item, 'active', false)
          } else {
            Vue.set(item, 'active', true)
          }
        })
      }
    },
    // 初始化判断活动列表展开 控制参数isOpen
    expansionCollapse (items) {
      const that = items
      that.forEach(function (item) {
        if (item.isOpen) {
          Vue.set(item, 'active', true)
        }
      })
    }
  }
})

