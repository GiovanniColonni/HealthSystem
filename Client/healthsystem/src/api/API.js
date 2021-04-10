import axios from 'axios'

axios.defaults.headers.common['X-Requested-With'] = "XmlHttpRequest"
axios.defaults.headers.common['Access-Control'] = "XmlHttpRequest"

async function postToLogin(){
    // api per prendere il link verso cui fare il redirect
    return new Promise((resolve,reject)=>{
        fetch("/login",{method:'POST',"Access-Control-Allow-Origin":"http://accounts.google.com/"})
    })
}

async function isAuthenticated(){
    
    const resp = await axios("/login")
    const userJson = await resp.json()
    
    if (resp.ok){
        return userJson
    }else{
        throw("error") // sostituire con oggetto errore
    }
}

async function getEvents(id){
    return new Promise((resolve,reject) =>{
        fetch("/events",{method: 'GET'})
    })
}


const API = {postToLogin,isAuthenticated}
export default API;