import axios from 'axios'
import Event from '../classes/Event'
import moment from 'moment'
import Doctor from '../classes/Doctor'

axios.defaults.headers.common['X-Requested-With'] = "XmlHttpRequest"
axios.defaults.headers.common['Access-Control'] = "XmlHttpRequest"

async function postLogin(id_token,email,googleId){
        var formData = new FormData()
        formData.set("id_token",id_token)
        formData.set("email",email)
        formData.set("googleId",googleId)
        try{
            let resp = await axios.post("/api/login",formData)
            
            if (resp.status === 200){
              return true
            }
            
        }catch(e){
            return false
        }
}
async function logout(){
    try{
        let resp = await axios.delete("/api/login")
        if(resp.status === 204){
            return true
        }
        return false
    }catch(e){
        return false
    }
}
async function submitFirstAccess(id,name,surname,birthday,cf,userType){
    let formData = new FormData()
    
    formData.set("googleId",id)
    formData.set("name",name)
    formData.set("surname",surname)
    formData.set("birthday",birthday)
    formData.set("cf",cf)
    formData.set("userType",userType)


    //let resp = await axios.post("/account/submitFirstAccess")
    return await axios({
        method: "post",
        url: "/api/account/submitFirstAccess",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    }).then(function (response){
        console.log(response);
        return response
    }).catch(function (response){
        console.log(response);
        return response
    });
}

async function changeUserType(id,type){
    let formData = new FormData()
    formData.set("googleId",id)
    formData.set("userType",type)
    try{
        let resp = await axios.post("/api/updateType",formData)
        if(resp.status === 200){
            return true
        }
    }catch (e){
        return false
    }
}

async function isAuthenticated(){
    // bisognerebbe fare controllo errore   
    const resp = await axios.get("/api/login")
    if (resp.status === 200){
        return resp.data
    }else{
        throw resp.status// fare gestione più precisa dell'erroe
    }
        
}

// update this function
async function getEvents(id,type){
    if(type === 'Doctor'){
        const events = await axios.get('/api/doctor/event',{
            params:{
                doctorId: id
            }
        })
        .then((response) =>{ 
            let events = []
            response.data.forEach(element => {
            events.push(new Event(element.id,element.typeExamination,moment(element.dateStart).toDate(),moment(element.dateEnd).toDate(),false,element.description,element.meetingURL, element.doctorId, element.patientId))
            });
            return events
        })
        .catch((err) => console.log("error"))
        return events
        //tornare i dati 
    }else if(type === 'Patient'){
        const events = await axios.get('/api/patient/event/'+id,{
        })
        .then((response) =>{ 
            let events = []
            response.data.forEach(element => {
                events.push(new Event(element.id,element.typeExamination,moment(element.dateStart).toDate(),moment(element.dateEnd).toDate(),false,element.description,element.meetingURL, element.doctorId, element.patientId))
            });
            return events
        })
        .catch((err) => console.log(err))
        return events
    }
}

async function getAllDoctors(){
    const doctors = await axios.get('/api/patient/doctors',{
    })
    .then((response) =>{ 
        let doctors = []
        response.data.forEach(element => {
            doctors.push(new Doctor(element.name,element.surname,element.date,element.googleId))
        });
        return doctors
    })
    .catch((err) => console.log("error"))
    return doctors
}

async function uploadProfileImage(googleId, image){
    var formData = new FormData()
    formData.set("googleId",googleId)
    formData.set("file",image)
    try{
        let resp = await axios.post("/api/doctor/profileImage",formData)
        
        if (resp.status === 200){
          return true
        }
        
    }catch(e){
        return false
    }
}


const API = {postLogin,isAuthenticated,getEvents,changeUserType,submitFirstAccess,getAllDoctors, logout, uploadProfileImage}
export default API;