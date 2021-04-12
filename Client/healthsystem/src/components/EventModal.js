import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
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
                        {props.event.conference && <p>Conference Link: {props.event.conference}</p>}
                    </Modal.Footer>
            </Modal.Body>
        </Modal>
    )
}