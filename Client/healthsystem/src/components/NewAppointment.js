import React, { useState, useEffect } from 'react';
import { Row, Column, Item } from '@mui-treasury/components/flex';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import { UserCardNoLink } from './UserCard';
import API_doctor from '../api/API_doctor';
import API_patient from '../api/API_patient';
import API from '../api/API';
import Button from '@material-ui/core/Button';
import ModalFeedback from './ModalFeedback';
import moment from 'moment';
import AppointmentCard from './AppointmentCard';

export function AppointmentCardList({user}) {
    

    useEffect(() => {
        // REMEMBER to change the doctorId=6; retrieve it from cookies
        
    }, [user.googleId]);


    

    
}

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
    const initAppointmentList = () => {
        const initList = [];
        for (var days = 1; days < 8; days++) {
            const currentDay = moment().startOf('day').add(days, 'days');
            if (currentDay.format('dddd') != "Saturday" && currentDay.format('dddd') != "Sunday") {
                for (var hours = 8; hours < 18; hours++) {
                    if (hours != 13){
                        initList.push(moment().startOf('day').add(days, 'days').add(hours, 'hours').format('dddd MMMM Do YYYY, h:mm a'));
                    }
                }
            }
        }
        return initList;
    }

    const [freeAppointmentList, setFreeAppointmentList] = useState(initAppointmentList());
    const [docAppointmentList, setdocAppointmentList] = useState([]);
    const [patient, setPatient] = useState({})
    const [doctor, setDoctor] = useState({})
    const [modalShow, setModalShow] = useState(false);
    const [dateStart, setDateStart] = useState();
    const [dateEnd, setDateEnd] = useState();

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
        
        if (user.googleId !== undefined){
            API_patient.getPatient(user.googleId)
            .then((patient) =>{
            API_doctor.getDoctor(patient.doctorId)
                .then((doct) =>{
                setDoctor(doct)
                })
                .catch((err) =>{
                console.log(err)
                setDoctor()
                })
            })
        }
        if(doctor !== undefined){
            API.getEvents(doctor.googleId, "Doctor")
            .then((appointment) =>{
            appointment.sort(function (left, right) {
                    return moment.utc(right.date).diff(moment.utc(left.date))
                });
                setdocAppointmentList(appointment)
                console.log(appointment)
                })
                .catch((err) =>{
                    setdocAppointmentList([])
                    console.log(err)
                })
        }
        /*if (docAppointmentList !== undefined){
            console.log("Doc List" + docAppointmentList);
            for (const busyAppointment of docAppointmentList) {
                removeAppointment(busyAppointment.dateStart);
            }
            console.log("Free List " + freeAppointmentList); 
        }*/
    }, [user.googleId, patient.doctorId]);

    const selectedAppointment = (date) => {
        const formatedStartDate = moment(date, "MM/DD/YYYY hh:mm");
        setDateStart(formatedStartDate.format("MM/DD/YYYY hh:mm"));
        const formatedEndDate = formatedStartDate.add(1, 'hours');
        setDateEnd(formatedEndDate.format("MM/DD/YYYY hh:mm"));
    }

    const removeAppointment = (date) => {
        const updatedList = freeAppointmentList.filter((appointmentDate) => appointmentDate !== date);
        setFreeAppointmentList(updatedList);
    }

    const AppointmentList = () =>{ 
        return (
            <>
            {doctor !== undefined && freeAppointmentList.length > 0 &&
                freeAppointmentList.map(appointment => (
                    <AppointmentCard title={appointment} caption={doctor.name +" "+doctor.surname} 
                        onClick={() => selectedAppointment(appointment)}/>
                ))
            }
            {freeAppointmentList.length == 0 &&
                <Typography align="center" variant="h6">No Appointment Available</Typography>}
            </>
        );
    }

    const validateAppointment = () => {
        API_patient.setAppointment(patient.googleId,patient.doctorId,dateStart,"meeting",
                                    "my description",dateEnd,"Let's wait")
            .then((resp) =>{
                if(resp.status === 200){
                    setModalShow(true)
                }
                return true
            }).catch((err) =>{
                console.log(err);
                return false;
            })
    }

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
                            onClick={() => validateAppointment()}
                        >
                            Validate
                        </Button>

                        <ModalFeedback
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </Row>
                </Column>
                <Column style={newappstyle.calendar}  gap={'inherit'} p={'inherit'}>
                    <AppointmentList user={user} />
                </Column>
            </Row>
            
        </>
    )
}