import './vendor/app_init_handler'
import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant'
import 'vant/lib/index.less';
import VueMixin from "./vendor/mixin/VueMixin"
import router from './router'
import store from './store'
import store_vendor from "./vendor/store_vendor";
import route_vendor from "./vendor/route_vendor";

Vue.use(Vant);
Vue.mixin(VueMixin);

Vue.config.productionTip = false;


new Vue({
    router,
    store,
    render: h => h(App),
    created() {
        store_vendor.store = this.$store;
        route_vendor.router = this.$router;
    }
}).$mount('#app');
