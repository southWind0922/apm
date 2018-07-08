export const TableOption = () => {
	return [{
			prop: "biddingRange",
			label: "大区"
		},
		{
			prop: "contractName",
			label: "合同名称"
		},
		{
			prop: "biddingName",
			label: "项目名称"
		},
		{
			prop: "supplierName",
			label: "供应商名称"
		},
		{
			prop: "biddingType",
			label: "招标方式"
		},
		{
			prop: "enterpriseEntity",
			label: "业务实体"
		},
		{
			prop: "biddingStaging",
			label: "分期"
		},
		{
			prop: "supplierName",
			label: "入围供应商"
		},
		{
			prop: "shortDate",
			label: "入围时间"
		},
		{
			prop: "biddingStatus",
			label: "招标文件审批状态"
		},
		{
			prop: "inviteStatus",
			label: "定标审批状态"
		},
		{
			prop: "inviteDate",
			label: "招标文件审批时间",
			filter: function(date){
				return new Date(date).toLocaleDateString().replace(/\//g,"-")
			}
		},
		{
			prop: "biddingUnit",
			label: "中标单位"
		},
		{
			prop: "biddingDate",
			label: "定标审批完成时间"
		},
		{
			prop: "contractAmount",
			label: "合同金额"
		},
		{
			prop: "approvalDate",
			label: "合同审批完成日期"
		},
		{
			prop: "operator",
			label: "经办人"
		}
	]
}