import {React, useContext, useState, useEffect, useRef} from 'react';
import { Redirect, useHistory } from 'react-router';
import API from '../api/API';
import API_patient from '../api/API_patient';
import Patient from '../classes/Patient';

const Home = (props) =>{
    const [patient,setPatient] = useState(new Patient())
    const history = useHistory()
    let {user} = props
    useEffect(() => {
        if(user.userType === "unknown"){
            console.log("go to firstAccess")
            history.push("/firstAccess")
        }
        if(user.userType === "Patient"){
            API_patient.getPatient(user.googleId)   //if Patient
                .then((p) =>{
                    setPatient(p)
                    if(p.doctorId === undefined || p.doctorId === ""){
                        history.push("/patient/selectDoctor")
                    }
                })
                .catch((err) =>{
                    console.log(err)
                })
        }
    },[user.userType,patient.doctorId]) 

    return(
     <>
        
     </>   
    )
}

export default Home;