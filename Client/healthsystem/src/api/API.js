import axios from 'axios'
import Event from '../classes/Event'
import moment from 'moment'

axios.defaults.headers.common['X-Requested-With'] = "XmlHttpRequest"
axios.defaults.headers.common['Access-Control'] = "XmlHttpRequest"

async function postLogin(id_token,email,googleId){
        var formData = new FormData()
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

async function isAuthenticated(){
    // bisognerebbe fare controllo errore   
    const resp = await axios.get("/login")
    if (resp.status === 200){
        return resp.data
    }else{
        throw "error" // fare gestione più precisa dell'erroe
    }
        
}

// update this function
async function getEvents(id,type){
    if(type === 'doctor'){
        const events = await axios.get('/doctor/event',{
            params:{
                doctorId: id
            }
        })
        .then((response) =>{ 
            let events = []
            response.data.forEach(element => {
                console.log(element.typeExamination)
                events.push(new Event(element.id,element.typeExamination,moment(element.dateStart).toDate(),moment(element.dateEnd).toDate(),false,element.description,"put conference in db"))
            });
            console.log(events)
            return events
        })
        .catch((err) => console.log("error"))
        return events
        //tornare i dati 
    }
}


const API = {postLogin,isAuthenticated,getEvents}
export default API;