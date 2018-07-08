<template>
	<div class="singularity-table" ref="singularityTable">
		<div class="table">
			<span id="size" ref="size"></span>
			<el-table :span-method="spanMethod" :row-class-name="rowClassName" :data="tableData" @selection-change="selectChange" @expand-change="expandChange" :stripe="stripe" :border="border" v-loading="tableLoading" :max-height="height" element-loading-text="拼命加载中">
				<el-table-column fixed v-if="!hideCheckBox" type="selection" width="40"></el-table-column>
				<el-table-column fixed v-if="expand" type="expand" width="50">
				</el-table-column>
				<el-table-column fixed type="index" label="序号" width="70" v-if="tableData.length>0 && !hideIndex"></el-table-column>
				<slot name="head"></slot>
				<el-table-column v-for="item in tableOption" :key="item.id" :prop="item.prop" :label="item.label" :min-width="item.width"></el-table-column>
				<slot name="foot"></slot>
			</el-table>
		</div>
		<div class="tool" v-if="hasTableData && !hidePage">
			<div class="operation" v-if="hasTableData">
				<el-button type="danger" :disabled="!selectDataStr" @click="batchDelete" v-if="!hideDelete">批量删除</el-button>
				<el-button v-for="item in operation" :key="item.id" :disabled="!selectDataStr" :type="item.type" @click="bindEvent(item.callback)">{{item.label}}</el-button>
			</div>
			<div class="pagination" v-if="!hidePage">
				<el-pagination v-if="pageSize" @size-change="sizeChange" @current-change="pageChange" :current-page="pageNum" :page-size="pageSize" :page-sizes="[5, 10, 20, 50, 100]" layout="sizes,total, prev, pager, next" :total="total">
				</el-pagination>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		props: {
			tableOption: {
				type: [Array],
				default: function() {
					return []
				}
			},
			tableData: {
				type: [Array],
				default: function() {
					return []
				}
			},
			tableLoading: {
				type: [Boolean],
				default: false
			},
			total: {
				type: [Number],
				default: 0
			},
			pageNum: {
				type: [Number],
				default: 1
			},
			pageSize: {
				type: [Number],
				default: 10
			},
			pageChange: {
				type: [Function],
				default: function() {}
			},
			sizeChange: {
				type: [Function],
				default: function() {}
			},
			spanMethod: {
				type: [Function],
				default: function() {}
			},
			stripe: {
				type: [Boolean],
				default: false
			},
			border: {
				type: [Boolean],
				default: false
			},
			hideCheckBox: {
				type: [Boolean],
				default: false
			},
			hideIndex: {
				type: [Boolean],
				default: false
			},
			hideDelete: {
				type: [Boolean],
				default: false
			},
			hidePage: {
				type: [Boolean],
				default: false
			},
			operation: {
				type: [Array],
				default: function() {
					return []
				}
			},
			expand: {
				type: [Boolean],
				default: false
			},
			expandChange: {
				type: [Function],
				default: function() {}
			}
		},
		data() {
			return {
				height: null,
				selectDataStr: "",
				interval: null
			};
		},
		mounted() {
			this.resize()
			this.getHeight()
			this.autoHeight()
		},
		destroyed(){
			if(this.interval){
				clearInterval(this.interval)
			}
		},
		computed: {
			hasTableData() {
				return this.tableData.length > 0
			}
		},
		watch: {
			tableData() {
				this.selectDataStr = ""
				this.resize()
				this.getHeight()
				this.processData()
			}
		},
		methods: {
			autoHeight(){
				this.interval = setInterval(()=>{
					this.getHeight()
				},1000)
			},
			getHeight() {
				if(this.hidePage) {
					this.height = this.$refs.singularityTable.clientHeight
				} else {
					this.height = this.$refs.singularityTable.clientHeight - 47
				}
			},
			resize() {
				for(let x of this.tableOption) {
					let arr = this.tableData.map((val) => {
						let value = (val[x.prop] || "").toString()
						let len1 = value.split(";").length - 1
						let len2 = value.split("&").length - 1
						this.$refs.size.innerHTML = value.replace(/[&;]/g, "")
						return this.$refs.size.offsetWidth + 36 + len1 * 6 + len2 * 10
					})
					this.$refs.size.innerHTML = x.label
					arr.push(this.$refs.size.offsetWidth + 57)
					x.width = Math.max(...arr) + 20
				}
			},
			processData() {
				let filterMap = {}
				this.tableOption.forEach((val) => {
					if(val.filter) {
						filterMap[val.prop] = val.filter
					}
				})
				this.tableData.forEach((val) => {
					for(let x in val) {
						if(filterMap[x]) {
							val[x] = filterMap[x](val[x])
						}
					}
				})

			},
			selectChange(arr) {
				this.selectDataStr = this.$.listToStr(arr)
			},
			batchDelete() {
				if(this.selectDataStr) {
					this.$.delete(() => {
					  console.log(this.selectDataStr)
						this.$emit("batchDelete", this.selectDataStr)
					})
				}
			},
			bindEvent(name) {
				this.$emit("bindEvent", name, this.selectDataStr)
			},
			rowClassName(row) {
				return row.row.isExpandChildren ? "isExpandChildren" : ""
			}
		}
	};
</script>

<style lang="less">
	.singularity-table {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		.table {
			height: 0;
			width: 100%;
			flex: auto;
			overflow:hidden;
			#size {
				position: absolute;
				visibility: hidden;
				opacity: 0;
			}
			.el-table {
				width: 100%;
				th>.cell {
					white-space: nowrap;
				}
				tr.el-table__row {
					height: 50px;
				}
			}
		}
		.tool {
			margin-top: 15px;
			.operation {
				float: left;
				height: 100%;
			}
			.pagination {
				float: right;
				height: 100%;
			}
		}
	}
</style>
