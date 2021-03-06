import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NotificationMenuModal from './NotificationModal';
import API from '../api/API';
import API_patient from '../api/API_patient';
import moment from 'moment';
import Logo from './Logo'
import {useHistory} from "react-router-dom"

var navstyle = {
    nav: {
        position: "sticky",
        bg: "light",
        borderColor: "#e3e3e3",
        borderBottomStyle: "solid",
        marginBottom: "20px",
    }
}


export default function NavigationBar({user,logout}) {
    const [notifList, setNotifList] = useState([])
    const history = useHistory()


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
                                        notifications.push({type: "join", date: evnt.start, URL: evnt.conference, patient: patient, patientId: evnt.patientId})
                                        setNotifList(notifications)
                                    })
                                    .catch((err) =>{
                                        console.log(err)
                                    })
                            }else{
                                notifications.push({type: "join", date: evnt.start, URL: evnt.conference})
                                setNotifList(notifications)
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

    const handleLogout = () => {
        console.log(document.cookie)
        API.logout()
            .then((resp) =>{
                if(resp){
                    logout()
                    document.cookie.split(";").forEach((c) => {
                        document.cookie = c
                            .replace(/^ +/, "")
                            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/login");
                        });
                    history.push("/login");
                    console.log(document.cookie)
                }
            })
    }

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
                    <>
                    <Nav.Link href="/prescriptionList">My Prescriptions</Nav.Link>
                    <Nav.Link href="/measureList">My Measures</Nav.Link>
                    </>}
                </Nav>
                <Nav>
                    <NotificationMenuModal user={user} notifList={notifList}/>
                    <Nav.Link href="/personalProfile">My Profile</Nav.Link>
                    <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </>
    );
}