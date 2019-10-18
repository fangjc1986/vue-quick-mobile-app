<template>
    <div class="PageLayout wh100p pos-r flex-box flex-column overflow-h">
        <div class="flex-shrink-off"
            v-if="$slots.head"
        >
            <slot name="head"></slot>
        </div>
        <div class="flex-grow pos-r overflow-h">
            <slot></slot>
        </div>
        <div class="flex-shrink-off"
            v-if="$slots.foot"
        >
            <slot name="foot"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PageLayout",
        mixins: [],
        components: {},
        props: {

        },
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
    @import "~@/assets/css/var";

    .PageLayout {
    }
</style>