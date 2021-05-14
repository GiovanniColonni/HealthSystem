import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import UserCard from './UserCard';
import {FaCheck, FaTimes} from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';

var notifcard = {
    btnJoin: {
        backgroundColor: "#8BC24A",
        borderColor: "#8BC24A",
        fontFamily: "Lato",
        fontWeight: "bold"
    }, btnYes: {
        backgroundColor: "#77D353"
    }, btnNo: {
        backgroundColor: "#F95F62"
    }
}

export default function NotificationCard() {
    return (
        <>
        <Card className="text-center">
        <Card.Body>
            <Card.Title>03/05/2019, 2pm</Card.Title>
            <Card.Text>
                <UserCard   title={"Patient Name"}
                            firstCaption={"Some info"}/>
            </Card.Text>
            <Button style={notifcard.btnJoin}>Join Appointement</Button>
        </Card.Body>
        </Card>

        <Card className="text-center">
        <Card.Body>
            <Card.Title>New Patient!</Card.Title>
            <Card.Text>
                <UserCard   title={"Patient Name"}
                            firstCaption={"Some info"}/>
            </Card.Text>
            <IconButton style={notifcard.btnYes}>
                <FaCheck />
            </IconButton>
            <IconButton style={notifcard.btnNo}>
                <FaTimes />
            </IconButton>
        </Card.Body>
        </Card>
        </>
    );
}