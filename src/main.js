// 入口JS

import Vue from "vue"
import App from './App.vue'

// 引入路由器
import router from "./router"
// 引入vux
import store from './store'
// 引入mint-ui
import {Button} from 'mint-ui'
// 引入mockServer
import './mock/mockServer'
// 引入自定义过滤器模块
import './filters'

// 关闭生产提示
Vue.config.productionTip = false
// 注册全局组件标签(<mt-button>)
Vue.component(Button.name,Button)

new Vue({
    el: '#app',
    render: h => h(App),
    router,// 使用vue-router
    store,// 使用vuex
})