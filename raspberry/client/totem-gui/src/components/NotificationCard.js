import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from "@material-ui/core/Button"
import { useHistory } from 'react-router';
import moment from 'moment';

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
    }, btnMsr: {
        backgroundColor: "#00A6FF"
    }, card: {
        width: "60%",
        marginLeft: "auto",
        marginRight: "auto",
    }
}

export default function NotificationCard(props) {
    const history = useHistory()

    const handleAppointment = () => {
        history.push({pathname: '/patient/meeting', state:{URL: props.URL}})
        props.handleClose()
    }

    const handleMeasure = () => {
        history.push('/measure')
        props.handleClose()
    }

    return (
        <>
        <Card className="text-center">
        <Card.Body>
            <Card.Title>
                {props.type === 'join' && props.date}
                {props.type === 'measure' && moment(props.date, "MM/DD/YYYY hh:mm A").format("MM/DD/YYYY hh:mm A")}
            </Card.Title>
            <Card.Text>
                {props.type === 'measure' &&
                     props.description}
            </Card.Text>
            {props.type === 'join' && 
                <Button variant="contained" color="primary" style={notifcard.btnJoin}
                    onClick={() => handleAppointment()}>Join Appointment
                </Button> 
            }
            {props.type === 'measure' && 
                <Button variant="contained" color="primary" style={notifcard.btnMsr}
                    onClick={() => handleMeasure()}>Start Measure
                </Button> 
            } 

        </Card.Body>
        </Card>
        </>
    );
}