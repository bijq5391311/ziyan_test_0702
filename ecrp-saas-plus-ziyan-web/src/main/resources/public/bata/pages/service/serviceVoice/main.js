import Vue from 'vue'
import NuiJs from 'nui-js'
import './page.css'

Vue.use(NuiJs)
Vue.config.productionTip = false
/* eslint-disable no-new */

let option = {
  el: 'canvas',
  height: 500,
  width: 1050,
  /* data与lineData中的配置参数，均无需使用单位，自动识别为PX */
  data: [
    {
      'title': '评价1',
      'num': '8380',
      'proportion': '占比80.08%',
      'coordinate': {'x': 205, 'y': 90},
      'background': '#0078d7',
      'size': 70
    }, {
      'title': '好评',
      'num': '8380',
      'proportion': '占比80.08%',
      'coordinate': {'x': 80, 'y': 260},
      'background': '#d74548',
      'size': 55
    }, {
      'title': '差评',
      'num': '8380',
      'proportion': '占比80.08%',
      'coordinate': {'x': 330, 'y': 260},
      'background': '#757575',
      'size': 55
    }, {
      'title': '事务',
      'num': '8380',
      'proportion': '占比80.08%',
      'coordinate': {'x': 550, 'y': 350},
      'background': '#0078d7',
      'size': 55
    }, {
      'title': '已处理',
      'num': '8380',
      'proportion': '占比80.08%',
      'coordinate': {'x': 650, 'y': 540},
      'background': '#0078d7',
      'size': 45
    }, {
      'title': '未处理',
      'num': '8380',
      'proportion': '占比80.08%',
      'coordinate': {'x': 450, 'y': 540},
      'background': '#757575',
      'size': 45
    }, {
      'title': '短信回复',
      'num': '8380',
      'proportion': '占比80.08%',
      'coordinate': {'x': 550, 'y': 90},
      'background': '#0078d7',
      'size': 70
    }, {
      'title': '询单',
      'num': '8380',
      'proportion': '占比80.08%',
      'coordinate': {'x': 895, 'y': 90},
      'background': '#0078d7',
      'size': 70
    }, {
      'title': '未下单',
      'num': '8380',
      'proportion': '占比80.08%',
      'coordinate': {'x': 770, 'y': 260},
      'background': '#757575',
      'size': 55
    }, {
      'title': '下单',
      'num': '8380',
      'proportion': '占比80.08%',
      'coordinate': {'x': 1020, 'y': 260},
      'background': '#0078d7',
      'size': 55
    }
  ],
  lineData: [
    {
      'startCircle': 0, /* 开始圆, 从0开始，对应data中的第一个圆 */
      'endCircle': 1, /* 结束圆 */
      'curvature': 70, /* 连线弯度 */
      'direction': '', /* 方向配置，一般情况下不需配置 */
      'long': 8
    }, {
      'startCircle': 0,
      'endCircle': 2,
      'curvature': 70,
      'direction': '',
      'long': 8
    }, {
      'startCircle': 2,
      'endCircle': 3,
      'curvature': 60,
      'direction': 'RB',
      'long': 8, /* 箭头大小 */
      'num': 8380 /* 箭头处文字 */
    }, {
      'startCircle': 3,
      'endCircle': 4,
      'curvature': 85,
      'direction': '',
      'long': 8
    }, {
      'startCircle': 3,
      'endCircle': 5,
      'curvature': 85,
      'direction': '',
      'long': 8
    }, {
      'startCircle': 6,
      'endCircle': 3,
      'curvature': 30,
      'direction': '',
      'long': 8, /* 箭头大小 */
      'num': 8380 /* 箭头处文字 */
    }, {
      'startCircle': 7,
      'endCircle': 8,
      'curvature': 70,
      'direction': '',
      'long': 8
    }, {
      'startCircle': 7,
      'endCircle': 9,
      'curvature': 70,
      'direction': '',
      'long': 8
    }, {
      'startCircle': 8,
      'endCircle': 3,
      'curvature': 60,
      'direction': 'LB',
      'long': 8, /* 箭头大小 */
      'num': 8380 /* 箭头处文字 */
    }
  ]
}
new Vue({
  el: '#example',
  components: {
  },
  data () {
    return {
      daterange: '',
      marginTop: 0,
      activeName: 'first'
    }
  },
  mounted () {
    this.adaptionFun()
    this.init(option)
    let that = this
    window.onresize = function () {
      setTimeout(function () {
        that.adaptionFun(option)
        that.init(option)
      }, 200)
    }
  },
  methods: {
    init (option) {
      let canvas = document.getElementById(option.el)
      if (option.height) {
        canvas.height = option.height
        canvas.width = option.width
      } else {
        canvas.height = canvas.clientHeight
        canvas.width = canvas.clientWidth
      }
      let scaleX = canvas.width / 1100
      let scaleY = canvas.height / 600
      let cxt = canvas.getContext('2d')
      /* 画线 */
      this.drawLine(option, scaleX, scaleY, cxt)

      /* 画圆 */
      this.drawCircle(option, scaleX, scaleY, cxt)
    },
    /* 画圆 */
    drawCircle (option, scaleX, scaleY, cxt) {
      for (var i = 0; i < option.data.length; i++) {
        let coordinateX = option.data[i].coordinate.x * scaleX
        let coordinateY = option.data[i].coordinate.y * scaleY
        this.circleFun(coordinateX, coordinateY, option.data[i].size, option.data[i].background, option.data[i].title, option.data[i].num, option.data[i].proportion, cxt)
      }
    },
    /* 圆函数 */
    circleFun (x, y, size, color, name, num, proportion, cxt) {
      /* x X轴值, y Y轴值, size 圆大小, color 圆背景色, name 圆内数据名称, num 圆内数值, proportion 圆内数值占比 */
      cxt.beginPath()
      cxt.arc(x, y, size, 0, 360, false)
      /* 填充颜色,默认是黑色 */
      cxt.fillStyle = color
      /* 画实心圆 */
      cxt.fill()
      cxt.closePath()
      /* 数据文字 */
      cxt.font = size / 4 + 'px' + ' Microsoft YaHei'
      cxt.fillStyle = '#fff'
      let beginNameX = x - cxt.measureText(name).width / 2
      let beginNameY = y - size / 2
      cxt.fillText(name, beginNameX, beginNameY)
      cxt.font = size / 2 + 'px' + ' Microsoft YaHei'
      let beginNumX = x - cxt.measureText(num).width / 2
      let beginNumY = y + 4
      cxt.fillText(num, beginNumX, beginNumY)

      cxt.font = size / 4 + 'px' + ' Microsoft YaHei'
      let beginProportionX = x - cxt.measureText(proportion).width / 2
      let beginProportionY = y + size / 2
      cxt.fillText(proportion, beginProportionX, beginProportionY)
    },
    /* 连线 */
    drawLine (option, scaleX, scaleY, cxt) {
      for (var i = 0; i < option.lineData.length; i++) {
        let startIndex = option.lineData[i].startCircle
        let endIndex = option.lineData[i].endCircle
        if (startIndex >= option.data.length || endIndex >= option.data.length) {
          console.error('坐标不存在')
          return
        }
        this.lineFun(option.data[startIndex].coordinate.x, option.data[startIndex].coordinate.y, option.data[endIndex].coordinate.x, option.data[endIndex].coordinate.y, option.lineData[i].curvature, option.lineData[i].direction, option.lineData[i].long, scaleX, scaleY, cxt, option.lineData[i].num)
      }
    },
    lineFun: function (x1, y1, x2, y2, curvature, direction, long, scaleX, scaleY, cxt, num) {
      /* x1 起始圆X轴值, y1 起始圆Y轴值, x2 终点圆X轴值, y2 终点圆Y轴值, curvature 连线弯度, long 箭头大小, num箭头处显示文字 */
      /* 适应屏幕 */
      x1 = x1 * scaleX
      y1 = y1 * scaleY
      x2 = x2 * scaleX
      y2 = y2 * scaleY

      var triangleAX, triangleAY, triangleBX, triangleBY, triangleCX, triangleCY
      let centerX = (x1 - x2) / 2
      let centerY = (y1 - y2) / 2

      /* 两个圆之间的连线 */
      cxt.setLineDash([3, 3])
      cxt.beginPath()
      cxt.strokeStyle = '#b5b5b5'
      cxt.moveTo(x1, y1)

      if (x1 - x2 > 0) {
        if (y1 - y2 > 0) {
          console.log(1)
          // console.log(direction)
          cxt.lineTo(x2 + curvature, y1)
          cxt.quadraticCurveTo(x2, y1, x2, y1 - curvature)
          cxt.lineTo(x2, y1 - curvature)
          cxt.lineTo(x2, y2)

          /* 三角形坐标 */
          triangleAX = x2 + curvature - long * 2
          triangleAY = y1
          triangleBX = x2 + curvature
          triangleBY = y1 - long
          triangleCX = x2 + curvature
          triangleCY = y1 + long
          /* 三角形坐标-结束 */
        } else if (y1 === y2) {
          // console.log(direction)
          cxt.lineTo(x2, y2)
          /* 三角形坐标 */
          triangleAX = x1 - centerX - long * 2
          triangleAY = y1 - centerY

          triangleBX = x1 - centerX
          triangleBY = y1 - centerY - long

          triangleCX = x1 - centerX
          triangleCY = y1 - centerY + long
          /* 三角形坐标-结束 */
        } else {
          // console.log(2)
          if (direction === 'LB') {
            cxt.lineTo(x1, y2 - curvature)
            cxt.quadraticCurveTo(x1, y2, x1 - curvature, y2)
            cxt.lineTo(x1 - curvature, y2)
            cxt.lineTo(x2, y2)
            /* 三角形坐标 */
            triangleAX = x1 - 30 - curvature - long * 2
            triangleAY = y2

            triangleBX = x1 - 30 - curvature
            triangleBY = y2 - long

            triangleCX = x1 - 30 - curvature
            triangleCY = y2 + long
            /* 三角形坐标-结束 */
            if (num) {
              cxt.font = '14px Microsoft YaHei'
              cxt.fillStyle = '#000'
              let beginNameX = triangleAX - 10
              let beginNameY = triangleAY + 30
              cxt.fillText(num, beginNameX, beginNameY)
            }
          } else {
            cxt.lineTo(x2 + curvature, y1)
            cxt.quadraticCurveTo(x2, y1, x2, y1 + curvature)
            cxt.lineTo(x2, y1 + curvature)
            cxt.lineTo(x2, y2)
            /* 三角形坐标 */
            triangleAX = x2
            triangleAY = y1 + curvature + long * 2

            triangleBX = x2 + long
            triangleBY = y1 + curvature

            triangleCX = x2 - long
            triangleCY = y1 + curvature
            /* 三角形坐标-结束 */
          }
        }
      } else if (x1 === x2 || y1 === y2) {
        cxt.lineTo(x2, y2)

        if (x1 === x2) {
          // console.log(direction)
          // console.log('上下')
          /* 三角形坐标 */
          triangleAX = x1
          triangleAY = y1 - centerY + long * 3

          triangleBX = x1 - long
          triangleBY = y1 - centerY + long

          triangleCX = x1 + long
          triangleCY = y1 - centerY + long
          if (num) {
            cxt.font = '14px Microsoft YaHei'
            cxt.fillStyle = '#000'
            let beginNameX = triangleAX + 20
            let beginNameY = triangleAY
            cxt.fillText(num, beginNameX, beginNameY)
          }
          /* 三角形坐标-结束 */
        } else if (y1 === y2) {
          // console.log(direction)
          /* 三角形坐标 */
          triangleAX = x1 - centerX + long * 2
          triangleAY = y1

          triangleBX = x1 - centerX
          triangleBY = y1 - centerY - long

          triangleCX = x1 - centerX
          triangleCY = y1 - centerY + long
          /* 三角形坐标-结束 */
        }
      } else {
        if (y1 - y2 > 0) {
          // console.log(direction)
          cxt.lineTo(x2 - curvature, y1)
          cxt.quadraticCurveTo(x2, y1, x2, y1 - curvature)
          cxt.lineTo(x2, y1 - curvature)
          cxt.lineTo(x2, y2)
          /* 三角形坐标 */
          triangleAX = x2 - curvature
          triangleAY = y1

          triangleBX = x2 - curvature - long
          triangleBY = y1 - long

          triangleCX = x2 - curvature - long
          triangleCY = y1 + long
          /* 三角形坐标-结束 */
        } else {
          if (direction === 'RB') {
            // console.log(direction)
            cxt.lineTo(x1, y2 - curvature)
            cxt.quadraticCurveTo(x1, y2, x1 + curvature, y2)
            cxt.lineTo(x1 + curvature, y2)
            cxt.lineTo(x2, y2)
            /* 三角形坐标 */
            triangleAX = x1 + 30 + curvature + long * 2
            triangleAY = y2

            triangleBX = x1 + 30 + curvature
            triangleBY = y2 - long

            triangleCX = x1 + 30 + curvature
            triangleCY = y2 + long
            /* 三角形坐标-结束 */
            if (num) {
              cxt.font = '14px Microsoft YaHei'
              cxt.fillStyle = '#000'
              let beginNameX = triangleBX - 10
              let beginNameY = triangleAY + 30
              cxt.fillText(num, beginNameX, beginNameY)
            }
          } else {
            cxt.lineTo(x2 - curvature, y1)
            cxt.quadraticCurveTo(x2, y1, x2, y1 + curvature)
            cxt.lineTo(x2, y1 + curvature)
            cxt.lineTo(x2, y2)
            /* 三角形坐标 */
            triangleAX = x2
            triangleAY = y1 + curvature + long * 2

            triangleBX = x2 - long
            triangleBY = y1 + curvature

            triangleCX = x2 + long
            triangleCY = y1 + curvature
            /* 三角形坐标-结束 */
          }
        }
      }
      cxt.stroke()
      cxt.beginPath()
      cxt.moveTo(triangleAX, triangleAY)
      cxt.lineTo(triangleBX, triangleBY)
      cxt.lineTo(triangleCX, triangleCY)
      cxt.fillStyle = '#b5b5b5'
      cxt.fill()
    },
    adaptionFun: function () {
      let canvasHeight = document.body.offsetHeight - (this.$el.offsetTop + this.$refs.layoutTop.$el.offsetHeight + 70)
      let canvasWidth = this.$refs.layoutTop.$el.offsetWidth
      if (canvasHeight > 600) {
        option.height = canvasHeight
        option.width = canvasWidth
        option.lineData[3].curvature = 160
        option.lineData[4].curvature = 160
      } else {
        option.height = 500
        option.width = 1050
        option.lineData[3].curvature = 85
        option.lineData[4].curvature = 85
      }
      let leftLimitHeight = document.body.offsetHeight - (this.$el.offsetTop + this.$refs.layoutTop.$el.offsetHeight + 30)
      this.marginTop = (leftLimitHeight - option.height) / 2
    }
  }
})
