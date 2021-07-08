import React, { useState, useEffect, useRef } from 'react';
import Image from 'react-bootstrap/Image';
import { Row, Item, Column } from '@mui-treasury/components/flex';
import Button from '@material-ui/core/Button';
import { FaPen } from 'react-icons/fa';
import Divider from '@material-ui/core/Divider';
import API_doctor from '../api/API_doctor';
import API_patient from '../api/API_patient';
import { styled } from '@material-ui/core/styles';
import API from '../api/API';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton } from '@material-ui/core';
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";

const Input = styled('input')({
    display: 'none',
  });

var profilestyle = {
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
    }, editbutton: {
        backgroundColor: "#8BC24A"
    }, changebutton: {
        backgroundColor: "#FF9052"
    }, commentblock: {
        marginLeft: "auto"
    }
}

export default function PersonalProfile({user}) {

    const [currentuser, setCurrentUser] = useState({})
    const [doctor, setDoctor] = useState({})
    let [loading, setLoading] = useState(false);

    const myRefname= useRef(null);

    useEffect(() => {
        if (user.userType === "Patient") {
            API_patient.getPatient(user.googleId)
            .then((patient) =>{
            setCurrentUser(patient)
            })
            .catch((err)=>{
                console.log(err)
            });
            API_doctor.getDoctor(currentuser.doctorId)
            .then((doctor) =>{
                console.log(doctor)
            setDoctor(doctor)
            })
            .catch((err)=>{
                console.log(err)
            });
        } else if (user.userType === "Doctor") {
            API_doctor.getDoctor(user.googleId)
            .then((doctor) =>{
            setCurrentUser(doctor)
            })
            .catch((err)=>{
    
            });
        }
    }, [user.googleId,currentuser.doctorId, user.userType]);

    const fileSelectedHandler = (event) =>{
        console.log(event.target.files[0])
        const file = event.target.files[0]
        const filename = event.target.files[0].name
        setLoading(true)
        API.uploadProfileImage(user.googleId,file)
            .then((resp) => {
                console.log(resp)
                setLoading(false)
            })
            .catch((err) =>{
                setLoading(false)
                console.log(err)
            })
    }

    const handleClick = () => {
        console.log("here")
        myRefname.current.click()
     }

    return (
        <div style={profilestyle.container}>
            {loading && 
                <Row style={{display: "block"}} gap={5} p={12.5}>
                    <HashLoader loading={loading} color={"#8BC24A"} speedMultiplier={1} size={150} />
                </Row>
            }
            {!loading && 
            <Row gap={5} p={2.5}>
                <Column>
                <Row>
                    {user.userType === 'Doctor' && 
                        <Image src={"/api/patient/doctorImage/"+user.googleId+ '?time='+ new Date() } roundedCircle style={profilestyle.avatar}/>
                    }
                    {user.userType === 'Patient' &&
                        <Image src={"/api/patient/doctorImage/"+user.googleId} roundedCircle style={profilestyle.avatar} />
                    }
                    <Row style={{marginBottom: 'auto'}}>
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" ref={myRefname} type="file" onChange={(event) => fileSelectedHandler(event)}/>
                            <Tooltip title="Change profile image" >
                                <IconButton 
                                    onClick={() => handleClick()}>
                                    <FaPen />
                                </IconButton>
                            </Tooltip>
                        </label>
                    </Row>
                </Row>
                </Column>
                <Column>
                    <Item>
                        <div style={profilestyle.name}>
                            {currentuser.name + ' ' + currentuser.surname}
                        </div>
                        <div style={profilestyle.caption}>
                            Birth date: {currentuser.date}
                            {user.userType === 'Patient' && 
                                <Typography style={profilestyle.caption}>Fiscal code: {currentuser.fiscalCode} </Typography>}
                        </div>
                    </Item>
                </Column>
                <Column style={profilestyle.commentblock}>
                    <Item>
                        <Tooltip title="Not implemented yet" >
                            <Button variant="contained"
                            color="secondary"
                            style={profilestyle.editbutton}
                            startIcon={<FaPen />}>
                                Edit Profile
                            </Button>
                        </Tooltip>
                    </Item>
                </Column>
            </Row>
            }
            {user.userType === 'Patient' && !loading
                && <>
                <Divider variant="middle"/>
                <Row gap={5} p={2.5}>
                    <Column>
                        <Image src={"/api/patient/doctorImage/"+currentuser.doctorId} roundedCircle style={profilestyle.avatar} />
                    </Column>
                    <Column>
                        <Item>
                            <div style={profilestyle.name}>
                                {doctor !== undefined && doctor.name + ' ' + doctor.surname}
                            </div>
                            <div style={profilestyle.caption}>
                                {doctor !== undefined && 
                                    <Typography style={profilestyle.caption}>Birth date: {doctor.date}</Typography>}
                            </div>
                        </Item>
                    </Column>
                    <Column style={profilestyle.commentblock}>
                        <Item>
                            <Tooltip title="Not implemented yet" >
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    style={profilestyle.changebutton}
                                >
                                    Change Doctor
                                </Button>
                            </Tooltip>
                        </Item>
                    </Column>
                </Row></>
            }
        </div>
    )
}