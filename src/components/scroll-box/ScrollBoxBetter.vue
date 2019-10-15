<template>
    <div class="ScrollBoxBetter wh100p pos-r"
         ref="wrapper"
    >
        <div class="pos-r">
            <div class="pull-down-container"></div>
            <div class="body van-clearfix">
                <slot></slot>
            </div>
            <div class="pull-up-container"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ScrollBoxBetter",

        components: {},
        props: {
            pullDown: {
                default: false,
            },
            pullUp: {
                default: true,
            },
        },
        data() {
            return {
                loading: false
            }
        },
        mounted() {
        },
        methods: {
            reload() {

            },
            onLoad(a, b, c) {
                console.log(a, b, c);
            }
        },
        watch: {},
        computed: {},

    }
</script>

<style lang="less" scoped>

    .ScrollBoxBetter {
    }
</style>