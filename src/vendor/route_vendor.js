import store_vendor from "./store_vendor";
import setting from "../setting";
import DebThrUtil from "../utils/DebThrUtil";

/**
 * 路由相关状态
 */
class RouteStatus {
    // 是否为返回路由
    isBack = false;
    // 是否返回刷新
    backRefresh = false;
    // 返回事件名称
    backEvent = false;
    // 返回事件参数
    backEventParams = {};
}

export default {

    /**
     * router 实例
     * @type null | Object
     */
    router: null,

    /**
     * 动态使用不同方式载入组件页面
     * 开发模式下使用同步载入
     * 生产模式使用异步载入
     * @param url
     * @returns {(function())|*}
     */
    import(url) {
        if (process.env.NODE_ENV === 'production') {
            return () => import('@/pages/' + url);
        } else {
            return require('@/pages/' + url).default;
        }
    },

    /**
     * 自动载入路由文件
     * @param files
     * @returns {Array}
     */
    autoLoadingRouteJs(files) {
        let routes = [];
        files.keys().forEach((key) => {
            if (/index/.test(key)) return;
            routes = routes.concat(files(key).default);
        });
        return routes;
    },

    //当前路由状态
    routeStatus: new RouteStatus(),
    // 前进动画样式 和 后退动画样式
    forwardClass: setting.page_animate_class + '-left',
    backClass: setting.page_animate_class + '-right',
    /**
     * 设置动画为返回动画
     */
    setBackAnimate() {
        this.routeStatus.isBack = true;
        return this;
    },
    /**
     * 设置动画为前进动画
     */
    setForwardAnimate() {
        this.routeStatus.isBack = false;
        return this;
    },
    /**
     * 默认路由拦截器
     * 判断跳转动画
     * @param to
     * @param from
     * @param next
     */
    interceptorAnimate(to, from, next) {
        store_vendor.store.commit(
            'app/animate/setPageAnimateClass',
            this.routeStatus.isBack ? this.backClass : this.forwardClass
        );
        return true;
    },


    /**
     * 重置路由状态
     */
    resetRouteStatus() {
        this.routeStatus = new RouteStatus;
        return this;
    },

    /**
     * 重置状态信息
     * 保留路由方向信息
     */
    resetRouteStatusInfo() {
        this.routeStatus = Object.assign(
            new RouteStatus(), {
                isBack: this.routeStatus.isBack
            }
        )
    },
    /**
     * 延时清空状态
     * @param delay
     */
    resetRouteStatusDelay(delay = 200) {
        DebThrUtil.debounce('resetRouteStatusDelay', () => {
            this.resetRouteStatus();
        }, delay);
    },

    /**
     * 设置返回刷新
     * @param resetOther
     */
    setBackRefresh(resetOther = false) {
        if (resetOther) this.resetRouteStatus();
        this.routeStatus.backRefresh = true;
        return this;
    },
    /**
     * 设置返回触发事件
     * @param eventName
     * @param eventParams
     * @param resetOther
     */
    setBackEvent(eventParams = {}, eventName = true, resetOther = false) {
        if (resetOther) this.resetRouteStatus();
        this.routeStatus.backEvent = eventName;
        this.routeStatus.backEventParams = eventParams;
        return this;
    }

}