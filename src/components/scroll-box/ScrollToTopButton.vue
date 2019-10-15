<template>
    <div class="ScrollToTopButton flex-box flex-center-all"
         :style="scrollStyle">
        <van-icon name="arrow-up" size=".6rem" class="color-gray-dark"></van-icon>
    </div>
</template>

<script>
    export default {
        name: "ScrollToTopButton",
        mixins: [],
        components: {},
        props: {
            posStyle: Object
        },
        data() {
            return {
                defaultClass: {
                    bottom: '1.5rem',
                    right: '-0.02rem',
                }
            }
        },
        computed: {
            scrollStyle() {
                return Object.assign(this.defaultClass, this.posStyle || {});
            }
        },
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
    @import (reference) "~@/assets/css/common";

    .ScrollToTopButton {
        position: fixed;
        z-index: 2;
        width: 1.2rem;
        height: 1.2rem;
        border: .02rem solid @gray;
        border-bottom-left-radius: .1rem;
        border-top-left-radius: .1rem;
        background-color: rgba(255,255,255, .7);
    }
</style>