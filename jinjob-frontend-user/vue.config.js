const { defineConfig } = require("@vue/cli-service");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = defineConfig({
  devServer: {
    open: true,
    host: "localhost",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:8101",
        changeOrigin: true,
      },
      "/api/admin/file/": {
        target: "http://localhost:8101/api/admin/file/",
        changeOrigin: true,
        pathRewrite: {
          "^/api/admin/file/": "",
        },
      },
    },
  },
  transpileDependencies: true,
  chainWebpack(config) {
    config.plugin("monaco").use(new MonacoWebpackPlugin());
  },
});
