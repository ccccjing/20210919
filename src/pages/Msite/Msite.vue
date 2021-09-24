<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
        <router-link slot="left" class="header_search" to="/search">
            <i class="iconfont icon-sousuo"></i>
        </router-link>
        <router-link slot="right" class="header_login" :to="userInfo._id ? '/userinfo' : '/lonin'">
          <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
          <span class="header_login_text" v-else>
            <i class="iconfont icon-person"></i>
          </span>
        </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
          <div class="swiper-container" v-if="categorys.length">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key='index'>
                <a href="javascript:" class="link_to_food" v-for="(category, index) in categorys" :key="index">
                  <div class="food_container">
                    <img :src="baseImagesUrl + category.image_url">
                  </div>
                  <span>{{category.title}}</span>
                </a>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
          <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>
    </div>
  </section>
</template>

<script>
  import Swiper from 'swiper'
  import {mapState} from 'vuex'
  import 'swiper/dist/css/swiper.min.css'
  
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import ShopList from '../../components/ShoopList/ShopList.vue'

  export default {
    name: 'Msite',

    data () {
      return {
        baseImagesUrl: 'https://fuss10.elemecdn.com'
      }
    },

    components: {
      HeaderTop,
      ShopList,
    },

    mounted () {
      

      this.$store.dispatch('getCategorys')
      this.$store.dispatch('getShops')
    },

    computed: {
      ...mapState(['address','categorys','userInfo']),

      // 将一维数组categorys转换为二维数组
      categorysArr () {
        const {categorys} = this
        // 准备一个大数组arr
        const arr = []
        // 准备一小数组minArr，最多8个
        let minArr = []

        categorys.forEach(c => {
          // 如果minArr有8个，则建一个新的
          if (minArr.length === 8) {
            minArr = []
          }
          // minArr为空时加入到arr中
          if (minArr.length === 0) {
            arr.push(minArr)
          }
          // 向minArr中加入数据
          minArr.push(c)
        });

        // 返回大数组arr
        return arr
      }
    },

    watch: {
      // 侦听categorys
      categorys () {//categorys有数据，在异步更新界面之前执行

        // 使用setTimeout可以实现，但效果不太好
        // setTimeout(() => {
        //   // 创建 swiper 实例对象
        //   new Swiper('.swiper-container', {
        //     // 循环播放
        //     loop: true,
        //     // 分页器
        //     pagination: {
        //       el: '.swiper-pagination',
        //     },
        //   })
        // },100)

        // 使用$nextTick()
        this.$nextTick(() => {//界面更新就立即创建Swiper对象，数据更新立即调用
          // 创建 swiper 实例对象
          new Swiper('.swiper-container', {
            // 循环播放
            loop: true,
            // 分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
        })
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
          width 100%
          .header
            background-color #02a774
            position fixed
            z-index 100
            left 0
            top 0
            width 100%
            height 45px
            .header_search
              position absolute
              left 15px
              top 50%
              transform translateY(-50%)
              width 10%
              height 50%
              .icon-sousuo
                font-size 25px
                color #fff
            .header_title
              position absolute
              top 50%
              left 50%
              transform translate(-50%, -50%)
              width 50%
              color #fff
              text-align center
              .header_title_text
                font-size 20px
                color #fff
                display block
            .header_login
              font-size 14px
              color #fff
              position absolute
              right 15px
              top 50%
              transform translateY(-50%)
              .header_login_text
                color #fff
          .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
              width 100%
              height 100%
              .swiper-wrapper
                width 100%
                height 100%
                .swiper-slide
                  display flex
                  justify-content center
                  align-items flex-start
                  flex-wrap wrap
                  .link_to_food
                    width 25%
                    .food_container
                      display block
                      width 100%
                      text-align center
                      padding-bottom 10px
                      font-size 0
                      img
                        display inline-block
                        width 50px
                        height 50px
                    span
                      display block
                      width 100%
                      text-align center
                      font-size 13px
                      color #666
              .swiper-pagination
                >span.swiper-pagination-bullet-active
                  background #02a774
          .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .shop_header
              padding 10px 10px 0
              .shop_icon
                margin-left 5px
                color #999
              .shop_header_title
                color #999
                font-size 14px
                line-height 20px
            
</style>