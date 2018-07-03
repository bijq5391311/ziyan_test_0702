import Vue from 'vue'
import NuiJs from 'nui-js'
import Cookies from 'js-cookie'
import chinaMap from './china.json'
import businessEcharts from 'vue-echarts'
import echarts from 'echarts'
import 'echarts-wordcloud'
import './page.css'

Vue.use(NuiJs)
businessEcharts.registerMap('china', chinaMap)

Vue.config.productionTip = false

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

/* eslint-disable no-new */
new Vue({
  el: '#example',
  components: {
    businessEcharts
  },
  data () {
    return {
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false,
      visible6: false,
      dateValue: '',
      daterange: '',
      defaultSelect: '',
      defaultSelect1: '',
      cookieState: false,
      isOpen: false,
      // 性别分布
      sexDistribution: {
        legend: {
          x: 'center',
          y: 'bottom',
          data: ['男', '女', '未知']
        },
        series: [
          {
            name: '性别分布',
            type: 'pie',
            radius: ['0', '70%'],
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
                }
              }
            },
            data: [
              {'value': 335, 'name': '男'},
              {'value': 310, 'name': '女'},
              {'value': 234, 'name': '未知'}
            ]
          }
        ],
        color: ['#116ddd', '#d74548', '#d0d0d0']
      },
      // 年龄分布
      ageDistribution: {
        tooltip: {},
        legend: {
          x: 'center',
          y: 'bottom',
          data: ['18岁以下', '18-24岁', '25-29岁', '35岁及以上', '未知']
        },
        series: [
          {
            name: '性别分布',
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
                }
              }
            },
            data: [
              {'value': 335, 'name': '18岁以下'},
              {'value': 123, 'name': '18-24岁'},
              {'value': 423, 'name': '25-29岁'},
              {'value': 183, 'name': '35岁及以上'},
              {'value': 249, 'name': '未知'}
            ]
          }
        ],
        color: ['#fad860', '#26c0c0', '#9bca63', '#d74548', '#116ddd']
      },
      // 地域分布
      geographicalDistribution: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          show: false
        },
        visualMap: {
          show: false,
          textStyle: {
            color: '#252525'
          },
          pieces: [
            {min: 10000000, label: '>1000万', color: 'rgba(16, 109, 221, 1)'},
            {min: 5000000, max: 10000000, label: '500万-1000万', color: 'rgba(16, 109, 221, .85)'},
            {min: 1000000, max: 5000000, label: '100万-500万', color: 'rgba(16, 109, 221, .70)'},
            {min: 100000, max: 1000000, label: '10万-100万', color: 'rgba(16, 109, 221, .55)'},
            {min: 10000, max: 100000, label: '1-10万', color: 'rgba(16, 109, 221, .40)'},
            {min: 0, max: 10000, label: '0-1万', color: 'rgba(16, 109, 221, .25)'}
          ]
        },
        itemStyle: {
          normal: {
            borderWidth: 1,
            label: {
              show: false
            }
          },
          emphasis: {                 // 也是选中样式
            borderWidth: 1,
            borderColor: '#fff',
            color: '#d64748',
            label: {
              show: false
            }
          }
        },
        series: [
          {
            name: '地域分布',
            type: 'map',
            mapType: 'china',
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            data: [
              { 'name': '北京', 'value': 1 },
              { 'name': '天津', 'value': 12312 },
              { 'name': '上海', 'value': 123123 },
              { 'name': '重庆', 'value': 1412411 },
              { 'name': '河北', 'value': 14124124 },
              { 'name': '河南', 'value': 515747 },
              { 'name': '云南', 'value': 1231231 },
              { 'name': '辽宁', 'value': 89012312 },
              { 'name': '黑龙江', 'value': 15152 },
              { 'name': '湖南', 'value': 4514215 },
              { 'name': '安徽', 'value': 21341 },
              { 'name': '山东', 'value': 12125 },
              { 'name': '新疆', 'value': 9523182 },
              { 'name': '江苏', 'value': 12154823 },
              { 'name': '浙江', 'value': 4141123 },
              { 'name': '江西', 'value': 41541123 },
              { 'name': '湖北', 'value': 1652451 },
              { 'name': '广西', 'value': 12514235 },
              { 'name': '甘肃', 'value': 51801 },
              { 'name': '山西', 'value': 1515201 },
              { 'name': '内蒙古', 'value': 9513559 },
              { 'name': '陕西', 'value': 2612358 },
              { 'name': '吉林', 'value': 9210326 },
              { 'name': '福建', 'value': 812580 },
              { 'name': '贵州', 'value': 8452000 },
              { 'name': '广东', 'value': 84512311 },
              { 'name': '青海', 'value': 8487812 },
              { 'name': '西藏', 'value': 5189231 },
              { 'name': '四川', 'value': 12312 },
              { 'name': '宁夏', 'value': 141677 },
              { 'name': '海南', 'value': 7893452 },
              { 'name': '台湾', 'value': 5276823 },
              { 'name': '香港', 'value': 237 },
              { 'name': '澳门', 'value': 8432 },
              { 'name': '南海诸岛', 'value': 325641 }
            ]
          }
        ]
      },
      // 来源分布
      sourceDistribution: {
        tooltip: {},
        legend: {
          x: 'center',
          y: 'bottom',
          data: ['淘宝', '客户官网', '拍拍']
        },
        series: [
          {
            name: '来源分布',
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
                }
              }
            },
            data: [
              {'value': 335, 'name': '淘宝'},
              {'value': 123, 'name': '客户官网'},
              {'value': 423, 'name': '拍拍'}
            ]
          }
        ],
        color: ['#fad860', '#116ddd', '#26c0c0']
      },
      // 触达方式
      touchMode1: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['有QQ', '有手机号', '有QQ&微信', '有邮箱&手机号']
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
              {value: 135, name: '有邮箱&手机号'}
            ]
          }
        ],
        color: ['#116ddd', '#d74548', '#fad860', '#26c0c0']
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
        ],
        color: ['#116ddd', '#d74548', '#fad860', '#26c0c0']
      }
    }
  },
  beforeMount () {
  },
  mounted () {
    this.labelAttributes()
    this.checkCookie()
  },
  methods: {
    /* 点击时储存cookie，并切换说明是否展开 */
    getState () {
      this.cookieState = !this.cookieState
      Cookies.set('cookieState', this.cookieState, { path: '' })
    },
    /* 初始化时，判断是否展开帮助说明 */
    checkCookie () {
      const state = Cookies.get('cookieState')
      if (state === 'false') {
        this.cookieState = false
      } else if (state === 'true') {
        this.cookieState = true
      } else {
        Cookies.set('cookieState', this.cookieState, { path: '' })
      }
    },
    /* 标签属性图表实现 */
    labelAttributes () {
      let myChart = echarts.init(document.getElementById('main'))
      let option = {
        title: {
          show: false
        },
        tooltip: {
          show: true
        },
        series: [{
          name: '标签属性',
          type: 'wordCloud',
          size: ['80%', '80%'],
          textRotation: [0, 45, 90, -45],
          textPadding: 0,
          autoSize: {
            enable: true,
            minSize: 14
          },
          textStyle: {
            normal: {
              color: function () {
                return 'rgb(' + [Math.round(Math.random() * 160), Math.round(Math.random() * 160), Math.round(Math.random() * 160)].join(',') + ')'
              }
            },
            emphasis: {
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          data: [
            {
              name: 'Sam S Club',
              value: 10000
            },
            {
              name: 'Macys',
              value: 6181
            },
            {
              name: 'Amy Schumer',
              value: 4386
            },
            {
              name: 'Jurassic World',
              value: 4055
            },
            {
              name: 'Charter Communications',
              value: 2467
            },
            {
              name: 'Chick Fil A',
              value: 2244
            },
            {
              name: 'Planet Fitness',
              value: 1898
            },
            {
              name: 'Pitch Perfect',
              value: 1484
            },
            {
              name: 'Express',
              value: 1112
            },
            {
              name: 'Home',
              value: 965
            },
            {
              name: 'Johnny Depp',
              value: 847
            },
            {
              name: 'Lena Dunham',
              value: 582
            },
            {
              name: 'Lewis Hamilton',
              value: 555
            },
            {
              name: 'KXAN',
              value: 550
            },
            {
              name: 'Mary Ellen Mark',
              value: 462
            },
            {
              name: 'Farrah Abraham',
              value: 366
            },
            {
              name: 'Rita Ora',
              value: 360
            },
            {
              name: 'Serena Williams',
              value: 282
            },
            {
              name: 'NCAA baseball tournament',
              value: 273
            },
            {
              name: 'Point Break',
              value: 265
            }
          ]
        }]
      }
      myChart.setOption(option)
    },
    /* 表单重置 */
    resetFun () {
      this.daterange = ''
      this.defaultSelect = ''
      this.defaultSelect1 = ''
    }
  }
})
