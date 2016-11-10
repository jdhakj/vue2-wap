// 加载"容器"
import App from './App'

// 加载核心库
import Vue from 'vue'
import router from './router/router'
import store from './vuex/store'
import VueResource from 'vue-resource'

// 模块化机制,此处要调用 Vue.use(VueRouter)
Vue.use(VueResource)

// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
new Vue({
  router: router, // 将 router 从根组件『注入』到每一个子组件中
  store: store, // 将 store 从根组件『注入』到每一个子组件中
  render: h => h(App) // 将 h 作为 createElement 的别名是一个通用惯例,在vue生态系统中,实际上必须用到jsx, 如果在作用域中h失去作用,在应用中会触发报错
}).$mount('#app')
