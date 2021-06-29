import React, { useState, useEffect } from 'react';
import { Row, Column } from '@mui-treasury/components/flex';
import { Typography } from '@material-ui/core';
import API_doctor from '../api/API_doctor';
import API_patient from '../api/API_patient';
import API from '../api/API';
import ModalFeedback from './ModalFeedback';
import moment from 'moment';
import { BookingAppointmentCard } from './AppointmentCard';
import Doctor from '../classes/Doctor';
import Functions from '../functions/Functions';
import BigCalendar from './BigCalendar';

var newappstyle = {
    container: {
        width: "90%",
        marginLeft: "auto", 
        marginRight: "auto"
    }, calendar: {
        width: "50%"
    }, form: {
        width: "45%",
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
            if (currentDay.format('dddd') !== "Saturday" && currentDay.format('dddd') !== "Sunday") {
                for (var hours = 8; hours < 13; hours++) {
                    initList.push(moment().startOf('day').add(days, 'days').add(hours, 'hours').format("MM/DD/YYYY hh:mm A"));
                }
            }
        }
        return initList;
    }

    const [freeAppointmentList, setFreeAppointmentList] = useState(initAppointmentList());
    const [patient, setPatient] = useState({})
    const [doctor, setDoctor] = useState(new Doctor())
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        API_patient.getPatient(user.googleId)
        .then((patient) =>{
        setPatient(patient)
        })
        .catch((err)=>{
            console.log(err)
        });
        if (patient.doctorId !== undefined) {
            API_doctor.getDoctor(patient.doctorId)
            .then((doctor) =>{
                console.log(doctor)
                setDoctor(doctor)
            })
            .catch((err)=>{
                console.log(err)
            });
        }
        if (patient.doctorId !== undefined){
            API.getEvents(patient.doctorId, "Doctor")
            .then((appointments) =>{
                appointments.sort(function (left, right) {
                        return moment.utc(right.date).diff(moment.utc(left.date))
                })
                let updatedList = freeAppointmentList
                for (const busyAppointment of appointments) {
                    console.log("Current: " + moment(busyAppointment.start, "MM/DD/YYYY HH:mm").format("MM/DD/YYYY hh:mm A"))
                    const date = moment(busyAppointment.start, "MM/DD/YYYY HH:mm").format("MM/DD/YYYY HH:mm A")
                    updatedList = updatedList.filter((appointmentDate) => appointmentDate !== date);
                }
                console.log("Free List ", updatedList); 
                setFreeAppointmentList(updatedList)
            })
            .catch((err) =>{
                console.log(err)
            })
        }
    }, [user.googleId, patient.doctorId]);

    const AppointmentList = () =>{ 
        return (
            <>
            {doctor !== undefined && freeAppointmentList.length > 0 &&
                freeAppointmentList.map(appointment => (
                    <BookingAppointmentCard title={appointment} caption={doctor.name +" "+doctor.surname}
                        onClick={() => validateAppointment(appointment)}/>
                ))
            }
            {freeAppointmentList.length === 0 &&
                <Typography align="center" variant="h6">No Appointment Available</Typography>}
            </>
        );
    }

    const validateAppointment = (date) => {
        const formatedStartDate = moment(date, "MM/DD/YYYY hh:mm A").format("MM/DD/YYYY hh:mm A");
        const formatedEndDate = moment(date, "MM/DD/YYYY hh:mm A").add(1, 'hours').format("MM/DD/YYYY hh:mm A");

        API_patient.setAppointment(patient.googleId,patient.doctorId,formatedStartDate,"meeting",
                                    "Created by patient",formatedEndDate,Functions.createMeeting(patient.googleId, patient.doctorId))
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
                    <BigCalendar user={user} defaultView="week"/>
                </Column>
                <Column style={newappstyle.calendar}  gap={'inherit'} p={'inherit'}>
                    <AppointmentList />
                </Column>
            </Row>
            
            <ModalFeedback
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}