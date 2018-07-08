import param from "@/config/Util/Param"
class Item {
	constructor() {
		this.formItemList = [{
			label: "标段名称",
			prop: "projectStage",
			type: "input"
		}, {
			label: "受检单位",
			prop: "applicant",
			type: "input"
		}]
	}
	export() {
		return this.formItemList
	}
}
class Search {
	constructor() {
		this.projectStage = "";
		this.applicant = "";
	}
	export() {
		return {
      projectStage: this.projectStage,
      applicant: this.applicant
		}
	}
}
export const FormItem = () => {
	return new Item()
}
export const SearchForm = () => {
	return new Search()
}
