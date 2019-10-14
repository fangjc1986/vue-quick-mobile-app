export default {
    namespaced: true,
    state: {
        pageAnimateClass: '',
    },
    actions: {},
    mutations: {
        setPageAnimateClass(state, animateClass = '') {
            state.pageAnimateClass = animateClass;
        }
    }
}