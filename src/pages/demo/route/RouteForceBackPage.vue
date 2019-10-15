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
                        label="从下一页返回后不会显示此页面（直接跳转到上一个页面）"
                        is-link
                        @click="v_router.to('/route/RouteBackParamsPage')"
                ></van-cell>
                <van-cell
                        title="是否重置返回事件"
                        label="有时候返回是带有事件的，可以在返回路过此页的时候重置返回事件为空"
                >
                    <van-switch v-model="p_force_back_reset_route" size="24px"></van-switch>
                </van-cell>
                <div class="pa-md color-gray-darker">
                    配置参数： <br>
                    返回跳过本页： p_force_back = true (默认false) <br>
                    返回重置事件： p_force_back_reset_route = true (默认false) <br>
                </div>
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