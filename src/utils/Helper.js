import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import setting from "../setting";

const Mock = require('mockjs');

const adapter = new LocalStorage(`${setting.package.name}-${setting.package.version}`);
let db = low(adapter);

export default {

    /**
     * mockjs 快速模拟数据
     * @param data
     * @returns {{valid, XHR, RE, _mocked, Random, toJSONSchema, Handler, setup, Util, heredoc}}
     */
    mock(data) {
        return Mock.mock(data);
    },

    /**
     * lowdb 数据库
     * 用户方便缓存本地数据
     */
    DB: db,

    /**
     * px 转换为对应尺寸的 rem
     * @param px
     * @param suffix
     * @returns {string}
     */
    px2Rem(px, suffix = 'rem') {
        return px / (document.documentElement.clientWidth * setting.dpi_font_rate) + suffix;
    },
    /**
     * rem 转换为对应尺寸的 px
     * @param rem
     * @param suffix
     * @returns {string}
     */
    rem2Px(rem, suffix = 'px') {
        return rem * (document.documentElement.clientWidth * setting.dpi_font_rate) + suffix;
    }

}