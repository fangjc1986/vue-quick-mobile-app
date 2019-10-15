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
                <div class="pa-md color-gray-darker">
                    说明： <br>
                    页面跳转传参使用 vue-router 自带的push方法； <br>
                    快捷使用：v_router.to(页面地址, 传递参数) <br>
                    <br>
                    页面地址：使用 route 中定义的path地址(如：'/IndexPage');<br>
                    传递参数：必须使用 object 类型（如：{id: 1, name:"哈哈"} <br>
                </div>
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