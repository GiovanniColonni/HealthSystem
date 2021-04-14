import axios from 'axios'
import Event from '../classes/Event'
import moment from 'moment'

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


const API = {postToLogin, isAuthenticated,getEvents}
export default API;