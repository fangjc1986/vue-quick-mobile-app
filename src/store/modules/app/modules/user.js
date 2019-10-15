import Helper from "@/utils/Helper";

export default {
    namespaced: true,
    state: {
        loginUser: {},
    },
    actions: {
        load({state, commit}) {
            let user = Helper.DB.get('user').value();
            state.loginUser = user || {};
        }
    },
    mutations: {}
}