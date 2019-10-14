import route_vendor from "../vendor/route_vendor";

let _import = route_vendor.import;

export default [
    {
        path: '/DemoOne',
        component: _import('demo/DemoOnePage'),
        meta: {
            title: 'DemoOne'
        }
    },
]