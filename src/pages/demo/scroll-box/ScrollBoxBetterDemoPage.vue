<template>
    <div class="ScrollBoxBetterDemoPage">
        <page-layout>
            <van-nav-bar
                    title="无限滚动Demo(better-scroll)"
                    slot="head"
                    left-arrow
                    @click-left="v_router.back()"
            ></van-nav-bar>
            <scroll-box-better
                    :pull-down="true"
                    :pull-up="true"
                    :paginate="paginate"
                    :show-to-top="true"
            >
                <van-cell
                        v-for="(item,i) in data"
                        :key="item.id"
                        :title="`姓名：${item.userName} (${item.age}岁) [index：${i}]`"
                        label="点击链接跳转到下一页，返回看看是否依然停留在这个位置 :)"
                        @click="v_router.to('/route/RouteBackParamsPage')"
                ></van-cell>
            </scroll-box-better>
        </page-layout>
    </div>
</template>

<script>
    import PageLayout from "../../../components/layout/page-layout/PageLayout";
    import ScrollBoxVant from "../../../components/scroll-box/ScrollBoxVant";
    import PaginateUtil from "../../../utils/PaginateUtil";
    import Helper from "../../../utils/Helper";
    import ReloadMixin from "../../../vendor/mixin/ReloadMixin";
    import ScrollBoxBetter from "@/components/scroll-box/ScrollBoxBetter";

    export default {
        name: "ScrollBoxBetterDemoPage",
        mixins: [ReloadMixin],
        components: {ScrollBoxBetter, ScrollBoxVant, PageLayout},
        props: {},
        data() {
            return {
                data: [],
                paginate: new PaginateUtil(this.refreshData, this.refreshData, 15),
                r_force_reload: false,
                i: 0,
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
            /**
             * ReloadMixin 中将自动判断是否执行 reload
             * 由于使用了keep-alive，mounted 和 create 函数只会被执行一次，
             * 之后再次跳转到 此页面将不会执行 mounted 和 create 函数
             * 因此业务代码都应该放在 reload 函数中
             * 返回到此页，默认不执行 reload 函数，
             * 如要强制任何情况下均执行 reload ,可设置 r_force_reload = true (默认false)
             */
            reload() {
                /**
                 * 执行 paginate 分页工具中的 自动刷新方法
                 * 由于 实例化 paginate 时候已经传递了 下拉和上啦方法
                 * 因此将会自动执行 refreshData(true)
                 * 下拉刷新会自动传参 true，上拉加载会自动传参 false
                 */
                this.paginate.autoLoading();
            },

            /**
             * 获取服务器数据
             * paginate 回调执行此函数
             * 下拉刷新会自动传参 true ，上拉加载传参 false
             * @param refresh true:下拉刷新；false：上拉加载
             */
            refreshData(refresh = false) {
                if (refresh) this.i = 0;
                this.ajax('url', {
                    ...this.paginate.getJSON(),
                    // TODO 填写其他参数信息
                }).then(resp => {
                    // 下拉刷新则覆盖原data，上拉加载则拼接到原data之后
                    this.data = refresh ? resp.list : this.data.concat(resp.list);
                    // 完成加载（自动判断是否还有下一页数据）
                    this.paginate.finishLoading(resp);
                }).catch(() => this.paginate.finishLoading())
            },

            /**
             * 模拟 ajax 请求
             * @param url
             * @param params
             * @returns {Promise<unknown>}
             */
            ajax(url, params) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        let m = {
                            'page': params.page,
                            'pageSize': params.pageSize,
                        };
                        // 第三次之后获取数据 为10条
                        let n = this.i++ >= 2 ? 10 : 15;
                        m[`list|${n}`] = [{
                            'id': "@string('lower',20)",
                            'userName': "@cname()",
                            'age': "@integer(18,50)"
                        }];
                        // 使用 mockjs 生成模拟数据
                        return resolve(Helper.mock(m));
                    }, 1000);
                });
            }
        },

    }
</script>

<style lang="less" scoped>
    @import "~@/assets/css/var";

    .ScrollBoxBetterDemoPage {
    }
</style>