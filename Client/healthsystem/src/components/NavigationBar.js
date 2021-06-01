import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NotificationMenuModal from './NotificationModal';
import Image from 'react-bootstrap/Image'
import CrossIcon from '../icons/greenCross.png';
import API from '../api/API';
import moment from 'moment';
import API_patient from '../api/API_patient';

var logostyle = {
    logo: {
        paddingTop: "2px",
        paddingBottom: "2px",
        paddingRight: "2px",
        paddingLeft: "2px",
    }, image: {
        height: "50px",
        width: "50px",
    }, name: {
        fontFamily: "Bree Serif",
        color: "#8BC24A",
        fontStyle: "italic",
        fontWeight: "bold",
        fontSize: "14px",
        marginBottom: "0"
    }
}

function Logo() {
    return (
        <>
            <div style={logostyle.logo}>
                <Image src={CrossIcon} style={logostyle.image}/>
                <p style={logostyle.name}>My Health Way</p>
            </div>
        </>
    );
}

var navstyle = {
    nav: {
        position: "sticky",
        bg: "light",
        borderColor: "#e3e3e3",
        borderBottomStyle: "solid",
        marginBottom: "20px",
    }
}


export default function NavigationBar({user}) {
    const [events, setEvents] = useState([])
    const [notifList, setNotifList] = useState([])


    useEffect(() => {
        const doEffect = () =>{
            API.getEvents(user.googleId,user.userType)
            .then((events) =>{
            if(events !== undefined){
                let notifications = []
                events.forEach(evnt => {
                    //title is typeExamination
                    if(evnt.title === "meeting"){
                        const initialDifference = moment(evnt.start).diff(moment(),'minutes')
                        const endDifference = moment().diff(evnt.end,'minutes')
                        if(initialDifference < 15 && endDifference <= 0){
                            if(user.userType === "Doctor"){
                                // get Patient username
                                API_patient.getPatient(evnt.patientId)
                                    .then((patient) =>{
                                        evnt.patient = patient.name + " " + patient.surname
                                        notifications.push({type: "join", date: evnt.start, URL: evnt.conference, patient: evnt.patient, patientId: evnt.patientId})
                                        setNotifList(notifications)
                                        setEvents(events)
                                    })
                                    .catch((err) =>{
                                        console.log(err)
                                    })
                            }else{
                                notifications.push({type: "join", date: evnt.start, URL: evnt.conference})
                                setNotifList(notifications)
                                setEvents(events)
                            }
                        }
                    }
                });
            }
            })
            .catch((err)=>{
                console.log(err)
            });
        }
        try {
            doEffect()
            setInterval(async () => {
                doEffect()
            }, 30000);
          } catch(e) {
            console.log(e);
          }
      }, [user.googleId, user.userType]);

    return (
        <>
        <Navbar  bg="light" style={navstyle.nav}>
            <Navbar.Brand>
                <Logo />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className="mr-auto" >
                <Nav.Link href="/home">My Appointments</Nav.Link>
                {user.userType === 'Doctor' && 
                    <Nav.Link href="/patientList">My Patient list</Nav.Link>}
                {user.userType === 'Patient' && 
                    <Nav.Link href="/prescriptionList">My Prescriptions</Nav.Link>}
                </Nav>
                <Nav>
                    <NotificationMenuModal user={user} notifList={notifList}/>
                    <Nav.Link href="/personalProfile">My Profile</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </>
    );
}