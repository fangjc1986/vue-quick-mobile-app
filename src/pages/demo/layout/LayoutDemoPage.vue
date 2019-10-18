<template>
    <div class="LayoutDemoPage">
        <page-layout>
            <van-nav-bar
                    left-arrow
                    @click-left="v_router.back()"
                    title="head 插槽"
                    slot="head"
                    style="background-color:#839fff;"
            ></van-nav-bar>
            <div class="flex-box flex-center-all bg-primary"
                 slot="foot"
                style="height: 2rem;"
            >foot 插槽</div>
            <scroll-box-better
                class="bg-gray-light"
            >
                <div class="ma-md">
                    默认插槽 <br>
                    <br>
                    PageLayout 组件：<br>
                    <br>
                    slots 插槽: <br>
                    head : 头部插槽，用户顶部导航; <br>
                    default 默认 ： 可直接使用 ScrollBoxVant 或 ScrollBoxBetter ； <br>
                    foot : 底部导航； <br>
                    <br>
                    整个布局使用 flex 纵向布局， 其中 default 插槽容器为 grow:1 （自动填满剩余高度） ；<br>
                    head 和 foot 使用 shrink: 0 （不会缩小）
                </div>
            </scroll-box-better>
        </page-layout>
    </div>
</template>

<script>
    import PageLayout from "@/components/layout/page-layout/PageLayout";
    import ScrollBoxVant from "@/components/scroll-box/ScrollBoxVant";
    import ScrollBoxBetter from "@/components/scroll-box/ScrollBoxBetter";
    import ReloadMixin from "@/vendor/mixin/ReloadMixin";

    export default {
        name: "LayoutDemoPage",
        mixins: [ReloadMixin],
        components: {ScrollBoxBetter, ScrollBoxVant, PageLayout},
        props: {},
        data() {
            return {}
        },
        computed: {},
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
    @import (reference) "~@/assets/css/var";

    .LayoutDemoPage {
    }
</style>