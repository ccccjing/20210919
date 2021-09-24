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
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'

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
        },
        {
            path: '/shop',
            component: Shop,
            children: [
                {
                    path: '/shop/goods',
                    component: ShopGoods,
                },
                {
                    path: '/shop/ratings',
                    component: ShopRatings,
                },{
                    path: '/shop/info',
                    component: ShopInfo,
                },
                {
                    path: '',
                    redirect: '/shop/goods',
                }
            ]
        }
    ]
})
