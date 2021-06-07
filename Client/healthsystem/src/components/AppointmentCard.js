import React, { useEffect, useState } from 'react';
import { Row, Item } from '@mui-treasury/components/flex';
import IconButton from '@material-ui/core/IconButton';
import API_patient from '../api/API_patient';
import API_doctor from '../api/API_doctor';
import Doctor from '../classes/Doctor';
import moment from 'moment';
import { Typography } from '@material-ui/core';
import {FaCheck} from 'react-icons/fa';

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
        width: "60%",
        marginLeft: "auto",
        marginRight: "auto"
    }
}
  
export function AppointmentCard(props) {
  return (
    <Row gap={2} p={2.5} style={cardstyle.border}>
      <Item grow minWidth={0}>
        <div style={cardstyle.title}>{props.title}</div>
        <div style={cardstyle.caption}>
          {"Doct. "+props.caption}
        </div>
      </Item>
      <Row>
        <IconButton onClick={props.onClick}>
          <FaCheck />
        </IconButton>
      </Row>
    </Row>
  );
}

export function AppointmentCardList({user}) {
  const [freeAppointmentList, setFreeAppointmentList] = useState([]);
  const [docAppointmentList, setdocAppointmentList] = useState([]);
  const [doctor, setDoctor] = useState(new Doctor());

  useEffect(() => {
    // REMEMBER to change the doctorId=6; retrieve it from cookies
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
            })
            .catch((err) =>{
                setdocAppointmentList([])
                console.log(err)
            })
    }
    if (docAppointmentList !== undefined){
        for (const busyAppointment of docAppointmentList) {
            removeAppointment(busyAppointment.date);
        }
        console.log(freeAppointmentList); 
    }
  }, [user.googleId, doctor, docAppointmentList]);

  const removeAppointment = (date) => {
    const updatedList = freeAppointmentList.filter((appointmentDate) => appointmentDate !== date);
    setFreeAppointmentList(updatedList);
  }

  return (
    <>
      {doctor !== undefined && freeAppointmentList.length > 0 &&
        freeAppointmentList.map(appointment => (
              <AppointmentCard title={appointment.date} caption={doctor.name +" "+doctor.surname}/>
        ))
      }
      {freeAppointmentList.length == 0 &&
        <Typography align="center" variant="h6">No Appointment Available</Typography>}
    </>
  );
}