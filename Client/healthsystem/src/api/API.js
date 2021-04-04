async function postToLogin(){
    // api per prendere il link verso cui fare il redirect
    return new Promise((resolve,reject)=>{
        fetch("/login",{method:'POST',"Access-Control-Allow-Origin":"http://accounts.google.com/"})
        //.then((respose)=>{console.log(respose)})
            
    })
}
async function activeUserSession(){
    return new Promise((resolve,reject)=>{
        fetch("/login1",{method:'POST'}).then().catch((err) => console.error("error"))
    })
}

const API = {postToLogin}
export default API;