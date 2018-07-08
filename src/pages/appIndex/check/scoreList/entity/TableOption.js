export const TableOption = (seasons) => {
	let options = [{
			prop: "supplierName",
			label: "单位名称"
		},
		{
			prop: "projectName",
			label: "合作项目名称"
		}
	]
	let optionsEnd = [
		{
			prop: "city",
			label: "城市公司"
		},
		{
			prop: "stage",
			label: "项目分期"
		},
		{
			prop: "category",
			label: "项目类型"
		},
		{
			prop: "purchaseLevel",
			label: "采购层级"
		},
		{
			prop: "performanceStatus",
			label: "履约状态"
		}
	]
	if(seasons) {
		seasons.forEach((val) => {
			if(val.year && val.season) {
				options.push({
					prop: `${val.year}-${val.season}`,
					label: `${val.year}年${val.season}季度`
				})
//				options.push({
//					prop: `${val.year}-${val.season}-avg`,
//					label: `${val.year}年${val.season}季度均分`,
//					isMerge: true
//				})
			}
		})
	}
	return options.concat(optionsEnd)
}