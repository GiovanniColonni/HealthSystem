import React from 'react';
import Image from 'react-bootstrap/Image';
import DoctorAvatar from '../icons/Doctor_01.png';
import PatientAvatar from '../icons/Woman_01.png';
import { Row, Item, Column } from '@mui-treasury/components/flex';
import Button from '@material-ui/core/Button';
import { FaPen } from 'react-icons/fa';
import Divider from '@material-ui/core/Divider';
import API_doctor from '../api/API_doctor';
import API_patient from '../api/API_patient';


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
    const [currentuser, setCurrentUser] = useState(null)
    const [doctor, setDoctor] = useState(null)

    useEffect(() => {
        
        if (user.userType == "Patient") {
            API_patient.getPatient(user.id)
            .then((patient) =>{
            setCurrentUser(patient)
            })
            .catch((err)=>{
    
            });
            API_doctor.getDoctor(user.doctorId)
            .then((doctor) =>{
            setDoctor(doctor)
            })
            .catch((err)=>{
    
            });
        } else if (user.userType == "Doctor") {
            API_doctor.getDoctor(user.doctorId)
            .then((doctor) =>{
            setCurrentUser(doctor)
            })
            .catch((err)=>{
    
            });
        }
      }, []);

    return (
        <div style={profilestyle.container}>
            <Row gap={5} p={2.5}>
                <Column>
                    {user.userType === 'Doctor' && 
                        <Image src={DoctorAvatar} roundedCircle style={profilestyle.avatar} />
                    }
                    {user.userType === 'Patient' &&
                        <Image src={PatientAvatar} roundedCircle style={profilestyle.avatar} />
                    }
                </Column>
                <Column>
                    <Item>
                        <div style={profilestyle.name}>
                            {currentuser.name} 
                            {currentuser.surname}
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
                            style={profilestyle.editbutton}
                            startIcon={<FaPen />}
                        >
                            Edit Profile
                        </Button>
                    </Item>
                </Column>
            </Row>
            {user.userType === 'Patient' 
                && <>
                <Divider variant="middle"/>
                <Row gap={5} p={2.5}>
                    <Column>
                        <Image src={DoctorAvatar} roundedCircle style={profilestyle.avatar} />
                    </Column>
                    <Column>
                        <Item>
                            <div style={profilestyle.name}>
                                {doctor.name} {doctor.name}
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