<template>
	<div id="scoreList">
		<singularity-table-layout>
			<template slot="tool">
				<singularity-form :inline="true" :model="form" :item="formItemList">
					<el-form-item slot="extra">
						<el-button type="primary" @click="queryData(true)">查询</el-button>
						<el-button type="primary" @click="download">导出</el-button>
					</el-form-item>
				</singularity-form>
			</template>
			<template slot="tool">
				<singularity-tabs v-model="type" :list="typeList" @change="queryData"></singularity-tabs>
			</template>
			<template slot="table">
				<singularity-table v-if="type=='list'" hideIndex :span-method="arraySpanMethod" border :table-data="table.data" :table-option="table.option" :table-loading="table.loading" :total="table.pageTotal" :pageSize="table.pageSize" :pageChange="pageChange" :sizeChange="sizeChange" :pageNum="table.pageNum" :hideCheckBox="true" :hideDelete="true">
					<el-table-column fixed="left" slot="head" label="序号" width="70">
						<template slot-scope="scope">
							{{scope.row.index}}
						</template>
					</el-table-column>

				</singularity-table>
				<singularity-echarts v-if="type=='chart'" template="bar" :data="option">

				</singularity-echarts>
			</template>
		</singularity-table-layout>
	</div>
</template>

<script>
	import Table from "@/config/entity/table";

	import {
		queryData,
		queryAllData,
		deleting,
		exportData
	} from "./service";

	import {
		FormItem,
		SearchForm,
		TableOption
	} from "./entity";

	export default {
		mounted() {
			this.init();
		},
		computed: {
			formItemList: function() {
				return this.formItem.export()
			}
		},
		data() {
			return {
				type: "list",
				typeList: [{
					id: "list",
					name: "列表"
				}, {
					id: "chart",
					name: "图表"
				}],
				option: {},
				formItem: FormItem(),
				form: SearchForm(),
				table: Table()
			};
		},
		methods: {
			init() {
				this.autoQuery()
				this.queryData()
			},
			autoQuery() {
				let data = this.$.cookie.get("scoreList")
				if(data) {
					this.form.projectName = data.contractName
					this.form.supplierName = data.supplierName
					this.$.cookie.remove("scoreList")
				}
			},
			getHeader() {
				let data = this.form.export()
				let header = data.seasons.map((val) => {
					return {
						year: data.year,
						season: val
					}
				})
				return header
			},
			queryData(init) {
				if(this.type == 'list') {
					this.queryList(init)
				} else {
					this.queryChart()
				}
			},
			download() {
				exportData(this.form.export())
			},
			queryList(init) {
				if(init) {
					this.table.initTable()
				}
				let header = this.getHeader()
				this.table.setOption(TableOption(header))
				this.table.queryData(this.form.export(), queryData, () => {
					this.table.data = this.process(this.table.data, header)
				})
			},
			async queryChart() {
				this.option = {}
				let res = await queryAllData(this.form.export())
				this.option = {
					x: res.content.x,
					y: res.content.y
				}
			},
			process(data, list) {
				let num = 1
				data.forEach((val, index) => {
					list.forEach((l) => {
						val[`${l.year}-${l.season}`] = "-"
					})
					val.scores.forEach((s) => {
						val[`${s.season.year}-${s.season.season}`] = s.score
					})
				})
				data.forEach((val, index) => {
					if(index > 0 && val.supplierName == data[index - 1].supplierName) {
						val.rowLength = 0
						val.index = num
					} else {
						let arr = data.filter((value) => {
							return value.supplierName == val.supplierName
						})
						val.rowLength = arr.length
						val.index = num++
						list.forEach((l) => {
							let str = `${l.year}-${l.season}`
							let avgScore = "-"
							let scoreList = arr.filter((s) => {
								return typeof s[str] === "number"
							})
							scoreList.forEach((s) => {
								let score = s[str]
								if(typeof avgScore !== "number") {
									avgScore = score
								} else {
									avgScore += score
								}
							})
							val[str+"-avg"]=typeof avgScore !== "number"?avgScore:(avgScore/scoreList.length).toFixed(2)
						})
					}
				})
				return data
			},
			pageChange(currentPage) {
				this.table.setPageNum(currentPage)
				this.queryData();
			},
			sizeChange(size) {
				this.table.setPageSize(size)
				this.queryData();
			},
			arraySpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				let arr = [0,1]
				this.table.option.forEach((val,index)=>{
					if(val.isMerge){
						arr.push(index+1)
					}
				})
				if(this.$.includes(columnIndex,arr)) {
					if(row.rowLength !== 0) {
						return {
							rowspan: row.rowLength,
							colspan: 1
						};
					} else {
						return {
							rowspan: 0,
							colspan: 0
						};
					}
				}
			}
		}
	};
</script>

<style scoped>

</style>
