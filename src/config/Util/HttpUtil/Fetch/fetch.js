import { baseUrl } from '@/config/env'

function Async(url = '', data = {}, type = 'GET') {
    this.url = url;
    this.data = data;
    this.type = type;
    this.fetch = false;
    this.httpProvider = {}
    this.init = function() {
        this.url = baseUrl + this.url;
        this.type = this.type.toUpperCase();
        if(type == 'GET') {
            let dataStr = ''; //数据拼接字符串
            Object.keys(this.data).forEach(key => {
                dataStr += key + '=' + this.data[key] + '&';
            })
            if(dataStr !== '') {
                dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
                this.url = this.url + '?' + dataStr;
            }
        }
        if(window.fetch) {
            this.fetch = true
        }
    }
    this.hook = {
    	before(){
    		
    	},
    	after(){
    		
    	}
    },
    this.send = async function() {
        this.init()
        let res = false
        if(this.fetch) {
        	this.hook.before()
            res = await this.fetchAPI()
        	this.hook.after()
        }
        else {
            res = await this.httpAPI()
        }
        return res
    }
    this.fetchAPI = async function() {
        let requestConfig = {
            credentials: 'include',
            method: this.type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: "cors",
            cache: "no-cache"
        }
        if(this.type == 'POST') {
            Object.defineProperty(requestConfig, 'body', {
                value: JSON.stringify(this.data)
            })
        }
        this.runHttpProvider("request",requestConfig)
        let response = await fetch(this.url, requestConfig)
        let responseJson = {}
        if(response.status == 200){
        	try{
        		responseJson = await response.json()
        	}catch(e){
        		
        	}
        }
        this.runHttpProvider("response",response,responseJson)
        if(response.status == 200) {
            return responseJson
        }
        else {
            return false
        }
    }
    this.httpAPI = function() {
        return new Promise((resolve, reject) => {
            let requestObj;
            if(window.XMLHttpRequest) {
                requestObj = new XMLHttpRequest();
            }
            else {
                requestObj = new ActiveXObject;
            }
            let sendData = '';
            if(this.type == 'POST') {
                sendData = JSON.stringify(this.data);
            }
            requestObj.open(this.type, this.url, true);
            requestObj.setRequestHeader("Content-type", "application/json");
            requestObj.send(sendData);
            requestObj.onreadystatechange = () => {
                if(requestObj.readyState == 4) {
                    if(requestObj.status == 200) {
                        let obj = requestObj.response
                        if(typeof obj !== 'object') {
                            obj = JSON.parse(obj);
                        }
                        resolve(obj)
                    }
                    else {
                        reject(requestObj)
                    }
                }
            }
        })
    }
    this.runHttpProvider = function(...arr){
    	let fn = this.httpProvider()[arr[0]]
    	if(fn && typeof fn == "function"){
    		arr.shift()
    		fn(...arr)
    	}
    }
}
export default Async