<template>
	<singularity-dialog id="supplierListDetail" title="详情" ref="dialog" :fullscreen="true" margin="1%" :hidesubmit="true">
		<div class="content">
			<div class="baseInfo">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>基本信息</span>
						<span class="edit fa fa-pencil" :class="{'editable':edit}" @click="edit=!edit"></span>
					</div>
					<div class="itemContainer">
						<div class="item" v-for="item in infoList">
							<span class="key">{{item.label}}</span>：
							<el-tooltip v-if="!edit" class="item" effect="dark" :content="data[item.prop]" placement="top" :disabled="!data[item.prop]">
								<span class="value">{{data[item.prop]}}</span>
							</el-tooltip>
							<el-input v-if="edit" size="mini" v-model="data[item.prop]"></el-input>
						</div>
					</div>
					<div class="submit" v-if="edit">
						<el-button type="primary" size="mini" @click="updateData">确定</el-button>
						<el-button type="default" size="mini" @click="edit=false">取消</el-button>
					</div>
				</el-card>
			</div>
			<div class="biddingTable">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<singularity-tabs v-model="type" :list="typeList" @change="queryData"></singularity-tabs>
					</div>
					<singularity-table :table-data="table.data" :table-option="table.option" :table-loading="table.loading" :total="table.pageTotal" :pageNum="table.pageNum" :pageSize="table.pageSize" :pageChange="pageChange" :sizeChange="sizeChange" :hideCheckBox="true" :hideDelete="true">
						<el-table-column v-if="this.type == 'bidding'" fixed="left" label="项目名称" width="400" slot="head">
							<template slot-scope="scope">
								<span class="spanIcon fa fa-search">
							</span>
								<span class="primary" @click="detail_getPage(scope.row)">
								{{scope.row.biddingName}}
							</span>
							</template>
						</el-table-column>
					</singularity-table>
				</el-card>
			</div>
		</div>
	</singularity-dialog>
</template>

<script>
	import Table from "@/config/entity/table";
	import {
		getInfo,
		queryBiddingData,
		querySpecialData,
		update
	} from "./service";

	import {
		TableOptionBase,
		TableOptionShort,
		TableOptionBidding,
		TableOptionSpecial
	} from "./entity";

	export default {
		data() {
			return {
				edit: false,
				infoList: [],
				baseInfo: {},
				type: "short",
				typeList: [{
					id: "short",
					name: "入围信息"
				}, {
					id: "bidding",
					name: "中标信息"
				}, {
					id: "special",
					name: "特殊情况"
				}],
				table: Table()
			}
		},
		methods: {
			getPage(data) {
				this.data = data
				this.type = "short"
				this.edti = false
				this.table = Table()
				this.getInfo()
				this.queryData()
				this.$refs.dialog.show()
			},
			async getInfo() {
				for(let x in this.data) {
					this.data[x] = (this.data[x] || "").toString()
				}
				this.infoList = TableOptionBase()
			},
			queryData() {
				this.table.data = []
				if(this.type == "short") {
					this.table.setOption(TableOptionShort())
					this.table.queryData({
						supplierName: this.data.name
					}, queryBiddingData)
				} else if(this.type == "bidding") {
					this.table.setOption(TableOptionBidding())
					this.table.queryData({
						supplierName: this.data.name,
						biddingUnit: "中标"
					}, queryBiddingData)
				} else if(this.type == "special") {
					this.table.setOption(TableOptionSpecial())
					this.table.queryData({
						supplierName: this.data.name
					}, querySpecialData)
				}

			},
			async updateData() {
				this.edit = false
				let res = await update(this.data)
				this.$parent.queryData()
			},
			detail_getPage(data) {
				this.$.cookie.set("scoreList", {
					biddingName: data.biddingName,
					supplierName: data.supplierName,
          contractName: data.contractName
				})
        console.log(data)
				window.open(`/#/check/scoreList`)
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
	}
</script>

<style lang="less">
	#supplierListDetail .content {
		height: 100%;
		width: 100%;
		display: flex;
		.baseInfo {
			height: 100%;
			width: 300px;
			margin-right: 40px;
		}
		.biddingTable {
			height: 100%;
			width: 0;
			flex: auto;
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
		}
		.el-card {
			height: 100%;
			width: 100%;
			display: flex;
			flex-direction: column;
			.el-card__header {
				padding: 0 20px;
				height: 50px;
				line-height: 50px;
				.edit {
					margin-left: 5px;
					color: #ccc;
					cursor: pointer;
				}
				.edit.editable {
					color: #000;
				}
			}
			.el-card__body {
				height: 0;
				flex: auto;
				display: flex;
				flex-direction: column;
				padding: 0;
				.itemContainer {
					padding: 20px;
					height: 0;
					flex: auto;
					overflow: auto;
					.item {
						height: 28px;
						margin-bottom: 5px;
						display: flex;
						.key {
							font-weight: bold;
							white-space: nowrap;
						}
						.value {
							display: inline-block;
							width: 0;
							flex: auto;
							color: #09C;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}
				}
				.submit {
					height: 60px;
					width: 100%;
					text-align: right;
					padding: 16px 30px;
				}
			}
		}
	}
</style>
