import Vue from 'vue'
import NuiJs from 'nui-js'
import './page.css'
import businessEcharts from 'vue-echarts'

Vue.use(NuiJs)

Vue.config.productionTip = false
/* eslint-disable no-new */
let labelTop = {
  normal: {
    label: {
      show: true,
      position: 'center',
      formatter: ' ',
      textStyle: {
        baseline: 'bottom'
      }
    },
    labelLine: {
      show: false
    }
  }
}
let labelFromatter = {
  normal: {
    label: {
      formatter: ' ',
      textStyle: {
        baseline: 'top'
      }
    }
  }
}
let labelBottom = {
  normal: {
    color: '#ccc',
    label: {
      show: true,
      position: 'center'
    },
    labelLine: {
      show: false
    }
  },
  emphasis: {
    color: 'rgba(0,0,0,0)'
  }
}

new Vue({
  el: '#example',
  components: {
    businessEcharts
  },
  data () {
    return {
      visible1: false,
      visible2: false,
      dateValue: '',
      touchMode1: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['有QQ', '有手机号', '有QQ&微信', '有邮箱&手机号', '有QQ会员']
        },
        calculable: true,
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              },
              emphasis: {
                label: {
                  show: true,
                  position: 'center',
                  textStyle: {
                    fontSize: '15',
                    fontWeight: 'bold'
                  }
                }
              }
            },
            data: [
              {value: 335, name: '有QQ'},
              {value: 310, name: '有手机号'},
              {value: 234, name: '有QQ&微信'},
              {value: 135, name: '有邮箱&手机号'},
              {value: 1548, name: '有QQ会员'}
            ]
          }
        ]
      },
      touchMode2: {
        series: [
          {
            type: 'pie',
            center: ['13%', '50%'],
            radius: [15, 20],
            x: '0%', // for funnel
            itemStyle: labelFromatter,
            data: [
              {name: 'other', value: 46, itemStyle: labelBottom},
              {name: 'GoogleMaps', value: 54, itemStyle: labelTop}
            ]
          },
          {
            type: 'pie',
            center: ['37%', '50%'],
            radius: [15, 20],
            x: '20%', // for funnel
            itemStyle: labelFromatter,
            data: [
              {name: 'other', value: 56, itemStyle: labelBottom},
              {name: 'Facebook', value: 44, itemStyle: labelTop}
            ]
          },
          {
            type: 'pie',
            center: ['63%', '50%'],
            radius: [15, 20],
            x: '40%', // for funnel
            itemStyle: labelFromatter,
            data: [
              {name: 'other', value: 65, itemStyle: labelBottom},
              {name: 'Youtube', value: 35, itemStyle: labelTop}
            ]
          },
          {
            type: 'pie',
            center: ['89%', '50%'],
            radius: [15, 20],
            x: '60%', // for funnel
            itemStyle: labelFromatter,
            data: [
              {name: 'other', value: 70, itemStyle: labelBottom},
              {name: 'Google+', value: 30, itemStyle: labelTop}
            ]
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
  mounted () {
  },
  methods: {}
})
