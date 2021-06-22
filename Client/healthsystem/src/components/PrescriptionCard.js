import React, { useEffect, useState } from 'react';
import { Row, Item } from '@mui-treasury/components/flex';
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
import { FiChevronDown } from 'react-icons/fi';

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
        width: "60%",
        marginLeft: "auto",
        marginRight: "auto"
    }
}
  
export function PrescriptionCard(props) {
  return (
    <Row gap={2} p={2.5} style={cardstyle.border}>
      <Item grow minWidth={0}>
        <div style={cardstyle.title}>{props.title}</div>
        <div style={cardstyle.caption}>
          {"Doct. "+props.caption}
        </div>
      </Item>
      <Row>
        <IconButton >
          <FaFileDownload onClick={() =>props.downloadPrescription(props.pathFileSystem, props.title)} />
        </IconButton>
      </Row>
    </Row>
  );
}

export function PrescriptionCardList({user}) {
  const [prescriptionList, setPrescriptionList] = useState([]);
  const [doctor, setDoctor] = useState(new Doctor());
  const [selectedPrescription, setSelectedPrescription] = useState({});

  const handlePrescription = (event, prescription) => {
    setSelectedPrescription(prescription);
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
      API_patient.getPatient(user.googleId)
        .then((patient) =>{
          API_doctor.getDoctor(patient.doctorId)
            .then((doct) =>{
              setDoctor(doct)
            })
            .catch((err) =>{
              console.log(err)
              setDoctor()
            })
        })
    }
  }, [user.googleId]);

  return (
    <>
      <ToggleButtonGroup
      orientation="vertical"
      value={selectedPrescription}
      exclusive
      onChange={handlePrescription}
      aria-label="text alignment"
    >
      {doctor !== undefined && prescriptionList.length > 0 &&
        prescriptionList.map((prescription) => (
          
          <ToggleButton value={prescription}>
              <PrescriptionCard 
                title={prescription.date} caption={doctor.name +" "+doctor.surname} 
                pathFileSystem={prescription.pathFileSystem} 
                downloadPrescription={downloadPrescription}
              />
          </ToggleButton>
        ))
      }
    </ToggleButtonGroup>
      {prescriptionList.length === 0 &&
        <Typography align="center" variant="h6">No Prescriptions</Typography>}
    </>
  );
}


function ObservationCard({prescription}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader>

      </CardHeader>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Observation
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Typography variant="body2" color="textSecondary" component="p">Observations</Typography>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <FiChevronDown />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
            {prescription.notePrescription}
        </CardContent>
      </Collapse>
    </Card>
  )
}

export function PrescriptionDetails(props) {
  return (
    <>
    </>
  )
}