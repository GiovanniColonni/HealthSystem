import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from "@material-ui/core/Button"
import moment from 'moment'
import { useHistory } from 'react-router';

export default function EventModal(props) {
    const history = useHistory()
    const [disableButton,setDisableButton] = useState(true)

    useEffect( () => {
        const difference = moment(props.event.start).diff(moment(),'minutes')
        if(difference < 15 && difference > -15){
            setDisableButton(false)
        }
    },[disableButton])

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
                        {props.event.conference && 
                            <Button variant="contained" color="primary" disabled={disableButton}
                            onClick={() => history.push({pathname: '/patient/meeting', state:{URL: props.event.conference}})}>Meeting
                            </Button> 
                        }
                    </Modal.Footer>
            </Modal.Body>
        </Modal>
    )
}