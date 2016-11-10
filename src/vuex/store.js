/**
 * Created by marszed on 16/11/10.
 */
// 加载核心库
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: { // 元数据
    count: 0,
    word: '你好',
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: { // 数据包装
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  },
  mutations: { // 数据状态更改muta 实际改变 状态(state) 的唯一方式是通过 提交(commit) 一个 mutation 只能是同步操作
    setCount (state, count) { // 入参 类型, 值
      console.log(state)
      console.log(count)
      // 改变 state
      state.count += count
    }
  },
  actions: {  // action 不改变状态，只提交(commit) mutation 可以包含任意异步操作
    setCount (context, obj) {
      setTimeout(() => {
        context.commit('setCount', obj.count)
      }, 3000)
    }
  }
})

export default store
