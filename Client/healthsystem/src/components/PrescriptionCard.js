import React, { useEffect, useState } from 'react';
import { Row, Item } from '@mui-treasury/components/flex';
import { FaFileDownload } from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';
import API_patient from '../api/API_patient';
import API_doctor from '../api/API_doctor';
import Doctor from '../classes/Doctor';
import moment from 'moment';

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
      {prescriptionList.length == 0 && <h2>There are no prescriptions yet</h2>}
      {doctor !== undefined && 
        prescriptionList.map(prescription => (
              <PrescriptionCard title={prescription.date} caption={doctor.name +" "+doctor.surname} pathFileSystem={prescription.pathFileSystem} downloadPrescription={downloadPrescription}/>
        ))
      }
    </>
  );
}