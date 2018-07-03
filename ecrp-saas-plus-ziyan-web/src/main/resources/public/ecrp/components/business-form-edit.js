//import Vue from 'vue'
//import NuiJs from 'nui-js'
//import './page.css'
//import moment from 'moment'
//import busToggles from '../../../components/business-toggles/index'
//import busMultiFilter from '../../../components/business-multi-filter/index'

define(['jquery',"vue","nui","moment"],function($,Vue,Nui){

//Vue.use(NuiJs)
//Vue.config.productionTip = false
/* eslint-disable no-new */

/**
 * business-form-edit
 * @desc 编辑基本信息组件
 * @param {String} value     - 值传递进来，用于修改后的保存值
 * @param {Boolean} editable - 是否启动编辑状态（默认为true，设置为false时，则不可点击编辑）
 * @param {String} type      - 保存数据（value）的类型转换， type = 'date'时，可以把把value值转换成String;其他类型转换待扩展
 *
 * @event @edit-save         - 提交筛选
 * @event @edit-cancel       - 取消修改（不保存当前表单修改）
 *
 * @slot content             - 文本区域
 * @slot edit                - 编辑区域，一般放置表单如input,select等
 *
 * @example
 *<business-form-edit label="客户ID">
 *   <el-form-grid slot="content">1212143423</el-form-grid>
 *   <el-form-grid size="sm" slot="edit"><el-input value="1212143423"></el-input></el-form-grid>
 *</business-form-edit>
 *
 */
Vue.component('business-form-edit', {
	template: '<span v-if="!editStatus" class="bus-form__edit">' +
	  '<slot name="content"></slot>' +
	  '<a title="编辑" class="bus-form__edit-icon is-noedit" @click="handleFormItemEdit(value)" v-if="editable"><i class="el-icon-edit"></i></a>' +
	  '</span>' +
	  '<span v-else="editStatus" class="bus-form__edit" >' +
	  '<slot name="edit"></slot>' +
	  '<span class="bus-form__edit-control">' +
	  '<a title="保存" class="bus-form__edit-icon" @click="handleFormItemEditSave"><i class="el-icon-circle-check"></i></a> ' +
	  '<a title="取消" class="bus-form__edit-icon"  @click="handleFormItemEditCancel(oldValue)"><i class="el-icon-circle-cross"></i></a>' +
	  '</span>' +
	  '</span>',
  data:function(){
    return {
      editStatus: false,
      oldValue: ''
    }
  },
  props: {
	value: [String, Number, Object, Array, Boolean, Date],
    editable: {
      type: Boolean,
      default: true
    },
    type: String
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  mounted:function(){
	  
  },
  methods: {
	    // 信息编辑
	    handleFormItemEdit(oldValue) {
//	      this.oldValue = oldValue;
	      this.editStatus = true;
	      this.$emit('edit', this.model);
	    },
	    // 信息编辑 保存结果
	    handleFormItemEditSave () {
	      this.editStatus = false;
	      var obj = this.$children[0].$children[0].currentValue ;
	      // 当value的值是日期格式（object）且组件类型type='date'时，对数据进行转换,如果有其他格式转换的问题，请再依次写格式转换方法
	      if (typeof (this.model) === 'object' && this.type === 'date') {
	        this.model = moment(this.model).format('YYYY-MM-DD');
	      }
	      this.model = obj;
	      this.$emit('edit-save', obj);
	    },
	    // 信息编辑 取消
	    handleFormItemEditCancel () {
	      this.model = this.oldValue;
	      this.editStatus = false;
	      this.$emit('edit-cancel', this.oldValue);
	    },
	    
	  },
  
  })
})
/* /end 编辑基本信息组件 */