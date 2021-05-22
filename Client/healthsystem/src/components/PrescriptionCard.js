import React from 'react';
import { Row, Item } from '@mui-treasury/components/flex';
import { FaFileDownload } from 'react-icons/fa';
import {useHistory} from "react-router";
import IconButton from '@material-ui/core/IconButton';

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
          {props.caption}
        </div>
      </Item>
      <Row>
        <IconButton >
          <FaFileDownload />
        </IconButton>
      </Row>
    </Row>
  );
}

export function PrescriptionCardList(props) {
  return (
    <>
      {props.prescriptionlist.map(prescription => (
          <PrescriptionCard title={prescription.date} caption={prescription.doctor}/>
        ))}
    </>
  );
}