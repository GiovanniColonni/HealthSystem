import React from 'react';
import { Row, Item } from '@mui-treasury/components/flex';
import IconButton from '@material-ui/core/IconButton';
import {FaCheck} from 'react-icons/fa';
import { Typography } from '@material-ui/core';
import moment from 'moment';

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
  return (
    <Row gap={2} p={2.5} style={cardstyle.border}>
      <Item grow minWidth={0}>
        <div style={cardstyle.title}>{props.title}</div>
        <div style={cardstyle.caption}>
          {"Doct. "+props.caption}
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
      <AppointmentCard title={props.title} caption={props.caption}
        isBooking={props.isBooking} />
    </div>
  )
}

export function AppointmentList({events, doctorName, doctorSurname, isClickable, isBooking}) {
  return (
    <>
      {isClickable === true && events.length > 0 &&
        events.map(appointment => (
            <AppointmentCardClickable 
                title={moment(appointment.start, "MM/DD/YYYY HH:mm").format("MM/DD/YYYY")} 
                caption={doctorName + " " + doctorSurname} 
                isBooking={isBooking}/>
        ))
      }
      {isClickable === false && events.length > 0 &&
        events.map(appointment => (
            <AppointmentCard 
                title={moment(appointment.start, "MM/DD/YYYY HH:mm").format("MM/DD/YYYY")} 
                caption={doctorName + " " + doctorSurname} 
                isBooking={isBooking}/>
        ))
      }
      {events.length === 0 &&
          <Typography align="center" variant="h6">No Appointment Available</Typography>}
    </>
  )
}