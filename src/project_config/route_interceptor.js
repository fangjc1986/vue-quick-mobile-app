/**
 * 路由拦截器
 * 将自动在 route.beforeEach 中按顺序执行
 * 如果函数返回 true 则自动执行下一个 拦截函数
 * 所有函数均返回 true 之后， 将自动执行 next() 跳转；
 */
import route_vendor from "../vendor/route_vendor";

export default [
    (to, from, next) => route_vendor.interceptorAnimate(to, from, next),
]