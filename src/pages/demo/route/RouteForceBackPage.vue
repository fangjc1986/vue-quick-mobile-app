<template>
    <div class="RouteForceBackPage">
        <page-layout>
            <van-nav-bar
                    title="带参数跳转"
                    :left-arrow="true"
                    @click-left="v_router.back()"
            ></van-nav-bar>
            <scroll-box-vant>
                <cell-group-titles>跳转</cell-group-titles>
                <van-cell
                        title="跳转下一页"
                        is-link
                        @click="v_router.to('/route/RouteBackParamsPage')"
                ></van-cell>
                <van-cell
                        title="是否重置返回事件"
                >
                    <van-switch v-model="p_force_back_reset_route" size="24px"></van-switch>
                </van-cell>
            </scroll-box-vant>
        </page-layout>
    </div>
</template>

<script>
    import PageLayout from "../../../components/layout/page-layout/PageLayout";
    import ScrollBoxVant from "../../../components/scroll-box/ScrollBoxVant";
    import CellGroupTitles from "../../../components/titles/CellGroupTitles";
    import ReloadMixin from "../../../vendor/mixin/ReloadMixin";

    export default {
        name: "RouteForceBackPage",
        mixins: [ReloadMixin],
        components: {CellGroupTitles, ScrollBoxVant, PageLayout},
        props: {},
        data() {
            return {
                p_force_back: true,
                p_force_back_reset_route: false,
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

    .RouteForceBackPage {
    }
</style>