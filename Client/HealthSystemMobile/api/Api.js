import axios from "axios"
const prefix = "http://192.168.1.202:5000/api"

async function postLogin(id_token,email,googleId){
    var formData = new FormData()
    formData.append("id_token",id_token)
    formData.append("email",email)
    formData.append("googleId",googleId)
    try{
        let resp = await axios.post(`$(prefix)/login`,formData)
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

const Api = {postLogin}
export default Api