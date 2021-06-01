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
// "measureValue":"","mtype":"","thReached":"","inProgress":"","dateMeasure":""
async function postMeasure(measureValue,dataMeasure){
    let form = new FormData();
    form.set("measureValue",measureValue)
    form.set("dataMeasure",dataMeasure)
    try{
        let resp = await axios.post("/postMeasure",dataMeasure);
        if(resp.status === 200){
            return true;
        }
        return false;
    }catch(e){
        return false
    }
}
//--------- API del Totem
const prefix = "/totem"

async function startMeasure(){
    // mode = single,continue 

    const url = prefix + "/measure"

    try{
        let resp = await axios.post(url)
        
        if(resp.status === 200){
            return true
        }
        if(resp.status === 204){
            // misura già attiva
            return false
        }
        
    }catch(e){
        return false
    }
    
}

async function getMeasure(){
   const url = prefix + "/measure"
    
    try{
        let resp = await axios.get(url)
        
        if(resp.status === 200){
            console.log(resp.data)
            return resp.data
        }
        if(resp.status === 204){
            return false
        }
        return false
    }catch(e){
        return false
    }

}

let Api = {login,logout,isAuthenticated,startMeasure,getMeasure,postMeasure}
export default Api;
