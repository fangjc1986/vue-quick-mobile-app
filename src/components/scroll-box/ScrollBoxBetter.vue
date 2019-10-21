<template>
    <div class="ScrollBoxBetter pos-r overflow-h"
         ref="wrapper"
         style="height: 100%;"
    >
        <div class="pos-r">
            <div class="pull-down-container pos-a"
                 style="top: 0;left: 0;right: 0;"
                 :style="pullDownStyle"
                 v-show="pullDown"
            >
                <scroll-pull-down-container ref="pullDownContainer">
                    <scroll-pull-down-loading v-show=" pullDownStatus === 2 "></scroll-pull-down-loading>
                    <scroll-pull-down-loosing v-show=" pullDownStatus === 1 "></scroll-pull-down-loosing>
                    <scroll-pull-down-pulling v-show=" pullDownStatus === 0"></scroll-pull-down-pulling>
                </scroll-pull-down-container>
            </div>
            <div class="body van-clearfix">
                <slot></slot>

            </div>
            <div class="pull-up-container flex-box flex-center-all"
                 v-show="showMore"
                 :style="pullUpStyle"
            >
                <scroll-pull-down-loading v-show="!pullUpFinished"></scroll-pull-down-loading>
                <div class="color-gray" v-show="pullUpFinished">没有更多咯...</div>
            </div>
        </div>
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
    import PaginateUtil from "@/utils/PaginateUtil";
    import Helper from "@/utils/Helper";
    import BScroll from "better-scroll";
    import DebThrUtil from "@/utils/DebThrUtil";
    import ScrollPullDownContainer from "@/components/scroll-box/pull-down/ScrollPullDownContainer";
    import ScrollPullDownLoading from "@/components/scroll-box/pull-down/ScrollPullDownLoading";
    import ScrollPullDownLoosing from "@/components/scroll-box/pull-down/ScrollPullDownLoosing";
    import ScrollPullDownPulling from "@/components/scroll-box/pull-down/ScrollPullDownPulling";
    import ScrollToTopButton from "@/components/scroll-box/ScrollToTopButton";

    export default {
        name: "ScrollBoxBetter",

        components: {
            ScrollToTopButton,
            ScrollPullDownPulling, ScrollPullDownLoosing, ScrollPullDownLoading, ScrollPullDownContainer
        },
        props: {
            pullDown: {
                default: false,
            },
            pullUp: {
                default: false,
            },
            paginate: {
                default() {
                    return new PaginateUtil()
                }
            },
            bounce: {
                default: true,
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
                scroll: null,
                // 0: 默认状态 , 1: 超过阀值提示 , 2: 正在加载 , 3: 加载完成
                pullDownStatus: 0,
                // better-scroll配置
                options: {
                    pullDownRefresh: this.pullDown ? {
                        threshold: 50,
                        stop: 50,
                    } : false,
                    pullUpLoad: this.pullUp ? {threshold: Helper.px2Px(40, '') * 1} : false,
                    probeType: 1,
                    scrollX: false,
                    bounce: this.bounce ? {
                        top: true,
                        bottom: true,
                        left: true,
                        right: true
                    } : false,
                    click: true,
                    tap: true,
                    swipeBounceTime: 100,
                    //deceleration: 0.002,
                },
            }
        },
        created() {
            // 将自身添加到 paginate 工具中
            // 方便 paginate 调用本实例方法
            this.paginate.scrollBox = this;
        },
        mounted() {
            this.showToTopDistance = Helper.rem2Px(15, '') * 1;
            this.$refs.wrapper.addEventListener('scroll', this.listScroll);
            if (this.pullDown) {
                this.options.pullDownRefresh.threshold = this.$refs.pullDownContainer.$el.offsetHeight;
                this.options.pullDownRefresh.stop = this.options.pullDownRefresh.threshold;
            }
            this.initScroll();
        },
        activated() {
            if (this.scroll) {
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            }
        },
        methods: {
            reload() {

            },
            /**
             * 初始化 better-scroll 实例
             * 初始化 better-scroll 监听事件
             */
            initScroll() {
                // 实例化 better-scroll 对象
                this.scroll = new BScroll(this.$refs.wrapper, this.options);

                // 下拉滚动事件
                this.scroll.on('scroll', (pos) => {
                    if (!this.pullDownLoading) {
                        this.pullDownStatus = this.scroll.y >= this.options.pullDownRefresh.threshold ? 1 : 0;
                    }
                    this.listScroll();
                    this.$emit('scroll-y', this.scroll.y);
                });

                // 上拉事件
                if (this.pullUp) {
                    this.scroll.on('pullingUp', () => {
                        if (this.pullUpFinished) {
                            return this.scroll.finishPullUp();
                        }
                        this.paginate.setNextPage();
                    });
                }
                // 顶部下拉事件
                if (this.pullDown) {
                    this.scroll.on('pullingDown', () => {
                        this.pullUpFinished = false;
                        this.pullDownLoading = true;
                        this.pullDownStatus = 2;
                        this.paginate.pullDownCallBack();
                    })
                }

                // 是否派发列表滚动开始的事件
                this.scroll.on('beforeScrollStart', () => {
                    this.pullDownLoading = false;
                })
            },
            /**
             * 开始自动加载
             */
            autoLoading() {
                if (this.pullDown) {
                    this.scrollTo(0, 0);
                    setTimeout(() => {
                        this.scrollTo(this.options.pullDownRefresh.threshold);
                        this.scroll.autoPullDownRefresh();
                    }, 10);
                }
            },
            /**
             *  滚动事件
             *  主要处理是否需要显示按钮
             */
            listScroll() {
                DebThrUtil.thrAndDeb(this._uid + 'listScroll', () => {
                    this.showToTopButton = Math.abs(this.scroll.y) > this.showToTopDistance;
                }, 200);
            },
            finishLoading(isFinished = false) {
                this.pullDownStatus = 3;
                this.pullUpFinished = isFinished;
                this.pullDownLoading = false;
                this.pullUpLoading = false;
                this.scroll.finishPullDown();
                this.scroll.finishPullUp();
                this.scroll.refresh();
            },
            /**
             * 点击回到顶部
             */
            clickToTopButton() {
                this.scrollTo(0);
            },
            scrollTo(y, t = 400) {
                // 代理better-scroll的scrollTo方法
                this.scroll && this.scroll.scrollTo(0, y, t);
            },
        },
        watch: {},
        computed: {
            showMore() {
                if (!this.scroll || !this.pullUp) return false;
                return Math.abs(this.scroll.maxScrollY) > this.options.pullUpLoad.threshold;
            },
            pullDownStyle() {
                return {
                    height: this.options.pullDownRefresh.threshold + 'px',
                    top: -this.options.pullDownRefresh.threshold + 'px',
                }
            },
            pullUpStyle() {
                return {
                    height: this.options.pullUpLoad.threshold + 'px',
                }
            },
        },

    }
</script>

<style lang="less" scoped>

    .ScrollBoxBetter {
    }
</style>