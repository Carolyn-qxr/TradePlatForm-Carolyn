import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import './assets/css/font/iconfont.css'
//导入axios
// eslint-disable-next-line no-unused-vars
import axios from  'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios,axios);
//设置默认访问路径
axios.defaults.baseURL="http://localhost:9000"

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
router.afterEach((to,from,next) => {

  window.scrollTo(0,0);
});