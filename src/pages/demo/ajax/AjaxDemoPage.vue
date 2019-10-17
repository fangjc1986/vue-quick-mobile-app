<template>
    <div class="AjaxDemoPage">
        <page-layout>
            <van-nav-bar
                    slot="head"
                    left-arrow
                    title="ajax演示Demo"
                    @click-left="v_router.back()"
            ></van-nav-bar>
            <scroll-box-vant>
                <van-cell-group title="模拟随机数据返回 demo1">
                    <div class="pa-md">
                        <van-button size="small" type="primary" @click="demo1"
                                    :loading="demo1Params.loading"
                        >发送请求
                        </van-button>
                        <div class="pt-md ">
                            返回数据：{{ demo1Params.response }}
                        </div>
                    </div>
                </van-cell-group>
                <van-cell-group title="参数提交并正确返回 demo2">
                    <div class="pa-md">
                        <van-button size="small" type="primary" @click="demo2">发送请求</van-button>
                        <div class="pt-md">
                            提交参数：{{ demo2Params.form }} <br>
                            返回数据：{{ demo2Params.response }}
                        </div>
                    </div>
                </van-cell-group>
                <van-cell-group title="参数提交并返回错误 demo3">
                    <div class="pa-md">
                        <van-button size="small" type="primary" @click="demo3">发送请求</van-button>
                        <div class="pt-md">
                            提交参数：{{ demo3Params.form }} <br>
                            错误返回数据：{{ demo3Params.response }}
                        </div>
                    </div>
                </van-cell-group>

                <van-cell-group title="表单提交服务器返回错误 demo4">
                    <quick-form
                            label-width="1.7rem"
                            :validator="demo4Params.validator"
                            ref="form"
                    >
                        <quick-form-item prop="mobile">
                            <quick-form-field
                                    v-model="demo4Params.form.mobile"
                                    label="手机号"
                                    placeholder="请输入您的手机号"
                            ></quick-form-field>
                        </quick-form-item>
                    </quick-form>
                    <div class="pa-md">
                        <van-button
                                size="small"
                                block type="primary"
                                @click="demo4"
                        >发送请求
                        </van-button>
                    </div>
                </van-cell-group>
            </scroll-box-vant>
        </page-layout>
    </div>
</template>

<script>
    import PageLayout from "@/components/layout/page-layout/PageLayout";
    import ScrollBoxVant from "@/components/scroll-box/ScrollBoxVant";
    import QuickFormItem from "@/components/form/QuickFormItem";
    import QuickForm from "@/components/form/QuickForm";
    import QuickFormField from "@/components/form/QuickFormField";
    import Toast from "vant/lib/toast";
    import Helper from "@/utils/Helper";

    export default {
        name: "AjaxDemoPage",
        mixins: [],
        components: {QuickFormField, QuickForm, QuickFormItem, ScrollBoxVant, PageLayout},
        props: {},
        data() {
            return {
                demo1Params: {
                    loading: false,
                    response: '',
                },
                demo2Params: {
                    form: {
                        code: 200,
                    },
                    response: '',
                },
                demo3Params: {
                    form: {
                        code: 100,
                    },
                    response: '',
                },
                demo4Params: {
                    validator: {
                        'mobile': [
                            {valid: (value) => /^1/.test(value) || "手机号不能为空"},
                            {valid: (value) => /^1\d{10}$/.test(value), message: "手机号格式错误"},
                        ]
                    },
                    form: {
                        mobile: ''
                    }
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

            demo1() {
                let mockData = {
                    'code': 200,
                    'message': '123123',
                    'data|3': ["@string('lower',10)"]
                };
                let api = ['/demo1', 'get', mockData];
                this.demo1Params.loading = true;
                this.$ajax.request(api).then(resp => {
                    this.demo1Params.response = resp;
                }).finally(() => this.demo1Params.loading = false);
            },

            demo2() {
                let api = ['/pet_stemo/test/test_code', 'get'];
                this.$ajax.request(api, this.demo2Params.form).then(resp => {
                    this.demo2Params.response = resp;
                });
            },
            demo3() {
                let api = ['/pet_stemo/test/test_code', 'get'];
                this.$ajax.request(api, {
                    code: 100
                }).then(resp => {
                    this.demo3Params.response = resp;
                }).catch(err => {
                    this.demo3Params.response = err;
                });
            },
            demo4() {
                this.group();
                let api = ['/pet_stemo/test/test_code', 'post', {
                    code: 200,
                    message: '表单提交成功',
                    data: '表单提交成功',
                }];
                this.$ajax.request(api).then(resp => {
                    Toast(resp);
                });
            },


        }

    }
</script>

<style lang="less" scoped>
    @import (reference) "~@/assets/css/var";

    .AjaxDemoPage {
    }
</style>