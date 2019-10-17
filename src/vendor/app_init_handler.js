import setting from "../setting";
import AppNativeUtil from "../utils/AppNativeUtil";
import route_vendor from "./route_vendor";
import Vue from "vue"
import RouteUtil from "../utils/RouteUtil";
import AjaxUtil from "@/utils/AjaxUtil";

/**
 * 重置根字体大小
 */
const resetRootFont = () => {
    let rootFont = document.documentElement.clientWidth * setting.dpi_font_rate;
    document.documentElement.style.fontSize = rootFont + 'px';
};
resetRootFont();
/**
 * 监听窗口变化
 */
window.onresize = resetRootFont;
/**
 * 监听浏览器返回事件
 */
window.addEventListener("popstate", () => {
    if (!window.plus) AppNativeUtil.invokeAllEvent();
    route_vendor.setBackAnimate();
}, false);
/**
 * 将 RouteUtil 工具注入到 Vue 原型链中，方便在组件总直接使用；
 * @type {{backEvent, backRefresh, back, to, push}}
 */
Vue.prototype.$v_router = RouteUtil;

Vue.prototype.$ajax = AjaxUtil;
