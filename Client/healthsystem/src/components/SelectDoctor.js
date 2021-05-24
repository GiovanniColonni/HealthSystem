import { Button, TextField } from '@material-ui/core';
import {React, useContext, useState, useEffect} from 'react';
import { UserContext } from '../context/UserContext';
import {useHistory} from 'react-router-dom'
import Logo from './Logo';
import API from '../api/API'
import Doctor from '../classes/Doctor';
import API_patient from '../api/API_patient';


const SelectDoctor = (props) =>{
    let {username} = props
    const [doctors,setDoctors] = useState([]);
    useEffect(() => {
      doctorList()
    }, []);
    const history = useHistory()

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
                if(resp.status == 200){
                    history.push("/home")
                }
                return true
            }).catch((err) =>{
                console.log(err);
                return false;
            })
    }

    const DoctorListComponent = () =>{
        const user = useContext(UserContext);
        return (doctors.map(d => 
            <>
                <li>
                    <div>
                        <img src={"/patient/doctorImage/"+d.googleId}></img>
                        <h2>{d.name + " " + d.surname}</h2>
                        <Button onClick={() => updateDoctorIdInPatient(d.googleId,user.googleId)} variant="contained">Choose</Button>
                    </div>
                </li>
                <h2>My Health way, a new way to communicate and to heal</h2>
            </>
        ))
    }

    return (
        <div>
            <TextField label="Doctor name" variant="outlined"/>
            <ul>
                {doctors.length > 0 && <DoctorListComponent />}
            </ul>
        </div>
    );
}
export default SelectDoctor;