<template>
  <el-popover
    @hide="popoverHide(name, resultCheckList)"
    @show="popoverShow()"
    v-model = "popoverState"
    v-if="checkboxList.length > 0 && checkboxList !== 'undefined' && checkboxList !== 'null'"
    popper-class="bus-popover-select__popover"
    placement="bottom"
    :width="width"
    trigger="click">
 <!--   <el-checkbox :indeterminate="isIndeterminate" v-model="platformCheckAll" @change="handlePlatformChange">全选</el-checkbox>
    <el-checkbox-group v-model="platformCheckList"  @change="handlePlatformChecked">
      <el-checkbox v-for="shop in platformShops"  :label="shop"
                   :style="{'width': cols === 1 ?  '25%': 100/ cols +'%'}"></el-checkbox>
    </el-checkbox-group>-->
    <!--<el-form>-->

      <!-- 搜索暂时隐藏 -->
      <!--<el-form-item v-if="filter"><el-input placeholder="搜索"></el-input></el-form-item>-->
      <el-form-item>
        <el-checkbox :indeterminate="isIndeterminate"
                     v-model="checkAll"
                     @change="handleCheckAllChange"
                     :style="{'width': 100/ cols +'%'}">全选</el-checkbox>
        <el-checkbox-group v-model="resultCheckList"  @change="handlePlatformChecked">
          <el-checkbox v-for="(checkbox, index) in checkboxList" :key="index" :label="checkbox"
                       :style="{'width': 100/ cols +'%'}"></el-checkbox>
        </el-checkbox-group>
        <div class="tmp-popover-footer">
          <el-button size="mini" @click="confirmClick(name, resultCheckList)">确定</el-button>
          <el-button size="mini" @click="resetClick()">重置</el-button>
          <el-button size="mini" @click="cancelClick(name)">取消</el-button>
        </div>
      </el-form-item>
    <!--</el-form>-->
    <el-badge :value="length" slot="reference">
      <span :class="{ 'is-active': isActive}" @click="handleClick(name)">{{name}}</span>
    </el-badge>
  </el-popover>
  <el-badge v-else>
    <span :class="{ 'is-active': isActive}" @click="handleClick(name)">{{name}}</span>
  </el-badge>
</template>

<script>
  export default{
    name: 'BusPopoverSelectItem',
    data () {
      return {
        isIndeterminate: false,
        checkAll: false,
        popoverState: false,
        length: '',
        resultCheckList: []
      }
    },
    props: {
      value: Number,
      name: String,
      checkboxList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    created () {
      this.width = this.$parent.width
      this.cols = this.$parent.cols
      this.filter = this.$parent.filter
    },
    computed: {
      isActive () {
        return this.$parent.currentName === this.name
      }
    },
    mounted () {
    },
    methods: {
      // 选择平台
      choosePlatform (val) {
        this.currentPlatform = val
      },
      handlePlatformChecked (value) {
        let checkedCount = value.length
        this.checkAll = checkedCount === this.checkboxList.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkboxList.length
      },
      /* 隐藏触发  */
      popoverHide (name, val) {
      },
      /* 显示触发 */
      popoverShow () {
        this.popoverState = true
      },
      handleCheckAllChange (event) {
        this.resultCheckList = event.target.checked ? this.checkboxList : []
        this.isIndeterminate = false
      },
      /* 取消按钮点击事件 */
      cancelClick () {
        this.popoverState = false
      },
      resetClick () {
        this.checkAll = false
        this.resultCheckList = []
        this.length = ''
        this.isIndeterminate = false
      },
      /* 确认按钮点击事件 */
      confirmClick (name, val) {
        this.popoverState = false
        this.length = this.resultCheckList.length
        this.$emit('confirm-click', name, val)
      },
      handleClick (val) {
        this.$parent.handleItemClick(val)
//        this.isActive = true
        this.$emit('item-click', name)
      }
    }
  }

</script>
