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
			<template slot="table">
				<singularity-table :span-method="arraySpanMethod" border :table-data="table.data" :table-option="table.option" :table-loading="table.loading" :hideCheckBox="true" :hideDelete="true">

				</singularity-table>
			</template>
		</singularity-table-layout>
	</div>
</template>

<script>
	import Table from "@/config/entity/table";

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
				table: Table()
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
				this.table.queryData(this.form.export(), queryData)
			},
			download(){
				
			},
			arraySpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if(columnIndex === 1 || columnIndex === 4) {
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
			},
		}
	};
</script>

<style scoped>

</style>