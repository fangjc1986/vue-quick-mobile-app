import route_vendor from "../vendor/route_vendor";

let _import = route_vendor.import;

export default [
    {
        path: '/route/RouteBackParamsPage',
        component: _import('demo/route/RouteBackParamsPage.vue'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/route/RouteQueryParamsPage',
        component: _import('demo/route/RouteQueryParamsPage.vue'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/route/RouteForceBackPage',
        component: _import('demo/route/RouteForceBackPage.vue'),
        meta: {
            title: '首页'
        }
    },
]