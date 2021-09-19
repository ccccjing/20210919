// 路由器模块

// 引入
import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入路由
import Msite from '../pages/Msite/Msite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'

// 使用插件
Vue.use(VueRouter)

// 创建并导出路由器
export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/msite',
        },
        {
            path: '/msite',
            component: Msite,
            meta: {
                footerShow: true,
            }
        },
        {
            path: '/search',
            component: Search,
            meta: {
                footerShow: true
            },
        },
        {
            path: '/order',
            component: Order,
            meta: {
                footerShow: true
            },
        },
        {
            path: '/profile',
            component: Profile,
            meta: {
                footerShow: true
            },
        },
        {
            path: '/login',
            component: Login,
        }
    ]
})
