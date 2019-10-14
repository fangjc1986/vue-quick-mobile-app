module.exports = require('postcss-pxtorem')({
    rootValue: 37.5, // 换算的基数
    selectorBlackList: [], // 忽略转换正则匹配项
    propList: ['*'],
});