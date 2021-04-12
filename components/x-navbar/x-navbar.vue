<template>
    <view class="x-navbar"
          :class="{
              'x-navbar--fixed': fixed
          }"
          :style="{
              'background': background
          }">
        <view class="x-navbar__status-bar"
              :style="{
                  height: statusBarHeight
              }"></view>
        <view class="x-navbar__bar"
              :style="{
                  height: navbarHeight
              }">
            <view class="x-navbar__left"
                  @click.stop="handleLeftClick">
                <slot v-if="$slots.left"
                      name="left"></slot>
                <template v-if="!$slots.left && leftArrow">
                    <uni-icons type="arrowleft"></uni-icons>
                </template>
            </view>
            <view class="x-navbar__center"
                  :style="{
                      color: color
                  }"
                  @click.stop="handleClick">
                <slot v-if="$slots.default"></slot>
                <template v-else>{{title}}</template>
            </view>
            <!-- #ifndef MP -->
            <view class="x-navbar__right"
                  @click.stop="handleRightClick">
                <slot name="right"></slot>
            </view>
            <!-- #endif -->
        </view>
    </view>
</template>

<script>
    /**
     * NavBar 导航栏
     * @author: mengxianghan
     * @email: 1056811341@qq.com
     * @date: 2021-04-12
     * @description: 导航栏
     */
    export default {
        name: 'x-navbar',
        props: {
            // 吸顶
            fixed: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: ''
            },
            // 文本颜色
            color: {
                type: String,
                default: 'black'
            },
            // 背景色
            background: {
                type: String,
                default: '#fff'
            },
            // 显示返回按钮
            leftArrow: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                statusBarHeight: 0,
                navbarHeight: 0
            };
        },
        created() {

        },
        mounted() {
            this.getHeight()
        },
        methods: {
            async getHeight() {
                const { statusBarHeight, platform } = await uni.getSystemInfoSync()
                this.statusBarHeight = `${statusBarHeight}px`

                let navbarHeight = 0
                // 非小程序
                // #ifndef MP
                // 判断系统类型
                if (platform === 'android') {
                    // android
                    navbarHeight = 44
                } else {
                    // 非 android
                    navbarHeight = 48
                }
                // #endif

                // 小程序
                // #ifdef MP
                const { top, right, width, height } = await uni.getMenuButtonBoundingClientRect()
                navbarHeight = (top - statusBarHeight) * 2 + height
                // #endif

                this.navbarHeight = `${navbarHeight}px`
            },
            handleLeftClick() {
                this.$emit('left-click')
            },
        }
    }
</script>

<style lang="scss"
       scoped>
    .x-navbar {
        width: 100%;
        /* #ifdef MP */
        padding-bottom: 4px;
        /* #endif */

        &--fixed {
            position: fixed;
            left: 0;
            top: 0;
            z-index: 9999;
        }

        &__bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
        }

        &__left,
        &__right {
            height: 100%;
            padding: 0 24rpx;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &__center {
            position: absolute;
            left: 120rpx;
            right: 120rpx;
            text-align: center;
            font-size: 34rpx;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>
