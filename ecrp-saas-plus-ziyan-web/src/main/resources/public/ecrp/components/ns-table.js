
/**
 * ns-table
 * @desc 高级表格(多功能表格)
 * ______________Attributes_________________
 * -- 1、表格 --
 * @param {Array}   data                - 表格数据
 * @param {Object}  table-param         - 表格参数配置，参考NUI Table Attributes（除data外，其余配置都在此参数中应用） - {class: '', height: '', ……}
 * @param {Boolean} selection           - 是否显示带复选框列
 * @param {String}  selection-col-width - 复选框列宽度，默认34 *
 * @param {Array}   column-param        - 表格列展示数据配置，参考NUI Table-column Attributes
 * @param {Object}  column-btns-param   - 表格操作列  {label: '表头标题',width: '列宽',list: [{text: '按钮文本', fn: ()=> {按钮对应事件方法}}]}
 * @param {Object}  loading-param       - 表格加载中图标及文本提示
 *
 * -- 2、搜索工具栏 --
 * @param {Boolean} toolbar             - 是否显示搜索工具栏
 * @param {Boolean} toolbar-trisect     - 搜索工具栏三等分，用于中间添加按钮组（如数据分析 - 表格与图形切换）
 * @param {Array}   toolbar-btns-info   - 搜索工具栏按钮组配置（包含文本及事件）
 * @param {Array}   toolbar-grid        - 栅格，默认[16, 8](注：toolbar-trisect=true下此配置无效)
 * -- 2、页码 --
 * @param {Object}  pagination          - 页码配置
 *
 * -----------------------------------------
 *
 * _________________Event___________________
 * -- 表格 --
 * @event 可参考NUI组件table中的Table Events
 * @event @column-btns-methods {opts}   - 表格操作列按钮组事件({data,dataRow,dataRowIndex,btnIndex,btnInfo})
 * -- 搜索工具栏 --
 * @event @submit-search                - 提交筛选事件（“搜索”按钮）
 * @event @reset-search                 - 重置筛选条件（“重置”按钮）
 * @event @clean-search                 - 清空筛选条件（“清空”按钮）
 * @event @recover-search               - 修改筛选条件（“修改”按钮）
 * @event @toolbar-btns-methods {btn}   - 按钮组事件
 * -- 页码 --
 * @event @current-page-change {page}   -改变当前页码事件
 * @event @page-size-change {sizePage}  - 改变每页显示的数量事件
 *
 * -----------------------------------------
 *
 *
 * _________________Method__________________
 * -- 表格 -- 参考NUI Table Methods
 * @method clearSelection(selection)
 * @method toggleRowSelection(row, selected)
 * @method setCurrentRow(row)
 *
 * -----------------------------------------
 *
 * _________________Slot____________________
 * -- 表格 --
 * @slot default           - 自定义配置列标签占位
 * @slot append            -  同NUI组件table中的Table Slot
 * @slot custom-toolbar    - 自定义表格上方工具栏结构
 * -- 搜索工具栏 --
 * @slot toolbarBtns       - 按钮组
 * @slot toolbarSingleform - 单条件表单
 * @slot toolbarMultiform  - 多条件表单
 * @slot toolbarResult     - 搜索结果
 * @slot toolbarMiddle     - 中间（单选框组）结构（`toolbar-trisect`为true时有效）
 * _________________________________________
 *
 *
 * @example
 *  <bus-table:data="tableData"
 *  toolbar
 *  :pagination="paginationParam2"
 *  :table-param="tableParam2"
 *  :toolbar-grid="[8, 16]"
 *  :column-btns-param="btnParam2"
 *  @column-btns-methods="columnBtnsMethods"
 *  @selection-change="onSelectionChange"
 *  @page-size-change="onPageSizeChange"
 *  @current-page-change="onCurrentPageChange">
 *  </bus-table>
 *
 */

