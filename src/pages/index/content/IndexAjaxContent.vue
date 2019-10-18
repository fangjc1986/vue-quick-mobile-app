<template>
    <div class="IndexAjaxContent ">
        <page-layout>
            <van-nav-bar
                    slot="head"
                    title="ajax封装"
            ></van-nav-bar>
            <scroll-box-better>
                <van-cell-group title="ajax封装">
                    <van-cell
                            title="完整演示 Demo"
                            is-link
                            @click="v_router.to('ajax/AjaxDemoPage')"
                    ></van-cell>
                </van-cell-group>
                <div class="color-gray-darker pa-md">
                    说明： <br>
                    工具类： util/AjaxUtil; <br>
                    其实是对 axios 的二次封装； <br>
                    已注入到 Vue 原型链中，可直接通过 this.$ajax 来调用；
                    <br>
                    提供两个静态方法： <br>
                    1、request(api, params = null, formRef = null ): <br>
                    常规请求，Content-type 为 application/x-www-form-urlencoded； <br>
                    2、requestFormData(api, params = null, formRef = null) : <br>
                    表单请求，，Content-type 为 multipart/form-data; 当表单中有 input:file ，需要上传文件的时候使用；<br>
                    <br>
                    参数说明 <br>
                    api: <br>
                    格式推荐采用数组[ url, method, mockData ] , url : 请求api接口url地址；method：请求方法 get | post, 默认 get ；
                    mockData ： 模拟返回信息，默认为空；当 setting.ajax_mock_on 为 true 的时候回检查 mockData 是否有参数，有的话
                    将跳过 异步请求，直接返回 mockData ； <br>
                    params : <br>
                    请求参数，参数会根据 api 的配置自动转换成需要的格式， 开发人员只需传入 Object 类型对象即可；
                    如果是调用 requestFormData ，则对象中的文件字段格式为{ file : this.$refs.input.value } 即可，key 可根据业务需求自定义；
                    <br>
                    formRef : <br>
                    绑定表单实例，有些情况下用户提交表单之后，服务器会返回表单验证结果，如某些字段格式不正确，此时可通过回调操作把
                    错误信息传递到 formRef 进行处理；<br>

                    <br>
                    其他内容可参考demo + 源码；

                </div>
            </scroll-box-better>
        </page-layout>
    </div>
</template>

<script>
    import PageLayout from "@/components/layout/page-layout/PageLayout";
    import ScrollBoxVant from "@/components/scroll-box/ScrollBoxVant";
    import ScrollBoxBetter from "@/components/scroll-box/ScrollBoxBetter";

    export default {
        name: "IndexAjaxContent",
        mixins: [],
        components: {ScrollBoxBetter, ScrollBoxVant, PageLayout},
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
        },

    }
</script>

<style lang="less" scoped>
    @import (reference) "~@/assets/css/var";

    .IndexAjaxContent {
    }
</style>