<template>
    <div class="QuickFormField">
        <van-field
                :value="value"
                @input="(v)=> $emit('input',v)"
                :label="label"
                :label-width="labelWidth || $parent.$parent.labelWidth"
                :error="error"
                :error-message="errorMessage"
        ></van-field>
    </div>
</template>

<script>
    export default {
        name: "QuickFormField",
        mixins: [],
        components: {},
        props: {
            labelWidth: {
                default: 0
            },
            label: String,
            value: String,
        },
        data() {
            return {
                error: false,
                errorMessage: '',
            }
        },
        computed: {},
        watch: {
            value(v) {
                this.$parent.value = v;
            }
        },
        mounted() {
            this.$parent.childVue = this;
            this.$parent.value = this.value;
        },
        created() {
        },
        destroyed() {
        },
        methods: {
            reload() {
            },
            clearError() {
                this.error = false;
                this.errorMessage = '';
            },
            setError(error) {
                this.error = true;
                this.errorMessage = error;
            }
        },

    }
</script>

<style lang="less" scoped>
    @import (reference) "~@/assets/css/var";

    .QuickFormField {
    }
</style>