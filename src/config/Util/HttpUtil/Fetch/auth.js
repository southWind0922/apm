import Async from './fetch'
import vm from '@/main'

export default async(url = '', data = {}, type = 'GET') => {
	let $http = new Async(url, data, type)
	$http.httpProvider = function() {
		return {
			response: function(response, responseJson) {
				if(response.status == 200) {
					vm.$notify({
						title: '成功',
						message: "登录成功",
						type: 'success',
						duration: 3000
					});
					return responseJson
				} else if(response.status == 403) {
					vm.$notify.error({
						title: '失败',
						message: "登录失败,账号或者密码错误",
						duration: 3000
					});
					return responseJson
				} else {
					vm.$notify.error({
						title: '失败',
						message: "操作失败,请联系管理员,错误代码" + response.status
					});
					return false
				}
			}
		}
	}
	let res = await $http.send()
	return res
}
