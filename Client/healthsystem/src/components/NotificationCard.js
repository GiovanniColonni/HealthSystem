import React from 'react';
import Card from 'react-bootstrap/Card';
import {UserCard} from './UserCard';
import Button from "@material-ui/core/Button"
import {FaCheck, FaTimes} from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router';

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
    }, card: {
        width: "60%",
        marginLeft: "auto",
        marginRight: "auto",
    }
}

export default function NotificationCard(props) {
    const history = useHistory()

    const handleAppointment = () => {
        if (props.userType === "Patient") {
            history.push({pathname: '/patient/meeting', state:{URL: props.URL}})
        } else if (props.userType === "Doctor") {
            history.push({pathname: '/doctor/meeting', state:{URL: props.URL, patient: { googleId: props.patientId}}})
        }
        props.handleClose()
    }

    return (
        <>
        <Card className="text-center">
        <Card.Body>
            <Card.Title>
                {props.type === 'join' && props.date}
                {props.type === 'newpatient' && "New Patient!"}
            </Card.Title>
            <Card.Text>
                {props.userType === 'Doctor' &&
                    <UserCard   title={props.patient.name + " " + props.patient.surname}
                                patient={props.patient}
                                patientId={props.patientId}
                                caption={props.patient.fiscalCode}/>
                }
                {/*props.userType === 'Patient' &&
                     "ACTIVE LINK" */
                }
            </Card.Text>
            {props.type === 'join' && 
                /*<Button style={notifcard.btnJoin}>Join Appointment</Button> */
                props.userType === "Patient" && 
                    <Button variant="contained" color="primary" style={notifcard.btnJoin}
                        onClick={() => handleAppointment()}>Join Appointment
                    </Button> 
            }    
            {props.type === 'join' &&     
                props.userType === "Doctor" && 
                    <Button variant="contained" color="primary" style={notifcard.btnJoin}
                        onClick={() => handleAppointment()}>Join Appointment
                    </Button>
            }

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