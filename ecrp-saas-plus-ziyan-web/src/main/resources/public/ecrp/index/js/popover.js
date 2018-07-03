

define([ "vue", "nui", "jquery","/public/ecrp/index/js/popover-item.js"],
		function(Vue, Nui, $,BusPopoverSelectItem) {
	return {
	    components: {
		      BusPopoverSelectItem
		    },
		    template:`
			    <div class="bus-popover-select" @item-click="handleItemClick" >
			    <bus-popover-select-item v-for="(item, index) in data" :key="index" :name="item.name" :checkbox-list="item.children" :filter="filter" @confirm-click="confirmBtnClick">
			    </bus-popover-select-item>
			  </div>
		    `,
		    data: function() {
				      return {
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
		      default:function () {
		          return []
		        }
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
})

