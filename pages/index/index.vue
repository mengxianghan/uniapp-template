<template>
    <x-container background="#f8f8f8">
        <view class="container">
            <image src="../../static/logo.png"
                   mode="widthFix"></image>
            <view>欢迎使用uniapp-template</view>
        </view>
    </x-container>
</template>

<script>
    export default {
        data() {
            return {}
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

<style lang="scss"
       scoped>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

        image {
            width: 160rpx;
        }

        view {
            padding: 24rpx 0 80rpx;
        }
    }
</style>
