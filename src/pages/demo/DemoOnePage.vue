<template>
    <div class="DemoOnePage">
        <page-layout>
            <van-nav-bar
                    title="首页"
                    left-arrow
                    @click-left="v_router.back()"
                    slot="head"
            ></van-nav-bar>
        </page-layout>
    </div>
</template>

<script>
    import PageLayout from "../../components/layout/page-layout/PageLayout";

    export default {
        name: "DemoOnePage",
        mixins: [],
        components: {PageLayout},
        props: {},
        data() {
            return {
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
        },
    }
</script>

<style lang="less" scoped>
    @import (reference) "~@/assets/css/var";

    .DemoOnePage {
    }
</style>