import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import {useHistory} from "react-router";

var modalstyle = {
    text: {
        marginTop: "30px"
    }, okbutton: {
        backgroundColor: "#8BC24A",
        marginLeft: "auto",
        marginRight: "auto"
    }
}

export default function ModalFeedback(props) {
    let history = useHistory()

    const gotoHome = () =>{
      history.push('\home');
    }
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <Typography align="center" variant="h6">New Appointement successful!</Typography>
          <Typography align="center" variant="subtitle1" style={modalstyle.text}>Go back to home</Typography>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="contained"
            color="secondary"
            style={modalstyle.okbutton}
            onClick={() => gotoHome()}
        >
            OK
        </Button>
        </Modal.Footer>
      </Modal>
    );
  }