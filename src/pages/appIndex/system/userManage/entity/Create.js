import util from "@/config/Util/CommonUtil"
import { unique } from "../service";
class Control {
	constructor() {
		this.formItemList = [{
			label: "姓名",
			prop: "name",
            type: "input"
		}, {
			label: "角色",
			prop: "roleId",
			type: "select",
            options: {
                list: [],
                label: "name",
                value: "id"
            }
		}, {
			label: "手机号",
			prop: "mobilePhone",
            type: "input"
		}, {
			label: "用户名",
			prop: "username",
            type: "input"
		}, {
			label: "密码",
			prop: "password",
            type: "input"
		}]
	}
    setRoleList(list){
    	this.formItemList.filterMatch({prop:"roleId"}).options.list = list
    }
	export() {
		return this.formItemList
	}
}
class Data {
	constructor() {
		this.name = "";
		this.roleId = "";
		this.mobilePhone = "";
		this.username = "";
		this.password = "";
	}
	export() {
		return {
			name: this.name,
			roleId: this.roleId,
			mobilePhone: this.mobilePhone,
			username: this.username,
			password: this.password
		}
	}
}
class Rule {
	constructor() {
		this.name = [{
			required: true,
			message: "请填写姓名",
			trigger: 'change'
		}]
		this.roleId = [{
            required: true,
            validator: util.validateRequire('请选择角色'),
            trigger: 'change'
        }]
		this.username = [{
				required: true,
				message: '请填写用户名',
				trigger: 'change'
			},
			{
				validator: util.unique(unique, null, "username"),
				trigger: 'change'
			}
		]
		this.password = [{
			required: true,
			message: '请填写密码',
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