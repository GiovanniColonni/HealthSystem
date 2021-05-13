import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image'
import NotificationModal from './NotificationModal';
import Logo from './Logo';

var navstyle = {
    nav: {
        bg: "light",
        borderColor: "#e3e3e3",
        borderBottomStyle: "solid",
        paddingBottom: "-100px"
    }
}


export default function NavigationBar() {
    return (
        <Navbar fixed="top" bg="light" expand="lg" style={navstyle.nav}>
            <Navbar.Brand href="#home">
                <Logo />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className="mr-auto" >
                <Nav.Link href="#calendar">My Appointements</Nav.Link>
                <Nav.Link href="#patientlist">My Patient list</Nav.Link>
                </Nav>
                <Nav>
                    <NotificationModal />
                    <Nav.Link href="#myprofile">My Profile</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}