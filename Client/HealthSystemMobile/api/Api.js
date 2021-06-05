import axios from "axios"
const prefix = "https://58f50a33693b.ngrok.io/api"
axios.defaults.headers.common['X-Requested-With'] = "XmlHttpRequest"
axios.defaults.headers.common['Access-Control'] = "XmlHttpRequest"
async function postLogin(id_token,email,googleId){
    var formData = new FormData()
    console.log(id_token)
    console.log(email)
    console.log(googleId)
    formData.append("id_token",id_token)
    formData.append("email",email)
    formData.append("googleId",googleId)
    formData.append("type","android") //trovare modo per vedere se gira in android o ios
    try{
        let resp = await axios.post(`${prefix}/login`,formData)
        console.log(`status : ${resp.status}`)
        console.log(`data : ${resp.data}`)
        if (resp.status === 200){
          return resp.data
        }
        return false;
    }catch(e){
        console.log(e)
        return false
    }
}

async function insertPushToken(googleId,pushToken){

}

const Api = {postLogin}
export default Api