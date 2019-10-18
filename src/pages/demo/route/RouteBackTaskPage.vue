<template>
    <div class="RouteBackTaskPage">
        <page-layout>
            <van-nav-bar
                    title="返回代办事项"
                    slot="head"
                    left-arrow
                    @click-left="v_router.back()"
            ></van-nav-bar>
            <scroll-box-better>
                <div class="pa-md">

                    <van-button
                            type="primary"
                            @click="demo0"
                    >测试demo0 返回
                    </van-button>
                    <div class="pt-md pb-md">
                        demo0: 没有设置代办的情况下，点击按钮后点击浏览器返回；
                    </div>

                    <van-button
                            type="primary"
                            @click="demo1"
                    >测试demo1 返回
                    </van-button>
                    <div class="pt-md pb-md">
                        demo1: 点击出现弹窗，点击浏览器返回后，弹窗将自动关闭；
                    </div>


                    <van-button
                            class=""
                            type="primary"
                            @click="demo2Add"
                    >手动添加代办
                    </van-button>
                    =>
                    <van-button
                            type="primary"
                            @click="demo2"
                    >点击返回
                    </van-button>
                    <div class="pt-md pb-md">
                        demo2: 手动设置代办事件 <br>
                        这里是为了演示在手机 native.js 环境下的效果 <br>
                        一般情况下 代办事件不应该为弹出对话框，而恰恰应该是关闭对话框； <br> <br>
                        代办事项uuid列表：{{ demo2TaskName }}
                    </div>
                </div>
            </scroll-box-better>
        </page-layout>
    </div>
</template>

<script>
    import PageLayout from "@/components/layout/page-layout/PageLayout";
    import ScrollBoxVant from "@/components/scroll-box/ScrollBoxVant";
    import DialogUtil from "@/utils/DialogUtil";
    import BackTaskListUtil from "@/utils/BackTaskListUtil";
    import ReloadMixin from "@/vendor/mixin/ReloadMixin";
    import ScrollBoxBetter from "@/components/scroll-box/ScrollBoxBetter";

    export default {
        name: "RouteBackTaskPage",
        mixins: [ReloadMixin],
        components: {ScrollBoxBetter, ScrollBoxVant, PageLayout},
        props: {},
        data() {
            return {
                taskIndex: 0,
                demo2TaskName: [],
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
                this.demo2TaskName = BackTaskListUtil.taskList.map(x => x.uuid);
            },
            demo0() {
                this.$dialog.alert({
                    title: 'demo0提示',
                    message: '浏览器返回我不会消失哦',
                });
            },
            demo1() {
                /**
                 * 此Dialog函数封装了 代办事项
                 * 直接调用即可
                 */
                DialogUtil.alert({
                    title: 'demo1提示',
                    message: '浏览器返回我会消失哦'
                }).then(() => {
                    // TODO
                })
            },
            /**
             * 添加代办事件
             * 这里是为了演示在手机 native.js 环境下的效果
             * 一般情况下 代办事件不应该为弹出对话框，而恰恰应该是关闭对话框；
             */
            demo2Add() {
                let index = this.taskIndex++;
                BackTaskListUtil.pushTask(() => {
                    DialogUtil.alert({
                        title: '执行待办事项',
                        message: `代办事项${index}`
                    });
                });
                this.demo2TaskName = BackTaskListUtil.taskList.map(x => x.uuid);
            },
            /**
             * 执行返回事件，
             * 在手机浏览器端由于无法拦截返回按钮，因此会直接完成所有代办
             * 在手机APP端（native.js有效）的情况下，将监听 返回按钮 并以此完成代办事件
             * demo2 只是为了演示在手机上的效果，在 native.js 中只需直接调用 $v_router.back()即可，无需再做其他处理
             */
            demo2() {
                if (!BackTaskListUtil.runLastTask()) {
                    this.$v_router.back();
                }
                this.demo2TaskName = BackTaskListUtil.taskList.map(x => x.uuid);
            }
        },

    }
</script>

<style lang="less" scoped>
    @import (reference) "~@/assets/css/var";

    .RouteBackTaskPage {
    }
</style>