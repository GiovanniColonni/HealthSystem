import axios from "axios";

axios.defaults.headers.common['X-Requested-With'] = "XmlHttpRequest"
axios.defaults.headers.common['Access-Control'] = "XmlHttpRequest"

// le api sono presso a poco le stesse, cambia la logica del server che rimanda le richieste
// al server centrale 

let login = async function(id_token,email,googleId){
    
    let formData = new FormData()
    formData.set("id_token",id_token)
    formData.set("email",email)
    formData.set("googleId",googleId)
    
    try{
        let resp = await axios.post("/login",formData)
        
        if (resp.status === 200){
          return true
        }
        
    }catch(e){
        return false
    }

    
}

 let isAuthenticated = async function(){
    // bisognerebbe fare controllo errore   
    const resp = await axios.get("/login")
    if (resp.status === 200){
        return resp.data
    }else{
        throw "error" // fare gestione più precisa dell'erroe
    }
        
}

async function logout(){
    try{
        let resp = await axios.delete("/login")
        if(resp.status === 204){
            return true
        }
        return false
    }catch(e){
        return false
    }
}


let Api = {login,logout,isAuthenticated}
export default Api;
