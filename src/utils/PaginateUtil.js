export default class PaginateUtil {

    // 当前显示页
    page = 1;
    // 每页显示尺寸
    pageSize = 20;
    // 是否加载完成
    finished = false;
    // 对应无限滚动容器
    scrollBox = null;

    pullDownCallBack = new Function();
    pullUpCallBack = new Function();

    constructor(pullDownCallBack, pullUpCallBack, pageSize = 20) {
        this.pageSize = pageSize;
        this.pullDownCallBack = () => {
            this.page = 1;
            this.finished = false;
            pullDownCallBack && pullDownCallBack(true);
        };
        this.pullUpCallBack = () => {
            pullUpCallBack && pullUpCallBack(false);
        };
    }

    /**
     * 将服务器拿到的 返回格式转换成本地参数
     * @param json
     */
    convertJSON(json) {
        this.page = json.page;
        this.pageSize = json.pageSize;
    }

    /**
     * 返回服务器使用的分页字段
     * @returns {{pageSize: number, page: number}}
     */
    getJSON() {
        return {
            'page': this.page,
            'pageSize': this.pageSize,
        }
    }

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


}