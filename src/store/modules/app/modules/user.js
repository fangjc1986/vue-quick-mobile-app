import DbUtil from "../../../../utils/DbUtil";

export default {
    namespaced: true,
    state: {
        loginUser: {},
    },
    actions: {
        load({state, commit}) {
            let user = DbUtil.get('user').value();
            state.loginUser = user || {};
        }
    },
    mutations: {}
}