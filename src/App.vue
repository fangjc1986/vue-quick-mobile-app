<template>
    <div id="app">
        <transition :name="$store.state.app.animate.pageAnimateClass">
            <keep-alive>
                <router-view class="page-view"></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>

    import IndexPage from "./pages/index/IndexPage";
    import {mapState} from "vuex";

    export default {
        name: 'app',
        components: {
            IndexPage,
        },
        props: {},

        data() {
            return {}
        },

        computed: {},

        watch: {},

        created() {
        },

        mounted() {
        },

        destroyed() {
        },

        methods: {}
    }
</script>

<style lang="less">
    @import "~@/assets/css/common";
    @import "~@/assets/css/animate";
    @import "~@/assets/css/reset";
</style>
