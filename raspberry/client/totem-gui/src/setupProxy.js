const proxy = require("http-proxy-middleware")

module.exports = function(app){
    app.use(proxy("/api",{target: "https://192.168.43.189:5000",secure:false}))
    app.use(proxy("/totem",{target:"https://192.168.43.221:5001",secure:false}))
}
