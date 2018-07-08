import Async from './fetch'
import vm from '@/main'
import { Loading } from 'element-ui';

export default async(url = '', data = {}, type = 'GET', notify = false, loading = false) => {
	let $http = new Async(url, data, type)
	$http.httpProvider = function() {
		return {
			response: function(response, responseJson) {
				if(response.status == 200) {
					if(notify && responseJson) {
						if(vm.$_notify) {
							vm.$_notify.close()
						}
						if(responseJson.status === true) {
							vm.$_notify = vm.$notify({
								title: '成功',
								message: responseJson.message || "操作成功",
								type: 'success',
								duration: 3000
							});
						} else {
							vm.$_notify = vm.$notify.error({
								title: '失败',
								message: responseJson.message || "操作失败",
								duration: 3000
							});
						}
					}
					return responseJson
				} else if(response.status == 403) {
					if(!vm.$_overTime) {
						vm.$_overTime = vm.$notify.warning({
							title: '登录超时',
							message: "操作超时,3秒后退出登录"
						});
						setTimeout(() => {
							window.location.href = "/"
						}, 3000)
					}
					return responseJson
				} else if(response.status == 404) {
					vm.$_notify = vm.$notify.warning({
						title: '失败',
						message: "功能待实现"
					});
					return false
				} else {
					vm.$_notify = vm.$notify.error({
						title: '失败',
						message: "服务器异常,请稍后再试"
					});
					return false
				}
			}
		}
	}
	$http.hook = {
		before() {
			if(loading) {
				this.loading = Loading.service({
					fullscreen: true
				})
			}
		},
		after() {
			if(loading && this.loading) {
				this.loading.close();
			}
		}
	}
	let res = await $http.send()
	return res
}