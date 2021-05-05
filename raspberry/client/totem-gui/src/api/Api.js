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
//--------- API del Totem
const prefix = "/totem"

async function startMeasure(mode){
    // mode = single,continue 

    const url = prefix + "/measure"
    let form = new FormData()
    form.set("mode",mode)

    try{
        let resp = await axios.post(url)
        
        if(resp.status === 200){
            return true
        }
        return false
    }catch(e){
        return false
    }
    
}
async function stopMeasure(){
     // DELETE su /totem/measure
    const url = prefix + "/measure"

    try{
        let resp = await axios.delete(url)
        
        if(resp.status === 200){
            return true
        }
        return false
    }catch(e){
        return false
    }
}

async function getMeasure(){
   const url = prefix + "/measure"
    
    try{
        let resp = await axios.get(url)
        
        if(resp.status === 200){
            // prendere payload
            console.log(resp.data)
            return resp.data
        }
        return false
    }catch(e){
        return false
    }

}

let Api = {login,logout,isAuthenticated,startMeasure,getMeasure,stopMeasure}
export default Api;
