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
            checkValid() {
                let err = false;
                this.validator.keys.forEach(key => {
                    let val = this.validator[key];
                    let fi = this.formItems.find(x => x.prop === key);
                    if (!fi) {
                        return;
                    }
                    err = err || this.checkFormItem(fi, val);
                });
                return !err;
            },

            checkFormItem(formItem, validator = null) {
                if (!validator) {
                    validator = this.validator[formItem.prop];
                }
                if (!validator) return true;
                for (let i = 0; i < validator.length; i++) {
                    let err = validator[i].valid(formItem.value);
                    if (err !== true) {
                        formItem.childVue.setError(err === false ? validator[i].message : err);
                        this.$emit('update:result', false);
                        return false;
                    }
                }
                formItem.childVue.clearError();
                return true;
            },

        },

    }
</script>

<style lang="less" scoped>
    @import (reference) "~@/assets/css/var";

    .QuickForm {
    }
</style>