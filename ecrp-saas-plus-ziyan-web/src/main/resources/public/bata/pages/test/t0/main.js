import Vue from 'vue'
import NuiJs from 'nui-js'
import FT from '../../../utils/fetchTools'
import './src/page.css'
import 'V/b'
// import moment from 'moment'
Vue.use(NuiJs)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    show: false
  },
  created () {
    console.log('created 创建完毕状态===============》')
    console.log(this.message)
    console.log(this.$el)
    this.show = true
  },
  beforeMount () {
    console.log(this.$el)
    this.$el.style.color = '#f00'
  },
  mounted () {
    this.show = false
    this.demoGetData()
    this.demoPostData()
  },
  methods: {
    demoGetData: function () {
      window.fetch('http://192.168.10.35/tempdata/getBanner.json', {credentials: 'include'}).then(response => {
        return response.json()
      }).then(FT.state).then(function (json) {
        console.log('parsed json', json)
      }).catch(ex => {
        console.log('parsing failed', ex)
      })
    },
    demoPostData: function () {
      window.fetch(FT.url('/collectActivityMobile/addCollectActivityLog'), {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Accept': 'application/json'
          // 'Content-Type': 'application/json' // 记得加上这行，不然bodyParser.json() 会识别不了
        },
        body: JSON.stringify({
          crowdId: 123
        })
      }).then(function (response) {
        return response.json()
      }).then(function (json) {
        console.log('parsed json', json)
      }).catch(function (ex) {
        console.log('parsing failed', ex)
      })
    }
  }
})
