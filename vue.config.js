const path = require('path');
const postcssPlugin = require('./postcss.config');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: "./",
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    // 使用Vant自定义主题样式
                    'hack': `true; @import "${resolve('src/assets/css/vant-theme.less')}";`
                }
            },
            postcss: {
                plugins: [
                    postcssPlugin
                ]
            }
        },
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
    },
};
