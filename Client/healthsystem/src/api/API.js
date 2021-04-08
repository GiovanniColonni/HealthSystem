import axios from 'axios'


async function postToLogin(){
    // api per prendere il link verso cui fare il redirect
    return new Promise((resolve,reject)=>{
        fetch("/login",{method:'POST',"Access-Control-Allow-Origin":"http://accounts.google.com/"})
        //.then((respose)=>{console.log(respose)})
            
    })
}

async function isAuthenticated(){
    
    const resp = await axios("/user")
    const userJson = await resp.json()
    
    if (resp.ok){
        return userJson
    }else{
        throw("error") // sostituire con oggetto errore
    }
}


const API = {postToLogin}
export default API;