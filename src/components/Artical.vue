<template>
  <div>
    <p>文章类型: {{type}}</p>
    <p>文章章节: {{pageNum}}</p>
    <p>小区ID: {{communityId}}</p>
    <p>Mac端WebStorm用户。command + , 打开偏好设置，选择plugins,，点击下方的browse repositories...在打开窗口的搜索栏里打"vue"。 有两个插件但是都不是官方的。</p>
  </div>
</template>

<script>
  // 模板组件只能包在一个
  export default {
    name: 'Artical',
    data () {
      return {
        type: this.$route.params.type,
        pageNum: this.$route.params.pageNum,
        communityId: this.$route.query.communityId
      }
    }
  }
</script>
