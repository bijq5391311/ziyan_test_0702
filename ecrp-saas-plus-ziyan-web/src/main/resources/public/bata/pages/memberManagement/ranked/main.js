import Vue from 'vue'
import NuiJs from 'nui-js'
import './page.css'
import businessEcharts from 'vue-echarts'

Vue.use(NuiJs)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#example',
  components: {
    businessEcharts
  },
  data () {
    return {
      daterange: '',
      keli: '1',
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
          left: '3%',
          right: '4%',
          bottom: '3%',
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

      // 会员来源分析
      sourceChart1: {
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['天猫', '微信', '独立官网', 'POS']
        },
        'series': [
          {
            'name': '访问来源',
            'type': 'pie',
            'radius': ['50%', '70%'],
            'avoidLabelOverlap': false,
            'label': {
              'normal': {
                'show': false,
                'position': 'center'
              },
              'emphasis': {
                'show': true,
                'textStyle': {
                  'fontSize': '30',
                  'fontWeight': 'bold'
                }
              }
            },
            'labelLine': {
              'normal': {
                'show': false
              }
            },
            'data': [
              {'value': 335, 'name': '天猫'},
              {'value': 310, 'name': '微信'},
              {'value': 234, 'name': '独立官网'},
              {'value': 135, 'name': 'POS'}
            ]
          }
        ]
      },
      // 品牌会员等级分布
      levelChart: {
        tooltip: {},
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['GAP', 'Five plus']
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: '#333',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            {name: '普通会员', max: 6500},
            {name: '高级会员', max: 16000},
            {name: '至尊会员', max: 30000},
            {name: '至尊会员四', max: 38000},
            {name: '至尊会员五', max: 52000}
          ]
        },
        series: [{
          name: '品牌会员等级分布',
          type: 'radar',
          // areaStyle: {normal: {}},
          data: [
            {
              value: [4300, 10000, 28000, 35000, 50000, 19000],
              name: 'GAP'
            },
            {
              value: [5000, 14000, 28000, 31000, 42000, 21000],
              name: 'Five plus'
            }
          ]
        }]
      }
    }
  },
  beforeMount () {
  },
  mounted () {
  },
  methods: {}
})
