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
        padding: '6px'
    },
    titleDoc: {
        fontSize: '30px',
        fontStyle: 'italic',
        color: '#616161'
    },
    border: {
        borderStyle: 'solid',
        borderRadius: '5px',
        borderWidth: '1px',
        borderColor: '#bdbdbd',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '28px',
        paddingRight: '28px',
        paddingBottom: '28px'
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
            <>
            <Row p={1} style={{width: '90%', margin: 'auto'}}>
                <Column style={{width: '60%', margin: 'auto'}}>
                    <Row >
                        <Typography variant="h5" 
                            style={homestyle.titles}>
                                My Future Appointments
                        </Typography>
                    </Row>
                    <Row p={1} >
                        <Button
                            variant="contained"
                            color="secondary"
                            style={homestyle.btnCreate}
                            onClick={() => gotoNewAppointment()}
                        >
                            New Appointment
                        </Button>
                    </Row>
                    <div style={{marginLeft: '50px', marginTop: '10px'}}>
                        <FutureAppointmentList 
                            googleId={user.googleId} 
                            userType={user.userType}
                            order={"decreasing"} />
                    </div>

                    <Row style={{marginTop: '30px'}}>
                        <Typography variant="h5" style={homestyle.titles} align="left">My Passed Appointments</Typography>
                    </Row>
                    <div style={{marginLeft: '50px', marginTop: '10px'}}>
                        <PassedAppointmentList user={user} />
                    </div>
                </Column>
                <Column>
                    <div style={homestyle.border}>
                    <Item>
                        <Typography variant="h5" style={homestyle.titles}>Today</Typography></Item>
                    <Item style={{marginLeft: 'auto', marginRight: 'auto'}}>
                        <TodayAppointmentList user={user} />
                    </Item>
                    </div>
                </Column>
            </Row></>}
        </>
    )
}