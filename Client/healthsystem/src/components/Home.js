import {React, useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import API_patient from '../api/API_patient';
import Patient from '../classes/Patient';
import BigCalendar from './BigCalendar';
import Button from '@material-ui/core/Button';
import { Row, Column, Item } from '@mui-treasury/components/flex';
import Typography from '@material-ui/core/Typography';
import { PassedAppointmentList, TodayAppointmentList, FutureAppointmentList } from './AppointmentCard';

var homestyle = {
    btnCreate: {
        backgroundColor: "#F95F62"
    },
    calendar: {
        marginLeft: "auto",
        marginRight: "auto",
        width: "80%",

    }, 
    titles: {
        fontSize: '24px',
        fontStyle: 'italic',
        color: '#616161',
        padding: '10px'
    },
    titleDoc: {
        fontSize: '30px',
        fontStyle: 'italic',
        color: '#616161'
    }
}


export default function Home({user}){
    const [patient,setPatient] = useState(new Patient())
    const history = useHistory()
    
    const gotoNewAppointment = () =>{
      history.push('/newAppointment');
    }

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
    },[user.userType,patient.doctorId, history, user.googleId]) 


    return(
        <>
            {user.userType === 'Doctor' && 
            <>
            <Typography variant="h5" style={homestyle.titleDoc}>My Appointments</Typography>
            <Row gap={2} p={2.5}>
                <div style={homestyle.calendar}>
                    <BigCalendar user={user} defaultView="week"/>
                </div>
            </Row></>}
            {user.userType === 'Patient' && 
            <Row p={1} style={{width: '80%', margin: 'auto'}}>
                <Column style={{width: '65%', margin: 'auto'}}>
                    <Row >
                        <Item>
                            <Typography variant="h5" 
                                style={homestyle.titles}>
                                    My Future Appointments
                            </Typography>
                        </Item>
                        <Item style={{marginLeft: 'auto', marginRight: 'auto'}}>
                            <Button
                                variant="contained"
                                color="secondary"
                                style={homestyle.btnCreate}
                                onClick={() => gotoNewAppointment()}
                            >
                                New Appointment
                            </Button>
                        </Item>
                    </Row>
                    <Row style={{marginLeft: '50px'}}>
                        <FutureAppointmentList user={user} />
                    </Row>

                    <Row style={{marginTop: '30px'}}>
                        <Typography variant="h5" style={homestyle.titles} align="left">My Passed Appointments</Typography>
                    </Row>
                    <Row style={{marginLeft: '50px'}}>
                        <PassedAppointmentList user={user} />
                    </Row>
                </Column>
                <Column style={{width: '30%', marginLeft: 'auto', marginRight: 'auto'}}>
                    <Item>
                        <Typography variant="h5" style={homestyle.titles}>Today</Typography></Item>
                    <Item style={{marginLeft: 'auto', marginRight: 'auto'}}>
                        <TodayAppointmentList user={user} />
                    </Item>
                </Column>
            </Row>}
        </>
    )
}