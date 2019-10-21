# vue-quick-mobile-app 快速构建单页 web手机端单页app

### 演示地址：

http://vqma.demo.fangjc1986.com

目前在 手机端 微信浏览器、手机浏览器、以及在打包后的webview中完美运行，其他浏览器尚未测试；

### 基础框架
* vue.js
* vue-router
* vuex
* axios
* Vant（默认ui，可选其他）

### 目标

本内容算不上什么框架，只是将已经有的东西组合在一起，使之能够快速构建移动端web单页应用；
让开发人员不用去理会一些基础的路由和页面布局问题，只需将需要的 混入 加入到组件中，即可
实现自动加载，返回传参，自动实现前进后退过度动画等等；

提供由原生和css3动画封装的两套 无限滚动， 采用一致的api ，方便随时切换；

ajax 封装了几乎所有的业务需求，可以快速开发；

提供一套自动验证的表单组件 `QuickForm`,`QuickItem`,`QuickField` 供参考；

### 功能

* 页面正常跳转

```html
<!--跳转页面-->
<button @click="$v_router.to('/Page', {id:20})"></button>  
<!--可直接写 vue-router 的 path -->
<button @click="$v_router.to({path:'/Page', query:{})"
```

* 返回刷新, 返回后将执行上一个页面的 reload 函数

从 APage.vue 跳转到 BPage.vue, 并从 BPage.vue 中返回刷新 APage.vue 

> APage.vue
>
> 必须混入 `ReloadMixin` ，混入后将自动判断是否需要自动加载 reload， 此混入的作用是自动判断当前路由是
> 来到新页面还是返回到当前页面，并根据不同的状态进行操作，如是否执行 reload 重载，是否跳过本页等待；

```html
<template>
    <div class="RouteBackParams">
        <button @click=$v_router.to('/BPage')"></button>
    </div>
</template>

<script>
    import ReloadMixin from "@/vendor/mixin/ReloadMixin";
    export default {
        name: "LayoutDemoPage",
        // 必须加载 ReloadMixin 混入
        mixins: [ReloadMixin],
        props: {},
        data() {
            return {
                // 无论返回还是到达均调用 reload 函数
                r_force_reload : false ,
                // 来到本页后是否强制跳转到上一页（跳过本页）
                // 经常用在表单提交后会跳转到列表，而列表返回后不想再来到这个表单页面
                // 设置此参数为 true 之后，当返回来到此页将会立刻再次返回上一页
                p_force_back: false,
                // 在强制返回有效的情况下，是否清空路过此页的返回事件 backEvent ;
                p_force_back_reset_route: false,
            }
        },
        methods: {
            reload() {
                // TODO  业务代码
            },
        },
    }
</script>

```
> BPage.vue
>
> 使用 $v_router.backRefresh() 来返回后触发 reload 函数;
```html
<template>
    <div class="RouteBackParams">
        <!-- 返回调用 reload 函数-->
        <button @click=$v_router.backRefresh()"></button>
        <!-- 返回事件，默认调用 backEvent 函数-->
        <button @click=$v_router.backEvent()"></button>
        <!-- 返回事件, 默认调用上一页的 customEvent 事件，并传参 {res:'good'}, 参数可以是任意格式 -->
        <button @click=$v_router.backEvent('customEvent', {res:'good'})"></button>
    </div>
</template>

<script>
    import ReloadMixin from "@/vendor/mixin/ReloadMixin";
    export default {
        name: "LayoutDemoPage",
        // 必须加载 ReloadMixin 混入
        mixins: [ReloadMixin],
        components: {},
        props: {},
        data() {
            return {
                
            }
        },
        
    }
</script>
```

* 返回代办事项

用户经常会在页面上打开多个提示窗口，在单页应用上，如果用户点击返回按钮，则强制浏览器返回到上一页，再次情况下，
提示窗口不会自动消失, 需要将提示窗口的关闭回调函数添加到 `BackTaskUtil` 中；

在 `浏览器` 环境下返回动作将会自动执行代办队列中的所有回调函数；

在 `native.js` 环境下由于可以监听和拦截 返回按钮 `window.plus.key.addEventListener('backbutton')`
因此返回事件将以此执行 代办队列中的函数；

