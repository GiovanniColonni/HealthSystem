import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import EventModal from '../components/EventModal'
import "react-big-calendar/lib/css/react-big-calendar.css";
import Api from '../api/Api';
import API_patient from '../api/API_patient';
import Functions from '../functions/Functions';
const localizer = momentLocalizer(moment)


export default function BigCalendar(props) {
  const [show, setShow] = useState(false);
  const [createEvent, setCreateEvent] = useState(undefined)
  const [patientId, setPatientId] = useState(undefined)
  const [repeatValue, setRepeatValue] = useState(1)
  const [eventClk, setEventClk] = useState(null)
  let ev = []
  const [events, setEvents] = useState([ev])
  const handleClose = () => setShow(false);
  const {user} = props
  useEffect(() => {
    // REMEMBER to change the doctorId=6; retrieve it from cookies
    Api.getEvents(user.googleId,user.userType)
      .then((events) =>{
        if(events !== undefined){
          setEvents(events)
        }
      })
      .catch((err)=>{

      });
  }, [user.googleId, user.userType]);
  // REMEMBER TO USE .toDate(); moment() doesn't work with bigCalendar


  return (
    <>
    <Calendar
      selectable
      localizer={localizer}
      events={events}
      defaultDate={new Date()}
      defaultView={props.defaultView}
      startAccessor="start"
      endAccessor="end"
      onSelectEvent={(event) => {setShow(true); setEventClk(event)}}
      style={{ height: 500 }} // remove style here. Use CSS file
    />
    {eventClk !== null && <EventModal user={user} show={show} animation={true} event={eventClk} onHide={handleClose} patientId={eventClk.patientId}/>}
    </>
  );
}