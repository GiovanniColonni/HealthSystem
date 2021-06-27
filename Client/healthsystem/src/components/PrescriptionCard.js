import React, { useEffect, useState } from 'react';
import { Row, Item, Column } from '@mui-treasury/components/flex';
import { FaFileDownload } from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';
import API_patient from '../api/API_patient';
import API_doctor from '../api/API_doctor';
import moment from 'moment';
import { Typography } from '@material-ui/core';

import { FcFinePrint } from 'react-icons/fc';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

var cardstyle = { 
    title: {
        fontFamily: "Lato",
        fontWeight: 600,
        fontSize: '1rem',
        color: '#122740',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        margin: 'auto'
    }, caption: {
        fontFamily: "Lato",
        fontSize: '0.875rem',
        color: '#758392',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        marginTop: 'auto', 
        marginBottom: 'auto',
        marginLeft: 'auto'
    }, titles: {
        margin: 'auto',
        fontSize: '30px',
        fontStyle: 'italic',
        color: '#616161'
    }
}
  
function PrescriptionCard({prescription, downloadPrescription}) {

  const [doctor, setDoctor] = useState({})

  useEffect(() => {
    API_doctor.getDoctor(prescription.doctorId)
    .then((doctor) =>{
      if (doctor !== undefined) {
        setDoctor(doctor)
      }
    })
    .catch((err) =>{
      console.log(err)
    })
  }, [prescription.doctorId])

  return (
    <>
    <AccordionSummary style={{zIndex: '1'}}>
    <IconButton style={{zIndex: '3'}}>
      <FaFileDownload style={{color: "#77D353"}} size={40}
        onFocus={(event) => event.stopPropagation()}
        onClick={(event) => downloadPrescription(event, prescription.pathFileSystem)} />
    </IconButton>
    <Typography style={{marginTop: 'auto', marginBottom: 'auto'}}>{prescription.date}</Typography>
    <Typography style={cardstyle.caption}>
      {"Doct. " + doctor.name + " " + doctor.surname}
    </Typography>
  </AccordionSummary>
  </>
  );
}

const useStyles = makeStyles({
  root: {
    width: '80%',
    whiteSpace: 'normal',
    margin: 'auto'
  },
});

export default function PrescriptionList({googleId, title}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState();
  const [prescriptionList, setPrescriptionList] = useState([]);
  const [donwloadProcess, setDownloadProcess] = useState(false)

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const downloadPrescription = (event, pathFileSystem) => {
    event.stopPropagation()
    API_patient.getPrescription(pathFileSystem)
      .then((file) =>{
        setDownloadProcess(false)
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
    {title === true &&
      <Typography variant="h5" style={cardstyle.titles}>My Prescription List</Typography>}
    <div className={classes.root}>
          {prescriptionList.length > 0 &&
              prescriptionList.map((prescription, index) => (
                <>
                <Accordion rounded expanded={expanded === index} 
                  onChange={donwloadProcess? "" : handleChange(index)}>
                  <PrescriptionCard 
                    index={index}
                    prescription={prescription}
                    downloadPrescription={downloadPrescription} />
                  <AccordionDetails>
                    <Column style={{margin: 'auto'}}>
                      <Row style={{margin: 'auto', paddingBottom: '10px'}}>
                        <Item>
                          <FcFinePrint size={35}/>
                        </Item>
                          <Typography style={cardstyle.title}>
                            Related Observations
                          </Typography>
                      </Row>
                      <Row style={{margin: 'auto'}}>
                        <Typography variant="body2">
                          {prescription.notePrescription}
                        </Typography>
                      </Row>
                    </Column>
                  </AccordionDetails>
                </Accordion>
                </>
              ))
            }
    </div>
    </>
  );
}