<template>
    <div class="ScrollBoxVant h100p pos-r" style="overflow: scroll">
        <van-pull-refresh
                v-model="pullDownLoading"
                @refresh="pullDownEvent"
                :disabled="!pullDown"
        >
            <van-list
                    v-model="pullUpLoading"
                    :finished="pullUpFinished || !pullUp"
                    @load="pullUpEvent"
                    ref="list"
            >
                <slot></slot>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
    import PageMixin from "../../vendor/mixin/PageMixin";
    import PaginateUtil from "../../utils/PaginateUtil";

    export default {
        name: "ScrollBoxVant",
        mixins: [PageMixin],
        components: {},
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
            }
        },
        data() {
            return {
                pullDownLoading: false,
                pullUpLoading: false,
                pullUpFinished: false,
                lastScrollTop: 0,
            }
        },
        computed: {},
        watch: {},
        mounted() {},
        created() {
            this.paginate.scrollBox = this;
        },
        destroyed() {
        },
        activated() {
            this.$nextTick(() => {
                if (this.v_route_status.isBack) {
                    this.$refs.list.scroller.scrollTo(0, this.lastScrollTop);
                }
            })
        },
        deactivated() {
            this.lastScrollTop = this.$refs.list.scroller.scrollTop;
        },
        methods: {
            pullDownEvent() {
                this.paginate.pullDownCallBack();
            },

            pullUpEvent() {
                this.paginate.pullUpCallBack();
            },
            autoLoading() {
                this.pullDownLoading = true;
                this.pullDownEvent();
            }
        },

    }
</script>

<style lang="less" scoped>
    @import "~@/assets/css/var";

    .ScrollBoxVant {
    }
</style>