import param from "@/config/Util/Param"
class Item {
	constructor() {
		this.formItemList = [{
			label: "年度",
			prop: "year",
			type: "dateYear"
		},{
			label: "季度",
			prop: "seasons",
			type: "select",
			width: 200,
			options: {
				list: param.performanceScore.season,
				label:"name",
				value:"id",
				multiple: true
			}
		}, {
			label: "单位名称",
			prop: "supplierName",
			type: "input"
		}, {
			label: "合同项目名称",
			prop: "projectName",
			type: "input"
		}, {
			label: "城市公司",
			prop: "city",
			type: "select",
			options: {
				list: param.performanceScore.city
			}
		}, {
			label: "项目分期",
			prop: "stage",
			type: "input"
		},{
			label: "项目类型",
			prop: "category",
			type: "select",
			options: {
				list: param.performanceScore.category
			}
		}, {
			label: "采购层级",
			prop: "purchaseLevel",
			type: "select",
			options: {
				list: param.performanceScore.purchaseLevel
			}
		}, {
			label: "履约状态",
			prop: "performanceStatus",
			type: "select",
			options: {
				list: param.performanceScore.performanceStatus
			}
		}]
	}
	export() {
		return this.formItemList
	}
}
class Search {
	constructor() {
		this.year = "2017";
		this.seasons = ["1","2","3","4"];
		this.category = "";
		this.city = "";
		this.projectOrg = "";
		this.type = "";
		this.purchaseLevel = "";
		this.performanceStatus = "";
		this.projectName = "";
		this.supplierName = "";
	}
	export() {
		return {
			year: this.year||"",
			seasons: this.seasons.length == 0 ?["1","2","3","4"] : this.seasons,
			category: this.category,
			city: this.city,
			projectOrg: this.projectOrg,
			type: this.type,
			purchaseLevel: this.purchaseLevel,
			performanceStatus: this.performanceStatus,
			projectName: this.projectName,
			supplierName: this.supplierName
		}
	}
}
export const FormItem = () => {
	return new Item()
}
export const SearchForm = () => {
	return new Search()
}
