<template>
    <div class="IndexRouteContent wh100p overflow-h">
        <page-layout>
            <van-nav-bar
                    title="首页"
                    slot="head"
            ></van-nav-bar>
            <scroll-box-better>
                <van-cell-group title="路由">
                    <van-cell :is-link="true"
                              @click="v_router.to('/route/RouteBackParamsPage')"
                    >带参数返回
                    </van-cell>
                    <van-cell :is-link="true"
                              @click="v_router.to('/route/RouteQueryParamsPage', demo1)"
                    >带参数跳转
                    </van-cell>
                    <van-cell :is-link="true"
                              @click="v_router.to('/route/RouteForceBackPage', demo1)"
                    >返回不显示（返回载入后强制再次返回）
                    </van-cell>
                    <van-cell :is-link="true"
                              @click="v_router.to('/route/RouteBackTaskPage')"
                    >返回处理代办事项
                    </van-cell>
                </van-cell-group>

                <div class="pa-md color-gray-darker">
                    使用： <br>
                    1、this.v_router.to(页面地址，传递参数)； <br>
                    2、this.$v_router.to(页面地址，传递参数)； <br>
                    <br>
                    事实上this.v_router 和 this.$v_router是同一个对象；由于在新版本 webStorm 中，注册在 Vue 原型链上的 $v_router 无法在 @click 中
                    自动提示，顾增加了v_router的全局混入！<br>
                    如不需要 v_router 混入 可在 vender/minxin/VueMixin 中删除混入；<br>
                    <br>
                    <span class="color-danger">this.v_router 和 this.$v_router 均指向 RouteUtil；</span> <br>
                    <br>

                    页面跳转工具： <br>
                    工具所在位置：util/RouteUtil； <br>
                    RouteUtil方法：<br>
                    1、push( String | Object route,[Object 传递参数]) ： <br>
                    自动判断 route 类型，string：作为route中的path跳转，或者直接传递 {path:'', query: {}}格式对象; <br>
                    2、to( String | Object route, [Object 传递参数]) ： <br>
                    正常跳转到某个页面；<br>
                    3、back(): <br>
                    返回到上一个页面 <br>
                    4、backRefresh(): <br>
                    返回到上一个页面并执行上一个页面的 reload 函数； <br>
                    5、backEvent( params, [ String eventName , Boolean resetOther]): <br>
                    返回上一页并执行上一页的指定事件；<br>
                    params : 指定事件的参数; <br>
                    eventName: 上一页 method 中的方法名；不填写则默认（true），将执行名称为 backEvent 函数；<br>
                    resetOther: 是否重置其他的返回选项;<br>

                </div>
            </scroll-box-better>
        </page-layout>
    </div>
</template>

<script>
    import PageLayout from "../../../components/layout/page-layout/PageLayout";
    import ScrollBoxVant from "../../../components/scroll-box/ScrollBoxVant";
    import ReloadMixin from "../../../vendor/mixin/ReloadMixin";
    import ScrollBoxBetter from "@/components/scroll-box/ScrollBoxBetter";

    export default {
        name: "IndexRouteContent",
        mixins: [ReloadMixin],
        components: {ScrollBoxBetter, ScrollBoxVant, PageLayout},
        props: {},
        data() {
            return {
                demo1: {
                    'id': 123,
                    'name': '哈哈'
                }
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
            backEvent(params) {
                this.$dialog.alert({
                    'title': 'backEvent事件',
                    'message': '收到参数：' + params
                })
            },
            customEvent(params) {
                this.$dialog.alert({
                    'title': 'customEvent事件',
                    'message': '收到参数：' + params
                })
            }
        },

    }
</script>

<style lang="less" scoped>
    @import "~@/assets/css/var";

    .IndexRouteContent {
    }
</style>