import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from "@material-ui/core/Button"
import moment from 'moment'

export default function EventModal(props) {
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
                        {props.event.conference && <Button variant="contained" color="primary" onClick={() => console.log("redirect to meeting with meetingURL (props.) "+ props.event.conference)}>Meeting</Button>}
                    </Modal.Footer>
            </Modal.Body>
        </Modal>
    )
}