define(["jquery", "vue", "nui"], function ($, Vue, Nui) {
	(function(){
	       //------------------------------------- 高级表格
	    var tableTemplate = ` <div>
		    <!-- 自定义新的搜索工具栏结构 toolbar=false-->
		    <slot name="custom-toolbar"></slot>
		    <!-- 搜索工具栏结构 -->
		    <bus-multi-filter v-if="toolbar"
		                      :btns-info="toolbarBtnsInfo"
		                      :grid="toolbarGrid"
		                      :trisect="toolbarTrisect"
		                      @submit-search="onSubmitSearch"
		                      @reset-search="onResetSearch"
		                      @recover-search="onRecoverSearch"
		                      @clean-search="onCleanSearch"
		                      @toolbar-btns-methods="onToolbarBtnsMethods">
		      <template slot="btns">
		        <slot name="toolbarBtns"></slot>
		      </template>
		      <template slot="singleform">
		        <slot name="toolbarSingleform"></slot>
		      </template>
		      <template slot="multiform" v-if="$slots.toolbarMultiform">
		        <slot name="toolbarMultiform"></slot>
		      </template>
		      <template slot="result">
		        <slot name="toolbarResult"></slot>
		      </template>
		      <template slot="middle">
		        <slot name="toolbarMiddle"></slot>
		      </template>
		    </bus-multi-filter>
		    <el-table ref="temTable" class="template-table"
		              :data="data"
		              :class="tableParam.class"
		              :width="tableParam.width"
		              :height="tableParam.height"
		              :maxHeight="tableParam.maxHeight"
		              :fit="tableParam.fit"
		              :stripe="tableParam.stripe"
		              :border="tableParam.border"
		              :rowKey="tableParam.rowKey"
		              :context="tableParam.context"
		              :show-header="tableParam.showHeader"
		              :show-summary="tableParam.showSummary"
		              :sum-text="tableParam.sumText"
		              :summary-method="tableParam.summaryMethod"
		              :row-class-name="tableParam.rowClassName"
		              :row-style="tableParam.rowStyle"
		              :highlight-current-row="tableParam.highlightCurrentRow"
		              :current-row-key="tableParam.currentRowKey"
		              :empty-text="tableParam.emptyText"
		              :expand-row-keys="tableParam.expandRowKeys"
		              :default-expand-all="tableParam.defaultExpandAll"
		              :default-sort="tableParam.defaultSort"
		              :tooltip-effect="tableParam.tooltipEffect"
		              v-loading.lock="loadingMask"
		              :element-loading-icon="loadingParam.icon"
		              :element-loading-text="loadingParam.text"
		              @select="onSelect"
		              @select-all="onSelectAll"
		              @selection-change="onSelectionChange"
		              @cell-mouse-enter="onCellMouseEnter"
		              @cell-mouse-leave="onCellMouseLeave"
		              @cell-click="onCellClick"
		              @cell-dblclick="onCellDblclick"
		              @row-click="onRowClick"
		              @row-contextmenu="onRowContextmenu"
		              @row-dblclick="onRowDblclick"
		              @header-click="onHeaderClick"
		              @sort-change="onSortChange"
		              @filter-change="onFilterChange"
		              @current-change="onCurrentChange"
		              @header-dragend="onHeaderDragend"
		              @expand="onExpand">
		      <el-table-column v-if="selection"
		                       :width="selectionColWidth"
		                       type="selection"
		                       align="center">
		      </el-table-column>
		      <template v-for='(column,index) in columnParam'>
		        <el-table-column
		          :type="column.type"
		          :column-key="column.columnKey"
		          :label="column.label"
		          :prop="column.key"
		          :width="column.width"
		          :min-width="column.minWidth"
		          :fixed="column.fixed"
		          :render-header="column.renderHeader"
		          :sortable="column.sort || false"
		          :formatter='column.formatter'
		          :align="column.align || 'center'"
		          :filters='column.filterList'
		          :filter-method="column.filterMethod"
		          :filter-multiple="column.filterMultiple"
		          :style='column.style'
		          :resizable="column.resizable"
		          :show-overflow-tooltip="column.showTooltip">
		        </el-table-column>
		      </template>
		      <!-- 预留标签 模板配置 -->
		      <slot></slot>
		      <!-- 操作列按钮组 配置 -->
		      <el-table-column
		        v-if="columnBtnsParam"
		        align="center"
		        :label="columnBtnsParam.label || '操作'"
		        :width="columnBtnsParam.width || 50">
		        <template scope="scope">
		          <div class="tmp-cell__buttons">
		            <!-- 一个及两个操作项 -->
		            <template v-if="columnBtnsParam.list.length < 3" v-for="(btn,index) in columnBtnsParam.list">
		              {{(index === 1) ? '|' : ''}}
		              <el-button :key="btn.text"
		                         type="text"
		                         @click.native.prevent='onCustomBtnEvent({data: data, dataRow: scope.row, dataRowIndex: scope.$index, btnIndex: index, btnInfo: btn})'>
		                {{btn.text}}
		              </el-button>
		            </template>
		            <!-- 两个以上操作项 -->
		            <template v-if="columnBtnsParam.list.length >= 3">
		              <el-button v-for="(btn,index) in columnBtnsParam.list"
		                         v-if="index === 0"
		                         :key="btn.text"
		                         type="text"
		                         @click.native.prevent='onCustomBtnEvent({data: data, dataRow: scope.row, dataRowIndex: scope.$index, btnIndex: index, btnInfo: btn})'>
		                {{btn.text}}
		              </el-button>
		              <el-dropdown trigger="click" menu-align="end"
		                           @command="onCustomBtnEvent" >
		                <span class="el-dropdown-link">  更多<i class="el-icon-caret-bottom el-icon--right"></i></span>
		                <el-dropdown-menu slot="dropdown">
		                  <el-dropdown-item v-for="(btn,index) in columnBtnsParam.list"
		                                    v-if="index !== 0"
		                                    :key="btn.text"
		                                    :command="{data: data, dataRow: scope.row, dataRowIndex: scope.$index, btnIndex: index, btnInfo: btn}">
		                    {{btn.text}}
		                  </el-dropdown-item>
		                </el-dropdown-menu>
		              </el-dropdown>
		            </template>
		          </div>
		        </template>
		      </el-table-column>
		      <template slot="append">
		        <slot name="append"></slot>
		      </template>
		    </el-table>
		    <el-pagination
		      ref="temPagination"
		      class="template-table-pagination"
		      v-if='pagination  && ( (pagination.total!==undefined && pagination.total>0) || (pagination["page-count"]!==undefined && pagination["page-count"]>0) )'
		      layout="total, sizes, prev, pager, next, jumper"
		      :current-page='pagination.currentPage'
		      :page-sizes="pagination.pageSizes"
		      :page-size="pagination.pageSize"
		      :page-count="pagination['pageCount']"
		      :total="pagination.total"
		      @current-change='currentPageChange'
		      @size-change='pageSizeChange'>
		    </el-pagination>
		  </div>`
		Vue.component("ns-table",{
		    template: tableTemplate,
		    name: 'nsTable',
		    data () {
		      return {
		        loadingMask: false
		      }
		    },
		    props: {
		      toolbar: Boolean,
		      toolbarTrisect: Boolean,
		      toolbarBtnsInfo: Array,
		      toolbarGrid: {
		        type: Array,
		        default () {
		          return [16, 8]
		        }
		      },
		      data: {
		        type: Array,
		        default: function () {
		          return []
		        }
		      },
		      tableParam: {
		        type: Object,
		        default () {
		          return {
		          }
		        }
		      },
		      columnParam: Array,
		      // 操作列配置
		      columnBtnsParam: {
		        type: Object,
		        default () {
		        }
		      },
		      selection: {
		        type: Boolean,
		        default: true
		      },
		      selectionColWidth: {
		        type: Number,
		        default: 34
		      },
		      loadingParam: {
		        type: Object,
		        default () {
		          return {
		            icon: '<img src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCMjNCMzlEQjRCRUYxMUU3QTRFMjhGNjZBMDREQUYzOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCMjNCMzlEQzRCRUYxMUU3QTRFMjhGNjZBMDREQUYzOSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkIyM0IzOUQ5NEJFRjExRTdBNEUyOEY2NkEwNERBRjM5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkIyM0IzOURBNEJFRjExRTdBNEUyOEY2NkEwNERBRjM5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+HsLAvwAABQlJREFUeNq0VWlsVFUU/u59982bte20UDptcVpGBrcoomAJpEYxGhaNJsQIYvQHKUGNgVQTNS7RhCjGIk2EsPhHJUTkh2AU1ESUBCJuBBcWDRWwpWUpM52205m33et5b6BAaNE/nsw3b//uWb57DsPc1bjSmP+DUqVLqdp1FOdH6xq6ouVVL9co+yvXe4zRbX/bHAj8u+2G0JptU0NfZ0etqxtfRsLhx6OQH1hSQTHm+zGS8auQ0sJsHxhr9iMIRqBcBru3Gycle39Qqoc543CVF1gpSHkJrkKuovT3E7l0B5HTW5ycpzuhOGzThm7l0eNii6nkAzo9LhDzEKFwCUYjryTC/XS8hXnE5J0QXhDarGRYzk4YyvLc1ejeWUduJ6LZlk8uifQiRiKv9mpBmOhVVDENRkA4dcKZ7hSdXddq2S9mxvqaeMBwQ96CGkfGVTvIhWkBel8QdP/IL+R12JKEvYS60rKex1p+PCvOFJZ5YFxDGsHKBHJm3ozoEcWkBKcFTMcl1ah5lJ4fKNvIWGXIWuWXeZ4m/DxMTKngnPfWojjFcMwDbn0KiYYk+qOJu06WT/w1ZBgiqGvQdYGQ4H9zTW08Y5ehI3cdggELK27aMOx5yi8eEPOVq3Q6NY6PkflmQ5md+boURHU93MLQnAzXPvdyHeEOBlkQBiscPWeGp5/J1vSOKevCk5PXYmnqUyRDHcSxxiffVCL2TPMiO5hQmea4bmUyiTR4vJrUUZyvdLHVIG891ZhSR5Jlj/xZqGrKuSr33M3r8NSkbUiO+YukE8RgphHR82lpGs66HUFL5b51e5KrM+k6F6djaZ2bhTZIudUXKKnCoeC4cg/CiU4dr2VzO29vxVszViEZ68JQNoHBYhWlVZ5Pi1VxHHp/Q2mdASyqPfbohBr1bvW5ENRgOOgGiFTKt11XSuY4wSCRH0fyxRp5NP9Rchlqx/2GQq7W30ycSJlXXqCCyPrEI2P3PfFxf/pbaVWgKtBFkE1Ze8Lml4ztCzvt2MBOZ1ZrTAyQlAZo5wkcphJNUp1YE1mOWuMIBguN7SxozWSM6Bl56LJrKLVvEHkbX1e/Y/esUE8LzHJ/MwaYiwEnsEDAXbveWI/X9DVIsF78TtI/hno0U+0/YUvRyA8jZ6W2qCJ7RhW1KXDEbcrUb1VFcYhcf89Py+KORYgrbWMsfCrWWxjb1m2FMTk8hBNuxdIAE73LxbZX7sMv2M2mIsVO4X71IwI8j6xs/IwV5VxJG407lAzNUxrbwALOkgudTGuZXocbwz1YED/0XberO30I3D2nsgv9jg5XC955FuXZsbLn+7n6N7hBO4QBNo71s9guoax7laI8UO2YzeCaop3r8mkWlL6iA9cvg5hR8YfflyPMwTvh7hV78tfED+fLWst0Gzb1CMHRbrJg5rRKbIpwJpS09+rSmub1Hc2RsIm46IRWheNmKz29vK2GjVIHIBpU0OaYF+p5dgjhGJWnhXosvG4tRfmHQ1IsZHYhpXMn7XnjUu2KFF2uWPYmF3ghqg1d2bONgHHJpeFLKaScJa5iYUrdIr9HMAVTRWebdgiC2VR4RcrRSH7iVRf66xEtP/JAkEqNOObo+8fo4G20B70kaqQib+q4CJbeYOp5jamVXnSjGVfnp8gVKI3Qh+jw9cUllSdkD62UrJVXn6LetmSleTwa6PN76Gwz4RzhBGEx3Vv1H2YvRa8U/i/7R4ABAK4QL3WFKVtqAAAAAElFTkSuQmCC\' />',
		            text: '拼命加载中'
		          }
		        }
		      },
		      pagination: {
		        type: Object,
		        default () {
		          return {
		          }
		        }
		      },
		      layout: 'total, sizes, prev, pager, next, jumper'
		    }, 
		    methods: {
		        /**
		         * 自定义搜索工具栏按钮组事件
		         * @param btn
		         */
		        onToolbarBtnsMethods (btn) {
		          // 数据中有配置fn时，使用数据中的fn，否则对事件进行派发出去
		          if (btn.fn) {
		            btn.fn(btn)
		          } else {
		            this.$emit('toolbar-btns-methods', btn)
		          }
		        },
		        /**
		         * 自定义表格操作列按钮事件
		         * @param opts
		         */
		        onCustomBtnEvent (opts) {
		          // 数据中有配置fn时，使用数据中的fn，否则对事件进行派发出去
		          if (opts.btnInfo.fn) {
		            opts.btnInfo.fn(opts)
		          } else {
		            this.$emit('column-btns-methods', opts)
		          }
		        },
		        /**
		         * 改变当前页码事件
		         * @param  {number} page 当前页面
		         */
		        currentPageChange (page) {
		          this.$emit('current-page-change', page)
		        },

		        /**
		         * 改变每页显示的数量事件
		         * @param  {number} page_size 每页显示的数量
		         */
		        pageSizeChange (pageSize) {
		          this.$emit('page-size-change', pageSize)
		        },
		        // 提交筛选
		        onSubmitSearch () {
		          this.$emit('submit-search')
		        },
		        // 重置筛选条件
		        onResetSearch () {
		          this.$emit('reset-search')
		        },
		        // 清空筛选条件
		        onCleanSearch () {
		          this.$emit('clean-search')
		        },
		        // 修改筛选条件
		        onRecoverSearch () {
		          this.$emit('recover-search')
		        },
		        /**
		         * 表格原事件 event派发
		         */
		        onSelect (selection, row) {
		          this.$emit('select', selection, row)
		        },
		        onSelectAll (selection, row) {
		          this.$emit('select-all', selection, row)
		        },
		        onSelectionChange (rows) {
		          this.$emit('selection-change', rows)
		        },
		        onCellMouseEnter (row, column, cell, event) {
		          this.$emit('cell-mouse-enter', row, column, cell, event)
		        },
		        onCellMouseLeave (row, column, cell, event) {
		          this.$emit('cell-mouse-leave', row, column, cell, event)
		        },
		        onCellClick (row, column, cell, event) {
		          this.$emit('cell-click', row, column, cell, event)
		        },
		        onCellDblclick (row, column, cell, event) {
		          this.$emit('cell-dblclick', row, column, cell, event)
		        },
		        onRowClick (row, event, column) {
		          this.$emit('row-click', row, event, column)
		        },
		        onRowContextmenu (row, event) {
		          this.$emit('row-contextmenu', row, event)
		        },
		        onRowDblclick (row, event) {
		          this.$emit('row-dblclick', row, event)
		        },
		        onHeaderClick (column, event) {
		          this.$emit('header-click', column, event)
		        },
		        onSortChange ({ column, prop, order }) {
		          this.$emit('sort-change', { column, prop, order })
		        },
		        onFilterChange (filters) {
		          this.$emit('filter-change', filters)
		        },
		        onCurrentChange (currentRow, oldCurrentRow) {
		          this.$emit('current-change', currentRow, oldCurrentRow)
		        },
		        onHeaderDragend (newWidth, oldWidth, column, event) {
		          this.$emit('header-dragend', newWidth, oldWidth, column, event)
		        },
		        onExpand (row, expanded) {
		          this.$emit('expand', row, expanded)
		        },
		        /**
		         * /end 表格原事件 event派发
		         */
		        /**
		         * 表格原方法methods
		         */
		        clearSelection (selection) {
		          return this.$refs.temTable.clearSelection(selection)
		        },

		        toggleRowSelection (row, selected) {
		          return this.$refs.temTable.toggleRowSelection(row, selected)
		        },

		        setCurrentRow (row) {
		          return this.$refs.temTable.setCurrentRow(row)
		        }
		        /**
		         * end/表格原事件
		         */
		      },
		      watch: {
		        data (data) {
		          if (data) {
		            this.loadingMask = false
		          }
		        }
		      }
		});		
   //------------------------------------- 搜索工具栏(多条件筛选结构)


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
	    var multiFilterTemplate = `<div class="tmp-filter">
			    <div >
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
			  </div>`
		Vue.component("bus-multi-filter",{
		    template: multiFilterTemplate,
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
		    }
		});		   
	})();
})