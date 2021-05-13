const proxy = require("http-proxy-middleware")

module.exports = function(app){
    app.use(proxy("/login",{target: "http://192.168.1.202:5000"}))
    app.use(proxy("/totem",{target:"http://0.0.0.0:5001"}))
}
