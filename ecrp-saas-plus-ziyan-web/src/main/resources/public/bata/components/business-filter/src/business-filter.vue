<template>
  <div class="tmp-filter">
    <div class="template-table-bar">
      <el-row type="flex">
        <el-col :span="14">
          <slot name="btns"></slot>
          <!--<el-button type="primary" icon="edit">批量备注</el-button>-->
          <!--<el-button type="primary" icon="message">批量发送短信</el-button>-->
          <!--<el-button type="primary" icon="upload2">导出数据（CSV）表格</el-button>-->
        </el-col>
        <el-col :span="10">
          <el-form :inline="true" :model="multipleForm" class="pull-right" v-if="multipleFilterStatus">
            <el-form-item v-if="multipleSearchCollapse">
              <el-input
                placeholder="请输入姓名"
                icon="search"
                v-model="multipleForm.user"
                :on-icon-click="filterSubmit">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="text" @click="multipleShow" ref="multipleSearchText" >展开滤选<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
            </el-form-item>
          </el-form>
          <el-button type="text" @click="resultShow" v-else ref="resultCollapseText">收缩结果<i class="el-icon-arrow-up el-icon--right"></i>
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="template-table-search" v-if="multipleSearchCollapse == false">
      <!-- 筛选表单 -->
      <div class="template-table-filter" v-if="multipleFilterStatus">
        <el-row>
          <el-col :span="15" class="template-table-plat">
            <el-form :model="multipleForm"  label-width="80px">
              <el-form-item label="关键词" >
                <el-form-grid size="xmd">
                  <el-input placeholder="编号/昵称"  v-model="multipleForm.user"></el-input>
                </el-form-grid>
              </el-form-item>
              <el-form-item label="交易来源" >
                <el-form-grid size="xmd">
                  <el-select placeholder="请选择交易来源">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-grid>
              </el-form-item>
              <el-form-item label="件数" class="el-inline-block">
                <el-form-grid size="xmd">
                  <el-row>
                    <el-col :span="11">
                      <el-input placeholder=""></el-input>
                    </el-col>
                    <el-col :span="2">~</el-col>
                    <el-col :span="11">
                      <el-input placeholder=""></el-input>
                    </el-col>
                  </el-row>
                </el-form-grid>
              </el-form-item>
              <el-form-item label="交易金额"  class="el-inline-block">
                <el-form-grid size="xmd">
                  <el-row>
                    <el-col :span="11">
                      <el-input placeholder=""  v-model="multipleForm.trade.start"></el-input>
                    </el-col>
                    <el-col :span="2">~</el-col>
                    <el-col :span="11">
                      <el-input placeholder=""  v-model="multipleForm.trade.end"></el-input>
                    </el-col>
                  </el-row>
                </el-form-grid>
              </el-form-item>
              <el-form-item label="商品编码" class="el-inline-block">
                <el-form-grid size="xmd">
                  <el-input placeholder=""></el-input>
                </el-form-grid>
                </el-form-grid >
              </el-form-item>
              <el-form-item label="原始编号"  class="el-inline-block">
                <el-form-grid size="xmd">
                  <el-input placeholder=""></el-input>
                </el-form-grid>
              </el-form-item>
              <el-form-item label="收货人"   class="el-inline-block">
                <el-form-grid size="xmd">
                  <el-input placeholder=""   v-model="multipleForm.province"></el-input>
                </el-form-grid>
              </el-form-item>
              <el-form-item label="手机号码"   class="el-inline-block">
                <el-form-grid size="xmd">
                  <el-input placeholder=""></el-input>
                </el-form-grid>
              </el-form-item>
              <el-form-item label="下单时间">
                <el-form-grid size="xmd">
                  <el-date-picker type="date" placeholder="选择日期" v-model="multipleForm.date" format="yyyy-MM-dd"></el-date-picker>
                </el-form-grid>
                <el-form-grid>-</el-form-grid>
                <el-form-grid size="xmd">
                  <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd"></el-date-picker>
                </el-form-grid>
              </el-form-item>
              <el-form-item label="付款时间">
                <el-form-grid size="xmd">
                  <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd"></el-date-picker>
                </el-form-grid>
                <el-form-grid>-</el-form-grid>
                <el-form-grid size="xmd">
                  <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd"></el-date-picker>
                </el-form-grid>
              </el-form-item>
              <el-form-item label="快递公司"  class="el-inline-block">
                <el-form-grid size="xmd">
                  <el-select placeholder="不限">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-grid>
              </el-form-item>
              <el-form-item label="物流状态"  class="el-inline-block">
                <el-form-grid size="xmd">
                  <el-select placeholder="不限">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-grid>
              </el-form-item>
              <el-form-item label="地址">
                <el-form-grid size="xmd">
                  <el-select placeholder="省/市/区">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-grid>
              </el-form-item>
              <el-form-item label="订单状态">
                <el-form-grid size="xmd">
                  <el-select placeholder="请选择"
                             v-model="multipleForm.address">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-grid>
              </el-form-item>
            </el-form>
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
          筛选结果： <el-tag v-for="(tag,index) in searchResultTags" :key="tag.name"  type="primary"  :closable="true"
                        @close="tagClose(tag)">{{tag.name}}： {{tag.value}}</el-tag>
        </div>
        <div class="control">
          <el-button type="primary"  @click="multipleRecoverSearch">修改</el-button>
          <el-button @click="multipleCleanSearch">清空</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * bus-filter
   * @desc 多条件筛选
   * @param {Number} 内容区域最高高度，超出则会显示底部，可操作“展开与收缩”
   *
   * @example
   *  <bus-filter ></bus-filter>
   *
   */
  export default{
    name: 'busToggles',
    data () {
      return {
        isExpanded: false,
        isOverflow: false,
        hovering: false
      }
    },
    props: {
      maxHeight: {
        type: Number,
        default: 180
      }
    },
    computed: {
      // 选择商品 列表展开收缩切换结构 状态值
      toggleIconClass () {
        return this.isExpanded ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
      },
      controlText () {
        return this.isExpanded ? '收缩' : '展开'
      }
      // 选择商品 列表展开收缩切换结构 状态值/end
    },
    methods: {
      showToggleModel () {
        if (this.$refs.toggleContent.clientHeight > this.maxHeight || this.$refs.toggleContent.clientHeight === 0) {
          // 设置内容区域高度超出隐藏
          this.$refs.toggleContent.style.overflow = 'hidden'
          this.$refs.toggleContent.style.maxHeight = this.maxHeight + 'px'
          // 显示底部
          this.isOverflow = true
        }
      },
      handleToggleFooter () {
        this.isExpanded = !this.isExpanded
        if (this.isExpanded) {
          this.$refs.toggleContent.removeAttribute('style')
        } else {
          this.$refs.toggleContent.style.overflow = 'hidden'
          this.$refs.toggleContent.style.maxHeight = this.maxHeight + 'px'
        }
      }
    },
    mounted () {
      this.showToggleModel()
    }
  }

</script>
<style>

</style>
