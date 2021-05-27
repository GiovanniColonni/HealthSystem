import axios from 'axios'
import Doctor from '../classes/Doctor'

async function getDoctor(doctorId){
    const doctor = await axios.get('/doctor/'+doctorId,{
    })
    .then((element) =>{
        if(!element.data){
            // Doctor not found
            return undefined
        }
        const doctor = new Doctor(element.data.name, element.data.surname, element.data.date, element.data.googleId)        
        return doctor
    })
    .catch((err) => console.log(err))
    return doctor
}

const API_doctor = {getDoctor}
export default API_doctor;