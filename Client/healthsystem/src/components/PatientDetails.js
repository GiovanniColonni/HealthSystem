import React, { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import { Row, Item, Column } from '@mui-treasury/components/flex';
import Divider from '@material-ui/core/Divider';
import MeasureList from './MeasureList';
import { useHistory } from 'react-router';
import API_doctor from '../api/API_doctor';
import PrescriptionList from './PrescriptionCard';
import Typography from '@material-ui/core/Typography';
import { FutureAppointmentList } from './AppointmentCard';

var detailsstyle = {
    container: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto'
    }, titles: {
        margin: 'auto',
        fontSize: '30px',
        fontStyle: 'italic',
        color: '#616161'
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
    }, item: {
        justifyContent: "center",
        alignItems: "center"
    }, measures: {
    }, appointmentlist: {
        width: '50%',
        margin: 'auto'
    }
}

export default function PatientDetails(props) {
    const history = useHistory()
    console.log("History patient: ", history.location.state.patient)

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
    },[history.location.state.patient.googleId]);

    
    return (
        <div style={detailsstyle.container}>
            <Row gap={5} p={2.5}>
                <Typography variant="h5" style={detailsstyle.titles}>Patient's Details</Typography>
            </Row>
            <Row gap={5} p={2.5}>
                <Column>
                    <Image src={"/api/patient/doctorImage/"+history.location.state.patient.googleId} roundedCircle style={detailsstyle.avatar} />
                </Column>
                <Column>
                    <Item>
                        <div style={detailsstyle.name}>
                            {history.location.state.patient.name + " " + history.location.state.patient.surname }
                        </div>
                        <div style={detailsstyle.caption}>
                            {history.location.state.patient.fiscalCode}
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
                <Typography variant="h5" style={detailsstyle.titles}>Measure Details</Typography>
            </Row>
            <Row gap={5} p={2.5} style={detailsstyle.item}>
                <div style={detailsstyle.measures}>
                    <MeasureList googleId={history.location.state.patient.googleId} />
                </div>
                
            </Row>
            <Row gap={5} p={2.5}>
                <Typography variant="h5" style={detailsstyle.titles}>Measure Reminders</Typography>
            </Row>
            <Row gap={5} p={2.5} style={detailsstyle.item}>
                <div style={detailsstyle.measures}>
                    <FutureAppointmentList 
                        googleId={history.location.state.patient.googleId} 
                        userType={"Patient"}
                        onlyMeasure={true}
                        order={"increasing"}
                        noButton={true}  />
                </div>
            </Row>
            <Divider variant="middle"/>
            <Row gap={5} p={2.5}>
                <Typography variant="h5" style={detailsstyle.titles}>Passed Prescriptions</Typography>
            </Row>
            <Row gap={5} p={2.5} style={detailsstyle.item}>
                    <PrescriptionList googleId={history.location.state.patient.googleId} />
            </Row>
        </div>
    );
}