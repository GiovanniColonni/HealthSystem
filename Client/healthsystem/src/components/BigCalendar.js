import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import EventModal from '../components/EventModal'
import "react-big-calendar/lib/css/react-big-calendar.css";
import API from '../api/API';
import Button from "@material-ui/core/Button"
import { Modal } from 'react-bootstrap';
import { FormControl, FormControlLabel, Input, Radio, RadioGroup } from '@material-ui/core';
import API_patient from '../api/API_patient';
import Functions from '../functions/Functions';
import PatientList from '../components/PatientList'
import TextField from '@material-ui/core/TextField';
const localizer = momentLocalizer(moment)


export default function BigCalendar(props) {
  const [show, setShow] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createEvent, setCreateEvent] = useState(undefined)
  const [patientNameFilter, setPatientNameFilter] = useState("")
  const [patientId, setPatientId] = useState(undefined)
  const [repeatValue, setRepeatValue] = useState(1)
  const [eventClk, setEventClk] = useState(null)
  const [typeExamination, setTypeExamination] = useState("meeting")
  let ev = []
  const [events, setEvents] = useState([ev])
  const handleClose = () => setShow(false);
  const handleCloseCreate = () =>{setShowCreateModal(false); setTypeExamination("meeting")}
  const {user} = props
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
      console.log("typeExamination  " + typeExamination)
      console.log("patientId  " + patientId)
  }, [user.googleId, user.userType, typeExamination, patientId]);
  // REMEMBER TO USE .toDate(); moment() doesn't work with bigCalendar

  const createEventFunction = (start, end) =>{
    if(moment(start) > moment()){
      setShowCreateModal(true)
      setCreateEvent({"start": moment(start).format('MM/DD/YYYY hh:mm A'), "end": moment(end).format('ddd MM/DD/YYYY hh:mm A')})
    }
  }

  const submit = () =>{
    console.log("Patient selected: ", patientId)
    if(createEvent.typeExamination !== undefined && createEvent.typeExamination !== ""){
      let URL = ""
      if(createEvent.typeExamination === "meeting"){
        URL = Functions.createMeeting(patientId,user.googleId)
      }
      if(createEvent.description === undefined){
        createEvent.description = ""
      }
      let patId = patientId
      if(createEvent.typeExamination === "busy"){
        patId = undefined
      }
      let doctId = user.googleId
      if(createEvent.typeExamination === "measure"){
        doctId = undefined
      }
      let startDate = moment(createEvent.start).format("MM/DD/YYYY hh:mm A")
      let endDate = moment(createEvent.end).format("MM/DD/YYYY hh:mm A")
      let repeatV = repeatValue
      if(!((typeExamination === "measure" || typeExamination === "meeting") && (patientId === undefined || patientId === null))){
        do{
          API_patient.setAppointment(patId,doctId,startDate,createEvent.typeExamination,createEvent.description,endDate,URL)
            .then((resp) =>{
              setShowCreateModal(false)
              setCreateEvent({})
              API.getEvents(user.googleId,user.userType)
                .then((events) =>{
                  if(events !== undefined){
                    setEvents(events)
                  }
                })
                .catch((err)=>{

              });
            })
            .catch((err) =>{
              console.log(err)
            })
            repeatV --
          startDate = moment(startDate).add(1,"days").format("MM/DD/YYYY hh:mm A")
          endDate = moment(endDate).add(1,"days").format("MM/DD/YYYY hh:mm A")
        }while(createEvent.typeExamination === "measure" && repeatV > 0)
      }
    }
  }

  const updateTypeExamination = (value) =>{
    let obj = createEvent
    obj.typeExamination = value
    setCreateEvent(obj)
    setTypeExamination(value)
  }

  const updateDescription = (value) =>{
    let obj = createEvent
    obj.description = value
    setCreateEvent(obj)
  }

  const updatePatientName = (value) =>{
    setPatientNameFilter(value)
  }

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
      min={moment('8:00am', 'h:mma').toDate()}
      max={moment('8:00pm', 'h:mma').toDate()}
      onSelectEvent={(event) => {setShow(true); setEventClk(event)}}
      onSelectSlot={({start,end}) => createEventFunction(start,end)}
      style={{ height: "80vh" }} // remove style here. Use CSS file
    />
    {eventClk !== null && <EventModal user={user} show={show} animation={true} event={eventClk} onHide={handleClose} patientId={eventClk.patientId}/>}
    {user && user.userType === "Doctor" && 
      <Modal show={showCreateModal} onHide={handleCloseCreate}>
        <Modal.Header closeButton>
            <Modal.Title>Create Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Start Date: {createEvent !== undefined && moment(createEvent.start).format('ddd MM/DD/YYYY hh:mm A')}</p>
          <p>End Date: {createEvent !== undefined && moment(createEvent.end).format('ddd MM/DD/YYYY hh:mm A')}</p>
          {/*<Input placeholder="Event Name" name="Event Name" onChange={(e) => updateTypeExamination(e.target.value) }></Input> */ }
          <form>
            <FormControl>
              <div className="RadioGroup">
                <RadioGroup aria-label="gender" name="gender1" value={typeExamination} onChange={(e) => updateTypeExamination(e.target.value)}>
                  <FormControlLabel value="meeting" label="meeting" control={<Radio />} />
                  <FormControlLabel value="measure" label="measure" control={<Radio />} />
                  <FormControlLabel value="busy" label="busy" control={<Radio />} />
                </RadioGroup>
              </div>
            </FormControl>
          </form>
          <div>
            <Input placeholder="Description" name="Description" onChange={(e) => updateDescription(e.target.value) } />
            {createEvent !== undefined && createEvent.typeExamination !== "busy" && <Input placeholder="Patient Name" name="patientName" onChange={(e) => updatePatientName(e.target.value) } />}
            {createEvent !== undefined && createEvent.typeExamination === "measure" && 
            <TextField
              id="outlined-number" label="Repeat for # days" type="number" defaultValue={1} onChange={(e) => setRepeatValue(e.target.value)} InputProps={{ inputProps: { min: 1, max: 30 } }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            }            
          </div>
          <div>
          {createEvent !== undefined && createEvent.typeExamination !== "busy" && <PatientList user={user} filter={patientNameFilter} setPatient={(patientId) => setPatientId(patientId)}/> }
          </div>
        </Modal.Body>
          <Modal.Footer>
            <Button variant="contained" onClick={() => submit()}color="primary" disabled={false}> Submit
            </Button> 
          </Modal.Footer>
        </Modal>
    }
    </>
  );
}