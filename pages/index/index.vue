<template>
    <view>
        <view>欢迎使用uniapp-template</view>
    </view>
</template>

<script>
export default {
    data() {
        return {};
    },
    onLoad() {},
    methods: {
        async getList() {
            // api 使用示例
            const res = await this.$xy.api.index.getList({});

            console.log(res);
        }
    }
};
</script>

<style lang="scss"></style>
