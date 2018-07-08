import util from "@/config/Util/CommonUtil"
import { unique } from "../service";
class Control {
	constructor() {
		this.formItemList = [{
			label: "名称",
			prop: "name",
			type: "input"
		}, {
			label: "编码",
			prop: "code",
			type: "input"
		}]
	}
	export() {
		return this.formItemList
	}
}
class Data {
	constructor() {
		this.id = "";
		this.name = "";
		this.code = "";
	}
	setData(data) {
		this.id = data.id;
        this.name = data.name;
        this.code = data.code;
    }
	export() {
		return {
			id: this.id,
			name: this.name,
			code: this.code
		}
	}
}
class Rule {
	constructor(id) {
		this.name = [{
				required: true,
				message: "请填写名称",
				trigger: 'change'
			},
			{
				validator: util.unique(unique, id),
				trigger: 'change'
			}
		]
		this.code = [{
			required: true,
			message: '请填写编码',
			trigger: 'change'
		}]
	}
}
export const EditControl = () => {
	return new Control()
}
export const EditData = () => {
	return new Data()
}
export const EditRule = (id) => {
	return new Rule(id)
}