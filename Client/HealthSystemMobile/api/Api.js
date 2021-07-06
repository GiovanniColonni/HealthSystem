import axios from "axios"


const prefix = "https://3ff228f9e842.ngrok.io/api"


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
            // qui bisognerebbe mettere un filtro che toglie le entry la cui data < data odierna
            var data = resp.data
            
            var now = new Date();
            now.setHours(now.getHours()) // +2 per correggere timezone + 1 ora in più per eventuali ritardi  
            console.log(data)
            data.map((item)=>{
                if(new Date(item.dateStart)  >= now){ // appuntamento terminato 
                    return item
                }
            })
            
            return data
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