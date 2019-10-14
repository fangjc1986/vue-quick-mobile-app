import VueRouter from 'vue-router'
import Vue from 'vue'
import route_vendor from "../vendor/route_vendor";
import route_interceptor from "../project_config/route_interceptor";

const files = require.context('./', false, /\.js$/);
let routes = route_vendor.autoLoadingRouteJs(files);

Vue.use(VueRouter);
const router = new VueRouter({routes});

router.beforeEach((to, from, next) => {
    for (let i = 0; i < route_interceptor.length; i++) {
        if (!route_interceptor[i](to, from, next)) {
            return;
        }
    }
    next();
});

export default router;
