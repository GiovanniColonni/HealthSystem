import axios from 'axios'

axios.defaults.headers.common['X-Requested-With'] = "XmlHttpRequest"
axios.defaults.headers.common['Access-Control'] = "XmlHttpRequest"

async function Login(id_token,email,googleId){
        var formData = new FormData()
        formData.set("id_token",resp.tokenObj.id_token)
        formData.set("email",resp.profileObj.email)
        formData.set("googleId",resp.profileObj.googleId)
        let resp = await axios.post("/login",formData)

        if(resp.status === 200){
            return true
        }else{
            return false
        }
}

async function isAuthenticated(){
    // bisognerebbe fare controllo errore   
    const resp = await axios.get("/login")
    if (resp.status === 200){
        return resp.data
    }else{
        throw "error" // fare gestione più precisa dell'erroe
    }
        
}


const API = {Login,isAuthenticated}
export default API;