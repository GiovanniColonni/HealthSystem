import React, { useState, useEffect, useRef } from 'react';
import Image from 'react-bootstrap/Image';
import DoctorAvatar from '../icons/Doctor_01.png';
import PatientAvatar from '../icons/Woman_01.png';
import { Row, Item, Column } from '@mui-treasury/components/flex';
import Button from '@material-ui/core/Button';
import { FaPen } from 'react-icons/fa';
import Divider from '@material-ui/core/Divider';
import API_doctor from '../api/API_doctor';
import API_patient from '../api/API_patient';
import { styled } from '@material-ui/core/styles';
import API from '../api/API';
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
        API.uploadProfileImage(user.googleId,file)
            .then((resp) => {
                console.log(resp)
                window.location.reload(true)        // DO NOT FORCE RELOAD
            })
            .catch((err) =>{
                console.log(err)
            })
    }

    const handleClick = () => {
        console.log("here")
        myRefname.current.click()
     }

    return (
        <div style={profilestyle.container}>
            <Row gap={5} p={2.5}>
                <Column>
                    {user.userType === 'Doctor' && 
                        <Image src={"/api/patient/doctorImage/"+user.googleId} roundedCircle style={profilestyle.avatar}/>
                    }
                    {user.userType === 'Patient' &&
                        <Image src={"/api/patient/doctorImage/"+user.googleId} roundedCircle style={profilestyle.avatar} />
                    }
                </Column>
                <Column>
                    <Item>
                        <div style={profilestyle.name}>
                            {currentuser.name + ' ' + currentuser.surname}
                        </div>
                        <div style={profilestyle.caption}>
                            Some info...
                        </div>
                    </Item>
                </Column>
                <Column style={profilestyle.commentblock}>
                    <Item>
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" ref={myRefname} type="file" onChange={(event) => fileSelectedHandler(event)}/>
                            <Button variant="contained"
                            color="secondary"
                            style={profilestyle.editbutton}
                            onClick={() => handleClick()}
                            startIcon={<FaPen />}>
                                Edit Profile Image
                            </Button>
                        </label>
                    </Item>
                </Column>
                
            </Row>
            {user.userType === 'Patient' 
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
                                Some info...
                            </div>
                        </Item>
                    </Column>
                    <Column style={profilestyle.commentblock}>
                        <Item>
                            <Button
                                variant="contained"
                                color="secondary"
                                style={profilestyle.changebutton}
                            >
                                Change Doctor
                            </Button>
                        </Item>
                    </Column>
                </Row></>
            }
        </div>
    )
}