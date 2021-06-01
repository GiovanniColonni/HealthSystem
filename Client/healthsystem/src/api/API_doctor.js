import axios from 'axios'
import Doctor from '../classes/Doctor'
import Patient from '../classes/Patient'

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

async function getPatientList(doctorId){
    return await axios.get('/doctor/'+doctorId+'/patients',{
    })
    .then((element) =>{
        if(!element.data){
            // Patients not found
            return undefined
        }
        let patient = []
        element.data.forEach(elem => {
            patient.push(new Patient(elem.name, elem.surname, doctorId, elem.date, elem.fiscalCode,elem.googleId) )
        });
        patient.sort((a,b) => {     //sort by surname
            if(a.surname>b.surname){
              return 1
            }else{
              return -1
            }
          })
        return patient
    })
    .catch((err) => console.log(err))
}

const API_doctor = {getDoctor,getPatientList}
export default API_doctor;