import React from 'react';
import BigCalendar from './BigCalendar';
import Button from 'react-bootstrap/Button';
import { Row, Item } from '@mui-treasury/components/flex';

var homestyle = {
    btnCreate: {
        backgroundColor: "#F95F62",
        borderColor: "#F95F62",
        fontFamily: "Lato",
        fontWeight: "bold",
        marginLeft: "auto",
        marginRight: "20px"
    },
    calendar: {
        marginLeft: "auto",
        marginRight: "auto",
        width: "80%",

    }
}

export default function Home({user}){

    return(
    <>
    <h1>My Appointments {user.username}</h1>
    {user.type === 'pat' &&
        <Row gap={2} p={2.5}>
            <Button style={homestyle.btnCreate}>New Appointment</Button>
        </Row>}
    <Row gap={2} p={2.5}>
        <div style={homestyle.calendar}>
            <BigCalendar />
        </div>
    </Row>
    </>
    )
}