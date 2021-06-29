import axios from "axios"

const prefix = "https://40c3ee9a7d27.ngrok.io/api"

axios.defaults.headers.common['X-Requested-With'] = "XmlHttpRequest"
axios.defaults.headers.common['Access-Control'] = "XmlHttpRequest"

async function postLogin(id_token,email,googleId,name){
    var formData = new FormData()
    
    formData.append("id_token",id_token)
    formData.append("email",email)
    formData.append("googleId",googleId)
    formData.append("type","android") //trovare modo per vedere se gira in android o ios
    formData.append("name",name)

    try{
        let resp = await axios.post(`${prefix}/login`,formData)
        if (resp.status === 200){
          return resp.data
        }
        return false;
    }catch(e){
        return false
    }
}

async function insertPushToken(googleId,pushToken){
    var formData = new FormData()
    formData.append("googleId", googleId)
    formData.append("pushToken",pushToken)
    try{
        let resp = await axios.post(`${prefix}/account/insertToken`,formData)
        
        if (resp.status === 200){
          return resp.data
        }
        return false;
    }catch(e){
        //console.log(e)
        return false
    }
}

async function getEventList(googleId){
    
    try{
        let resp = await axios.get(`${prefix}/patient/event/${googleId}`);
        if(resp.status === 200){         
            return resp.data
        }
    }catch(e){
        return false;
    }
}
async function getMeasure(googleId){
    try{
        let resp = await axios.get(`${prefix}/patient/measures/${googleId}`)
        if(resp.status === 200){
            return resp.data
        }
        return false
    }catch(e){
        return false
    }
}

const Api = {postLogin, insertPushToken,getEventList,getMeasure}
export default Api