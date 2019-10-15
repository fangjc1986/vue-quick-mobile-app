import RouteUtil from "../../utils/RouteUtil";
import route_vendor from "../route_vendor";

export default {
    data() {
        return {
            // 页面加载中
            v_loading: false,
            // 第一次加载数据
            v_is_first_loading: true,
            // 路由助手函数
            // 放在这里是为了能让 webstorm 高亮提示，新版本的webstorm 无他提示在proptype中的方法！
            // 也可以直接使用 $route_util 来获取
            v_router: RouteUtil,
            // 路由状态
            v_route_status: {} ,

        }
    },
    activated() {
    },
    deactivated() {
    },
    beforeDestroy() {
        this.deactivated && this.deactivated();
    },
    mounted() {

    },
    computed: {},
};