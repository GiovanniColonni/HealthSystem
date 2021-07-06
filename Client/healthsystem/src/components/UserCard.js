import React, { useEffect, useState } from 'react';
import { Row, Item } from '@mui-treasury/components/flex';
import {useHistory} from "react-router";
import API_doctor from '../api/API_doctor';
import {FaUserCircle} from 'react-icons/fa';
import { IconButton, Typography } from '@material-ui/core';
import {FaCheck} from 'react-icons/fa';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

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
    }, selectedTitle: {
        fontFamily: "Lato",
        fontWeight: 600,
        fontSize: '1rem',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        textAlign: 'left',
        color: '#fff'
    }, caption: {
        fontFamily: "Lato",
        fontSize: '0.875rem',
        color: '#758392',
        marginTop: -4,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        textAlign: 'left',
    }, selectedCaption: {
        fontFamily: "Lato",
        fontSize: '0.875rem',
        color: '#fff',
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
        margin: "7px",
        backgroundColor: "white"
    }, icon: {
        height: "50px",
        width: "50px"
    }, selectedBorder: {
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "#BEBEBE",
        borderRadius: "5px",
        padding: "5px",
        cursor: "pointer",
        margin: "7px",
        backgroundColor: '#3f51b5'
    }
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
      return (
        <Row gap={2} p={2.5} style={props.selected? cardstyle.selectedBorder : cardstyle.border}>
          <Item>
                <img src={"/api/patient/doctorImage/"+props.patientId} style={cardstyle.icon} alt={""}/>
          </Item>
          <Row wrap grow gap={0.5} minWidth={0}>
            <Item grow minWidth={0}>
              <div style={props.selected? cardstyle.selectedTitle : cardstyle.title}>{props.title}</div>
              <div style={props.selected? cardstyle.selectedCaption : cardstyle.caption}>
                {props.caption}
              </div>
            </Item>
          </Row>
        </Row>
      );
}
  
export function UserCardList({user, filter, setPatient}) {
  const [patientList,setPatientList] = useState([{}])


  async function getPatientList(doctorId){
    API_doctor.getPatientList(doctorId)
      .then((patients) =>{
        setPatientList(patients)
      })
  }

  useEffect( () => {
    getPatientList(user.googleId)
  },[user.googleId, patientList.length, filter]) 

  return (
    <>
      {patientList !== undefined && patientList.length > 0 && filter !== undefined && setPatient !== undefined &&
        <TogglePatientList patientList={patientList} filter={filter} setPatient={setPatient} />}
      {patientList !== undefined && patientList.length > 0 && filter !== undefined && setPatient === undefined &&
        patientList.map(user => (
          user.name !== undefined && (user.surname + " " + user.name).toLowerCase().includes(filter.toLowerCase()) &&
          <UserCard title={user.surname + " " + user.name} caption={user.fiscalCode} patientId={user.googleId} patient={user}/>
      )) }
      {patientList !== undefined && patientList.length > 0 && filter === undefined && 
        patientList.map(user => (
          user.name !== undefined &&
          <UserCard title={user.surname + " " + user.name} caption={user.fiscalCode} patientId={user.googleId} patient={user}/>
      )) }
      {patientList.length === 0 &&
        <Typography align="center" variant="h6">No Patients</Typography>}
    </>
  );
}

function TogglePatientList({patientList, filter, setPatient}) {
  const [selectedPatient, setSelectedPatient] = React.useState('');

  const handleChange = (event, nextPatient) => {
      setSelectedPatient(nextPatient);
      setPatient(nextPatient)
  };

  return (
    <>
    <ToggleButtonGroup orientation="vertical" value={selectedPatient} exclusive onChange={handleChange}>
      {patientList.map(user => (
          user.name !== undefined && (user.surname + " " + user.name).toLowerCase().includes(filter.toLowerCase()) && 
          <ToggleButton value={user.googleId}>
              <UserCardFiltered title={user.surname + " " + user.name} caption={user.fiscalCode} 
                patientId={user.googleId} patient={user} selected={(selectedPatient === user.googleId)}/>
          </ToggleButton>
      )) }
    </ToggleButtonGroup>
    </>
  )
}