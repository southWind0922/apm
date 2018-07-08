<template>
	<div id="roleManage">
		<singularity-table-layout>
			<template slot="tool">
				<singularity-form :inline="true" :model="form" :item="formItemList">
					<el-form-item slot="extra">
						<el-button type="primary" @click="queryData(true)">查询</el-button>
					</el-form-item>
				</singularity-form>
			</template>
			<template slot="tool">
				<singularity-button type="create" @click="create_getPage">
					新建
				</singularity-button>
			</template>
			<template slot="table">
				<singularity-table stripe :table-data="table.data" :table-option="table.option" :table-loading="table.loading" :total="table.pageTotal" :pageSize="table.pageSize" :pageChange="pageChange" :sizeChange="sizeChange" :pageNum="table.pageNum" @batchDelete="batchDelete">
					<el-table-column fixed="right" label="操作" width="180" v-if="table.data.length>0" slot="foot">
						<template slot-scope="scope">
							<el-button @click.native.prevent="check_getPage(scope.row)" type="text" size="small">
								配置权限
							</el-button>
							<el-button @click.native.prevent="edit_getPage(scope.row)" type="text" size="small">
								编辑
							</el-button>
							<el-button @click.native.prevent="delete_getPage(scope.row)" type="text" size="small">
								删除
							</el-button>
						</template>
					</el-table-column>
				</singularity-table>
			</template>
		</singularity-table-layout>
		<createForm ref="create_form"></createForm>
		<editForm ref="edit_form"></editForm>
		<checkForm ref="check_form"></checkForm>
	</div>
</template>

<script>
	import Table from "@/config/entity/table";

	import {
		queryData,
		deleting
	} from "./service";

	import {
		FormItem,
		SearchForm,
		TableOption
	} from "./entity";

	import createForm from "./create"
	import editForm from "./edit"
	import checkForm from "./check"

	export default {
		components: {
			createForm,
			editForm,
			checkForm
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
			create_getPage() {
				this.$refs.create_form.getPage()
			},
			edit_getPage(data) {
				this.$refs.edit_form.getPage(data)
			},
			check_getPage(data) {
				this.$refs.check_form.getPage(data)
			},
			delete_getPage(data) {
				this.$.delete(() => {
					deleting({
						ids: data.id
					}).then((res) => {
						this.queryData()
					})
				})
			},
			batchDelete(ids) {
				deleting({
					ids: ids
				}).then((res) => {
					this.queryData()
				})
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