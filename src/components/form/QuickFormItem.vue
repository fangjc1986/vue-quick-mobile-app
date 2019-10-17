<template>
    <div class="QuickFormItem">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "QuickFormItem",
        mixins: [],
        components: {},
        props: {
            prop: String,
        },
        data() {
            return {
                childVue: null,
                value: '',
            }
        },
        computed: {},
        watch: {
            value(v) {
                this.$parent.checkFormItem(this);
            }
        },
        mounted() {
        },
        created() {
            if (!this.$parent.formItems.includes(this)) {
                this.$parent.formItems.push(this);
            }
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

    .QuickFormItem {
    }
</style>