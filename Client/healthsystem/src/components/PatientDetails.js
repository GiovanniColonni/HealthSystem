import React from 'react';
import Image from 'react-bootstrap/Image';
import PatientAvatar from '../icons/Woman_01.png';
import { Row, Item, Column } from '@mui-treasury/components/flex';
import Divider from '@material-ui/core/Divider';
import SensorSelector from './SensorSelector';
import oxygen from '../icons/OxyIcon.png';
import heart from '../icons/HeartBeatingIcon.png';

const images = [
    {
      url: oxygen,
      title: 'Oxygen percentage',
      width: '50%',
    },
    {
      url: heart,
      title: 'Heart Beat',
      width: '50%',
    }
  ];

var detailsstyle = {
    container: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto'
    }, center: {
        marginLeft: 'auto',
        marginRight: 'auto',
    }, avatar: {
        maxHeight: "150px",
        maxWidth: "150px"
    }, name: {
        fontFamily: "Lato",
        fontWeight: 600,
        fontSize: '1rem',
        color: '#122740',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        textAlign: 'left',
    }, caption: {
        fontFamily: "Lato",
        fontSize: '0.875rem',
        color: '#758392',
        marginTop: -4,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        textAlign: 'left',
    }, commentblock: {
        marginLeft: "auto"
    }, commenttitle: {
        fontFamily: "Lato",
        fontWeight: 600,
        fontSize: '1rem',
        color: '#122740',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        textAlign: 'right',
    }, commenttext: {
        fontFamily: "Lato",
        fontSize: '0.875rem',
        color: '#758392',
        marginTop: -4,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        textAlign: 'right',
    }
}

export default function PatientDetails(props) {
    return (
        <div style={detailsstyle.container}>
            <Row gap={5} p={2.5}>
                <h1 style={detailsstyle.center}>Patient Details</h1>
            </Row>
            <Row gap={5} p={2.5}>
                <Column>
                    <Image src={PatientAvatar} roundedCircle style={detailsstyle.avatar} />
                </Column>
                <Column>
                    <Item>
                        <div style={detailsstyle.name}>
                            Name Surname
                        </div>
                        <div style={detailsstyle.caption}>
                            Some info
                            Some other info...
                        </div>
                    </Item>
                </Column>
                <Column style={detailsstyle.commentblock}>
                    <Item>
                        <div style={detailsstyle.commenttitle}>
                            Last Comment - 04/02/2021
                        </div>
                        <div style={detailsstyle.commenttext}>
                            Some observations from last appointment...
                        </div>
                    </Item>
                </Column>
            </Row>
            <Divider variant="middle"/>
            <Row gap={5} p={2.5}>
                <h1 style={detailsstyle.center}>Sensor Details</h1>
            </Row>
            <Row gap={5} p={2.5}>
                <SensorSelector images={images}/>
            </Row>
            <Divider variant="middle"/>
            <Row gap={5} p={2.5}>
                <h1 style={detailsstyle.center}>Appointment List</h1>
            </Row>
        </div>
    );
}