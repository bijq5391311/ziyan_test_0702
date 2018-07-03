import Vue from 'vue'
import NuiJs from 'nui-js'
import './page.css'
import businessEcharts from 'vue-echarts'
import businessPopoverSelect from '../../../components/business-popover-select/index'
// import xeWidget from '../../../components/xe-widget/src/xe-widget.vue'
// import customerOverview from '../../../components/customer-overview/src/customer-overview.vue'
Vue.use(NuiJs)
Vue.config.productionTip = false
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
  '<div class="activity-list__status-list"><span class="item"><span  class="name">活动</span></span></div>' +
  '</div>' +
  '</div>' +
  '</div>'
})
/* eslint-disable no-new */
new Vue({
  el: '#constantly',
  components: {
    // xeWidget,
    // customerOverview,
    businessEcharts,
    businessPopoverSelect
  },
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
      },
      loadingMask: true, // 加载中状态
      checkChannel: [],

      // 部门下拉树配置项：
      dropTreeValue: '',
      dropTreeVisible: false,
      dropTreeList: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 11,
          label: '二级 1-1',
          children: [{
            id: 111,
            label: '三级 1-1-1'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 21,
          label: '二级 2-1',
          children: [{
            id: 211,
            label: '三级 2-1-1'
          }]
        }, {
          id: 22,
          label: '二级 2-2',
          children: [{
            id: 221,
            label: '三级 2-2-1'
          }]
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 31,
          label: '二级 3-1',
          children: [{
            id: 311,
            label: '三级 3-1-1'
          }]
        }, {
          id: 32,
          label: '二级 3-2',
          children: [{
            id: 321,
            label: '三级 3-2-1'
          }]
        }]
      }],
      droptreeWidth: '',
      //  部门下拉树配置项/end
      platformCompare: '全部平台',
      selectItems: ['全部平台', '天猫', '京东', '苏宁', '一号', '官网'],
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '0',
          right: '10px',
          bottom: '0',
          containLabel: true
        },
        toolbox: {
          show: false,
          feature: {
            saveAsImage: {show: true}
          }
        },
        legend: {
          show: false
        },
        calculable: false,
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '成交金额',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [1200, 1132, 1001, 1134, 940, 2360, 2810]
          }
        ]
      },

      option1: {
        title: {
          show: false
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: '客户',
            type: 'pie',
            radius: [30, 130],
            center: ['50%', '50%'],
            data: [
              {value: 310, name: '新客'},
              {value: 235, name: '忠诚'},
              {value: 274, name: '活跃'},
              {value: 335, name: '流失'},
              {value: 400, name: '预流失'}
            ].sort(function (a, b) {
              return a.value - b.value
            }),
            roseType: 'radius',
            label: {
              normal: {
                textStyle: {
                  color: '#252525'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(37, 37, 37, .3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200
            }
          }
        ]
      },
      option2: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '会员数',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                textStyle: {
                  color: '#252525'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(37, 37, 37, .3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            data: [
              {value: 335, name: '普通会员'},
              {value: 310, name: '银卡会员'},
              {value: 234, name: '金卡会员'},
              {value: 135, name: '白金会员'},
              {value: 1548, name: '钻石会员'}
            ]
          }
        ]
      },

      defaultMultipleSelect: [],
      defaultSelect: '',
      currentPlatform: 'all',
      currentRecent: 'today',
      constantlyData1: [
        {
          id: 1,
          icon: 'jine',
          type: 'price',
          value: 2545157,
          description: '今日成交金额',
          tips: '今日成交金额提示语',
          totalTitle: '总成交金额',
          total: '￥220,589.84'
        },
        {
          id: 2,
          icon: 'dingdan',
          type: 'number',
          value: 100785487,
          description: '今日成交订单数',
          tips: '今日成交订单数提示语',
          totalTitle: '总成交订单数',
          total: '220,589'
        },
        {
          id: 3,
          icon: 'xinzenghuiyuan',
          type: 'number',
          value: 1547,
          description: '今日成交客户数',
          tips: '今日成交客户数提示语',
          totalTitle: '总成交客户数',
          total: '220,589'
        },
        {
          id: 4,
          icon: 'shangpin',
          type: 'number',
          value: 32323,
          description: '今日销售商品数',
          tips: '今日销售商品数提示语',
          totalTitle: '总销售商品数',
          total: '220,589'
        }
      ],
      orderPopover: false,
      trendCompareRadioData: ['成交金额', '成交订单数', '客户数', '销量数', '客单价'],
      trendCompareRadio: '成交金额'
    }
  },
  methods: {
    // 选择最近
    chooseRecent (val) {
      this.currentRecent = val
    },
    // 部门下拉树 event
    // 清空输入框
    handleCleanClick () {
      this.dropTreeValue = ''
      this.$refs.dropTree.setCheckedKeys([])
    },
    handleShowDropTree () {
      this.droptreeWidth = this.$refs.droptreeinput.$el.clientWidth
    },
    handleSelectValue (data, checked, indeterminate) {
      // this.dropTreeVisible = false
      //   this.dropTreeValue = data.label
      let checkArr = this.$refs.dropTree.getCheckedNodes()
      let checkArrLable = []
      for (let i = 0; i < checkArr.length; i++) {
        checkArrLable.push(checkArr[i].label)
      }
      this.dropTreeValue = checkArrLable.join(',')
    },
    handleHideDroptree () {
      this.dropTreeVisible = false
    },
    // 部门下拉树 event/end

    handleChangeDescription (val) {
      console.log(val)
    },

    // 选择参数：
    handleChangeCheck () {
      if (this.trendCompareCheck.length === 4) {
        this.$message({
          message: '最多只能选择四个参数',
          type: 'warning'
        })
      }
    },
    handleSaveCheck () {
      this.orderPopover = false
      this.trendCompareRadioData = this.trendCompareCheck
      if (this.trendCompareCheck.length > 4) {
        this.$message({
          message: '最多只能选择四个参数',
          type: 'warning'
        })
      }
    },
    initFunnelEchart () {
    },
    // 确认按钮点击事件 输出已选择平台及店铺
    popoverConfirmClick (name, val) {
      console.log(name, val)
    },
    // 选择平台 组件应用：
    handlePlateClick (val) {
      console.log(val)
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
            date: date,
            data: this.activityData
          }
        })
      }
    }
  },
  beforeMount () {
  },

  computed: {},
  mounted () {
    this.getMarketingActivity()
    this.getTableData()
    this.thisYear = this.$refs.activityCalendar.date.getFullYear()
    this.thisMonth = this.$refs.activityCalendar.date.getMonth() + 1
  }
})

