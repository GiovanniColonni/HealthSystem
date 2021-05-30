import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import NotificationCard from './NotificationCard';
import { FaBell } from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';
import { Typography } from '@material-ui/core';

var notifstyle = {
    count: {
        height: "17px",
        width: "17px",
        maxWidth: "17px",
        minHeight: "17px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    
        position: "absolute",
        top: "4px",
        right: "6px",
        fontSize: "20px",
        fontWeight: "bold",
        fontFamily: "Bree Serif",
        borderRadius: "50%",
        color: "#FF9052",
    }
  };

function NotificationButton(props) {
    return (
    <>
        
        <div  >
            <IconButton onClick={props.onClick}>
                <FaBell />
                {props.count > 0 && <div style={notifstyle.count}> {props.count} </div>}
            </IconButton>
        </div>

    </>
    );
}

export default function NotificationMenuModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {user, notifList} = props

    return (
        <>

        <NotificationButton onClick={handleShow} count={notifList.length} />

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Notifications</Modal.Title>
            </Modal.Header>
            <Modal.Body> 
                {notifList.length > 0 && notifList.map(notif => (
                    <NotificationCard type={notif.type} userType={user.userType} patient={notif.patient} date={moment(notif.date).toString()} info={notif.info} URL={notif.URL}/>
                ))}
                {notifList.length == 0 && 
                    <Typography align="center" variant="h6">No Notifications</Typography>}
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
        </>
    );
}