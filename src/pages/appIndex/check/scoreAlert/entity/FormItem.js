import param from "@/config/Util/Param"
class Item {
	constructor() {
		this.formItemList = [{
			label: "年度",
			prop: "year",
			type: "dateYear"
		}, {
			label: "季度",
			prop: "seasons",
			type: "select",
			width: 200,
			options: {
				list: param.performanceScore.season,
				label: "name",
				value: "id",
				multiple: true
			}
		}, {
			label: "分值",
			prop: "type",
			type: "select",
			options: {
				list: param.agreementWarning.type,
				label: "name",
				value: "id"
			}
		}, {
			label: "分差范围",
			prop: "range",
			type: "input"
		}]
	}
	export() {
		return this.formItemList
	}
}
class Search {
	constructor() {
		this.year = "2017";
		this.seasons = ["1","2"];
		this.type = "0";
		this.range = "10";
	}
	export() {
		let data = {
			year: this.year||"",
			seasons: this.seasons.length == 0 ?["1","2","3","4"] : this.seasons
		}
		if(this.type == "0") {
			data.range = parseInt(this.range) * -1
			data.asc = true
		} else {
			data.range = parseInt(this.range)
			data.asc = false
		}
		return data
	}
}
export const FormItem = () => {
	return new Item()
}
export const SearchForm = () => {
	return new Search()
}