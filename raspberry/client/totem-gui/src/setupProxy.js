const proxy = require("http-proxy-middleware")

module.exports = function(app){
    app.use(proxy("/api",{target: "https://192.168.0.100:5000",secure:false}))
    app.use(proxy("/totem",{target:"http://192.168.0.103:5001",secure:false}))
}
