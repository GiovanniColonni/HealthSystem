import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NotificationMenuModal from './NotificationModal';
import Api from '../api/Api';
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
    const [events, setEvents] = useState([])
    const [notifList, setNotifList] = useState([])
    const history = useHistory()


    useEffect(() => {
        const doEffect = () =>{
            Api.getEvents(user.googleId,user.userType)
            .then((events) =>{
            if(events !== undefined){
                let notifications = []
                events.forEach(evnt => {
                    //title is typeExamination
                    if(evnt.title === "meeting"){
                        const initialDifference = moment(evnt.start).diff(moment(),'minutes')
                        const endDifference = moment().diff(evnt.end,'minutes')
                        if(initialDifference < 15 && endDifference <= 0){
                            
                            notifications.push({type: "join", date: evnt.start, URL: evnt.conference})
                            setNotifList(notifications)
                            
                        }
                    } else if(evnt.title === "measure"){
                        const initialDifference = moment(evnt.start).diff(moment(),'minutes')
                        const endDifference = moment().diff(evnt.end,'minutes')
                        if(initialDifference < 15 && endDifference <= 0){
                            notifications.push({type: "measure", date: evnt.start, description: evnt.description})
                            setNotifList(notifications)
                        }
                    }
                });
                setEvents(events)
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
        Api.logout()
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
                <Nav.Link href="/prescriptionList">My Prescriptions</Nav.Link>
                <Nav.Link href="/measure">My Measures</Nav.Link>
                </Nav>
                <Nav>
                    <NotificationMenuModal user={user} notifList={notifList}/>
                <Nav.Link href="/profile">My Profile</Nav.Link>
                    <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </>
    );
}