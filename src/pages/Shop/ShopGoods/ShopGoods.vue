<template>
  <div> 
    <div class="goods"> 
      <div class="menu-wrapper" ref="menuWrapper"> 
        <ul>
          <li class="menu-item" v-for="(good,index) in goods" :key="index" 
            :class="{current: currentIndex === index}" @click="clickMenuItem(index)"> 
            <span class="text bottom-border-1px"> 
              <img class="icon" :src="good.icon" v-if="good.icon"> 
              {{good.name}}
            </span>
          </li>
        </ul> 
      </div>

      <div class="foods-wrapper" ref="foodsWrapper"> 
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index"> 
            <h1 class="title">{{good.name}}</h1> 
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index" @click="showFood(food)"> 
                <div class="icon"> 
                  <img width="57" height="57" :src="food.icon"> 
                </div> 
                <div class="content"> 
                  <h2 class="name">{{food.name}}</h2> 
                  <p class="desc">{{food.description}}</p> 
                  <div class="extra"> 
                    <span class="count">月售 {{food.sellCount}} 份</span> 
                    <span>好评率 {{food.rating}}%</span>
                  </div> 
                  <div class="price"> 
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div> 
                  <div class="cartcontrol-wrapper">
                    <Cartcontrol :food="food"/>
                  </div> 
                </div>
              </li> 
            </ul> 
          </li>
        </ul> 
      </div>

      <ShopCart/>
    </div>
    <Food :food="food" ref="food"/> 
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import Cartcontrol from '../../../components/Cartcontrol/Cartcontrol.vue'
  import Food from '../../../components/Food/Food.vue'
  import ShopCart from '../../../components/ShopCart/ShopCart.vue'
  export default {
      name: 'ShopGoods',
      components: {
        Cartcontrol,
        Food,
        ShopCart
      },
      data () {
        return {
          scrollY: '',
          tops: [],
          food: {}
        }
      },
      mounted () {
        this.$store.dispatch('getShopGoods',() => {// 数据更新后执行
          this.$nextTick(() => {// 列表数据显示更新后执行
            this._initScroll()
            this._initTops()
          })
        })
      },
      computed: {
        ...mapState(['goods']),
        // 计算得出当前分类的下标
        currentIndex () {
          // 计算条件
          const {scrollY, tops} = this
          // 根据计算条件产生一个下标值
          const index = tops.findIndex((top, index) => {
            return scrollY >= top && scrollY < tops[index+1]
          })
          // 返回下标值
          return index
        }
      },
      methods: {
        // 初始化滚动
        _initScroll () {
          // 列表显示之后创建
            new BScroll('.menu-wrapper', {
              click: true
            })
            this.foodsScroll = new BScroll('.foods-wrapper', {
              probeType: 2
            })

            // 给右侧列表绑定scroll监听事件
            this.foodsScroll.on('scroll', ({x, y}) => {
              console.log(x,y)
              this.scrollY = Math.abs(y)
            })

            // 给右侧列表绑定scrool结束监听事件
            this.foodsScroll.on('scrollEnd', ({x, y}) => {
              console.log(x,y)
              this.scrollY = Math.abs(y)
            })
        },
        // 初始化tops
        _initTops () {
          // 初始化tops
          const tops = []
          let top = 0
          tops.push(top)
          // 收集数据
          const lis = this.$refs.foodsUl.children
          Array.prototype.slice.call(lis).forEach(li => {
            top += li.clientHeight
            tops.push(top)
          });
          // 更新数据
          this.tops = tops
          console.log(this.tops)
        },
        // 点击左侧分类，右侧滑动
        clickMenuItem (index) {
          // console.log(index)

          // 得到目标位置的scrollY
          const scrollY = this.tops[index]
          // 立即滑动到当前的分类项
          this.scrollY = scrollY
          // 平滑滑动右侧分类
          this.foodsScroll.scrollTo(0, -scrollY, 500)
        },
        // 展示获取点击后的food
        showFood (food) {
          // 点击的food
          this.food = food
          // food的显示与隐藏(父组件调用子组件的方法)
          this.$refs.food.toggleShow()
        }
      },
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import '../../../common/stylus/mixins.styl'
  .goods 
    display: flex 
    position: absolute 
    top: 195px 
    bottom: 46px 
    width: 100% 
    background: #fff; 
    overflow: hidden 
    .menu-wrapper 
      flex: 0 0 80px 
      width: 80px 
      background: #f3f5f7 
      .menu-item 
        display: table 
        height: 54px 
        width: 56px 
        padding: 0 12px 
        line-height: 14px 
        &.current 
          position: relative 
          z-index: 10 
          margin-top: -1px 
          background: #fff
          color: $green
          font-weight: 700 
          .text 
            border-none() 
        .icon 
          display: inline-block 
          vertical-align: top 
          width: 12px 
          height: 12px 
          margin-right: 2px 
          background-size: 12px 12px 
          background-repeat: no-repeat 
        .text 
          display: table-cell 
          width: 56px 
          vertical-align: middle 
          bottom-border-1px(rgba(7, 17, 27, 0.1)) 
          font-size: 12px
    .foods-wrapper 
      flex: 1 
      .title 
        padding-left: 14px 
        height: 26px 
        line-height: 26px 
        border-left: 2px solid #d9dde1 
        font-size: 12px 
        color: rgb(147, 153, 159) 
        background: #f3f5f7 
      .food-item 
        display: flex 
        margin: 18px 
        padding-bottom: 18px 
        bottom-border-1px(rgba(7, 17, 27, 0.1)) 
        &:last-child 
          border-none() 
          margin-bottom: 0
        .icon 
          flex: 0 0 57px 
          margin-right: 10px 
        .content 
          flex: 1 
          .name 
            margin: 2px 0 8px 0
            height: 14px 
            line-height: 14px 
            font-size: 14px 
            color: rgb(7, 17, 27) 
          .desc, .extra 
            line-height: 10px 
            font-size: 10px 
            color: rgb(147, 153, 159) 
          .desc 
            line-height: 12px 
            margin-bottom: 8px 
          .extra 
            .count 
              margin-right: 12px 
          .price 
            font-weight: 700 
            line-height: 24px 
            // margin-bottom: 5px
            .now
              margin-right: 8px 
              font-size: 14px 
              color: rgb(240, 20, 20) 
            .old
              text-decoration: line-through
              font-size: 10px 
              color: rgb(147, 153, 159) 
          .cartcontrol-wrapper 
            position: absolute 
            right: 0 
            bottom: 12px
</style>