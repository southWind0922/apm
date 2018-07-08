<template>
	<div id="thirdCheck">
		<singularity-table-layout>
			<template slot="tool">
				<singularity-form :inline="true" :model="form" :item="formItemList">
					<el-form-item slot="extra">
						<el-button type="primary" @click="queryData(true)">查询</el-button>
					</el-form-item>
				</singularity-form>
			</template>
			<template slot="tool">
				<singularity-button type="import" @click="import_getPage">
					导入
				</singularity-button>
			</template>
			<template slot="table">
				<singularity-table stripe :table-data="table.data" :table-option="table.option" :table-loading="table.loading" :total="table.pageTotal" :pageSize="table.pageSize" :pageChange="pageChange" :sizeChange="sizeChange" :pageNum="table.pageNum" @batchDelete="batchDelete">
					<el-table-column fixed="right" label="操作" width="90" slot="foot">
						<template slot-scope="scope">
							<el-button @click.native.prevent="delete_getPage(scope.row)" type="text" size="small">
								删除
							</el-button>
						</template>
					</el-table-column>
				</singularity-table>
			</template>
		</singularity-table-layout>
        <importForm ref="import_form"></importForm>
	</div>
</template>

<script>
	import Table from "@/config/entity/table";
    import importForm from "./import"

	import {
		queryData,
		deleting
	} from "./service";

	import {
		FormItem,
		SearchForm,
		TableOption
	} from "./entity";

	export default {
        components: {
            importForm
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
           	import_getPage() {
                this.$refs.import_form.getPage()
            },
			delete_getPage(data) {
			  console.log(data)
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
