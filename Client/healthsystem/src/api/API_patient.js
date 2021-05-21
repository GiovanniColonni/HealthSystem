import axios from 'axios'
import Patient from '../classes/Patient'
async function getPatient(patientId){
    const patient = await axios.get('/patient/'+patientId,{
    })
    .then((element) =>{
        if(!element.data){
            // Patient not found, insert it
            return undefined
        }
        const patient = new Patient(element.data.name, element.data.surname, element.data.doctorId, element.data.date, element.data.fiscalCode, element.data.googleId)        
        return patient
    })
    .catch((err) => console.log(err))
    return patient
}

async function getDoctorImage(doctorId){
    const image = await axios.get('/patient/doctorImage/'+doctorId,{
        responseType: 'stream'
    })
    .then((response) =>{ 
        return response.data
    })
    .catch((err) => console.log(err))
    return image
}

async function putDoctorIdInPatient(doctorId, patientId){
    const resp = await axios
    .put(
        "/patient/"+patientId, {doctorId: doctorId}
    )
    .then(r => {console.log(r.status); return r})
    .catch(e => console.log(e));
    return resp
}

const API_patient = {getPatient,getDoctorImage,putDoctorIdInPatient}
export default API_patient;