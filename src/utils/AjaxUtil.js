import setting from "@/setting";
import axios from 'axios';
import Helper from "@/utils/Helper";
import ErrorCodeHandle from "@/project_config/ErrorCodeHandler";

export default class AjaxUtil {
    // 函数请求调用次数
    static ajaxCount = 0;
    // 代表 code 的 字段名称
    _codeKey = 'code';
    // 代表错误文本信息的 字段名称
    _msgKey = 'message';
    // 代表数据的 字段名称
    _dataKey = 'data';
    // 成功请求 code 码
    _successCode = 200;
    // 一般文本请求错误 code 码
    // 文本错误将自动 toast 出 message 信息
    _msgErrorCode = 100;

    /**
     * form 表单
     * 本次请求相关联的 form 表单组件Vue实例
     * 用户当服务器返回验证错误的时候可以直接回调 formRef 的回调方法，
     * 来对应显示服务器错误提示；
     */
    formRef;
    /**
     * api 请求，接受3中格式：
     * string 字符串：直接作为 url 使用
     * array 数组： [ url, method, mockData ];
     *      url: 请求地址；
     *      method: 'get' 或 'post'
     *      mockData: 模拟数据
     * object 对象： 格式必须为：
     *  {
     *      url;
     *      method;
     *      mockData;
     *  }
     */
    _api;
    /**
     * 请求参数
     */
    _data;
    /**
     * 是否是 form-data 格式提交数据
     * 主要是在提交图片表单时有用
     * @type {boolean}
     * @private
     */
    _isFormData = false;
    /**
     * ajax异常处理
     * @type {ErrorCodeHandle}
     * @private
     */
    _ajaxErrorCodeHandle;
    /**
     * 返回结果
     * 如： {code:200, message:"Success", data : []}
     * @type Object
     */
    response = null;
    /**
     * axios 的 option 选项
     * @type Object
     * @private
     */
    _option = null;


    /**
     * 请求构造函数
     * @param api   对应属性 _api
     * @param params 请求参数
     */
    constructor(api, params = {}) {
        this._ajaxErrorCodeHandle = new ErrorCodeHandle(this);
        this._api = new AjaxUtil.Api(api);
        this._data = params;
        this._option = {
            baseURL: setting.server_domain,
            method: 'post',
            data: '',
            url: '',
            responseType: 'text',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };
    }


    static Api = class Api {
        url;
        method;
        mockData;

        constructor(api) {
            if (typeof api === "string") {
                this.url = api;
                this.method = 'get';
            } else if (api instanceof Array) {
                this.url = api[0];
                this.method = api.length > 1 ? api[1] : 'get';
                this.mockData = api.length > 2 ? api[2] : null;
            } else {
                this.url = api.url;
                this.method = api.method;
                this.mockData = api.mockData;
            }
        }
    };

    /**
     * 静态快速请求函数
     * @param api   string | array | object 对应属性 _api
     * @param params  object 请求参数
     * @param formRef Vue 表单参数
     */
    static request(api, params = {}, formRef = null) {
        let req = new AjaxUtil(api, params).setFormRef(formRef);
        return req.request();
    }

    /**
     * 静态快速请求函数
     * form-data 格式提交
     * @param api   string | array | object 对应属性 _api
     * @param params  object 请求参数
     * @param formRef Vue 表单参数
     */
    static requestFormData(api, params = {}, formRef = null) {
        let req = new AjaxUtil(api, params).setFormRef(formRef).setIsFormData();
        return req.request();
    }

    /**
     *
     * @returns {Promise<never | unknown>}
     */
    request() {
        AjaxUtil.ajaxCount++;
        this._urlFormat();
        if (setting.ajax_mock_on && this._api.mockData) {
            return this._mockDataHandler();
        }
        this._printRequest(false);
        return axios.request(this._option).then(resp => {
            return this._respHandle(resp);
        }).catch(err => {
            return Promise.reject(err);
        })
    }

    /**
     * 生成模拟数据并返回
     * @param delay integer 模拟延迟加载时间
     * @returns {Promise<unknown>}
     * @private
     */
    _mockDataHandler(delay = 1000) {
        this._printRequest(true);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this._respHandle({
                    isMockData: true,
                    status: 200,
                    data: Helper.mock(this._api.mockData)
                }).then(resp => {
                    return resolve(resp);
                }).catch(err => {
                    return reject(err);
                });
            }, delay);
        });
    }

    /**
     * 对返回 resp 进行处理
     * @param resp
     * @returns {Promise<never>|Promise<unknown>}
     * @private
     */
    _respHandle(resp) {
        if (resp.status !== 200) {
            throw resp;
        }
        try {
            let respJson = typeof resp.data === 'string' ? JSON.parse(resp.data) : resp.data;
            this.response = respJson;
            this._printResponse(resp.isMockData);
            if (respJson[this._codeKey] === this._successCode) {
                return Promise.resolve(respJson[this._dataKey]);
            } else {
                try {
                    this._ajaxErrorCodeHandle['code' + respJson[this._codeKey]]();
                } catch (ignore) {
                }
                return Promise.reject(respJson);
            }
        } catch (e) {
            return Promise.reject(e);
        }
    }

    /**
     * 打印请求
     * @param isMockData
     * @private
     */
    _printRequest(isMockData = false) {
        console.log({
            to: AjaxUtil.ajaxCount,
            api: this._api,
            params: this._data,
            option: this._option,
        });
    }

    /**
     * 返回数据
     * @param isMockData
     * @private
     */
    _printResponse(isMockData = false) {
        console.log({
            from: AjaxUtil.ajaxCount,
            api: this._api,
            params: this._data,
            option: this._option,
            response: this.response,
        });
    }

    /**
     * 设置关联表单
     * @param formRef
     */
    setFormRef(formRef = null) {
        this.formRef = formRef;
        return this;
    }

    /**
     * 设置为 form-data 形式提交
     * @param is
     * @returns {AjaxUtil}
     */
    setIsFormData(is = true) {
        this._isFormData = is;
        return this;
    }

    /**
     * url格式化
     * 检查 请求 method 是否为 get
     * 是的话将 参数 urlEncode 之后追加到 url 地址中
     * @private
     */
    _urlFormat() {
        let query = this._urlEncode((this._data));
        this._option.url = this._api.url;
        if (this._option.method === 'get') {
            this._option.url += '?' + query;
        }
        if (this._option.headers["Content-Type"] === 'application/x-www-form-urlencoded') {
            this._option.data = query;
        }
        if (this._isFormData) {
            this._option.headers['Content-Type'] = 'multipart/form-data';
            this._option.method = 'post';
            this._api.method = 'post';
            let fd = new FormData();
            for (let key in this._option.data) {
                if (!this._option.data.hasOwnProperty(key)) continue;
                let D = this._option.data[key];
                fd.append(key, D);
            }
            this._option.data = fd;
        }
    }

    /**
     * url编码
     * 将 JSON 格式转换成 key=value&key=value格式
     * 并将 value 做 url 编码
     * @param param
     * @param key
     * @returns {string}
     */
    _urlEncode(param, key) {
        let paramStr = "";
        if (typeof param === "string" || typeof param === 'number' || typeof param === 'boolean') {
            paramStr += "&" + key + "=" + encodeURIComponent(param);
        } else {
            for (let i in param) {
                let item = param[i];
                let k = key == null ? i : key + (true || param instanceof Array ? "[" + i + "]" : "." + i);
                paramStr += '&' + this._urlEncode(item, k);
            }
        }
        return paramStr.substr(1);
    }
}