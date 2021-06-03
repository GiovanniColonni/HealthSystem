import React, { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import { Row, Item, Column } from '@mui-treasury/components/flex';
import Divider from '@material-ui/core/Divider';
import SensorSelector from './SensorSelector';
import { useHistory } from 'react-router';
import API_doctor from '../api/API_doctor';

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
    const [comment, setComment] = useState("")

    useEffect(() => {
        API_doctor.getLastPatientComment(history.location.state.patient.googleId)
            .then((comment) =>{
                console.log(comment)
                setComment(comment)
            })
            .catch((err) =>{
                console.log(err)
            })
    },[]);

    const history = useHistory()
    console.log(history.location.state.patient)
    return (
        <div style={detailsstyle.container}>
            <Row gap={5} p={2.5}>
                <h1 style={detailsstyle.center}>Patient Details</h1>
            </Row>
            <Row gap={5} p={2.5}>
                <Column>
                    <Image src={"/patient/doctorImage/"+history.location.state.patient.googleId} roundedCircle style={detailsstyle.avatar} />
                </Column>
                <Column>
                    <Item>
                        <div style={detailsstyle.name}>
                            {history.location.state.patient.name + " " + history.location.state.patient.surname }
                        </div>
                        <div style={detailsstyle.caption}>
                            {/*Some info
                            Some other info... */}
                        </div>
                    </Item>
                </Column>
                <Column style={detailsstyle.commentblock}>
                    <Item>
                        <div style={detailsstyle.commenttitle}>
                            {/* Last Comment - 04/02/2021 */}
                            {"Last Comment - " + comment.dateStart }
                        </div>
                        <div style={detailsstyle.commenttext}>
                            {/*Some observations from last appointment... */}
                            {comment && comment.description}
                        </div>
                    </Item>
                </Column>
            </Row>
            <Divider variant="middle"/>
            <Row gap={5} p={2.5}>
                <h1 style={detailsstyle.center}>Sensor Details</h1>
            </Row>
            <Row gap={5} p={2.5}>
                <SensorSelector />
            </Row>
            <Divider variant="middle"/>
            <Row gap={5} p={2.5}>
                <h1 style={detailsstyle.center}>Appointment List</h1>
            </Row>
        </div>
    );
}