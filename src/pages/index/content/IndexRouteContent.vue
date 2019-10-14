<template>
    <div class="IndexRouteContent h100p">
        <page-layout>
            <van-nav-bar
                    title="首页"
                    slot="head"
            ></van-nav-bar>
            <scroll-box-vant>
                <van-cell-group title="路由">
                    <van-cell :is-link="true"
                              @click="v_router.to('/route/RouteBackParamsPage')"
                    >带参数返回
                    </van-cell>
                    <van-cell :is-link="true"
                              @click="v_router.to('/route/RouteBackParamsPage')"
                    >带参数跳转
                    </van-cell>
                </van-cell-group>
            </scroll-box-vant>
        </page-layout>
    </div>
</template>

<script>
    import PageLayout from "../../../components/layout/page-layout/PageLayout";
    import ScrollBoxVant from "../../../components/scroll-box/ScrollBoxVant";
    import ReloadMixin from "../../../vendor/mixin/ReloadMixin";

    export default {
        name: "IndexRouteContent",
        mixins: [ReloadMixin],
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
            backEvent(params) {
                this.$dialog.alert({
                    'title': 'backEvent事件',
                    'message': '收到参数：' + params
                })
            },
        },

    }
</script>

<style lang="less" scoped>
    @import "~@/assets/css/var";

    .IndexRouteContent {
    }
</style>