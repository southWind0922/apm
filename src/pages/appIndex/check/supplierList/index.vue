<template>
	<div id="supplierList">
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
					<el-table-column fixed="left" label="公司详情" width="400" slot="head">
						<template slot-scope="scope">
							<span class="spanIcon fa fa-search">
							</span>
							<span class="primary" @click="detail_getPage(scope.row)">
								{{scope.row.name}}
							</span>
						</template>
					</el-table-column>
				</singularity-table>
			</template>
		</singularity-table-layout>
		<detailForm ref="detail_form"></detailForm>
	</div>
</template>

<script>
	import Table from "@/config/entity/table";
	import detailForm from "./detail"

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
		components: {
			detailForm
		},
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
			detail_getPage(data) {
				this.$refs.detail_form.getPage(data)
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
	span.primary {
		color: #409EFF;
		text-decoration: underline;
		font-weight: bold;
		cursor: pointer;
	}
	
	span.spanIcon {
		color: #409EFF;
		margin-right: 5px;
	}
</style>