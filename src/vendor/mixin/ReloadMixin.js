import route_vendor from "../route_vendor";
import PageMixin from "./PageMixin";

export default {
    mixins: [PageMixin],
    data() {
        return {
            // 触发 reload 事件的延迟时间（ms）
            r_reload_delay: 400,
            // 返回刷新延迟事件
            r_back_reload_delay: 400,
            // 返回事件延迟事件
            r_back_event_delay: 400,
            // 无论返回或者进入 均强制执行 reload 函数
            r_force_reload: false,
            // 延迟执行定时器
            r_delay_timeout: null,
            // 返回刷新延时定时器
            r_back_reload_timeout: null,
            // 返回事件延迟定时器
            r_back_event_timeout: null,
        }
    },
    activated() {
        if (this.p_force_back) return;
        this.$nextTick(() => {
            let routeStatus = this.v_route_status;
            // 进入 是否刷新
            if (!routeStatus.isBack || this.r_force_reload) {
                this.r_delay_timeout = setTimeout(() => {
                    this.reload();
                }, this.r_reload_delay);
            }
            // 返回路由
            if (routeStatus.isBack) {
                // 返回刷新
                if (routeStatus.backRefresh) {
                    this.r_back_reload_timeout = setTimeout(() => {
                        this.reload();
                    }, this.r_back_reload_delay);
                }
                // 返回事件
                if (routeStatus.backEvent) {
                    let eventName = routeStatus.backEvent === true ? 'backEvent' : routeStatus.backEvent;
                    console.log(eventName);
                    if (this[eventName]) {
                        this.r_back_event_timeout = setTimeout(() => {
                            this[eventName](routeStatus.backEventParams);
                        }, this.r_back_event_delay);
                    }
                }
            }
        });
    },
    deactivated() {
        clearTimeout(this.r_delay_timeout);
        clearTimeout(this.r_back_reload_timeout);
        clearTimeout(this.r_back_event_timeout);
    },
    beforeDestroy() {
        this.deactivated();
    },
    mounted() {

    },
    computed: {},
}