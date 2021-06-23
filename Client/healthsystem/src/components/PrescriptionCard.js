import React, { useEffect, useState } from 'react';
import { Row, Item, Column } from '@mui-treasury/components/flex';
import { FaFileDownload } from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';
import API_patient from '../api/API_patient';
import API_doctor from '../api/API_doctor';
import Doctor from '../classes/Doctor';
import moment from 'moment';
import { Typography } from '@material-ui/core';

import API from '../api/API';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import { FcFinePrint } from 'react-icons/fc';
import Divider from '@material-ui/core/Divider';

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
    }
}
  
export function PrescriptionCard(props) {

  const [doctor, setDoctor] = useState({})

  useEffect(() => {
    API_doctor.getDoctor(props.doctorId)
    .then((doctor) =>{
      if (doctor !== undefined) {
        setDoctor(doctor)
      }
    })
    .catch((err) =>{
      console.log(err)
    })
  }, [props.doctorId])

  return (
    <Row gap={2} p={2.5} style={cardstyle.border}>
      <Item grow minWidth={0}>
        <div style={cardstyle.title}>{props.title}</div>
        <div style={cardstyle.caption}>
          {"Doct. " + doctor.name + " " + doctor.surname}
        </div>
      </Item>
    </Row>
  );
}

var liststyle = { 
  container: {
    width: '90%',
    margin: 'auto'
  }, column: {
    width: '40%',
    margin: 'auto'
}, 
}

export function PrescriptionCardList({user}) {
  const [prescriptionList, setPrescriptionList] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState();

  const handlePrescription = (event, prescription) => {
    console.log("Changing selected prescription: ", prescription)
    setSelectedPrescription(prescription);
  };

  useEffect(() => {
    // REMEMBER to change the doctorId=6; retrieve it from cookies
    if(user.googleId !== undefined){
      API_patient.getAllPrescriptions(user.googleId)
        .then((prescription) =>{
          prescription.sort(function (left, right) {
            return moment.utc(right.date).diff(moment.utc(left.date))
          });
          setPrescriptionList(prescription)
        })
        .catch((err) =>{
          setPrescriptionList([])
          console.log(err)
        })
    }
  }, [user.googleId]);

  return (
    <>
    <Row p={3} style={liststyle.container}>
    <Column style={liststyle.column}>
          <ToggleButtonGroup
            orientation="vertical"
            value={selectedPrescription}
            exclusive
            onChange={handlePrescription}
            aria-label="text alignment"
          >
            {prescriptionList.length > 0 &&
              prescriptionList.map((prescription) => (
                    <ToggleButton value={prescription}>
                        <PrescriptionCard 
                          title={prescription.date} doctorId={prescription.doctorId}
                        />
                    </ToggleButton>
              ))
            }
          </ToggleButtonGroup>
      {prescriptionList.length === 0 &&
        <Typography align="center" variant="h6">No Prescriptions</Typography>}
    </Column>
    <Column style={liststyle.column}>
        {selectedPrescription !== undefined &&
          <ObservationCard prescription={selectedPrescription} />}
    </Column>
    </Row>
    </>
  );
}


function ObservationCard({prescription}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const downloadPrescription = (pathFileSystem, date) =>{
    API_patient.getPrescription(pathFileSystem)
      .then((file) =>{
        let url = window.URL.createObjectURL(file)
        let a = document.createElement('a')
        a.href = url;
        a.download = date+".pdf";
        a.click();
        a.remove() 
      })
      .catch((err) =>{
        console.log(err)
      })
  }

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <FcFinePrint size={30}/>
        }
        title={"Prescription of " + prescription.date}
        subheader="Related Observations"
        action={
          <IconButton >
            <FaFileDownload onClick={() => downloadPrescription(prescription.pathFileSystem, prescription.title)} />
          </IconButton>
        }
      />
      <CardContent>
        {prescription.notePrescription}
      </CardContent>
    </Card>
  )
}