> Vant 的 Dialog.alert 函数封装为关闭代办
```javascript
/**
 * alert 封装
 * 可以以同样的方式封装 confirm 等
 * @param option
 * @returns {Promise<void>}
 */
alert(option = {}) {
    let uuid = 'dialog_alert_uuid';
    // 添加到代办列表
    // 如弹窗后点击返回按钮则执行代办事项
    BackTaskListUtil.pushTaskUuid({
        uuid: uuid,
        callback: () => {
            Dialog.close();
        }
    });
    return Dialog.alert(option).then(() => {
        // 拦截成功事件
        // 从代表列表删除关闭弹窗代办事件
        BackTaskListUtil.removeTaskUuid(uuid);
        return Promise.resolve();
    });
}
```

> 自定义代办队列：

```javascript
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

```


* 无限滚动

 无限滚动提供两个组件：`ScrollBoxVant` 和 `ScrollBoxBetter`；

`ScrollBoxVant` 是由 `Vant` 中的 `pull-refresh` 和 `list` 两个组件组合封装，底层是使用 
`overflow:scroll` 来实现滚动；

`ScrollBoxBetter` 是由 `better-scroll` 组件封装而来，底层使用 `css3` 动画实现滚动；

两者各有优缺点，封装后的两个无上限滚动组件，所有方法和属性保持一致，视个人喜好可随时自由切换；

具体使用方法见 `Demo` 页面，里面有详细的使用方法和说明


* Ajax 封装( AjaxUtil.js )

使用 `axios` 封装了一层，可以快速使用；

提供快速 `form-data` 文件提交， `url`,`data`,`query` 的自动格式化；

加入自动模拟，可在每一个 `api` 中轻松配置模拟返回信息，方便调试和演示；

自定义 `code`,`message`,`data`字段名称 和 正常，常规文本错误 的 `code` 值；

错误 `code` 将自动回调 到 `ErrorCodeHandler` 对象的对应方法；如：`code = 110` 错误将自动回调
`ErrorCodeHandler.code110()` 函数；ErrorCodeHandler构造器中已自动注入本次 `ajaxUtil` 工具，
可以从 this.ajaxUtil 中拿到所有请求参数，返回参数等等所有信息；

当返回错误信息为约定的表单验证错误格式时，将自动回调表单对象并自动在表单上显示错误信息；
Demo 中 `ajax封装演示` 里面的最后一个做了详细演示；

其中 `QuickForm`, `QuickItem`, `QuickField` 三个表单组件可以根据业务需求修改；

> Demo :

```html
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
                            :result.sync="demo4Params.valRes"
                    >
                        <quick-form-item prop="mobile">
                            <quick-form-field
                                    v-model="demo4Params.form.mobile"
                                    label="手机号"
                                    placeholder="请输入您的手机号"
                            ></quick-form-field>
                        </quick-form-item>
                        <quick-form-item prop="realName">
                            <quick-form-field
                                    v-model="demo4Params.form.realName"
                                    label="真是姓名"
                                    placeholder="请输入您的真是姓名"
                            ></quick-form-field>
                        </quick-form-item>
                    </quick-form>
                    <div class="pa-md">
                        <van-button
                                size="small"
                                type="primary"
                                @click="demo4"
                                :disabled="!demo4Params.valRes"
                                :loading="demo4Params.loading"
                        >提交表单
                        </van-button>
                    </div>
                </van-cell-group>
                <div style="height: 3rem;"></div>
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
                    loading: false,
                    validator: {
                        'mobile': [
                            {valid: (value) => /^1/.test(value) || "手机号不能为空"},
                            {valid: (value) => /^1\d{10}$/.test(value), message: "手机号格式错误"},
                        ],
                        'realName': [
                            {valid: (value) => !!value.length || "真是姓名不能为空"},
                            {valid: (value) => /^[\u4e00-\u9fa5]{1,3}$/u.test(value), message: "真是姓名格式错误"},
                        ]
                    },
                    form: {
                        mobile: '',
                        realName: '',
                    },
                    valRes: true,
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
                let api = ['/pet_stemo/test/test_code', 'post', {
                    // 返回表单格式错误信息
                    code: 120,
                    message: '服务器让您请检查表单',
                    data: {
                        'mobile': '服务器说手机号格式错误！',
                        'realName': '服务器说真是姓名错误!'
                    },
                }];
                if (!this.$refs.form.checkValid()) {
                    return Toast("请检查表单");
                }
                this.demo4Params.loading = true;
                // 为让能让ajax 自动回调填充表单错误信息，把表单对象传递给ajax工具
                this.$ajax.request(api, {}, this.$refs.form).then(resp => {
                    Toast(resp);
                }).finally(() => this.demo4Params.loading = false);
            },


        }

    }
</script>

<style lang="less" scoped>
    @import (reference) "~@/assets/css/var";

    .AjaxDemoPage {
    }
</style>
```


























