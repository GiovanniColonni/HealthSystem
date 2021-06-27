import axios from 'axios'
import Patient from '../classes/Patient'
import Doctor from '../classes/Doctor'
import Prescription from '../classes/Prescription'
import Measure from '../classes/Measure'

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
            'Content-Type': 'application/json'
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
                prescriptions.push(new Prescription(element.id,element.patientId,element.pathFileSystem,element.notePrescription,element.date,element.doctorId))
            });
            return prescriptions
    })
    .catch((err) => {console.log(err); return undefined});
    return prescriptions
}

async function getAllMeasures(patientId){
    const measures = await axios.get('/api/patient/measures/'+patientId)
    .then((response) =>{ 
        let measures = []
            response.data.forEach(element => {
                measures.push(new Measure(element.id, element.type, element.value, element.patientId, element.name, element.date))
            });
            return measures
    })
    .catch((err) => {console.log(err); return undefined});
    return measures
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

async function setAppointment(patientId,doctorId,dateStart,typeExamination,description,dateEnd,meetingURL){
    let formData = new FormData()

    formData.set("patientId",patientId)
    formData.set("doctorId",doctorId)
    formData.set("dateStart",dateStart)
    formData.set("typeExamination",typeExamination)
    formData.set("description",description)
    formData.set("dateEnd",dateEnd)
    formData.set("meetingURL", meetingURL)

    //let resp = await axios.post("/account/submitFirstAccess")
    return await axios({
        method: "post",
        url: "/api/patient/appointment",
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

const API_patient = {getPatient,getDoctorImage,putDoctorIdInPatient,getAllPrescriptions, getAllMeasures, getPrescription,getDoctorByPatient, setAppointment}
export default API_patient;