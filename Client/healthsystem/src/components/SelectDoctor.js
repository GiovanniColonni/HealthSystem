import {React, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import API from '../api/API'
import Doctor from '../classes/Doctor';
import API_patient from '../api/API_patient';
import Patient from '../classes/Patient';
import {ChooseDoctorCard} from './UserCard';
import { Typography } from "@material-ui/core";

const liststyle = {
    container: {
        width: '40%',
        margin: 'auto'
    }
}

const SelectDoctor = (props) =>{
    let {user} = props
    const [doctors,setDoctors] = useState([])
    const [patient,setPatient] = useState(new Patient())

    const history = useHistory()

    useEffect(() => {
      doctorList()
        API_patient.getPatient(user.googleId)
        .then((patient) =>{
            console.log(patient)
            setPatient(patient)
        })
        .catch((err) =>{
            console.log(err)
        })
        if(user.userType !== "Patient" || (patient.doctorId !== "" && patient.doctorId !== undefined)){
            console.log("go to home")
            history.push("/home")
        }
    }, [patient.doctorId,history,user.googleId, user.userType]);

    const doctorList = () => {
        //const user = useContext(UserContext)
        API.getAllDoctors().then((doct) =>{
            const d = doct.map(d => new Doctor(d.name,d.surname,d.date,d.googleId))
            setDoctors(d)
            return true
        }).catch((err) =>{
            console.log("error in getAllDoctors()")
            return false
        })
    }

    const updateDoctorIdInPatient = (doctorId,patientId) =>{
        API_patient.putDoctorIdInPatient(doctorId,patientId)
            .then((resp) =>{
                if(resp.status === 200){
                    history.push("/home")
                }
                return true
            }).catch((err) =>{
                console.log(err);
                return false;
            })
    }

    const DoctorListComponent = () =>{
        return (
            <>
              {doctors !== undefined && doctors.length > 0 &&
                doctors.map(doc => (
                  doc.name !== undefined &&
                  <ChooseDoctorCard title={doc.surname + " " + doc.name} caption={"Address"} 
                        onClick={() => updateDoctorIdInPatient(doc.googleId, user.googleId)}/>
              )) }
              {doctors.length === 0 &&
                <Typography align="center" variant="h6">No Doctors</Typography>}
            </>
          );
    }
    

    return (
        <div style={liststyle.container}>
            <DoctorListComponent />
        </div>
    );
}
export default SelectDoctor;
