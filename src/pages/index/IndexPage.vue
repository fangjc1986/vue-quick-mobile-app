<template>
    <div class="IndexPage">
        <page-layout>

            <van-tabbar
                    :fixed="false"
                    v-model="active"
                    slot="foot"
            >
                <van-tabbar-item icon="home-o">路由</van-tabbar-item>
                <van-tabbar-item icon="todo-list-o">无限滚动</van-tabbar-item>
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
    import IndexScrollBoxContent from "./content/IndexScrollBoxContent";
    import Helper from "@/utils/Helper";

    const Models = {};

    const Cst = {
        components: [IndexRouteContent, IndexScrollBoxContent]
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
        // 进入页面获取缓存中的 active 值
        activated() {
            this.active = Helper.DB.get('index.active').value() || 0;
        },
        methods: {
            reload() {
            },
        },
        watch: {
            // active 变更后保存到缓存
            // 防止在下一页刷新后返回此处默认变为 active = 0 的情况；
            active(v) {
                Helper.DB.set('index.active', v).write();
            }
        },
        computed: {},

    }
</script>

<style lang="less" scoped>

    .IndexPage {
    }
</style>