import BackTaskListUtil from "@/utils/BackTaskListUtil";
import RouteUtil from "@/utils/RouteUtil";

export default {

    /**
     * 监听app native.js 的返回按钮事件
     * 如果存在代办事项，则优先一次完成代办事项
     */
    init() {
        if (!window.plus) return;
        window.plus.key.addEventListener('backbutton', (e) => {
            if (!BackTaskListUtil.runLastTask()) {
                RouteUtil.back();
            }
            return false;
        });
    },
}