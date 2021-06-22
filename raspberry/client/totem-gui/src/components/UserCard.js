import React, { useEffect, useState } from 'react';
import { Row, Item } from '@mui-treasury/components/flex';
import {useHistory} from "react-router";
import {FaUserCircle} from 'react-icons/fa';
import { IconButton, Typography } from '@material-ui/core';
import {FaCheck} from 'react-icons/fa';

var cardstyle = { 
    title: {
        fontFamily: "Lato",
        fontWeight: 600,
        fontSize: '1rem',
        color: '#122740',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        textAlign: 'left',
    }, caption: {
        fontFamily: "Lato",
        fontSize: '0.875rem',
        color: '#758392',
        marginTop: -4,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        textAlign: 'left',
    }, border: {
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "#BEBEBE",
        borderRadius: "5px",
        padding: "5px",
        cursor: "pointer",
        margin: "7px"
    }, icon: {
        height: "50px",
        width: "50px"
    }
}

export function UserCardNoLink(props) {
  return (
    <>
    <Row gap={2} p={2.5} style={cardstyle.border}>
      <Item>
            <FaUserCircle style={cardstyle.icon}/>
      </Item>
      <Row wrap grow gap={0.5} minWidth={0}>
        <Item grow minWidth={0}>
          <div style={cardstyle.title}>{props.title}</div>
          <div style={cardstyle.caption}>
            {props.caption}
          </div>
        </Item>
      </Row>
    </Row>
    </>
  );
}

export function ChooseDoctorCard(props) {
  return (
    <>
    <Row gap={2} p={2.5} style={cardstyle.border}>
      <Item>
            <FaUserCircle style={cardstyle.icon}/>
      </Item>
      <Row wrap grow gap={0.5} minWidth={0}>
        <Item grow minWidth={0}>
          <div style={cardstyle.title}>{props.title}</div>
          <div style={cardstyle.caption}>
            {props.caption}
          </div>
        </Item>
      </Row>
      <Row>
        <IconButton onClick={props.onClick}>
          <FaCheck />
        </IconButton>
      </Row>
    </Row>
    </>
  );
}

export function UserCard(props) {
  
  let history = useHistory()

  useEffect( () => {
    console.log(props)
  },[]) 
  
      return (
        <div onClick={() => history.push({pathname:"/patientDetails",state: {patient: props.patient}})}>
        <Row gap={2} p={2.5} style={cardstyle.border}>
          <Item>
                <img src={"/api/patient/doctorImage/"+props.patientId} style={cardstyle.icon} alt={""}/>
          </Item>
          <Row wrap grow gap={0.5} minWidth={0}>
            <Item grow minWidth={0}>
              <div style={cardstyle.title}>{props.title}</div>
              <div style={cardstyle.caption}>
                {props.caption}
              </div>
            </Item>
          </Row>
        </Row>
        </div>
      );
}

export function UserCardFiltered(props) {
  
  let history = useHistory()

  useEffect( () => {
    console.log(props)
  },[]) 
  
      return (
        <div onClick={() => props.setPatient(props.patientId)}>
        <Row gap={2} p={2.5} style={cardstyle.border}>
          <Item>
                <img src={"/api/patient/doctorImage/"+props.patientId} style={cardstyle.icon} alt={""}/>
          </Item>
          <Row wrap grow gap={0.5} minWidth={0}>
            <Item grow minWidth={0}>
              <div style={cardstyle.title}>{props.title}</div>
              <div style={cardstyle.caption}>
                {props.caption}
              </div>
            </Item>
          </Row>
        </Row>
        </div>
      );
}