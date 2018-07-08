<template>
	<div id="scoreAlert">
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
				<singularity-table :expand="true" :hideIndex="true" :table-data="table.data" :table-option="table.option" :table-loading="table.loading" :total="table.pageTotal" :pageSize="table.pageSize" :pageChange="pageChange" :sizeChange="sizeChange" :pageNum="table.pageNum" :hideDelete="true" :operation="table.operation" :expandChange="expandChange" @bindEvent="bindEvent">
					<el-table-column fixed="left" label="序号" width="70" slot="head">
						<template slot-scope="scope">
							{{scope.row.index}}
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="最大分差" width="120" slot="foot">
						<template slot-scope="scope">
							<span v-if="scope.row.qoq<0" class="danger">{{scope.row.qoq}}<span class="spanIcon fa fa-long-arrow-down"></span></span>
							<span v-if="scope.row.qoq>0" class="success">+{{scope.row.qoq}}<span class="spanIcon fa fa-long-arrow-up"></span></span>
							<span v-if="scope.row.qoq==0" class="primary">{{scope.row.qoq}}</span>
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="150" slot="foot">
						<template slot-scope="scope">
							<el-button v-if="!scope.row.isExpandChildren" @click.native.prevent="history_getPage(scope.row)" type="text" size="small">
								历年得分
							</el-button>
							<el-button v-if="!scope.row.isExpandChildren" @click.native.prevent="mail_getPage(scope.row)" type="text" size="small">
								邮件
							</el-button>
						</template>
					</el-table-column>
				</singularity-table>
			</template>
		</singularity-table-layout>
		<mailForm ref="mail_form"></mailForm>
		<historyForm ref="history_form"></historyForm>
	</div>
</template>

<script>
	import Table from "@/config/entity/table";
	import mailForm from "./mail"
	import historyForm from "./history"

	import {
		queryData,
		getHeader,
		exportData
	} from "./service";

	import {
		FormItem,
		SearchForm,
		TableOption
	} from "./entity";

	export default {
		components: {
			mailForm,
			historyForm
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
				this.table.operation = [{
					type: "primary",
					label: "群发邮件",
					callback: "mail_getMassPage"
				}]
			},
			getHeader(){
				let data = this.form.export()
				let header = data.seasons.map((val)=>{
					return {
						year: data.year,
						season: val
					}
				})
				return header
			},
			queryData(init) {
				if(init){
					this.table.initTable()
				}
				let header = this.getHeader()
				this.table.setOption(TableOption(header))
				this.table.queryData(this.form.export(), queryData, ()=>{
					this.table.data = this.processData(this.table.data, header)
				})
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
			},
			bindEvent(name, data) {
				this[name](data)
			},
			mail_getPage(data) {
				this.$refs.mail_form.getPage(data)
			},
			mail_getMassPage(data) {
				this.$refs.mail_form.getMassPage(data)
			},
			history_getPage(data) {
				this.$refs.history_form.getPage(data)
			},
			processData(data, list){
				let res = data.map((d,index)=>{
					return {
						id: d.supplierName,
						name: d.supplierName,
						qoq: d.qoq,
						index: index+1,
						expanded: false,
						children: d.projectScores.map((p)=>{
							let obj = {
								name: p.projectName,
								parentIndex: index+1,
								isExpandChildren: true
							}
							list.forEach((l)=>{
								obj[`${l.year}-${l.season}`] = "-"
							})
							p.scores.forEach((s)=>{
								obj[`${s.season.year}-${s.season.season}`] = s.score
							})
							return obj
						})
					}
				})
				return res
			},
			expandChange(row){
				row.expanded = !row.expanded
				if(row.expanded){
					this.table.data.forEach((val,index)=>{
						if(val.index == row.index){
							this.table.data.splice(index+1,0,...row.children)
						}
					})
					
				}
				else{
					this.table.data = this.table.data.filter((val)=>{
						return val.parentIndex != row.index
					})
				}
			}
		}
	};
</script>

<style lang="less">
	#scoreAlert {
		.el-table{
			span.danger {
				color: #f56c6c;
				font-weight: bold;
			}
			span.success {
				color: #67c23a;
				font-weight: bold;
			}
			span.spanIcon {
				margin-left: 5px;
			}
			.el-table__expanded-cell{
				display: none;
			}
			tr.isExpandChildren{
				font-weight: bold;
				td{
					padding-left: 35px;
				}
				.el-table-column--selection>div,
				.el-table__expand-column>div{
					visibility: hidden;
				}
			}
		}
	}
</style>