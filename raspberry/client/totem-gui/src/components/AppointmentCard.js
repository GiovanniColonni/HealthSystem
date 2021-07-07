import React, { useEffect, useState } from 'react';
import { Row, Item } from '@mui-treasury/components/flex';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import {FaCheck} from 'react-icons/fa';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import Api from '../api/Api';

import Card from 'react-bootstrap/Card';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from 'react-router-dom';

var styles = { 
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
    }, btnJoin: {
        backgroundColor: "#8BC24A"
    }, btnUpload: {
        backgroundColor: "#00A6FF"
    }, card: {
        width: '260px',
        margin: '5px'
    }
}

function MeetingCard({appointment, isPassed}) {
  const [disableButton,setDisableButton] = useState(true)
  const history = useHistory()

  useEffect( () => {
      const initialDifference = moment(appointment.start).diff(moment(),'minutes')
      const endDifference = moment().diff(appointment.end,'minutes')
      if(initialDifference < 15 && endDifference <= 0){
          setDisableButton(false)
      }
  },[disableButton, appointment.start, appointment.end])

  const handleAppointment = () => {
        history.push({pathname: '/patient/meeting', state:{URL: appointment.conference}})
  }

  return (
    <>
    <Card border="success" className="text-center" style={styles.card}>
        <Card.Header style={(isPassed || disableButton)? {} : {backgroundColor: "#8BC24A", color: '#fff'}}>
          {moment(appointment.start, "MM/DD/YYYY HH:mm").format("MM/DD/YYYY HH:mm A")}
        </Card.Header>
        <Card.Body>
            <Card.Text>
                {appointment.description}
            </Card.Text>
            {isPassed === false && disableButton === true &&
            <Tooltip title="Available 15 minutes before the beginning" >
              <span>
              <Button variant="contained" color="primary"
                  disabled>
                  Join Appointment
              </Button></span>
            </Tooltip>}
            {isPassed === false && disableButton === false &&
              <Button variant="contained" color="primary" style={styles.btnJoin}
                  onClick={() => handleAppointment()}>
                  Join Appointment
              </Button>}
        </Card.Body>
    </Card>
    </>
  )
}

function MeasureCard({appointment, isPassed}) {
  const [disableButton,setDisableButton] = useState(true)

  const history = useHistory()

  const isTodayEvent = (event) => {
    return moment().isSame(event.start, 'day') && moment().isBefore(event.end, 'minute')
  }

  const handleStartMeasure = () => {
    history.push("/measure")
  }

  useEffect( () => {
      if(isTodayEvent(appointment)){
        setDisableButton(false)
      } else {
        setDisableButton(true)
      }
  },[disableButton, appointment.start, appointment.end])

  return (
    <Card border="primary" className="text-center" style={styles.card}>
        <Card.Header style={isPassed? {} : {backgroundColor: "#007bff", color: '#fff'}}>
            {moment(appointment.start, "MM/DD/YYYY HH:mm").format("MM/DD/YYYY")}
        </Card.Header>
        <Card.Body>
            <Card.Text>
                {appointment.description}
            </Card.Text>
            {isPassed === false &&
              <Button variant="contained" color="primary" style={styles.btnUpload}
                disabled disabled={disableButton}
                onClick={() => handleStartMeasure()}>
                  Start measure
              </Button>}
        </Card.Body>
    </Card>
  )
}

export function BookingAppointmentCard(props) {

  return (
    <Row gap={2} p={2.5} style={styles.border}>
      <Item grow minWidth={0}>
        <div style={styles.title}>{props.title}</div>
        <div style={styles.caption}>
          {props.caption}
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

export function AppointmentCard({appointment, isPassed}) {
  console.log("AppointmentCard: ", appointment)

  return (
    <>
    {appointment && appointment.title === "measure" &&
      <MeasureCard appointment={appointment} isPassed={isPassed}/>}
    {appointment.title === "meeting" &&
      <MeetingCard appointment={appointment} isPassed={isPassed}/>}
    </>
  )
}

export function TodayAppointmentList({user}) {
  
  const [todayEvents, setTodayEvents] = useState([])

  useEffect(() => {
    Api.getEvents(user.googleId, user.userType)
      .then((events) =>{
        let todayEvents = []
        console.log("Appointment List ", events);
        if (events !== undefined){
            todayEvents = events.filter(isTodayEvent)
            console.log("Today appointment List ", todayEvents);
            todayEvents = todayEvents.sort(function(a, b) {
              if (moment(a.start).isBefore(b.start)) {
                return 1
              }
              if (moment(a.start).isAfter(b.start)) {
                return -1
              }
              return 0
            })
            console.log("Sorted today appointment List ", todayEvents);
            setTodayEvents(todayEvents)
        }
      })
  }, [user.googleId, user.userType]);

  const isTodayEvent = (event) => {
    return moment().isSame(event.start, 'day') && moment().isBefore(event.end, 'minute')
  }
  return (
    <>
      {todayEvents && todayEvents.length > 0 &&
        todayEvents.map((appointment) => (
            <AppointmentCard appointment={appointment} isPassed={false} />
        ))
      }
      {todayEvents.length === 0 &&
          <Typography align="center" variant="h6">No Appointment Today</Typography>}
    </>
  )
}

export function FutureAppointmentList({user}) {
  
  const [futureEvents, setFutureEvents] = useState([])

  useEffect(() => {
    Api.getEvents(user.googleId, user.userType)
      .then((events) =>{
        let futureEvents = []
        console.log("Appointment List ", events);
        if (events !== undefined){
            futureEvents = events.filter(isFutureEvent)
            console.log("Future appointment List ", futureEvents);
            futureEvents = futureEvents.sort(function(a, b) {
              if (moment(a.start).isBefore(b.start)) {
                return 1
              }
              if (moment(a.start).isAfter(b.start)) {
                return -1
              }
              return 0
            })
            console.log("Sorted future appointment List ", futureEvents);
            setFutureEvents(futureEvents)
        }
      })
  }, [user.googleId, user.userType]);

  const isFutureEvent = (event) => {
    return moment().isBefore(event.start, 'day')
  }

  return (
    <>
      {futureEvents.length > 0 &&
        futureEvents.map((appointment) => (
            <AppointmentCard appointment={appointment} isPassed={false} />
        ))
      }
      {futureEvents.length === 0 &&
          <Typography align="center" variant="h6">No Future Appointment</Typography>}
    </>
  )
}

export function PassedAppointmentList({user}) {

  const [passedEvents, setPassedEvents] = useState([])

  useEffect(() => {
    Api.getEvents(user.googleId, user.userType)
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
    })
    .catch((err) =>{
        console.log(err)
    })
  }, [user.googleId, user.userType])

  const isPassedEvent = (event) => {
    return moment().isAfter(event.end)
  }

  return (
    <>
    {passedEvents.length > 0 &&
      passedEvents.map((appointment) => (
          <AppointmentCard appointment={appointment} isPassed={true} />
      ))
    }
    {passedEvents.length === 0 &&
        <Typography align="center" variant="h6">No Passed Appointment</Typography>}
    </>
  )
}