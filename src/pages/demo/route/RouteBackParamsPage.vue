<template>
    <div class="RouteBackParams">
        <page-layout>
            <van-nav-bar
                    :left-arrow="true"
                    slot="head"
                    title="带参数返回并执行函数"
                    @click-left="v_router.back()"
            ></van-nav-bar>
            <scroll-box-better>
                <cell-group-titles>返回文本信息到上一页</cell-group-titles>
                <van-field v-model="demo1" placeholder="请输入返回信息">
                    <van-button
                            slot="button" size="small" type="primary"
                            @click="v_router.backEvent(demo1)"
                    >返回执行默认backEvent事件
                    </van-button>

                </van-field>
                <van-field v-model="demo2" placeholder="请输入返回信息">
                    <van-button
                            slot="button" size="small" type="primary"
                            @click="v_router.backEvent(demo2,'customEvent')"
                    >返回执行customEvent事件
                    </van-button>

                </van-field>

                <div class="pa-md color-gray-darker">

                    返回传参一般使用在选择页面上，比如选择收货地址等。 <br>
                    <br>
                    返回按钮事件：<br>
                    调用 this.v_router.backEvent(返回参数，事件名称，是否重置其他参数); <br>
                    <br>
                    返回参数：可以是任意形式； <br>
                    事件名称：返回到上一页的 method 中的方法名；<br>
                    是否重置参数：是否将除了本次设置以外的其他返回路由参数重置；（默认不重置）；<br>
                </div>
            </scroll-box-better>
        </page-layout>
    </div>
</template>

<script>
    import PageLayout from "../../../components/layout/page-layout/PageLayout";
    import ScrollBoxVant from "../../../components/scroll-box/ScrollBoxVant";
    import CellGroupTitles from "../../../components/titles/CellGroupTitles";
    import ScrollBoxBetter from "@/components/scroll-box/ScrollBoxBetter";

    export default {
        name: "RouteBackParams",
        mixins: [],
        components: {ScrollBoxBetter, CellGroupTitles, ScrollBoxVant, PageLayout},
        props: {},
        data() {
            return {
                demo1: '',
                demo2: '',
            }
        },
        computed: {},
        watch: {},
        mounted() {
        },
        created() {
        },
        destroyed() {
        },
        activated() {
            this.demo1 = '';
        },
        methods: {
            reload() {
            },
        },

    }
</script>

<style lang="less" scoped>
    @import "~@/assets/css/var";

    .RouteBackParams {
    }
</style>