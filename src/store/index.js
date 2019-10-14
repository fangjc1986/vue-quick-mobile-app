import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import route_vendor from "../vendor/route_vendor";
import store from "@vue/cli-service/generator/vuex/template/src/store";
import store_vendor from "../vendor/store_vendor";

Vue.use(Vuex);

let vueStore = new Vuex.Store({
    modules: {
        app
    }
});

store_vendor.store =  vueStore;

export default vueStore;
