import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

//注册路由
Vue.use(Router)


//配置路由
const router = new Router({
	routes: [{
			path: '/',
			name: '登录',
			redirect: '/login'
		},
		{
			path: '/login',
			name: '登录',
			component: resolve => require(['@/pages/login/index'], resolve)
		},
        {
        	path: '*',
        	name: '404',
        	component: resolve => require(['@/pages/404/index'], resolve)
        }
	]
})

router.beforeEach((to, from, next) => {
    let white = ['/login']
    //通过不验证白名单
    if(white.indexOf(to.path) != -1) {
        next()
    }
    //刷新之后(store数据清空)
    else if(!store.getters.userInfo) {
        store.dispatch('autoLogin').then(() => {
            router.addRoutes(store.getters.routes)
            next({
                path: to.path
            });
        }, () => {
            next({
                path: '/login'
            });
        });
    }
    //正常路由跳转
    else {
        next()
    }
});

export default router