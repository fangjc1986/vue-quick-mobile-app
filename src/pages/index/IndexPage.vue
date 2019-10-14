<template>
    <div class="IndexPage">
        <page-layout>

            <van-tabbar
                    :fixed="false"
                    v-model="active"
                    slot="foot"
            >
                <van-tabbar-item icon="home-o">路由</van-tabbar-item>
                <van-tabbar-item icon="search">标签</van-tabbar-item>
                <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
                <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
            </van-tabbar>

            <keep-alive>
                <component :is="cst.components[active]"></component>
            </keep-alive>
        </page-layout>
    </div>
</template>

<script>
    import PageLayout from "../../components/layout/page-layout/PageLayout";
    import ScrollBoxVant from "../../components/scroll-box/ScrollBoxVant";
    import IndexRouteContent from "./content/IndexRouteContent";

    const Models = {};

    const Cst = {
        components: [IndexRouteContent]
    };

    export default {
        name: "IndexPage",
        components: {ScrollBoxVant, PageLayout},
        props: {},
        data() {
            return {
                active: 0,
                cst: Cst,
            }
        },
        mounted() {
        },
        methods: {
            reload() {
            },
        },
        watch: {},
        computed: {},

    }
</script>

<style lang="less" scoped>

    .IndexPage {
    }
</style>