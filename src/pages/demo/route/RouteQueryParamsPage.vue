<template>
    <div class="RouteQueryParamsPage">
        <page-layout>
            <van-nav-bar
                    title="带参数跳转"
                    :left-arrow="true"
                    @click-left="v_router.back()"
            ></van-nav-bar>
            <scroll-box-vant>
                <cell-group-titles>收到参数：</cell-group-titles>
                <div class="pa-md">{{ params }}</div>
            </scroll-box-vant>
        </page-layout>
    </div>
</template>

<script>
    import PageLayout from "../../../components/layout/page-layout/PageLayout";
    import ScrollBoxVant from "../../../components/scroll-box/ScrollBoxVant";
    import CellGroupTitles from "../../../components/titles/CellGroupTitles";

    export default {
        name: "RouteQueryParamsPage",
        mixins: [],
        components: {CellGroupTitles, ScrollBoxVant, PageLayout},
        props: {},
        data() {
            return {}
        },
        computed: {
            params() {
                return JSON.stringify(this.$route.query);
            }
        },
        watch: {},
        mounted() {
        },
        created() {
        },
        destroyed() {
        },
        methods: {
            reload() {
            },
        },

    }
</script>

<style lang="less" scoped>
    @import "~@/assets/css/var";

    .RouteQueryParamsPage {
    }
</style>