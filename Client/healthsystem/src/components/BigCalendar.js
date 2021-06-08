import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import EventModal from '../components/EventModal'
import "react-big-calendar/lib/css/react-big-calendar.css";
import API from '../api/API';
import Button from "@material-ui/core/Button"
import { Modal } from 'react-bootstrap';
import { Input } from '@material-ui/core';

const localizer = momentLocalizer(moment)

export default function BigCalendar(props) {
  const [show, setShow] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createEvent, setCreateEvent] = useState(undefined)
  const [eventClk, setEventClk] = useState(null)
  const handleClose = () => setShow(false);
  const handleCloseCreate = () => setShowCreateModal(false);
  const {user} = props
  let ev = []
  useEffect(() => {
    // REMEMBER to change the doctorId=6; retrieve it from cookies
    API.getEvents(user.googleId,user.userType)
      .then((events) =>{
        if(events !== undefined){
          setEvents(events)
        }
      })
      .catch((err)=>{

      });
  }, [user.googleId, user.userType]);
  // REMEMBER TO USE .toDate(); moment() doesn't work with bigCalendar
  const [events, setEvents] = useState([ev])

  const createEventFunction = (start, end) =>{
    setShowCreateModal(true)
    setCreateEvent({"start": moment(start).format('ddd MM/DD/YYYY HH:mm A'), "end": moment(end).format('ddd MM/DD/YYYY HH:mm A')})
  }

  return (
    <>
    <Calendar
      selectable
      localizer={localizer}
      events={events}
      defaultDate={new Date()}
      defaultView="week"
      startAccessor="start"
      endAccessor="end"
      onSelectEvent={(event) => {setShow(true); setEventClk(event)}}
      onSelectSlot={({start,end}) => createEventFunction(start,end)}
      style={{ height: 500 }} // remove style here. Use CSS file
    />
    {eventClk !== null && <EventModal show={show} animation={true} event={eventClk} onHide={handleClose}/>}
    <Modal show={showCreateModal} onHide={handleCloseCreate}>
      <Modal.Header closeButton>
          <Modal.Title>Create Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <p>Start Date: {createEvent !== undefined && createEvent.start}</p>
          <p>End Date: {createEvent !== undefined && createEvent.end}</p>
          <Input placeholder="Event Name" name="Event Name"></Input>
        <Modal.Footer>
          <Button variant="contained" onClick={() => console.log("onClick")}color="primary" disabled={false}> Submit
          </Button> 
        </Modal.Footer>
      </Modal.Body>
      </Modal>
    </>
  );
}