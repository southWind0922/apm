import { baseUrl } from '@/config/env'

export default(url = '', data = {}) => {
	url = baseUrl + url;
	let dataStr = ''; //数据拼接字符串
	Object.keys(data).forEach(key => {
		dataStr += key + '=' + data[key] + '&';
	})
	if(dataStr !== '') {
		dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
		url = url + '?' + dataStr;
	}
	window.open(url)
}