import Helper from "@/utils/Helper";

/**
 * 返回代办任务
 */
export default {
    taskList: [],

    /**
     * 添加新的代办任务
     * @param callback
     */
    pushTask(callback) {
        let uuid = Helper.uuid();
        this.taskList.push({
            'uuid': uuid,
            'callback': callback
        });
        return uuid;
    },

    /**
     * 添加新的代办 自定义 uuid
     * @param task
     * @returns {boolean}
     */
    pushTaskUuid(task) {
        let index = this.taskList.findIndex(x => x.uuid === task.uuid);
        if (index >= 0) {
            let tasks = this.taskList.splice(index, 1);
            this.taskList = this.taskList.concat(tasks);
            return false;
        }
        this.taskList.push(task);
        return true;
    },

    /**
     * 按照 uuid 执行返回代办事项
     * @param uuid
     * @returns {boolean}
     */
    runTask(uuid) {
        let index = this.taskList.findIndex(x => x.uuid === uuid);
        if (index < 0) return false;
        this.taskList[index].callback();
        this.taskList.splice(index, 1);
        return true;
    },

    /**
     * 执行最近添加的一次代办事项
     * @returns {boolean}
     */
    runLastTask() {
        if (this.taskList.length < 1) return false;
        this.taskList.pop().callback();
        return true;
    },
    /**
     * 执行所有代办事项
     */
    runAllTask() {
        this.taskList.forEach(task => {
            task.callback();
        });
        this.clearAllTask();
    },

    /**
     * 清楚一个 uuid 代办任务
     * @param uuid
     */
    removeTaskUuid(uuid) {
        let index = this.taskList.findIndex(x => x.uuid === uuid);
        if (index < 0) return;
        this.taskList.splice(index, 1);
    },

    /**
     * 清空代办任务
     */
    clearAllTask() {
        this.taskList = [];
    }

}