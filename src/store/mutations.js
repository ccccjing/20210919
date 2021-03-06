// 直接更新state的多个方法的对象

import Vue from 'vue'
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFO,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    CLEAR_CART,
    RECEIVE_SEARCH_SHOPS
} from './mutation-types'

export default {
    [RECEIVE_ADDRESS] (state, {address}) {
        state.address = address
    },

    [RECEIVE_CATEGORYS] (state, {categorys}) {
        state.categorys = categorys
    },

    [RECEIVE_SHOPS] (state, {shops}) {
        state.shops = shops
    },

    [RECEIVE_USER_INFO] (state, {userInfo}) {
        state.userInfo = userInfo
    },

    [RESET_USER_INFO] (state) {
        state.userInfo = {}
    },

    [RECEIVE_GOODS] (state,{goods}) {
        state.goods = goods
    },

    [RECEIVE_RATINGS] (state,{ratings}) {
        state.ratings = ratings
    },

    [RECEIVE_INFO] (state,{info}) {
        state.info = info
    },

    [INCREMENT_FOOD_COUNT] (state,{food}) {
        if (!food.count) {
            /* 
            在已绑定的对象中添加属性：set方法
            对象：food
            属性：count
            属性值：1
             */
            Vue.set(food, 'count', 1)
            // cartFoods中添加food
            state.cartFoods.push(food)
        } else {
            food.count ++
        }
    },

    [DECREMENT_FOOD_COUNT] (state,{food}) {
        if (food.count) {
            food.count --
            if (food.count === 0) {
                state.cartFoods.splice(state.cartFoods.indexOf(food),1)
            }
        }
    },

    [CLEAR_CART] (state) {
        // 清除count
        state.cartFoods.forEach(food => {
            food.count = 0
        })
        // 清空购物车
        state.cartFoods = []
    },

    [RECEIVE_SEARCH_SHOPS] (state,{searchShops}) {
        state.searchShops = searchShops
    }
}