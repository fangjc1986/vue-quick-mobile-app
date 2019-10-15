import setting from "../setting";
import AppNativeUtil from "../utils/AppNativeUtil";
import route_vendor from "./route_vendor";
import Vue from "vue"
import RouteUtil from "../utils/RouteUtil";

let initHandle = {
    rootFont: 0,
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
        this.rootFont = document.documentElement.clientWidth * setting.dpi_font_rate;
        document.documentElement.style.fontSize = this.rootFont + 'px';
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
Vue.prototype.$v_router = RouteUtil;
export default initHandle;