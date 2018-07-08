export const TableOption = () => {
	return [
		{
			prop: "specialCase",
			label: "特殊情况"
		},
		{
			prop: "openTime",
			label: "发生时间",
			filter: function(date){
				return new Date(date).toLocaleDateString()
			}
		},
		{
			prop: "biddingName",
			label: "合作项目名称"
		},
		{
			prop: "supplierName",
			label: "单位名称"
		},
		{
			prop: "cause",
			label: "原因"
		}
	]
}