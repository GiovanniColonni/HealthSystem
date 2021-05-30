import {React, useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import API_patient from '../api/API_patient';
import Patient from '../classes/Patient';
import BigCalendar from './BigCalendar';
import Button from 'react-bootstrap/Button';
import { Row } from '@mui-treasury/components/flex';

var homestyle = {
    btnCreate: {
        backgroundColor: "#F95F62",
        borderColor: "#F95F62",
        fontFamily: "Lato",
        fontWeight: "bold",
        marginLeft: "auto",
        marginRight: "20px"
    },
    calendar: {
        marginLeft: "auto",
        marginRight: "auto",
        width: "80%",

    }
}


export default function Home({user}){
    const [patient,setPatient] = useState(new Patient())
    const history = useHistory()
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
            <h1>My Appointments</h1>
            {user.userType === 'Patient' &&
                <Row gap={2} p={2.5}>
                    <Button style={homestyle.btnCreate}>New Appointment</Button>
                </Row>
            }
            <Row gap={2} p={2.5}>
                <div style={homestyle.calendar}>
                    <BigCalendar user={user} />
                </div>
            </Row>
        </>
    )
}