import React, { useState, useEffect } from 'react';
import BigCalendar from './BigCalendar';
import { Row, Column, Item } from '@mui-treasury/components/flex';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import { UserCardNoLink } from './UserCard';
import API_doctor from '../api/API_doctor';
import API_patient from '../api/API_patient';
import Button from '@material-ui/core/Button';

var newappstyle = {
    container: {
        width: "90%",
        marginLeft: "auto", 
        marginRight: "auto"
    }, calendar: {
        width: "60%"
    }, form: {
        width: "35%",
        marginRight: "auto"
    }, card: {
        width: "20%"
    }, field: {
        width: "100%"
    }, okbutton: {
        backgroundColor: "#8BC24A",
        marginLeft: "auto", 
        marginRight: "5px", 
        marginTop: "30px", 
    }, kobutton: {
        backgroundColor: "#F95F62",
        marginLeft: "5px", 
        marginTop: "30px", 
    }
}

export default function NewAppointment({user}){
    
    const [patient, setPatient] = useState({})
    const [doctor, setDoctor] = useState({})

    useEffect(() => {
        API_patient.getPatient(user.googleId)
        .then((patient) =>{
        setPatient(patient)
        })
        .catch((err)=>{
            console.log(err)
        });
        API_doctor.getDoctor(patient.doctorId)
        .then((doctor) =>{
            console.log(doctor)
        setDoctor(doctor)
        })
        .catch((err)=>{
            console.log(err)
        });
    }, [user.googleId, patient.doctorId]);


    return(
        <>
            <h1>New Appointment</h1>
            <Row gap={1} p={1} style={newappstyle.container}>
                <Column style={newappstyle.form}  gap={'inherit'}  p={'inherit'}>
                    <Row gap={'inherit'} p={'inherit'}>
                        <Typography>With my doctor:</Typography>
                    </Row>
                            {doctor !== undefined && 
                            <div newappstyle={newappstyle.card}>
                                <UserCardNoLink title={doctor.name + ' ' + doctor.surname} />
                            </div>}
                    <Row gap={'inherit'} p={'inherit'}>
                        <TextField label="Date" variant="outlined" style={newappstyle.field}/>
                    </Row>
                    <Row gap={'inherit'} p={'inherit'}>
                        <TextField label="Hour" variant="outlined" style={newappstyle.field}/>
                    </Row>
                    <Row>
                        <Button
                            variant="contained"
                            color="secondary"
                            style={newappstyle.kobutton}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            style={newappstyle.okbutton}
                        >
                            Validate
                        </Button>
                    </Row>
                </Column>
                <Column style={newappstyle.calendar}  gap={'inherit'}>
                    <BigCalendar user={user}/>
                </Column>
            </Row>
            
        </>
    )
}