import React, { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import { Row, Item, Column } from '@mui-treasury/components/flex';
import Divider from '@material-ui/core/Divider';
import MeasureList from './MeasureList';
import { useHistory } from 'react-router';
import API_doctor from '../api/API_doctor';
import API from '../api/API';
import { AppointmentCardClickable, AppointmentList } from './AppointmentCard';
import { Typography } from '@material-ui/core';
import moment from 'moment';

var detailsstyle = {
    container: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto'
    }, center: {
        marginLeft: 'auto',
        marginRight: 'auto',
    }, avatar: {
        maxHeight: "150px",
        maxWidth: "150px"
    }, name: {
        fontFamily: "Lato",
        fontWeight: 600,
        fontSize: '1rem',
        color: '#122740',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        textAlign: 'left',
    }, caption: {
        fontFamily: "Lato",
        fontSize: '0.875rem',
        color: '#758392',
        marginTop: -4,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        textAlign: 'left',
    }, commentblock: {
        marginLeft: "auto"
    }, commenttitle: {
        fontFamily: "Lato",
        fontWeight: 600,
        fontSize: '1rem',
        color: '#122740',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        textAlign: 'right',
    }, commenttext: {
        fontFamily: "Lato",
        fontSize: '0.875rem',
        color: '#758392',
        marginTop: -4,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        textAlign: 'right',
    }, item: {
        justifyContent: "center",
        alignItems: "center"
    }, measures: {
        width: '60%',
        margin: 'auto'
    }, appointmentlist: {
        width: '50%',
        margin: 'auto'
    }
}

export default function PatientDetails(props) {
    const history = useHistory()
    console.log("History patient: ", history.location.state.patient)

    const [comment, setComment] = useState("")
    const [passedEvents, setPassedEvents] = useState([])
    const [doctor, setDoctor] = useState({})

    useEffect(() => {
        API_doctor.getLastPatientComment(history.location.state.patient.googleId)
            .then((comment) =>{
                console.log(comment)
                setComment(comment)
            })
            .catch((err) =>{
                console.log(err)
            })
        API_doctor.getDoctor(history.location.state.patient.doctorId)
        .then((doctor) =>{
            console.log(doctor)
            setDoctor(doctor)
        })
        .catch((err) =>{
            console.log(err)
        })
        API.getEvents(history.location.state.patient.googleId, "Patient")
            .then((events) => {
                let passedEvents = []
                console.log("Appointment List ", events);
                if (events !== undefined){
                    passedEvents = events.filter(isPassedEvent)
                    console.log("Passed appointment List ", passedEvents);
                    setPassedEvents(passedEvents)
                }
                console.log("Events: ", passedEvents)
            })
            .catch((err) =>{
                console.log(err)
            })
    },[history.location.state.patient.googleId]);

    const isPassedEvent = (event) => {
        return moment().isAfter(event.end)
    }

    const AppointmentList = () =>{ 
        return (
            <>
            {passedEvents.length > 0 &&
                passedEvents.map(appointment => (
                    <AppointmentCardClickable 
                        title={moment(appointment.start, "MM/DD/YYYY HH:mm").format("MM/DD/YYYY")} 
                        caption={doctor.name +" "+doctor.surname} 
                        isBooking={false}/>
                ))
            }
            {passedEvents.length === 0 &&
                <Typography align="center" variant="h6">No Appointment Available</Typography>}
            </>
        );
    }


    return (
        <div style={detailsstyle.container}>
            <Row gap={5} p={2.5}>
                <h1 style={detailsstyle.center}>Patient Details</h1>
            </Row>
            <Row gap={5} p={2.5}>
                <Column>
                    <Image src={"/api/patient/doctorImage/"+history.location.state.patient.googleId} roundedCircle style={detailsstyle.avatar} />
                </Column>
                <Column>
                    <Item>
                        <div style={detailsstyle.name}>
                            {history.location.state.patient.name + " " + history.location.state.patient.surname }
                        </div>
                        <div style={detailsstyle.caption}>
                            {/*Some info
                            Some other info... */}
                        </div>
                    </Item>
                </Column>
                <Column style={detailsstyle.commentblock}>
                    <Item>
                        <div style={detailsstyle.commenttitle}>
                            {/* Last Comment - 04/02/2021 */}
                            {"Last Comment - " + comment.dateStart }
                        </div>
                        <div style={detailsstyle.commenttext}>
                            {/*Some observations from last appointment... */}
                            {comment && comment.description}
                        </div>
                    </Item>
                </Column>
            </Row>
            <Divider variant="middle"/>
            <Row gap={5} p={2.5}>
                <h1 style={detailsstyle.center}>Sensor Details</h1>
            </Row>
            <Row gap={5} p={2.5} style={detailsstyle.item}>
                <div style={detailsstyle.measures}>
                    <MeasureList />
                </div>
                
            </Row>
            <Divider variant="middle"/>
            <Row gap={5} p={2.5}>
                <h1 style={detailsstyle.center}>Appointment List</h1>
            </Row>
            <Row gap={5} p={2.5} style={detailsstyle.item}>
                <Column style={detailsstyle.appointmentlist}>
                    <AppointmentList events={passedEvents} 
                        isBooking={false} isClickable={true}
                        doctorName={doctor.name} doctorSurname={doctor.surname} />
                </Column>
                <Column style={detailsstyle.appointmentlist}>
                </Column>
            </Row>
        </div>
    );
}