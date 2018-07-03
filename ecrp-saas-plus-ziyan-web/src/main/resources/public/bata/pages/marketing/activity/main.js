import Vue from 'vue'
import NuiJs from 'nui-js'
import './page.css'
import businessPopoverSelect from '../../../components/business-popover-select/index'

Vue.use(NuiJs)
Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.component('business-activity-list', {
  data () {
    return {
      popover: false,
      activeStatus: ''
    }
  },
  props: {
    day: Number,
    month: Number,
    year: Number,
    date: String,
    data: Object
  },
  methods: {},
  template: '<div class="activity-list">' +
  '<el-popover popper-class="activity-list__popover" placement="right" width="200" trigger="hover" ref="activity"  v-model="popover">' +
  '<div class="activity-list__popover-header"><i @click="popover = false" class="bui-error-fill"></i>{{date}} 活动</div> ' +
  '<el-collapse class="activity-list__collapse" v-model="activeStatus" accordion>' +
  '<el-collapse-item v-for="(status,index) in data.activity" :key="index" :name="status.name">' +
  '<span slot="title">{{status.name}} <b>{{status.num}}</b></span>' +
  '<a class="activity-list__article" v-for="(list, index) in status.list" :href="list.link" :title="list.title">{{list.title}}</a>' +
  '</el-collapse-item>' +
  '</el-collapse>' +
  '</el-popover>' +
  '<div class="activity-list__status" v-popover:activity> ' +
  '<div class="activity-list__badge"><span v-if="data.total > 100">99<b>+</b></span><span v-else slot="reference">{{data.total}}</span></div>' +
  '<div class="activity-list__status-list"><span class="item" v-for="(status,index) in data.activity" :key="index"><span  class="name">{{status.name}} </span><span  class="num">{{status.num}}</span></span></div>' +
  '</div>' +
  '</div>' +
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
      paramEditVisible: false,
      paramActive: 'set',
      paramCollapse: ['1'],
      tableData: [],
      paramLableWidth: '80px',
      paramForm: {
        formRadio: '',
        formCheck: []
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
    this.getTableData()
    this.thisYear = this.$refs.activityCalendar.date.getFullYear()
    this.thisMonth = this.$refs.activityCalendar.date.getMonth() + 1
  },
  methods: {
    getMarketingActivity () {
      window.fetch('http://192.168.1.24:8071/templateBeta/marketingActivity.json').then((response) => {
        return response.json()
      }).then((json) => {
        this.activityData = json.data
      }).catch((ex) => {
        console.log('parsing failed', ex)
      })
    },
    getListData (day, date) {
      let listData
      switch (day) {
        case 8:
        case 20:
        case 30:
          listData = true
          break
        default:
      }
      return listData
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
    dateCellRenderMarket (h, day, month, year, date) {
      const listData = this.getListData(day, date)
      if (listData) {
        return h('business-activity-list', {
          props: {
            day: day,
            month: month,
            year: year,
            date: date,
            data: this.activityData
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
    paramEdit () {}
  }
})

