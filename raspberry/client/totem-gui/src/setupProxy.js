const proxy = require("http-proxy-middleware")

module.exports = function(app){
    app.use(proxy("/login",{target: "https://192.168.1.202:5000",secure:false}))
    app.use(proxy("/totem",{target:"https://0.0.0.0:5001",secure:false}))
}
