module.exports = {
    devServer: {
        port: 8080,
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
