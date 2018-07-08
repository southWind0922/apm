//vue全家桶
import Vue from 'vue'
import router from './router'
import store from './store'

//UI组件库
import './components'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'assets/fontawesome/css/font-awesome.min.css'

//工具库
import Util from '@/config/Util/CommonUtil'
import Param from '@/config/Util/Param'

//核心文件
import App from './app'
import './directive'


/**
 * 注册库
 */
Vue.use(ElementUI, {
    size: 'small'
})
Vue.prototype.$ = Util
Vue.prototype.$systemParam = Param
//主题
import 'assets/style.css'


//关闭生产模式的提示
Vue.config.productionTip = false

//实例化Vue(入口)
export default new Vue({
    el: '#singularity',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
})