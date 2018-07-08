export const TableOption = (seasons) => {
	let options = [{
		prop: "name",
		label: "合作单位/项目名称",
		isExpand: true
	}]
	if(seasons) {
		seasons.forEach((val) => {
			if(val.year && val.season) {
				options.push({
					prop: `${val.year}-${val.season}`,
					label: `${val.year}年${val.season}季度`
				})
			}
		})
	}
	return options
}