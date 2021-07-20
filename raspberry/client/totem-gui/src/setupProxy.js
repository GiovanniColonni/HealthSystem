const proxy = require("http-proxy-middleware")

module.exports = function(app){
    app.use(proxy("/api",{target: "https://172.20.10.6:5000",secure:false}))
    app.use(proxy("/totem",{target:"https://172.20.10.14:5001",secure:false}))
}
