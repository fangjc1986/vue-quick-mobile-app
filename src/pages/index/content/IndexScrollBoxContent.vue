<template>
    <div class="IndexScrollBoxContent h100p">
        <page-layout>
            <van-nav-bar
                    title="无限滚动"
                    slot="head"
            ></van-nav-bar>
            <scroll-box-vant>
                <van-cell-group title="无限滚动">
                    <van-cell
                            title="无限滚动 Demo 演示（Vant）"
                            is-link
                            label="使用 Vant 官方 list 和 pull-refresh 组件封装"
                            @click="v_router.to('/ScrollBox/ScrollBoxVantDemoPage')"
                    ></van-cell>
                    <van-cell
                            title="无限滚动 Demo 演示（better-scroll）"
                            is-link
                            label="使用 better-scroll 组件封装"
                            @click="v_router.to('/ScrollBox/ScrollBoxBetterDemoPage')"
                    ></van-cell>
                </van-cell-group>
                <div class="pa-md color-gray-darker">
                    添加混入：ReloadMixin<br>
                    <br>

                    使用说明：<br>
                    使用组件名称：ScrollBoxVant ; <br>
                    <br>
                    属性props: <br>
                    1、pull-down : Boolean ; <br>
                    是否开启下拉刷新功能; <br>
                    2、pull-up : Boolean ; <br>
                    是否开启上拉加载功能; <br>
                    3、paginate : PaginateUtil ; <br>
                    分页工具对象； <br>
                    4、showToTop: Boolean <br>
                    是否显示回到顶部按钮 <br>
                    5、toTopPosStyle ：Object <br>
                    回到顶部样式，可指定相对底部高度： { bottom : '2rem' }, <br>
                    <br>
                    分页工具 PaginateUtil : <br>
                    使用： new PaginateUtil(下拉刷新回调函数,上拉加载回调函数, 每页数量); <br>
                    执行下拉回调将自动传参 true， 上拉回调传参 false； <br>
                    默认每页 20 条；<br>
                    <br>
                    使用案例 : <br>
                    this.paginate = new PaginateUtil(this.refreshData, this.refreshData);<br>
                    最终下拉会回调 this.refreshData(true);<br>
                    上拉回调 this.refreshData(false); <br>
                    <br>
                    进入页面自动下拉刷新: <br>
                    一般在第一次进入页面时候没有手动触发的情况下自动触发下拉刷新动画;<br>
                    this.paginate.autoLoading(); <br>

                    <br>
                    加载完毕后重置滚动插件状态：<br>
                    this.paginate.finishLoading(返回分页对象); <br>
                    返回分页对象: 服务器返回的带有 page, pageSize 的返回对象； <br>
                    如字段名称与本地定义名称不一致可在 util/PaginateUtil 中修改 convertJSON 函数和 getJSON 函数来转换字段； <br>
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
        name: "IndexScrollBoxContent",
        mixins: [],
        components: {CellGroupTitles, ScrollBoxVant, PageLayout},
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
    @import "~@/assets/css/var";

    .IndexScrollBoxContent {
    }
</style>