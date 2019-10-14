<template>
    <div class="RouteBackParams">
        <page-layout>
            <van-nav-bar
                    :left-arrow="true"
                    slot="head"
                    title="带参数返回并执行函数"
                    @click-left="v_router.back()"
            ></van-nav-bar>
            <scroll-box-vant>
                <cell-group-titles>返回文本信息到上一页</cell-group-titles>
                <van-field v-model="demo1" placeholder="请输入返回信息">
                    <van-button
                            slot="button" size="small" type="primary"
                            @click="v_router.backEvent(demo1)"
                    >返回执行默认backEvent事件
                    </van-button>
                </van-field>
            </scroll-box-vant>
        </page-layout>
    </div>
</template>

<script>
    import PageLayout from "../../../components/layout/page-layout/PageLayout";
    import ScrollBoxVant from "../../../components/scroll-box/ScrollBoxVant";
    import CellGroupTitles from "../../../components/titles/CellGroupTitles";

    export default {
        name: "RouteBackParams",
        mixins: [],
        components: {CellGroupTitles, ScrollBoxVant, PageLayout},
        props: {},
        data() {
            return {
                demo1: ''
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