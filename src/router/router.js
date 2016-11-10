/**
 * Created by marszed on 16/11/10.
 */
// 加载核心库
import Vue from 'vue'
import VueRouter from 'vue-router'

// 加载视图组件
import User from '../components/User'
import Hello from '../components/Hello'
// 整个路由懒加载-异步加载组件,代码分块的语法，使用 AMD 风格的 require
const Artical = resolve => require(['../components/Artical'], resolve)

// 加载过滤器
import Filter from '../lib/filter'

// 模块化机制,此处要调用 Vue.use(VueRouter)
Vue.use(VueRouter)

// 创建一个路由器实例,并且配置路由规则
const routes = [
  {
    path: '/',
    component: { template: '<div><h2>数据加载中...</h2></div>' } // 整个入口页
  },
  {
    path: '/hello',
    name: 'hello',
    component: Hello
  },
  {
    path: '/user',
    component: User
  },
  {
    path: '/page/:id', // 搞一个动态路由
    component: { template: '<div><h2>{{$route.params.id}}</h2></div>' }
  },
  {
    path: '/artical/:type/page/:pageNum', // 搞一个复杂一点的动态路由
    component: Artical
  },
  {
    path: '/login',
    name: 'login',
    component: { template: '<div><p><input type="number" placeholder="请输入手机号码"><input type="number" placeholder="请输入验证码"></p></div>' }
  },
  {
    path: '/open-door', // 定义路由的时候可以配置 meta 字段
    name: 'openDoor', // 路由别名
    component: { template: '<div><h2>快来开门啊</h2></div>' }, // 搞个要求验证滴,这个路由要求认证
    meta: { requiresAuth: true }
  },
  {
    path: '/tip',
    name: 'tip',
    component: { template: '<div><h2>请不要说脏话</h2></div>' } // 来个重定向
  },
  {
    path: '/fuck',
    redirect: '/tip'
  },
  {
    path: '*',
    component: { template: '<div><h2>404页面</h2></div>' } // 啥都没匹配到,搞个404安慰下
  }
]

// 创建router实例，然后传 `routes` 配置
const router = new VueRouter({
  mode: 'history', // hash模式会有个uglify的#
  routes: routes,
  scrollBehavior (to, from, savedPosition) { // 路由滚动行为,也可以通过路由元信息 meta 针对特定的路由做滚动行为
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => { // 注册一个全局的before钩子,按照创建顺序调用。钩子是异步解析执行，此时导航在所有钩子 resolve(释放) 完之前一直处于 等待中
  console.log(`come from ${from.path}` + ` ${from.fullPath}`)
  console.log(`go to ${to.path}` + ` ${to.fullPath}`)
  if (to.matched.some(record => record.meta.requiresAuth)) { // 匹配到要求验证登录的路由时候, 调用验证登录接口
    if (!Filter.requiresAuth(`${to.fullPath}`)) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next() // 进行管道中的下一个钩子
  }
  // next(false) 中断当前的导航
  // next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
})

export default router
