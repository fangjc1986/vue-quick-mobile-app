<template>
    <div class="QuickForm">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "QuickForm",
        mixins: [],
        components: {},
        props: {
            labelWidth: {
                default: "5rem"
            },
            validator: {
                default() {
                    return {
                        'Mobile': [{}]
                    }
                }
            },
            result: Boolean,
        },
        data() {
            return {
                formItems: [],
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

            /**
             * 设置来自服务器的错误信息
             * 根据业务代码执行调整
             * demo 中用 ErrorCodeHandler 中的 code120 调用
             */
            setErrorFromServer(err) {
                Object.keys(err).forEach(key => {
                    let fi = this.formItems.find(x => x.prop === key);
                    if (!fi) return;
                    fi.childVue.setError(err[key]);
                });
                this._checkResult();
            },

            /**
             * 检查所有 formItem
             * 可在提交表单前调用此方法
             * @returns {boolean} true：验证通过；
             */
            checkValid() {
                let res = true;
                Object.keys(this.validator).forEach(key => {
                    let val = this.validator[key];
                    let fi = this.formItems.find(x => x.prop === key);
                    if (!fi) {
                        return;
                    }
                    res = this.checkFormItem(fi, val) && res;
                });
                return res;
            },
            /**
             * 检查某一个 formItem
             * @param formItem
             * @param validator
             * @returns {boolean}
             */
            checkFormItem(formItem, validator = null) {
                if (!validator) {
                    validator = this.validator[formItem.prop];
                }
                if (!validator) return true;
                for (let i = 0; i < validator.length; i++) {
                    let err = validator[i].valid(formItem.value);
                    if (err !== true) {
                        formItem.childVue.setError(err === false ? validator[i].message : err);
                        this._checkResult();
                        return false;
                    }
                }
                formItem.childVue.clearError();
                this._checkResult();
                return true;
            },
            /**
             * 检查所有
             * @private
             */
            _checkResult() {
                let res = this.formItems.reduce((t, x) => {
                    if (t === false) return false;
                    return x.childVue ? !x.childVue.error : true;
                }, true);
                this.$emit('update:result', res);
            }
        },

    }
</script>

<style lang="less" scoped>
    @import (reference) "~@/assets/css/var";

    .QuickForm {
    }
</style>