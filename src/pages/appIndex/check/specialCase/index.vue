<template>
	<div id="specialCase">
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
				<singularity-table stripe :table-data="table.data" :table-option="table.option" :table-loading="table.loading" :total="table.pageTotal" :pageSize="table.pageSize" :pageChange="pageChange" :sizeChange="sizeChange" :pageNum="table.pageNum" :hideCheckBox="true" :hideDelete="true">

				</singularity-table>
			</template>
		</singularity-table-layout>
	</div>
</template>

<script>
	import Table from "@/config/entity/table";

	import {
		queryData,
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
			download() {
				exportData(this.form.export())
			},
			pageChange(currentPage) {
				this.table.setPageNum(currentPage)
				this.queryData();
			},
			sizeChange(size) {
				this.table.setPageSize(size)
				this.queryData();
			}
		}
	};
</script>

<style scoped>

</style>