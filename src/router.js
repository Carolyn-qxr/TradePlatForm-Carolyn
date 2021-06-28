import Vue from 'vue'
import Router from 'vue-router'
// eslint-disable-next-line no-unused-vars
import register from "@/components/register/register";
// eslint-disable-next-line no-unused-vars
import enterRegister from "./components/register/enterRegister";
// eslint-disable-next-line no-unused-vars
import user_login from "./components/login/user_login";
import ManageSystem from "./components/manageSystem";
import adminHome from "./components/admin_modules/adminHome"
import checkGoods from "./components/admin_modules/checkGoods"
import goodList from "./components/admin_modules/goodList"
import userApply from "./components/admin_modules/userApply"
import userInfo from "./components/admin_modules/userInfo"
import adminWalletDetail from "@/components/admin_modules/adminWalletDetail";
import home from "./components/shoppingMall/home"
import enter from "./components/shoppingMall/enter";
import wallet from "./components/shoppingMall/wallet"
import releaseGoods from './components/shoppingMall/enter_modules/releaseGoods'
import goodsManage from './components/shoppingMall/enter_modules/goodsManage'
import enterWallet from './components/shoppingMall/enter_modules/enterWallet'
import enterReturnGoods from "@/components/shoppingMall/enter_modules/enterReturnGoods";
import goods_detail from "./components/shoppingMall/shopping_modules/goods_detail";
import goods_buy from "./components/shoppingMall/shopping_modules/goods_buy";
import goods_comment from "./components/shoppingMall/shopping_modules/goods_comment"
import cart from "./components/shoppingMall/shopping_modules/cart"
import userWallet from "@/components/shoppingMall/shopping_modules/userWallet";
import user_orders from "@/components/shoppingMall/shopping_modules/user_orders";
import goods_search from "@/components/shoppingMall/shopping_modules/goods_search";
import enter_shop from "@/components/shoppingMall/shopping_modules/enter_shop";
import BusinessRegister from "./components/shoppingMall/BusinessRegister"
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
    },
    {
      path: '/login',
      name: 'user_login',
      component: () =>import('./components/login/user_login')

    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./components/shoppingMall/home')
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: () => import('./components/shoppingMall/wallet')
    },

    {
      path: '/register',
      name: 'register',
      component: () => import('./components/register/register')
    },
    {
      path: '/enterRegister',
      name: 'enterRegister',
      component: () => import('./components/register/enterRegister')
    },
    {

      path: '/enterRegister',
      name: 'enterRegister',
      component: () => import('./components/register/enterRegister')
    },
    {
      path: '/adminSystem',
      name: 'manageSystem',
      component: () => import('./components/manageSystem'),
      children: [
        {
          path: '/adminSystem/userInfo',
          name: 'userInfo',
          component: ()=>import('./components/admin_modules/userInfo')
        },
        {
          path: '/adminSystem/userApply',
          name: 'userApply',
          component: ()=>import('./components/admin_modules/userApply')
        },
        {
          path: '/adminSystem/goodList',
          name: 'goodList',
          component: ()=>import('./components/admin_modules/goodList')
        },
        {
          path: '/adminSystem/checkGoods',
          name: 'checkGoods',
          component: ()=>import('./components/admin_modules/checkGoods')
        },
        {
          path: '/adminSystem/adminHome',
          name: 'adminHome',
          component: ()=>import('./components/admin_modules/adminHome')
        },
        {
          path: '/adminSystem/wallet',
          name: 'adminWalletDetail',
          component: ()=>import('./components/admin_modules/adminWalletDetail')
        },

      ]
    },
    {
      path: '/enter',
      name: 'enter',
      component: () => import('./components/shoppingMall/enter'),
      children: [
        {
          path: '/enter/releaseGoods',
          name: 'releaseGoods',
          component: ()=>import('./components/shoppingMall/enter_modules/releaseGoods')
        },
        {
          path: '/enter/goodsManage',
          name: 'goodsManage',
          component: ()=>import('./components/shoppingMall/enter_modules/goodsManage')
        },
        {
          path: '/enter/enterReturnGoods',
          name: 'enterReturnGoods',
          component: ()=>import('./components/shoppingMall/enter_modules/enterReturnGoods')
        },
        {
          path: '/enter/enterWallet',
          name: 'enterWallet',
          component: ()=>import('./components/shoppingMall/enter_modules/enterWallet')
        },
      ]
    },
    {
      path: '/goodsDetail',
      name: 'goods_detail',
      component: ()=>import('./components/shoppingMall/shopping_modules/goods_detail')
    },
    {
      path: '/goodsSearch',
      name: 'goods_search',
      component: ()=>import('./components/shoppingMall/shopping_modules/goods_search')
    },
    {
      path: '/enterShop',
      name: 'enter_shop',
      component: ()=>import('./components/shoppingMall/shopping_modules/enter_shop')
    },
    {
      path: '/goodsBuy',
      name: 'goods_buy',
      component: ()=>import('./components/shoppingMall/shopping_modules/goods_buy')
    },
    {
      path: '/goodsComment',
      name: 'goods_comment',
      component: ()=>import('./components/shoppingMall/shopping_modules/goods_comment')
    },
    {
      path: '/goodsCart',
      name: 'cart',
      component: ()=>import('./components/shoppingMall/shopping_modules/cart')
    }
    ,
    {
      path: '/userWallet',
      name: 'userWallet',
      component: ()=>import('./components/shoppingMall/shopping_modules/userWallet')
    },
    {
      path: '/userOrders',
      name: 'user_orders',
      component: ()=>import('./components/shoppingMall/shopping_modules/user_orders')
    },
    {
      path: '/test',
      name: 'BusinessRegister',
      component: ()=>import('./components/shoppingMall/BusinessRegister')
    },




  ],
  scrollBehavior(to,from,savedPosition){

    if (savedPosition){

      return savedPosition // 按下 后退/前进 按钮时，类似浏览器的原生表现

    }else {

      return {x:0,y:0} // 让页面滚动到顶部

    }

  }
})
