<script>
    export default {
        onLaunch() {
            this.checkUpdate();
        },
        onShow() {},
        onHide() {},
        methods: {
            /**
             * 检查更新
             */
            checkUpdate() {
                // #ifdef MP
                if (uni.canIUse('getUpdateManager')) {
                    const updateManager = wx.getUpdateManager();

                    updateManager.onCheckForUpdate(function(res) {
                        // 请求完新版本信息的回调
                    });

                    updateManager.onUpdateReady(function() {
                        uni.showModal({
                            title: '更新提示',
                            content: '新版本已经准备好，是否重启应用？',
                            success: function(res) {
                                if (res.confirm) {
                                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                    updateManager.applyUpdate();
                                }
                            }
                        });
                    });

                    updateManager.onUpdateFailed(function() {
                        // 新版本下载失败
                    });
                }
                // #endif
            }
        }
    };
</script>

<style lang="scss">
    /*每个页面公共css */
    @import 'uview-ui/index.scss';
    @import './static/style/app.scss';
</style>
