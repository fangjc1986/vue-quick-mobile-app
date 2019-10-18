import {Dialog} from "vant";
import BackTaskListUtil from "@/utils/BackTaskListUtil";

export default {

    /**
     * alert 封装
     * 可以以同样的方式封装 confirm 等
     * @param option
     * @returns {Promise<void>}
     */
    alert(option = {}) {
        let uuid = 'dialog_alert_uuid';
        // 添加到代办列表
        // 如弹窗后点击返回按钮则执行代办事项
        BackTaskListUtil.pushTaskUuid({
            uuid: uuid,
            callback: () => {
                Dialog.close();
            }
        });
        return Dialog.alert(option).then(() => {
            // 拦截成功事件
            // 从代表列表删除关闭弹窗代办事件
            BackTaskListUtil.removeTaskUuid(uuid);
            return Promise.resolve();
        });
    }

}