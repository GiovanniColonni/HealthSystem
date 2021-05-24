import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {UserCard} from './UserCard';
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

export default function NotificationCard(props) {
    return (
        <>
        <Card className="text-center">
        <Card.Body>
            <Card.Title>
                {props.type === 'join' && props.date}
                {props.type === 'newpatient' && "New Patient!"}
            </Card.Title>
            <Card.Text>
                {props.userType === 'doc' &&
                    <UserCard   title={props.patient}
                                firstCaption={props.info}/>
                }
                {props.userType === 'pat' &&
                    "ACTIVE LINK"
                }
            </Card.Text>
            {props.type === 'join' &&
                <Button style={notifcard.btnJoin}>Join Appointment</Button>}

            {props.type === 'newpatient' && 
            <>
                <IconButton style={notifcard.btnYes}>
                    <FaCheck />
                </IconButton>
                <IconButton style={notifcard.btnNo}>
                    <FaTimes />
                </IconButton>
            </>}

        </Card.Body>
        </Card>
        </>
    );
}