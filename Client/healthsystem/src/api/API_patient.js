import axios from 'axios'
import Patient from '../classes/Patient'
import Doctor from '../classes/Doctor'
import Prescription from '../classes/Prescription'

axios.defaults.headers.common['X-Requested-With'] = "XmlHttpRequest"
axios.defaults.headers.common['Access-Control'] = "XmlHttpRequest"


async function getPatient(patientId){
    const patient = await axios.get('/api/patient/'+patientId,{
    })
    .then((element) =>{
        if(!element.data){
            // Patient not found, insert it
            return new Patient()
        }
        const patient = new Patient(element.data.name, element.data.surname, element.data.doctorId, element.data.date, element.data.fiscalCode, element.data.googleId)        
        return patient
    })
    .catch((err) => console.log(err))
    return patient
}

async function getDoctorImage(doctorId){
    const image = await axios.get('/api/patient/doctorImage/'+doctorId,{
        responseType: 'stream'
    })
    .then((response) =>{ 
        return response.data
    })
    .catch((err) => console.log(err))
    return image
}

async function getPrescription(pathFileSystem){
    const file = await axios.get('/api/patient/prescription/'+pathFileSystem,{
        responseType: 'blob', // Important
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/pdf'
        }
    })
    .then((response) =>{ 
        return response.data
    })
    .catch((err) => console.log(err))
    return file
}

async function getAllPrescriptions(patientId){
    const prescriptions = await axios.get('/api/patient/prescriptions/'+patientId)
    .then((response) =>{ 
        let prescriptions = []
            response.data.forEach(element => {
                prescriptions.push(new Prescription(element.id,element.patientId,element.pathFileSystem,element.notePrescription,element.date))
            });
            return prescriptions
    })
    .catch((err) => {console.log(err); return undefined});
    return prescriptions
}

async function putDoctorIdInPatient(doctorId, patientId){
    const resp = await axios
    .put(
        "/api/patient/"+patientId, {doctorId: doctorId}
    )
    .then(r => {console.log(r.status); return r})
    .catch(e => console.log(e));
    return resp
}

async function getDoctorByPatient(patientId){
    const doctor = await axios.get('/patient/doctor/'+patientId,{
    })
    .then((element) =>{
        if(!element.data){
            // Patient not found, insert it
            return new Doctor()
        }
        const doc = new Doctor(element.data.name, element.data.surname, element.data.date, element.data.googleId)        
        return doc
    })
    .catch((err) => console.log(err))
    return doctor
}

const API_patient = {getPatient,getDoctorImage,putDoctorIdInPatient,getAllPrescriptions, getPrescription,getDoctorByPatient}
export default API_patient;