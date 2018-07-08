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
		this.id = "";
		this.name = "";
		this.roleId = "";
		this.mobilePhone = "";
		this.username = "";
		this.password = "";
	}
	setData(data) {
		this.id = data.id;
        this.name = data.name;
        this.roleId = data.roleId;
        this.mobilePhone = data.mobilePhone;
        this.username = data.username;
        this.password = data.password;
    }
	export() {
		return {
			id: this.id,
			name: this.name,
			roleId: this.roleId,
			mobilePhone: this.mobilePhone,
			username: this.username,
			password: this.password
		}
	}
}
class Rule {
	constructor(id) {
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
				validator: util.unique(unique, id, "username"),
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
export const EditControl = () => {
	return new Control()
}
export const EditData = () => {
	return new Data()
}
export const EditRule = (id) => {
	return new Rule(id)
}