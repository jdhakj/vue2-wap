<template>
  <div id="app2">
    <img src="./assets/logo.png">
    <h1>Hello App!</h1>
    <ul>
      <li><router-link to="/hello">欢迎页</router-link></li>
      <li><router-link to="/user">个人信息页</router-link></li>
      <li><router-link to="/artical/love/page/2?communityId=1478">言情文章第二章</router-link></li>
    </ul>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default{
    name: 'box',
    data () {
      return {
        transitionName: 'slide-left'
      }
    },
    // dynamically set transition based on route change 搞个全局路由过渡效果
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        console.log(toDepth)
        console.log(fromDepth)
        this.transitionName = toDepth < fromDepth ? 'slide-left' : 'slide-right'
        console.log(this.transitionName)
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
