import React, { useEffect, useState } from 'react';
import { Row, Item } from '@mui-treasury/components/flex';
import IconButton from '@material-ui/core/IconButton';
import {FaCheck} from 'react-icons/fa';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import API_doctor from '../api/API_doctor';
import API from '../api/API';

var cardstyle = { 
    title: {
        fontFamily: "Lato",
        fontWeight: 600,
        fontSize: '1rem',
        color: '#122740',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        textAlign: 'left',
    }, caption: {
        fontFamily: "Lato",
        fontSize: '0.875rem',
        color: '#758392',
        marginTop: -4,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        textAlign: 'left',
    }, border: {
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "#BEBEBE",
        borderRadius: "5px",
        padding: "5px",
        margin: "auto",
        width: "100%"
    }
}
  
export default function AppointmentCard(props) {
  const [doctorName, setDoctorName] = useState("")

  useEffect(() => {
    API_doctor.getDoctor(props.doctorId)
      .then((doctor) => {
        setDoctorName(doctor.name + " " + doctor.surname)
      })
      .catch((err) =>{
        console.log(err)
    })
  }, [props.doctorId])

  return (
    <Row gap={2} p={2.5} style={cardstyle.border}>
      <Item grow minWidth={0}>
        <div style={cardstyle.title}>{props.title}</div>
        <div style={cardstyle.caption}>
          {"Doct. " + doctorName}
        </div>
      </Item>
      <Row>
        {props.isBooking === true &&
        <IconButton onClick={props.onClick}>
          <FaCheck />
        </IconButton>}
      </Row>
    </Row>
  );
}

export function AppointmentCardClickable(props) {
  return (
    <div onClick={props.onClick} style={{cursor: "pointer"}}>
      <AppointmentCard title={props.title} doctorId={props.doctorId}
        isBooking={props.isBooking} />
    </div>
  )
}

export function AppointmentList({events, isClickable, isBooking}) {
  return (
    <>
      {isClickable === true && events.length > 0 &&
        events.map(appointment => (
            <AppointmentCardClickable 
                title={moment(appointment.start, "MM/DD/YYYY HH:mm").format("MM/DD/YYYY")} 
                doctorId={appointment.doctorId} 
                isBooking={isBooking}/>
        ))
      }
      {isClickable === false && events.length > 0 &&
        events.map(appointment => (
            <AppointmentCard 
                title={moment(appointment.start, "MM/DD/YYYY HH:mm").format("MM/DD/YYYY")} 
                doctorId={appointment.doctorId}
                isBooking={isBooking}/>
        ))
      }
      {events.length === 0 &&
          <Typography align="center" variant="h6">No Appointment Available</Typography>}
    </>
  )
}

export function PassedAppointmentList({patientId, isClickable}) {

  const [passedEvents, setPassedEvents] = useState([])

  useEffect(() => {
    API.getEvents(patientId, "Patient")
    .then((events) => {
        let passedEvents = []
        console.log("Appointment List ", events);
        if (events !== undefined){
            passedEvents = events.filter(isPassedEvent)
            console.log("Passed appointment List ", passedEvents);
            passedEvents = passedEvents.sort(function(a, b) {
              if (moment(a.start).isBefore(b.start)) {
                return 1
              }
              if (moment(a.start).isAfter(b.start)) {
                return -1
              }
              return 0
            })
            console.log("Sorted passed appointment List ", passedEvents);
            setPassedEvents(passedEvents)
        }
        console.log("Events: ", passedEvents)
    })
    .catch((err) =>{
        console.log(err)
    })
  }, [patientId])

  const isPassedEvent = (event) => {
    return moment().isAfter(event.end)
  }

  return (
    <AppointmentList events={passedEvents} 
        isBooking={false} isClickable={isClickable}
    />
  )
}