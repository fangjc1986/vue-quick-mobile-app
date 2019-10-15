<template>
    <div class="ScrollPullDownContainer flex-box flex-center-all">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "ScrollPullDownContainer",
        mixins: [],
        components: {},
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

    .ScrollPullDownContainer {
        height: 50px;
    }
</style>