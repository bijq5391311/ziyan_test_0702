import Vue from 'vue'
import NuiJs from 'nui-js'
import Cookies from 'js-cookie'
import './page.css'

Vue.use(NuiJs)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#example',
  data () {
    return {
      daterange: '',
      defaultSelect: '',
      defaultSelect1: '',
      cookieState: false,
      /* 忠诚度阶梯 */
      titleX: '忠诚度',
      titleY: '活跃度',
      lengthX: 5, // 横轴长度
      lengthY: 5, // 竖轴长度
      firColor: '#176cd8',
      secColor: '#f5a915',
      domList: [],
      isOpen: false,
      lists: [
        {
          items: [
            {
              title: 'R≤45，F=1',
              num: '3人（16.53%）',
              price: '￥0.22',
              total: '￥0.65'
            },
            {
              title: 'R≤45，F=1',
              num: '3人（16.53%）',
              price: '￥0.22',
              total: '￥0.65'
            },
            {
              title: 'R≤45，F=1',
              num: '3人（16.53%）',
              price: '￥0.22',
              total: '￥0.65'
            },
            {
              title: 'R≤45，F=1',
              num: '3人（16.53%）',
              price: '￥0.22',
              total: '￥0.65'
            },
            {
              title: 'R≤45，F=1',
              num: '3人（16.53%）',
              price: '￥0.22',
              total: '￥0.65'
            }
          ]
        },
        {
          items: [
            {
              title: 'R≤45，F=1',
              num: '3人（16.53%）',
              price: '￥0.22',
              total: '￥0.65'
            },
            {
              title: 'R≤45，F=1',
              num: '3人（16.53%）',
              price: '￥0.22',
              total: '￥0.65'
            },
            {
              title: 'R≤45，F=1',
              num: '3人（16.53%）',
              price: '￥0.22',
              total: '￥0.65'
            },
            {
              title: 'R≤45，F=1',
              num: '3人（16.53%）',
              price: '￥0.22',
              total: '￥0.65'
            },
            {
              title: 'R≤45，F=1',
              num: '3人（16.53%）',
              price: '￥0.22',
              total: '￥0.65'
            }
          ]
        },
        {
          items: [
            {
              title: 'R≤45，F=1',
              num: '3人（16.53%）',
              price: '￥0.22',
              total: '￥0.65'
            },
            {
              title: 'R≤45，F=1',
              num: '3人（16.53%）',
              price: '￥0.22',
              total: '￥0.65'
            },
            {
              title: 'R≤45，F=1',
              num: '3人（16.53%）',
              price: '￥0.22',
              total: '￥0.65'
            },
            {
              title: 'R≤45，F=1',
              num: '3人（16.53%）',
              price: '￥0.22',
              total: '￥0.65'
            },
            {
              title: 'R≤45，F=1',
              num: '3人（16.53%）',
              price: '￥0.22',
              total: '￥0.65'
            }
          ]
        },
        {
          items: [
            {
              title: 'R≤45，F=1',
              num: '3人（16.53%）',
              price: '￥0.22',
              total: '￥0.65'
            },
            {
              title: 'R≤45，F=1',
              num: '3人（16.53%）',
              price: '￥0.22',
              total: '￥0.65'
            },
            {
              title: 'R≤45，F=1',
              num: '3人（16.53%）',
              price: '￥0.22',
              total: '￥0.65'
            },
            {
              title: 'R≤45，F=1',
              num: '3人（16.53%）',
              price: '￥0.22',
              total: '￥0.65'
            },
            {
              title: 'R≤45，F=1',
              num: '3人（16.53%）',
              price: '￥0.22',
              total: '￥0.65'
            }
          ]
        },
        {
          items: [
            {
              title: 'R≤45，F=1',
              num: '3人（16.53%）',
              price: '￥0.22',
              total: '￥0.65'
            },
            {
              title: 'R≤45，F=1',
              num: '3人（16.53%）',
              price: '￥0.22',
              total: '￥0.65'
            },
            {
              title: 'R≤45，F=1',
              num: '3人（16.53%）',
              price: '￥0.22',
              total: '￥0.65'
            },
            {
              title: 'R≤45，F=1',
              num: '3人（16.53%）',
              price: '￥0.22',
              total: '￥0.65'
            },
            {
              title: 'R≤45，F=1',
              num: '3人（16.53%）',
              price: '￥0.22',
              total: '￥0.65'
            }
          ]
        }
      ]
      /* 忠诚度阶梯-end */
    }
  },
  beforeMount () {
  },
  mounted () {
    this.checkCookie()
    this.rfnFun()
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
    /* 忠诚度初始化函数 */
    rfnFun () {
      this.domFun()
      this.setBackground()
      this.setOpacity(this.lengthX, this.lengthY)
      /* 输出内容 */
      this.domList.forEach((value, index, array) => {
        this.$refs.rfmList.appendChild(value)
      })
    },
    /* 循环dom节点并填充数据 */
    domFun () {
      this.lists.forEach((value, index, array) => {
        let domLi = document.createElement('li')
        value.items.forEach((value, index, array) => {
          let domDiv = document.createElement('div')
          domDiv.className = 'rfm-list__content clearfix'
          let domContent = document.createElement('div')
          domContent.className = 'list-content clearfix'
          let domBackground = document.createElement('div')
          domBackground.className = 'list-bg'
          let domTitle = document.createElement('h4')
          domTitle.className = 'list-title text-center'
          domTitle.innerHTML = value.title
          let domData1 = document.createElement('p')
          domData1.className = 'list-data'
          domData1.innerHTML = '客户数：' + value.num
          let domData2 = document.createElement('p')
          domData2.className = 'list-data'
          domData2.innerHTML = '客单价：' + value.price
          let domData3 = document.createElement('p')
          domData3.className = 'list-data'
          domData3.innerHTML = '付款总额：' + value.total
          domContent.appendChild(domTitle)
          domContent.appendChild(domData1)
          domContent.appendChild(domData3)
          domContent.appendChild(domData2)
          domDiv.appendChild(domContent)
          domDiv.appendChild(domBackground)
          domLi.appendChild(domDiv)
        })
        this.domList.push(domLi)
      })
    },
    /* 设置忠诚度背景颜色 */
    setBackground () {
      for (let i = 0; i < this.domList.length; i++) {
        for (let j = 0; j < this.domList[i].childNodes.length; j++) {
          this.domList[i].childNodes[j].childNodes[1].style.backgroundColor = this.firColor
        }
        for (let m = i + 1; m < this.domList[i].childNodes.length; m++) {
          this.domList[i].childNodes[m].childNodes[1].style.backgroundColor = this.secColor
        }
      }
    },
    /* 设置忠诚度背景透明度 */
    setOpacity (lengthX, lengthY) {
      let xVlue = 1 / (lengthX - 1)
      let yVlue = 1 / lengthY
      for (let i = 0; i < lengthY; i++) {
        for (let j = 0; j <= i; j++) {
          this.domList[i].childNodes[j].childNodes[1].style.opacity = (i - j + 1) * yVlue
        }
        /* 右上方颜色透明度设置 */
        for (let h = (lengthY - 1); h > 0; h--) {
          if (h <= i) {
            continue
          }
          this.domList[i].childNodes[h].childNodes[1].style.opacity = (h - i) * xVlue
        }
      }
    },
    /* 表单重置 */
    resetFun () {
      this.daterange = ''
      this.defaultSelect = ''
      this.defaultSelect1 = ''
    }
  }
})
