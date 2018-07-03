import Vue from 'vue'
import NuiJs from 'nui-js'
import './page.css'

Vue.use(NuiJs)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#example',
  data () {
    return {
      activeName: 'first',
      icons: [],
      sameIcons: [{
        'name': '注释解释',
        'classname': 'note',
        'uicode': 'e65c'
      }, {
        'name': '模板注释',
        'classname': 'templet-note',
        'uicode': 'e641'
      }, {
        'name': '提交审核',
        'classname': 'upload',
        'uicode': 'e898'
      }, {
        'name': '提交',
        'classname': 'submit',
        'uicode': 'e61b'
      }, {
        'name': '回答，回复',
        'classname': 'reply',
        'uicode': 'e640'
      }, {
        'name': '回答，回复-fill',
        'classname': 'reply-fill',
        'uicode': 'e63f'
      }]
    }
  },
  beforeMount () {
    this.$progress()
  },
  mounted () {
    this.getBusinessIcon()
    this.$nextTick(() => {
      this.$progress.finish()
    })
  },
  methods: {
    getBusinessIcon () {
      window.fetch('http://192.168.1.24:8071/templateBeta/businessIcon.json').then((response) => {
        return response.json()
      }).then((json) => {
        this.icons = json.data
      }).catch((ex) => {
        console.log('parsing failed', ex)
      })
    }
  }
})
