module.exports = {
    devServer: {
        open: false,
        proxy: {
            '/api': {
                target: "https://www.****.com",
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    }
}
