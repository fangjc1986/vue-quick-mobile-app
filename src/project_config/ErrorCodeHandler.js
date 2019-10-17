import {Toast} from "vant";

export default class ErrorCodeHandle {

    /**
     * AjaxUtil 对象
     * @type {AjaxUtil}
     */
    ajaxUtil = null;

    constructor(ajaxUtil) {
        this.ajaxUtil = ajaxUtil;
    }

    /**
     * msg 常规文本错误信息
     */
    code100() {
        // 常规文本错误信息处理，可直接 toast 出
        Toast(this.ajaxUtil.response.message);
    }

    /**
     * 用户尚未登录
     */
    code110() {
        // TODO 退出登录跳转到登录页等业务逻辑
    }

    /**
     * demo 中定义 120 为服务器返回表单错误信息
     */
    code120() {
        Toast(this.ajaxUtil.response.message);
        this.ajaxUtil.formRef.setErrorFromServer(this.ajaxUtil.response.data);
    }

    // 可以继续添加错误如： code120(), code130();

    //表单错误处理
    formErrorHandle() {
        // 从 AjaxUtil 中拿到对应表单对象并加以处理
        let form = this.ajaxUtil.formRef;
        // TODO ... 可以调用自定义的表单方法
        // 如： form.showErrorFromServer(this.ajaxUtil.response.data);
    }

}