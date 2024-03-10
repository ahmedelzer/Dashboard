const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://ihs.ddnsking.com:8000",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
