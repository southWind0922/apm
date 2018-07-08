import param from "@/config/Util/Param"
class Item {
	constructor() {
		this.formItemList = [{
			label: "年份",
			prop: "year",
			type: "dateYear"
		},{
			label: "一级分类",
			prop: "category",
			type: "select",
			options: {
				list: param.performanceScore.category
			}
		}, {
			label: "城市公司",
			prop: "city",
			type: "select",
			options: {
				list: param.performanceScore.city
			}
		}]
	}
	export() {
		return this.formItemList
	}
}
class Search {
	constructor() {
		this.year = "";
		this.category = "";
		this.city = "";
	}
	export() {
		return {
			year: parseInt(this.year||""),
			category: this.category,
			city: this.city
		}
	}
}
export const FormItem = () => {
	return new Item()
}
export const SearchForm = () => {
	return new Search()
}
