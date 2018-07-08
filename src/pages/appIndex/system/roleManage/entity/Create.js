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
		this.name = "";
		this.code = "";
	}
	export() {
		return {
			name: this.name,
			code: this.code
		}
	}
}
class Rule {
	constructor() {
		this.name = [{
				required: true,
				message: "请填写名称",
				trigger: 'change'
			},
			{
				validator: util.unique(unique),
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
export const CreateControl = () => {
	return new Control()
}
export const CreateData = () => {
	return new Data()
}
export const CreateRule = () => {
	return new Rule()
}