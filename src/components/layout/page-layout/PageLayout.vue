<template>
    <div class="PageLayout flex-box flex-column wh100p pos-r overflow-h">
        <div class="flex-shrink-off"
             ref="head"
             v-if="$slots.head"
        >
            <slot name="head"></slot>
        </div>
        <div class="flex-grow pos-r overflow-h"
             :style="bodyStyle"
             ref="body"
        >
            <slot></slot>
        </div>
        <div class="flex-shrink-off"
             ref="foot"
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
        props: {},
        data() {
            return {
                bodyHeight: 0,
            }
        },
        computed: {
            bodyStyle() {
                return {
                    height: this.bodyHeight + 'px',
                }
            }
        },
        watch: {},
        mounted() {
            //this.$nextTick(()=>{
            //    let headHeight = this.$refs.head ? this.$refs.head.offsetHeight : 0;
            //    let footHeight = this.$refs.foot ? this.$refs.foot.offsetHeight : 0;
            //    this.bodyHeight = document.body.clientHeight - headHeight - footHeight;
            //}, 1000);
            this.bodyHeight = this.$refs.body.offsetHeight;
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