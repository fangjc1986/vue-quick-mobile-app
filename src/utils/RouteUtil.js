import route_vendor from "../vendor/route_vendor";
import BackTaskListUtil from "@/utils/BackTaskListUtil";

export default {
    /**
     * 页面跳转
     * 自动兼容 字符串类型 和 path 对象
     * @param path
     * @param params
     */
    push(path, params = {}) {
        if (typeof path === 'string') {
            route_vendor.router.push({
                path: path,
                query: params
            })
        } else {
            route_vendor.router.push(path);
        }
    },
    /**
     * 跳转到新的页面
     * @param path
     * @param params
     */
    to(path, params = {}) {
        route_vendor.setForwardAnimate();
        this.push(path, params);
    },
    /**
     * 返回上一个页面
     */
    back() {
        if( !window.plus) BackTaskListUtil.runAllTask();
        window.history.go(-1);
    },
    /**
     * 返回并触发上一页的指定事件
     * @param params
     * @param eventName
     * @param resetOthers
     */
    backEvent(params, eventName = true, resetOthers = false) {
        route_vendor.setBackEvent(params, eventName, resetOthers);
        this.back();
    },
    /**
     * 返回并刷新上一页（执行上一页的 reload 事件）
     * @param resetOthers
     */
    backRefresh(resetOthers = false) {
        route_vendor.setBackRefresh(resetOthers);
        this.back();
    }

}