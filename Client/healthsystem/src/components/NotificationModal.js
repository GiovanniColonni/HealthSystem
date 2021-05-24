import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import NotificationCard from './NotificationCard';
import { FaBell } from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';

const notifList = [
    {
      type: 'join',
      date: '03/05/2019, 2pm',
      patient: 'Patient Name',
      info: 'Some info',
    },
    /*{
      type: 'newpatient',
      patient: 'Patient Name',
      info: 'Some info',
    },*/
  ];

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
                <div style={notifstyle.count}> {props.count} </div>
            </IconButton>
        </div>

    </>
    );
}

export default function NotificationMenuModal({user}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>

        <NotificationButton onClick={handleShow} count={notifList.length} />

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Notifications</Modal.Title>
            </Modal.Header>
            <Modal.Body> 
                
                {notifList.map(notif => (
                    <NotificationCard type={notif.type} userType={user.userType} patient={notif.patient} date={notif.date} info={notif.info}/>
                ))}
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
        </>
    );
}