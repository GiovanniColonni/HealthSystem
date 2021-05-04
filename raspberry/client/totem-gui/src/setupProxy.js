const proxy = require("http-proxy-middleware")

module.exports = function(app){
    app.use("/login",{target: "http://192.168.1.202:5000"})
    app.use("/totem",{target:"http://0.0.0.0:5000"})
}