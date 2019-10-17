const setting = {
    // 屏幕宽度分辨率与全局字体大小比例
    dpi_font_rate: 37.5 / 375,
    // 包参数
    package: require("../package"),
    // 跳转过度动画
    // slide: 单边平移， slide-all: 整体平移
    page_animate_class: 'slide',
    // ajax 是否允许模拟数据
    ajax_mock_on: process.env.NODE_ENV !== 'production',
    // 服务器地址
    server_domain: 'https://stemoscope.fangjc1986.com/' ,
};

export default setting;