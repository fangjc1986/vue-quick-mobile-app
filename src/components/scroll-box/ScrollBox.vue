<template>
    <div class="ScrollBox wh100p pos-r">
        <van-list
                v-model="loading"
                @load="onLoad"
        >
            <slot></slot>
        </van-list>
    </div>
</template>

<script>
    export default {
        name: "ScrollBox",

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

    .ScrollBox {
    }
</style>