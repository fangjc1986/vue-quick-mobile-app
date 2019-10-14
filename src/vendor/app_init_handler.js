import setting from "../setting";
import AppNativeUtil from "../utils/AppNativeUtil";
import route_vendor from "./route_vendor";
import Vue from "vue"
import RouteUtil from "../utils/RouteUtil";

let initHandle = {
    /**
     * 页面刚加载执行
     * 在 main.js 的第一行执行
     */
    onload() {
        this.onloadHandler();
        this.listenBack();
        this.onloadEvent();
    },
    /**
     * 重置根字体大小
     */
    onloadHandler() {
        document.documentElement.style.fontSize = document.documentElement.clientWidth * setting.dpi_font_rate + 'px';
    },
    /**
     * 监听窗口变化
     */
    onloadEvent() {
        window.onresize = this.onloadHandler;
    },
    /**
     * 监听浏览器返回事件
     */
    listenBack() {
        window.addEventListener("popstate", () => {
            if (!window.plus) AppNativeUtil.invokeAllEvent();
            route_vendor.setBackAnimate();
        }, false);
    }
};
initHandle.onload();
Vue.prototype.$route_util = RouteUtil;
export default initHandle;