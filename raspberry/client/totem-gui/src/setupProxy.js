const proxy = require("http-proxy-middleware")

module.exports = function(app){
    app.use(proxy("/login",{target: "http://0.0.0.0:5000"}))
    app.use(proxy("/totem",{target:"http://0.0.0.0:5001"}))
}
