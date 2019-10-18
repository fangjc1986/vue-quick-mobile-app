<template>
    <div class="IndexPageLayoutContent">
        <page-layout>
            <van-nav-bar
                    @click-left="v_router.back()"
                    title="整体布局组件"
                    slot="head"
            ></van-nav-bar>
            <scroll-box-vant>
                <van-cell-group title="页面布局">
                    <van-cell
                            title="整体布局Demo"
                            is-link
                            @click="v_router.to('/layout/LayoutDemoPage')"
                    ></van-cell>
                </van-cell-group>

                <div class="color-gray-darker pa-md">
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
                    head 和 foot 使用 shrink: 0 （不会缩小）；<br>
                    <br>
                    在没有添加 head 和 foot 插槽的情况下，将不会渲染 对应的 head、foot容器元素；<br>
                </div>
            </scroll-box-vant>
        </page-layout>
    </div>
</template>

<script>
    import PageLayout from "@/components/layout/page-layout/PageLayout";
    import ScrollBoxVant from "@/components/scroll-box/ScrollBoxVant";

    export default {
        name: "IndexPageLayoutContent",
        mixins: [],
        components: {ScrollBoxVant, PageLayout},
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

    .IndexPageLayoutContent {
    }
</style>