import DebThrUtil from "@/utils/DebThrUtil";

export default class PaginateUtil {

    // 当前显示页
    page = 1;
    // 每页显示尺寸
    pageSize = 20;
    // 实际数据列表;
    list = [];
    // 对应无限滚动容器
    scrollBox = null;

    pullDownCallBack = new Function();
    pullUpCallBack = new Function();

    /**
     * 构造函数
     * @param pullDownCallBack  下拉刷新回调方法
     * @param pullUpCallBack    上拉加载回调方法
     * @param pageSize
     */
    constructor(pullDownCallBack, pullUpCallBack, pageSize = 20) {
        this.pageSize = pageSize;
        this.pullDownCallBack = () => {
            this.page = 1;
            pullDownCallBack && pullDownCallBack(true);
        };
        this.pullUpCallBack = () => {
            pullUpCallBack && pullUpCallBack(false);
        };
    }

    /**
     * 将服务器拿到的 返回格式转换成本地参数
     * @param json 服务器返回的分页json对象
     */
    convertJSON(json) {
        this.page = json.page;
        this.pageSize = json.pageSize;
        this.list = json.list;
    }

    /**
     * 返回服务器使用的分页字段
     * 将本地分页格式转换成 服务器需要分分页对象格式
     * 用于 ajax 请求的时候使用
     * @returns {{pageSize: number, page: number}}
     */
    getJSON() {
        return {
            'page': this.page,
            'pageSize': this.pageSize,
        }
    }

    /**
     * 自动启动下拉刷新
     * 在刚进入页面的时候可以调用此函数刷新数据
     */
    autoLoading() {
        this.scrollBox && this.scrollBox.autoLoading();
    }

    /**
     * 下一页触发事件
     */
    setNextPage() {
        this.page++;
        this.pullUpCallBack();
    }

    /**
     * 完成数据列表刷新，重置scrollBox状态
     * 根据返回数据多少判断是否还有下一页数据
     * 此处使用 debounce 延迟加载，防止连续多次触发
     * 等待vue将数据渲染到页面
     * @param resp
     */
    finishLoading(resp = null) {
        DebThrUtil.debounce('PaginateUtil.finishLoading', () => {
            if (!resp || resp.length < 1) {
                this.scrollBox.finishLoading(true);
            }
            this.convertJSON(resp);
            let noMore = !(this.list && this.list.length >= this.pageSize);
            this.scrollBox.finishLoading(noMore);
        });
    }


}