<template>
  <div class="bus-popover-select" @item-click="handleItemClick" >
    <bus-popover-select-item v-for="(item, index) in data" :key="index" :name="item.name" :checkbox-list="item.children" :filter="filter" @confirm-click="confirmBtnClick">
    </bus-popover-select-item>
  </div>
</template>

<script>
  /**
   * business-popover-select
   * @desc 平台选择
   * @param {Number} width- 店铺选择面板宽度; cols- 店铺展示栅格布局的列数
   *
   * @example
   *  <business-popover-select v-model="platformValue" :data="platform" :width="280" :cols="2" @item-click="handlePlateClick" @confirm-click="popoverConfirmClick"></business-popover-select>
   *
   */
  import BusPopoverSelectItem from '../src/popover-select-item.vue'
  export default{
    name: 'BusPopoverSelect',
    components: {
      BusPopoverSelectItem
    },
    data () {
      return {
//        activeNames: [].concat(this.value)
        currentName: this.value || this.activeName
      }
    },
    watch: {
      activeName (value) {
        this.setCurrentName(value)
      }
    },
    props: {
      data: {
        type: Array,
        default: []
      },
      activeName: String,
      value: String,
      width: {
        type: [String, Number],
        default () {
          return ''
        }
      },
      cols: {
        type: Number,
        default: 1
      },
      filter: {
        type: Boolean,
        default: true
      }
    },
    mounted () {
    },
    methods: {
      handleItemClick (val) {
        this.setCurrentName(val)
        this.$emit('item-click', val)
      },
      confirmBtnClick (name, val) {
        this.$emit('confirm-click', name, val)
      },
      setCurrentName (value) {
        this.currentName = value
        this.$emit('input', value)
      }
    }
  }

</script>

<!--
<style lang="css">
  @import "component.css";
</style>
-->
