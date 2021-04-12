<template>
    <view class="x-container"
          :style="{ background: background }">
        <slot></slot>
    </view>
</template>

<script>
    /**
     * Container 外部容器
     * @author mengxianghan
     * @email 1056811341@qq.com
     * @date 2021-04-12
     * @description 默认满屏，超出一屏自动高度
     */
    export default {
        name:'x-container',
        props: {
            background: {
                type: String,
                default: ''
            }
        },
        data() {
            return {};
        }
    };
</script>

<style lang="scss"
       scoped>
    .x-container {
        min-height: 100%;
    }
</style>
