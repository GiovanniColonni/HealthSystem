import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import NotificationButton from './NotificationButton';
import NotificationCard from './NotificationCard';

export default function NotificationModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>

        <NotificationButton onClick={handleShow} count="3" />

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Notifications</Modal.Title>
            </Modal.Header>
            <Modal.Body> 
                <NotificationCard />
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
        </>
    );
}