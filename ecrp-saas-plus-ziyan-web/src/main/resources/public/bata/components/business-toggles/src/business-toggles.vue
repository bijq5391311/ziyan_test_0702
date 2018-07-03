<template>
  <div class="tmp-toggles">
    <div class="tmp-choose__content"  ref="toggleContent">
      <slot></slot>
    </div>
    <div class="tmp-toggles__footer" v-show="isOverflow"
         @click="handleToggleFooter"
         @mouseenter="hovering = true"
         @mouseleave="hovering = false">
      <transition name="arrow-slide">
        <i :class="[toggleIconClass, { 'hovering': hovering }]"></i>
      </transition>
      <transition name="text-slide">
        <span v-show="hovering">{{ controlText }}</span>
      </transition>
    </div>
  </div>
</template>
<script>
  /**
   * bus-toggles
   * @desc 内容区块超出隐藏
   * @param {Number} max-height- 内容区域最高高度，超出则会显示底部，可操作“展开与收缩”
   *
   * @example
   *  <bus-toggles :max-height="150"><p> 内容区域如果超出150则会出现隐藏，底部可“展开与收缩”</p></bus-toggles>
   *
   */
  export default{
    name: 'busToggles',
    data () {
      return {
        isExpanded: false,
        isOverflow: false,
        hovering: false,
        contentHeight: 0
      }
    },
    props: {
      maxHeight: {
        type: Number,
        default: 180
      }
    },
    watch: {
      contentHeight (val) {
        this.showToggleModel()
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
        if (this.contentHeight > this.maxHeight) {
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
      this.contentHeight = Number(this.$refs.toggleContent.clientHeight)
    }
  }

</script>
<!--
<style lang="css">
  @import "component.css";
</style>
-->
