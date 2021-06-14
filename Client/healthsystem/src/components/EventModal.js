import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from "@material-ui/core/Button"
import moment from 'moment'
import { useHistory } from 'react-router';

export default function EventModal(props) {
    const history = useHistory()
    const [disableButton,setDisableButton] = useState(true)

    useEffect( () => {
        const initialDifference = moment(props.event.start).diff(moment(),'minutes')
        const endDifference = moment().diff(props.event.end,'minutes')
        if(initialDifference < 15 && endDifference <= 0){
            setDisableButton(false)
        }
    },[disableButton, props.event.start, props.event.end])

    return(
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{props.event.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <p>{props.event.description}</p>
                    <p>Start Date: {moment(props.event.start).format('LLLL')}</p>
                    <p>End Date: {moment(props.event.end).format('LLLL')}</p>
                    <Modal.Footer>
                        {props.event.title === "meeting" &&
                            <Button variant="contained" color="primary" disabled={disableButton}
                            onClick={() => history.push({pathname: props.user.userType === "Patient" ? '/patient/meeting' : 'doctor/meeting', state:{URL: props.event.conference, patientId: props.patientId}})}>Meeting
                            </Button> 
                        }
                    </Modal.Footer>
            </Modal.Body>
        </Modal>
    )
}