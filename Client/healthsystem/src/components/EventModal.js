import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from "@material-ui/core/Button"
import moment from 'moment'
import { useHistory } from 'react-router';
import API_patient from '../api/API_patient';

export default function EventModal(props) {
    const history = useHistory()
    const [disableButton,setDisableButton] = useState(true)
    const [patient,setPatient] = useState(undefined)

    useEffect( () => {
        const initialDifference = moment(props.event.start).diff(moment(),'minutes')
        const endDifference = moment().diff(props.event.end,'minutes')
        if(initialDifference < 15 && endDifference <= 0){
            setDisableButton(false)
        }
        if(props.patientId !== undefined){
            API_patient.getPatient(props.patientId)
                .then((patient) =>{
                    setPatient(patient)
                })
                .catch((err) =>{
                    console.log(err)
                })
        }
    },[disableButton, props.event.start, props.event.end, patient])

    return(
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                {props.event.title === "meeting" && patient !== undefined && <Modal.Title>{props.event.title + " with " + patient.name + " " + patient.surname}</Modal.Title>}
                {props.event.title !== "meeting" && <Modal.Title>{props.event.title}</Modal.Title>}
            </Modal.Header>
            <Modal.Body>
                    <p>{props.event.description}</p>
                    <p>Start Date: {moment(props.event.start).format('LLLL')}</p>
                    <p>End Date: {moment(props.event.end).format('LLLL')}</p>
                    <Modal.Footer>
                        {props.event.title === "meeting" &&
                            <Button variant="contained" color="primary" disabled={disableButton}
                            onClick={() => history.push({pathname: props.user.userType === "Patient" ? '/patient/meeting' : 'doctor/meeting', state:{URL: props.event.conference, patient: { googleId: props.patientId}}})}>
                                Join Appointment
                            </Button> 
                        }
                    </Modal.Footer>
            </Modal.Body>
        </Modal>
    )
}