import axios from 'axios'
import moment from 'moment'
import Doctor from '../classes/Doctor'
import Patient from '../classes/Patient'

axios.defaults.headers.common['X-Requested-With'] = "XmlHttpRequest"
axios.defaults.headers.common['Access-Control'] = "XmlHttpRequest"


async function getDoctor(doctorId){
    const doctor = await axios.get('/api/doctor/'+doctorId,{
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

async function getLastPatientComment(patientId){
    const comment = await axios.get('/api/doctor/lastComment/'+patientId,{
    })
    .then((element) =>{
        if(!element.data){
            // Doctor not found
            return undefined
        }
        const comment = element.data
        return comment
    })
    .catch((err) =>{
        console.log(err)
        return ""
    })
    return comment
}

async function getPatientList(doctorId){
    return await axios.get('/api/doctor/'+doctorId+'/patients',{
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

async function uploadPrescription(patientId, prescription, doctorId){
    let formData = new FormData()
    formData.set("patientId",patientId)
    formData.set("pathFileSystem",prescription.file.name)
    formData.set("notePrescription",prescription.observation)
    formData.set("date",moment().format('MM/DD/YYYY'))
    formData.set("file",prescription.file)
    formData.set("doctorId",doctorId)
    return await axios({
        method: "post",
        url: "/api/doctor/prescription",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    }).then(function (response){
        return response
    }).catch(function (response){
        console.log(response);
        return response
    });
}

const API_doctor = {getDoctor,getPatientList,getLastPatientComment,uploadPrescription}
export default API_doctor;