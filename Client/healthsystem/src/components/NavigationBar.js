import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Notifications from './Notifications';

var navstyle = {
    nav: {
        bg: "light",
        borderColor: "#e3e3e3",
        borderBottomStyle: "solid" 
    },
    collapse: {
        color: "#FF9052"
    }
}


export default function NavigationBar() {
    return (
        <Navbar fixed="top" bg="light" expand="lg" style={navstyle.nav}>
            <Navbar.Brand href="#home">
            <img
                alt=""
                src="/icons/greeCross.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
            />{' '}
            My Health Way
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className={navstyle.collapse}/>
            <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className="mr-auto" >
                <Nav.Link href="#calendar">My Appointements</Nav.Link>
                <Nav.Link href="#patientlist">My Patient list</Nav.Link>
                </Nav>
                <Nav>
                    <Notifications />
                    <Nav.Link href="#myprofile">My Profile</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}