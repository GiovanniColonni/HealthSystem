import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NotificationMenuModal from './NotificationModal';
import Image from 'react-bootstrap/Image'
import CrossIcon from '../icons/greenCross.png';

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


export default function NavigationBar() {
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
                <Nav.Link href="/patientList">My Patient list</Nav.Link>
                </Nav>
                <Nav>
                    <NotificationMenuModal />
                    <Nav.Link href="/personalProfile">My Profile</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </>
    );
}