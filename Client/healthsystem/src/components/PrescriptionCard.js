import React, { useEffect, useState } from 'react';
import { Row, Item, Column } from '@mui-treasury/components/flex';
import { FaFileDownload } from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';
import API_patient from '../api/API_patient';
import API_doctor from '../api/API_doctor';
import moment from 'moment';
import { Typography } from '@material-ui/core';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader } from '@material-ui/core';
import { FcFinePrint } from 'react-icons/fc';

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
    //width: '90%',
    //margin: 'auto'
  }, column: {
    //width: '40%',
    //margin: 'auto'
}, 
}

export function PrescriptionCardList({googleId}) {
  const [prescriptionList, setPrescriptionList] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState();

  const handlePrescription = (event, prescription) => {
    console.log("Changing selected prescription: ", prescription)
    setSelectedPrescription(prescription);
  };
  const downloadPrescription = (pathFileSystem, date) =>{
    API_patient.getPrescription(pathFileSystem)
      .then((file) =>{
        let url = window.URL.createObjectURL(file)
        let a = document.createElement('a')
        a.href = url;
        a.download = pathFileSystem;
        a.click();
        a.remove() 
      })
      .catch((err) =>{
        console.log(err)
      })
  }

  useEffect(() => {
    // REMEMBER to change the doctorId=6; retrieve it from cookies
    if(googleId !== undefined){
      API_patient.getAllPrescriptions(googleId)
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
  }, [googleId]);

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
          <ObservationCard 
            downloadPrescription={downloadPrescription}
            prescription={selectedPrescription} />}
    </Column>
    </Row>
    </>
  );
}

export function LittlePrescriptionList({googleId}) {
  const [prescriptionList, setPrescriptionList] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState();

  const handlePrescription = (event, prescription) => {
    console.log("Changing selected prescription: ", prescription)
    setSelectedPrescription(prescription);
  };

  const downloadPrescription = (pathFileSystem, date) =>{
    console.log("Download prescription: ", pathFileSystem)
    API_patient.getPrescription(pathFileSystem)
      .then((file) =>{
        if (file !== undefined){
          console.log("File: ", file)
          let url = window.URL.createObjectURL(file)
          console.log("URL: ", url)
          let a = document.createElement('a')
          a.href = url;
          a.download = pathFileSystem;
          a.click();
          a.remove()
        }
      })
      .catch((err) =>{
        console.log(err)
      })
  }

  useEffect(() => {
    // REMEMBER to change the doctorId=6; retrieve it from cookies
    if(googleId !== undefined){
      API_patient.getAllPrescriptions(googleId)
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
  }, [googleId]);

  return (
    <>
    <Column p={3} style={liststyle.container}>
      <Row>
        {selectedPrescription !== undefined &&
            <ObservationCard 
              downloadPrescription={downloadPrescription}
              prescription={selectedPrescription} />}
        {!selectedPrescription &&
            <Typography>Select a prescription to see details</Typography>}
      </Row>
      <Row>
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
      </Row>
    </Column>
    </>
  );
}

function ObservationCard({prescription, downloadPrescription}) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <>
    {prescription && <Card variant="outlined">
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
    </Card>}
    </>
  )
}