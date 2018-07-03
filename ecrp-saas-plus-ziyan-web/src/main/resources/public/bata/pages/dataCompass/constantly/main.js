import Vue from 'vue'
import NuiJs from 'nui-js'
import './page.css'
import businessEcharts from 'vue-echarts'
import businessPopoverSelect from '../../../components/business-popover-select/index'
// import xeWidget from '../../../components/xe-widget/src/xe-widget.vue'
// import customerOverview from '../../../components/customer-overview/src/customer-overview.vue'
Vue.use(NuiJs)
Vue.config.productionTip = false
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
          show: true,
          feature: {
            saveAsImage: {show: true}
          }
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        calculable: true,
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
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: {normal: {}},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      },
      funnel: {
        legend: {
          data: ['下单量', '付款量', '发货量', '退款量']
        },
        grid: [
          {x: '0', y: '0'}
        ],
        calculable: true,
        series: [
          {
            name: '漏斗图',
            type: 'funnel',
            x: '10px',
            y: 60,
            y2: 10,
            width: '94%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            itemStyle: {
              normal: {
                // color: 各异,
                borderColor: '#fff',
                borderWidth: 1,
                label: {
                  formatter: '{c}%',
                  show: true,
                  position: 'inside'
                },
                labelLine: {
                  show: false,
                  length: 10,
                  lineStyle: {
                    width: 1,
                    type: 'solid'
                  }
                }
              },
              emphasis: {
                borderColor: 'red',
                borderWidth: 1,
                label: {
                  show: true,
                  formatter: '{b}:{c}%',
                  textStyle: {
                    fontSize: 10
                  }
                },
                labelLine: {
                  show: true
                }
              }
            },
            data: [
              {value: 100, name: '下单量'},
              {value: 83, name: '付款量'},
              {value: 77, name: '发货量'},
              {value: 20, name: '退款量'}
            ]
          }
        ]
      },
      funnelchart: Object,
      funnelHeight: 0,

      defaultSelect: '',
      currentPlatform: 'all',
      currentRecent: 'today',
      // 选择平台
      platformValue: '全部',
      platform: [
        {
          name: '全部',
          value: 'all',
          children: []
        },
        {
          name: '天猫',
          value: 'tianmao',
          children: ['富隆维特思旗舰店天猫', '富隆酒窖旗舰店', '富采酒类专营店', '富隆特维特思旗舰店', '天猫富隆3维特思旗舰店', '富隆天猫酒3窖旗舰店', '富采酒3类专营店', '富隆特维3特思旗舰店', '天猫富3隆维特思旗舰店', '富隆3天猫酒2窖旗舰店', '富采酒类3专营店', '富隆3特维特思旗舰店', '天猫3隆维特思旗舰店', '富隆天猫酒窖旗2舰店']
        },
        {
          name: '苏宁',
          value: 'suning',
          children: ['富隆维特思旗舰店天猫', '富隆酒窖旗舰店', '富采酒类专营店', '富隆特维特思旗舰店']
        },
        {
          name: '一号',
          value: 'yihao'
        },
        {
          name: '官网',
          value: 'guanwang'
        }
      ],
      constantlyData1: [
        {
          id: 1,
          icon: 'jine',
          type: 'price',
          value: 2545157,
          description: '今日成交金额',
          tips: '今日成交金额提示语',
          list: [
            {
              name: '新客成交金额',
              numbers: '￥3,233',
              percent: '54%',
              tips: '新客成交金额提示语'
            },
            {
              name: '老客成交金额',
              numbers: '￥23,333',
              percent: '34%',
              tips: '老客成交金额提示语'
            },
            {
              name: '今日关闭金额',
              numbers: '￥6,433',
              percent: '34%',
              tips: '今日关闭金额提示语'
            },
            {
              name: '订单催付金额',
              numbers: '￥8,633',
              percent: '34%',
              tips: '老订单催付金额额提示语'
            },
            {
              name: '催付成功金额',
              numbers: '￥9,733',
              percent: '34%',
              tips: '催付成功金额额提示语'
            },
            {
              name: '今日退款金额',
              numbers: '￥22,333',
              percent: '14%',
              tips: ''
            },
            {
              name: '近7日触达客户金额',
              numbers: '￥22,333',
              percent: '14%',
              tips: '近7日触达客户金额提示语'
            }
          ]
        },
        {
          id: 2,
          icon: 'dingdan',
          type: 'number',
          value: 100785487,
          description: '今日成交订单数',
          tips: '今日成交订单数提示语',
          list: [
            {
              name: '新客成交订单数',
              numbers: '￥3,233',
              percent: '54%',
              tips: '新客成交金额提示语'
            },
            {
              name: '老客成交订单数',
              numbers: '323',
              percent: '34%',
              tips: '老客成交订单数提示语'
            },
            {
              name: '今日关闭订单数',
              numbers: '5,346',
              percent: '34%',
              tips: '今日关闭订单数提示语'
            },
            {
              name: '订单催付订单数',
              numbers: '7,547',
              percent: '34%',
              tips: '老订单催付订单数额提示语'
            },
            {
              name: '催付成功订单数',
              numbers: '￥22,373',
              percent: '34%',
              tips: '催付成功订单数提示语'
            },
            {
              name: '今日退款订单数',
              numbers: '￥42,533',
              percent: '14%',
              tips: ''
            },
            {
              name: '近7日触达客户金额',
              numbers: '￥22,533',
              percent: '14%',
              tips: '近7日触达客户金额提示语'
            }
          ]
        },
        {
          id: 3,
          icon: 'xinzenghuiyuan',
          type: 'number',
          value: 1547,
          description: '今日成交客户数',
          tips: '今日成交客户数提示语',
          list: [
            {
              name: '成交新客户数',
              numbers: '￥3,233',
              percent: '54%',
              tips: '成交新客户数提示语'
            },
            {
              name: '新客户客单价',
              numbers: '￥245',
              percent: '34%',
              tips: '新客户客单价提示语'
            },
            {
              name: '成交老客户数',
              numbers: '￥6,433',
              percent: '34%',
              tips: '成交老客户数提示语'
            },
            {
              name: '老客户客单价',
              numbers: '￥86,533',
              percent: '34%',
              tips: '老客户客单价提示语'
            },
            {
              name: '催付成功金额',
              numbers: '￥9,733',
              percent: '34%',
              tips: '催付成功金额额提示语'
            },
            {
              name: '今日退款金额',
              numbers: '￥422,333',
              percent: '14%',
              tips: ''
            },
            {
              name: '近7日触达客户数',
              numbers: '3,200',
              percent: '14%',
              tips: '近7日触达客户数提示语'
            }
          ]
        },
        {
          id: 4,
          icon: 'shangpin',
          type: 'number',
          value: 32323,
          description: '今日销售商品数',
          tips: '今日销售商品数提示语',
          list: [
            {
              name: '富隆礼品袋-双瓶（无纺布）',
              numbers: '232',
              percent: '54%',
              tips: ''
            },
            {
              name: '老客成交订单数',
              numbers: '323',
              percent: '34%',
              tips: ''
            },
            {
              name: '玛卡丽甜魅宝雪歌起泡葡萄',
              numbers: '5,346',
              percent: '34%',
              tips: ''
            },
            {
              name: '订单催付订单数',
              numbers: '7,547',
              percent: '34%',
              tips: ''
            },
            {
              name: '猎豹庄甜魅白葡萄酒',
              numbers: '￥22,333',
              percent: '34%',
              tips: ''
            },
            {
              name: '奔富389红葡萄酒',
              numbers: '323',
              percent: '14%',
              tips: ''
            },
            {
              name: '嘉斯山(庆典)红葡萄酒 ',
              numbers: '1,574',
              percent: '14%',
              tips: ''
            }
          ]
        }
      ],

      constantlyData2: [
        {
          id: 1,
          icon: 'tongji',
          type: 'number',
          value: '-60%',
          description: '销售环比',
          tips: '今日成交金额提示语',
          twice: true,
          nowIndex: '0',
          child: [
            {
              value: '-50%',
              description: '销售环比'
            },
            {
              value: '-60%',
              description: '销售同比'
            }
          ]
        },
        {
          id: 2,
          icon: 'fahuo',
          type: 'number',
          value: '15,778',
          description: '今日发货订单数',
          tips: '今日发货订单数提示语'
        },
        {
          id: 3,
          icon: 'youhuixinxi',
          type: 'price',
          value: '225.84',
          description: '今日客单价',
          tips: '今日客单价提示语'
        },
        {
          id: 4,
          icon: 'wujiaoxing',
          type: 'number',
          value: '4.8554',
          description: '服务态度',
          tips: '今服务态度服务态度服务态度数提示语'
        },
        {
          id: 5,
          icon: 'yingxiaohuodong',
          type: 'number',
          value: '10',
          description: '营销活动',
          tips: ''
        },
        {
          id: 6,
          icon: 'hudong',
          type: 'number',
          value: '15',
          description: '互动活动',
          tips: ''
        },
        {
          id: 7,
          icon: 'guanhuai',
          type: 'number',
          value: '323',
          description: '关怀活动',
          tips: ''
        },
        {
          id: 8,
          icon: 'yanshu-logo',
          type: 'price',
          value: '85,545',
          description: '短信余额',
          tips: '今服务态度服务态度服务态度数提示语',
          twice: true,
          nowIndex: '0',
          child: [
            {
              value: '85,545',
              description: '短信余额'
            },
            {
              value: '1,548',
              description: '邮件余额'
            }
          ]
        }
      ],
      currentChooseData: '',
      // 客户总览数据
      customData: [
        {
          name: '总客户数',
          number: 2902,
          percent: 0,
          view: 'http://www.baidu.com',
          touch: 'http://www.baidu.com'
        },
        {
          name: '回头客户数',
          number: 28577,
          percent: 30
        },
        {
          name: '一次购物客户数',
          number: 17790,
          percent: 3
        },
        {
          name: '新增客户数',
          number: 69480,
          percent: 86
        },
        {
          name: '新增回头客户数',
          number: 31525,
          percent: 24
        },
        {
          name: '意向客户数',
          number: 681,
          percent: 32
        },
        {
          name: '活跃客户数',
          number: 1050,
          percent: 9
        },
        {
          name: '预流失高挽回客户数',
          number: 1465,
          percent: 65
        },
        {
          name: '预流失低挽回客户数',
          number: 222287,
          percent: 86
        },
        {
          name: '流失客户数',
          number: 1125337,
          percent: 54
        }
      ],
      orderPopover: false,
      trendCompareRadioData: ['成交金额', '成交订单数', '客户数', '销量数'],
      trendCompareRadio: '成交金额',
      trendCompareCheckData: ['成交金额', '成交订单数', '客户数', '销量数', '付款金额', '付款订单数', '付款客户数', '客单价'],
      trendCompareCheck: ['成交金额', '成交订单数', '客户数', '销量数']
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
    }
  },
  beforeMount () {
  },

  computed: {},
  mounted () {
    this.funnelHeight = this.$refs.customlist.clientHeight
    this.$nextTick(() => {
      this.$refs.funnel.resize(this.funnel) // 重绘图表（令其高度为100%）
    })
    let that = this
    addEventListener('resize', function () {
      // 屏幕大小变化重新设置滚动内容区最大高度值(右侧区域)
      that.funnelHeight = that.$refs.customlist.clientHeight
    }, false)
    // let echarts = require('echarts')
    // this.funnelchart = echarts.init(document.getElementsByClassName('constantly-echarts')[0])
    // this.funnelchart.setOption(this.funnel)
  }
})

