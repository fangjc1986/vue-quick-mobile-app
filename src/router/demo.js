import route_vendor from "../vendor/route_vendor";

let _import = route_vendor.import;

export default [

    // 路由功能页面
    {
        path: '/route/RouteBackParamsPage',
        component: _import('demo/route/RouteBackParamsPage.vue'),
        meta: {
            title: '返回传参'
        }
    },
    {
        path: '/route/RouteQueryParamsPage',
        component: _import('demo/route/RouteQueryParamsPage.vue'),
        meta: {
            title: '跳转传参'
        }
    },
    {
        path: '/route/RouteForceBackPage',
        component: _import('demo/route/RouteForceBackPage.vue'),
        meta: {
            title: '强制返回跳过'
        }
    },
    // 无限滚动页面
    {
        path: '/scrollBox/ScrollBoxVantDemoPage',
        component: _import('demo/scroll-box/ScrollBoxVantDemoPage.vue'),
        meta: {
            title: '无限滚动演示（vant）'
        }
    },
    {
        path: '/scrollBox/ScrollBoxBetterDemoPage',
        component: _import('demo/scroll-box/ScrollBoxBetterDemoPage.vue'),
        meta: {
            title: '无限滚动演示（better-scroll）'
        }
    },


]