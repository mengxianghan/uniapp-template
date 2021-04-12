<template>
    <view class="x-sticky-footer">
        <view class="x-sticky-footer__bar"
              id="stickyFooter">
            <slot></slot>
        </view>
        <view class="x-sticky-footer__placeholder"
              :style="{
            height:height
        }"></view>
    </view>
</template>

<script>
    /**
     * StickyFooter 吸底
     * @author mengxianghan
     * @email 1056811341@qq.com
     * @date 2021-04-12
     * @description 底部悬浮
     */
    export default {
        name: 'x-sticky-footer',
        data() {
            return {
                height: 0
            };
        },
        mounted() {
            uni.createSelectorQuery()
                .in(this)
                .select('#stickyFooter')
                .boundingClientRect(({ height = 0 }) => {
                    this.height = `${height}px`
                })
                .exec()
        }
    }
</script>

<style lang="scss"
       scoped>
    .x-sticky-footer {
        &__bar {
            position: fixed;
            left: 0;
            right: 0;
            bottom: var(--window-bottom);
            z-index: 100;
        }
    }
</style>
