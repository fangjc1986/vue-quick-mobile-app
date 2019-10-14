import route_vendor from "../route_vendor";
import RouteUtil from "../../utils/RouteUtil";

export default {
    data() {
        return {
            // 是否强制返回
            // 当被返回到此页面的时候将自动返回上一个页面
            p_force_back: false,
            // 是否在强制返回后重置路由信息
            p_force_back_reset_route: false,
        }
    },
    activated() {
        this.v_route_status = Object.assign({}, route_vendor.routeStatus);
        if (this.p_force_back && this.v_route_status.isBack) {
            if (this.p_force_back_reset_route) {
                route_vendor.resetRouteStatusInfo();
            }
            RouteUtil.back();
        } else {
            route_vendor.resetRouteStatusDelay();
        }
    },
    deactivated() {
    },
    beforeDestroy() {
        this.deactivated();
    },
    mounted() {

    },
    computed: {},
}