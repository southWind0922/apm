<template>
	<div id="supplierAlert">
		<singularity-table-layout>
			<template slot="tool">
				<singularity-form :inline="true" :model="form" :item="formItemList">
					<el-form-item slot="extra">
						<el-button type="primary" @click="queryData(true)">查询</el-button>
						<el-button type="primary" @click="download">导出</el-button>
					</el-form-item>
				</singularity-form>
			</template>
			<template slot="table">
				<singularity-table :span-method="arraySpanMethod" border :table-data="table.data" :table-option="table.option" :table-loading="table.loading" :hideCheckBox="true" :hideDelete="true" :hidePage="true">

				</singularity-table>
			</template>
		</singularity-table-layout>
	</div>
</template>

<script>
	import Table from "@/config/entity/table";
	import param from "@/config/Util/Param"
	
	import {
		queryData,
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
				formItem: FormItem(),
				form: SearchForm(),
				table: Table(),
				index: 0
			};
		},
		methods: {
			init() {
				this.queryData()
				this.table.setOption(TableOption())
			},
			queryData(init) {
				if(init){
					this.table.initTable()
				}
				this.table.queryList(this.form.export(), queryData, () => {
					this.table.data = this.process(this.table.data)
				})
			},
			download() {
				exportData(this.form.export())
			},
			process(data) {
				let key = this.form.export().key
				param.supplierWarning.key.forEach((val, index)=>{
					if(val.id == key){
						this.index = index + 2
					}
				})
				data.forEach((val, index) => {
					if(index > 0 && val[key] == data[index - 1][key]) {
						val.rowLength = 0
					} else {
						let arr = data.filter((value) => {
							return value[key] == val[key]
						})
						val.rowLength = arr.length
					}
				})
				return data
			},
			arraySpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if(columnIndex === this.index) {
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
	span.danger{
		color: #f56c6c;
		font-weight: bold;
	}
</style>