import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import Event from '../classes/Event'
import EventModal from '../components/EventModal'
import "react-big-calendar/lib/css/react-big-calendar.css";
import API from '../api/API';

const localizer = momentLocalizer(moment)

export default function BigCalendar() {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);
  const [show, setShow] = useState(false);
  const [eventClk, setEventClk] = useState(null)
  const handleClose = () => setShow(false);
  let ev = []
  useEffect(() => {
    // REMEMBER to change the doctorId=6; retrieve it from cookies
    API.getEvents(6,'doctor')
      .then((events) =>{
        setEvents(events)
      })
      .catch((err)=>{

      });
  }, []);
  // REMEMBER TO USE .toDate(); moment() doesn't work with bigCalendar
  const [events, setEvents] = useState([ev])
  return (
    <>
    <Calendar
      localizer={localizer}
      events={events}
      defaultDate={new Date()}
      defaultView="month"
      startAccessor="start"
      endAccessor="end"
      onSelectEvent={(event) => {setShow(true); setEventClk(event)}}
      style={{ height: 500 }} // remove style here. Use CSS file
    />
    {eventClk !== null && <EventModal show={show} animation={true} event={eventClk} onHide={handleClose}/>}
    </>
  );
}