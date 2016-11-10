/**
 * Created by marszed on 16/11/9.
 */
// 过滤器

let Filter = {}

Filter.requiresAuth = function (obj) {
  console.log('验证登录入参: ')
  console.log(obj)
  console.log('')
  console.log('')
  // todo 调用验证登录接口
  return false
}
export default Filter
