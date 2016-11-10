<template>
  <div>
    <button v-on:click="show = !show">
      Toggle
    </button>
    <button v-on:click="getData">
      getData
    </button>
    <button v-on:click="setCount">
      改变store中count状态
    </button>
    <div class="loading" v-if="loading">
      Loading...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <transition name="fade">
      <div v-if="show">{{userName}}</div>
    </transition>
    <p v-if="post">{{post}}</p>
    <p>{{getStoreData}}</p>
    <p>{{gettersData}}</p>
  </div>
</template>

<script>
  export default {
    name: 'User',
    data () {
      return {
        userName: 'my name is marszed',
        show: true, // 整个单个路由过渡效果
        data: '',
        loading: false, // 整个数据加载Loading
        post: null,
        error: null,
        gettersData: this.$store.getters.doneTodos // 从『唯一数据源(SSOT)』store getters中获取包装数据状态
      }
    },
    computed: {
      getStoreData: function () {
        return this.$store.state.count // 从『唯一数据源(SSOT)』store中获取状态
      }
    },
    methods: {
      getData: function () {
        this.error = this.post = null
        this.loading = true
        this.$http.post('http://123.57.152.75:8051/ifsys/getallifsys.do', {ifName: ''}).then((response) => {
          this.loading = false
          // success callback
          this.post = response
          console.log(this)
        }, (err) => {
          this.error = err.statusText
          // error callbac
        })
      },
      setCount: function () {
        this.$store.dispatch('setCount', { // 可以异步操作
          count: 10
        })
        // this.$store.commit('setCount', 10)  // 同步操作, 必须调用该类型的 store.commit 才能执行 mutation 的回调函数
      },
      onSwipeLeft: function (event) {
        console.log(event)
        // event is a Hammer Event Object
      },
      onTap: function (event) {
        console.log(event)
      }
    }
  }
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
  .test-swipe{
    width: 100%;
    height: 200px;
    background-color: #ccc;
    color: #000;
    font-size: 30px;
  }
  .test-tap{
    width: 100%;
    height: 100px;
    color: green;
    background-color: #f1f4f5;
    font-size: 30px;
  }
</style>
