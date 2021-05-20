import axios from 'axios'
import Patient from '../classes/Patient'
async function getPatient(patientId){
    const patient = await axios.get('/patient/'+patientId,{
    })
    .then((response) =>{ 
        let patient = []
        response.data.forEach(element => {
            patient.push(new Patient(element.name, element.surname, element.doctorId, element.date, element.fiscalCode, element.googleId))
        });
        return patient
    })
    .catch((err) => console.log(err))
    return patient
}

const API_patient = {getPatient}
export default API_patient;