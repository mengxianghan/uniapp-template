<template>
    <view class="container" :style="{ background: background }"><slot></slot></view>
</template>

<script>
export default {
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

<style lang="scss" scoped>
.container {
    min-height: 100%;
}
</style>
