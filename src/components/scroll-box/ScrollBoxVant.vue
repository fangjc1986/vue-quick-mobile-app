<template>
    <div class="ScrollBoxVant pos-r overflow-h"
         style="height: 100%;"
         ref="wrapper"
    >
        <van-pull-refresh
                v-model="pullDownLoading"
                @refresh="pullDownEvent"
                :disabled="!pullDown"
                class="h100p pos-r"
                style="overflow:scroll;"
        >
            <!-- 顶部插槽 -->
            <scroll-pull-down-container slot="pulling">
                <scroll-pull-down-pulling></scroll-pull-down-pulling>
            </scroll-pull-down-container>
            <scroll-pull-down-container slot="loosing">
                <scroll-pull-down-loosing></scroll-pull-down-loosing>
            </scroll-pull-down-container>
            <scroll-pull-down-container slot="loading">
                <scroll-pull-down-loading></scroll-pull-down-loading>
            </scroll-pull-down-container>
            <!-- 顶部插槽 end -->

            <van-list
                    v-model="pullUpLoading"
                    :finished="pullUpFinished || !pullUp"
                    @load="pullUpEvent"
                    ref="list"
                    class="h100p pos-r"
                    :immediate-check="false"
                    :finished-text="pullUp? '没有更多咯...' : ''"
            >
                <div class="pos-r h100p van-clearfix">
                    <slot></slot>
                </div>
            </van-list>


        </van-pull-refresh>
        <transition name="fade-from-right-100p">
            <scroll-to-top-button
                    :pos-style="toTopPosStyle"
                    v-if="showToTop && showToTopButton "
                    @click.native="clickToTopButton"
            ></scroll-to-top-button>
        </transition>

    </div>

</template>

<script>
    import PageMixin from "../../vendor/mixin/PageMixin";
    import PaginateUtil from "../../utils/PaginateUtil";
    import ScrollToTopButton from "@/components/scroll-box/ScrollToTopButton";
    import Helper from "@/utils/Helper";
    import DebThrUtil from "@/utils/DebThrUtil";
    import ScrollPullDownContainer from "@/components/scroll-box/pull-down/ScrollPullDownContainer";
    import ScrollPullDownPulling from "@/components/scroll-box/pull-down/ScrollPullDownPulling";
    import ScrollPullDownLoosing from "@/components/scroll-box/pull-down/ScrollPullDownLoosing";
    import ScrollPullDownLoading from "@/components/scroll-box/pull-down/ScrollPullDownLoading";

    export default {
        name: "ScrollBoxVant",
        mixins: [PageMixin],
        components: {
            ScrollPullDownLoading,
            ScrollPullDownLoosing, ScrollPullDownPulling, ScrollPullDownContainer, ScrollToTopButton
        },
        props: {
            pullDown: {
                default: false,
            },
            pullUp: {
                default: false
            },
            paginate: {
                default() {
                    return new PaginateUtil()
                }
            },
            showToTop: {
                default: false,
            },
            toTopPosStyle: Object,
        },
        data() {
            return {
                pullDownLoading: false,
                pullUpLoading: false,
                pullUpFinished: false,
                lastScrollTop: 0,
                showToTopDistance: 0,
                showToTopButton: false,
            }
        },
        computed: {},
        watch: {},
        mounted() {
            this.showToTopDistance = Helper.rem2Px(15, '') * 1;
            this.$refs.list.scroller.addEventListener('scroll', this.listScroll);
        },
        created() {
            // 将自身添加到 paginate 工具中
            // 方便 paginate 调用本实例方法
            this.paginate.scrollBox = this;
        },
        destroyed() {
        },
        activated() {
            this.$nextTick(() => {
                if (this.v_route_status.isBack) {
                    // 当页面返回到此页，自动滚动到离开时的位置
                    this.$refs.list.scroller.scroll(0, this.lastScrollTop);
                }
            })
        },
        deactivated() {
            // 离开时记录当前滚动到的位置
            this.lastScrollTop = this.$refs.list.scroller.scrollTop;
        },
        methods: {
            pullDownEvent() {
                this.pullUpFinished = false;
                this.paginate.pullDownCallBack();
            },

            pullUpEvent() {
                this.paginate.setNextPage();
            },
            autoLoading() {
                this.pullDownLoading = true;
                this.pullDownEvent();
            },
            finishLoading(isNoMore = false) {
                this.pullDownLoading = false;
                this.pullUpLoading = false;
                this.pullUpFinished = isNoMore;
            },
            listScroll(e) {
                DebThrUtil.thrAndDeb(this._uid, () => {
                    this.showToTopButton = e.target.scrollTop > this.showToTopDistance
                }, 200);
            },
            /**
             * 点击回到顶部
             */
            clickToTopButton() {
                this.scrollTo(0);
            },

            /**
             * 模拟简单的 ease 效果
             * @param y
             */
            scrollTo(y = 0) {
                let c = (this.$refs.list.scroller.scrollTop - y) / 1.2;
                let top = y + c;
                if (c > 2) {
                    this.$refs.list.scroller.scroll(0, top);
                    setTimeout(() => {
                        this.scrollTo(y)
                    }, 10);
                } else {
                    this.$refs.list.scroller.scroll(0, y);
                }
            }
        },

    }
</script>

<style lang="less" scoped>
    @import "~@/assets/css/var";

    .ScrollBoxVant {
    }
</style>