import route_vendor from "../vendor/route_vendor";

let _import = route_vendor.import;

export default [
    {
        path: '/',
        component: _import('index/IndexPage.vue'),
        meta: {
            title: '首页'
        }
    },

]
