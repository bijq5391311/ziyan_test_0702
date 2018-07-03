<template>
  <div class="tmp-filter">
    <div class="template-table-bar">
      <el-row type="flex" v-if="!trisect">
        <el-col :span="gridCount[0]">
          <slot name="btns"></slot>
          <el-button  v-if="btnsInfo !== undefined && btnsInfo.length < 5" type="primary"
                     v-for="(btn, index) in btnsInfo"
                     :key="index"
                     :style="{ 'margin-right': index === btnsInfo.length - 1 ? '' : '4px' }"
                     @click="onCustomBtnEvent(btn)">{{btn.text}}</el-button>
          <template v-if="btnsInfo !== undefined  && btnsInfo.length >= 5">
            <el-button  type="primary"
                        v-if="btnsInfo !== undefined && (index < 3)"
                        v-for="(btn, index) in btnsInfo"
                        :key="index"
                        :style="{ 'margin-right': index === btnsInfo.length - 1 ? '' : '4px' }"
                        @click="onCustomBtnEvent(btn)">{{btn.text}}</el-button>

            <el-dropdown trigger="click" menu-align="end" @command="onCustomBtnEvent" >
              <el-button type="primary">
                更多<i class="el-icon-caret-bottom el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(btn,index) in btnsInfo"
                                  v-if="index >= 3"
                                  :key="btn.text"
                                  :command="btn">
                  {{btn.text}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-col>
        <el-col :span="gridCount[1]">
          <div class="text-right template-sigleform" v-if="multipleFilterStatus">
            <slot name="singleform" v-if="multipleSearchCollapse"></slot>
            <el-button @click="multipleShow" v-html="collapsedHtml" v-if="$slots.multiform" type="text" style="margin-left:10px;height:30px;margin-bottom: 5px;"></el-button>
          </div>
          <el-button v-else @click="resultShow" v-html="resultHtml" type="text" class="pull-right" style="height:30px;margin-bottom: 5px;"></el-button>
        </el-col>
      </el-row>
      <el-row type="flex" v-else>
        <el-col :span="8">
          <slot name="btns"></slot>
        </el-col>
        <el-col :span="8">
          <slot name="middle"></slot>
        </el-col>
        <el-col :span="8">
          <div class="pull-right text-right" v-if="multipleFilterStatus">
            <el-button @click="multipleShow" v-html="collapsedHtml" v-if="$slots.multiform" type="text" class="pull-right" style="margin-left:10px;height:30px;margin-bottom: 5px;"></el-button>
            <slot name="singleform" v-if="multipleSearchCollapse"></slot>
          </div>
          <el-button v-else @click="resultShow" v-html="resultHtml" type="text" class="pull-right" style="height:30px;margin-bottom: 5px;"></el-button>
        </el-col>
      </el-row>
    </div>
    <div class="template-table-search" v-if="multipleSearchCollapse == false">
      <!-- 筛选表单 -->
      <div class="template-table-filter" v-if="multipleFilterStatus">
        <el-row>
          <el-col :span="20" class="template-table-plat">
            <slot name="multiform"></slot>
            <div class="template-table-control">
              <el-button type="primary" @click="multipleSubmitSearch">搜索</el-button>
              <el-button @click="multipleResetSearch">重置</el-button>
            </div>
          </el-col>
        </el-row>

      </div>
      <!-- 筛选结果 -->
      <div class="template-table-result" v-if="!multipleFilterStatus && searchResultStatus">
        <div class="rule">
          <span class="rule-label">筛选结果：</span>
          <slot name="result"></slot>
          <div class="control">
            <el-button type="primary" @click="multipleRecoverSearch">修改</el-button>
            <el-button @click="multipleCleanSearch">清空</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * bus-multi-filter
   * @desc 多条件筛选
   * @param {Array} grid - 搜索条二等分时，用于自定义左右栅格大小
   * @param {Array} btnsInfo - 按钮组配置，包含
   * @param {Boolean} trisect - 搜索条三等分，用于中间添加按钮组（如数据分析 - 表格与图形切换）
   *
   * @event @submit-search  - 提交筛选事件
   * @event @reset-search   - 重置筛选条件
   * @event @clean-search   - 清空筛选条件
   * @event @recover-search - 修改筛选条件
   *
   * @slot btns        - 按钮区域
   * @slot singleform  - 单条件表单
   * @slot defalut     - 多条件表单区域
   * @slot result      - 搜索结果
   * @slot middle      - 搜索条的栅格中间内容，当trisect为true时此slot才可显示
   * @example
   *  <bus-multi-filter></bus-multi-filter>
   *
   */
  export default{
    name: 'busMultiFilter',
    data () {
      return {
        multipleSearchCollapse: true,  // 单条件与多条件区域切换
        multipleFilterStatus: true,    // 多条件区域与搜索结果切换
        searchResultStatus: true       // 筛选结果
      }
    },
    props: {
      grid: {
        type: Array,
        default () {
          return [16, 8]
        }
      },
      btnsInfo: Array,
      trisect: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      grid (newVal, oldVal) {
      }
    },
    computed: {
      // 展开收缩"多条件筛选表单" 状态值
      collapsedHtml () {
        return this.multipleSearchCollapse ? '展开滤选<i class="el-icon-arrow-down el-icon--right"></i>' : '收缩滤选<i class="el-icon-arrow-up el-icon--right"></i>'
      },
      // 展开收缩"搜索结果" 状态值
      resultHtml () {
        return this.searchResultStatus ? '展开结果<i class="el-icon-arrow-down el-icon--right"></i>' : '收缩结果<i class="el-icon-arrow-up el-icon--right"></i>'
      },
      gridCount () {
        if (this.grid.length !== 2) {
          return [16, 8]
        } else {
          return this.grid
        }
      }
    },
    methods: {
      /**
       * 自定义按钮组事件
       * @param opts
       */
      onCustomBtnEvent (btn) {
        // 数据中有配置fn时，使用数据中的fn，否则对事件进行派发出去
        if (btn.fn) {
          btn.fn(btn)
        } else {
          this.$emit('toolbar-btns-methods', btn)
        }
      },
      // 展开收缩多条件筛选表单
      multipleShow () {
        if (this.multipleSearchCollapse) {
          this.multipleSearchCollapse = false
        } else {
          this.multipleSearchCollapse = true
        }
      },
      // 展开收缩搜索结果
      resultShow () {
        if (this.searchResultStatus) {
          this.searchResultStatus = false
        } else {
          this.searchResultStatus = true
        }
      },
      // 提交筛选
      multipleSubmitSearch () {
        this.multipleFilterStatus = false
        this.$emit('submit-search')
      },
      // 重置筛选条件
      multipleResetSearch () {
        this.multipleFilterStatus = true
        this.$emit('reset-search')
      },
      // 清空筛选条件
      multipleCleanSearch () {
        this.multipleSearchCollapse = true
        this.multipleFilterStatus = true
        this.$emit('clean-search')
      },
      // 修改筛选条件
      multipleRecoverSearch () {
        this.multipleFilterStatus = true
        this.$emit('recover-search')
      }
    },
    mounted () {
    }
  }

</script>
<!--<style lang="css">
  @import "component.css";
</style>-->
