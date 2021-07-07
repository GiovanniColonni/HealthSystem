import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Button from "@material-ui/core/Button"
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { FcAbout, FcComboChart, FcDocument, FcPlanner } from 'react-icons/fc';
import IframeJitsi from './IframeJitsi';
import BigCalendar from './BigCalendar';
import TextField from '@material-ui/core/TextField';
import { Row, Column, Item } from '@mui-treasury/components/flex';
import MeasureList from './MeasureList';
import FileUpload from './FileUpload.jsx';
import API_doctor from '../api/API_doctor';
import API from '../api/API';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import PrescriptionList from './PrescriptionCard';
import API_patient from '../api/API_patient';
import Image from 'react-bootstrap/Image';


const drawerWidth = '50%';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    '& .MuiDrawer-paper': {
        top: 'auto',
        position: 'unset'
      },
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    '& .MuiDrawer-paper': {
        top: 'auto',
        position: 'unset'
      },
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
      top:'auto'
  }
}));

const menustyle = {
  iconlist: {
    zIndex: '3'
  },
  content: {
    width: '80%',
    marginRight: 'auto',
    zIndex: '1'
  },
  flex: {
    display: 'flex'
  }, 
  okbutton: {
    backgroundColor: "#8BC24A"
  }
}

export default function DoctorCall({user}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(0);
  const history= useHistory()
  const [prescription, setPrescription] = useState({file: undefined, observation: undefined});
  const [passedEvents, setPassedEvents] = useState([])

  useEffect(() => {
    API.getEvents(history.location.state.patient.googleId, "Patient")
    .then((events) => {
        let passedEvents = []
        console.log("Appointment List ", events);
        if (events !== undefined){
            passedEvents = events.filter(isPassedEvent)
            console.log("Passed appointment List ", passedEvents);
            setPassedEvents(passedEvents)
        }
        console.log("Events: ", passedEvents)
    })
    .catch((err) =>{
        console.log(err)
    })
  }, [history.location.state.patient.googleId])

  const isPassedEvent = (event) => {
    return moment().isAfter(event.end)
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (value) => {
    setContent(value);
    setOpen(true);
  };

  const uploadPrescription = (patientId) =>{
    //use history here
    console.log("UPLOAD PRESCRIPTION")
    console.log("PatientId", patientId)
    console.log("DoctorId", user.googleId)
    console.log("Prescription", prescription)
    API_doctor.uploadPrescription(patientId, prescription, user.googleId)
      .then((resp) =>
        alert("remove this alert")
      )
      .catch((err) =>{
        console.log(err)
      })
  }

  const updateUploadedFiles = (files) =>{
    let pr = prescription
    //handle array
    const f = files[0]
    pr.file = f
    setPrescription(pr)
  }

  const updateObservation = (observation) =>{
    let pr = prescription
    //handle array
    pr.observation = observation
    setPrescription(pr)
  }

  return (
        <div className={classes.root}>
        <CssBaseline />
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
            })}
            classes={{
            paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            }),
            }}
        >
            <div className={classes.toolbar}>
                {open === true ?
                    <IconButton onClick={handleDrawerClose}>
                        <FiChevronLeft /> 
                    </IconButton> :
                    <IconButton onClick={handleDrawerOpen}>
                        <FiChevronRight /> 
                    </IconButton>
                }
            </div>
            <Divider />
            <div style={menustyle.flex}>
            <List style={menustyle.iconlist}>
            {["Calendar", "Prescription", "Measures", "Patient's details"].map((text, index) => (
                <ListItem button key={text}  onClick={() => handleMenu(index)} >
                <ListItemIcon>
                    {index === 0 && <FcPlanner size={30}/>}
                    {index === 1 && <FcDocument size={30}/>}
                    {index === 2 && <FcComboChart size={30}/>}
                    {index === 3 && <FcAbout size={30}/>}
                </ListItemIcon>
                
                </ListItem>
            ))}
            </List>
              <div style={menustyle.content}>
                <Content 
                    value={content} doctor={user} visible={open} 
                    updateUploadedFiles={(files) => updateUploadedFiles(files)} passedEvents={passedEvents} 
                    uploadPrescription={(patientId) => uploadPrescription(patientId)} 
                    updateObservation={(observation) => updateObservation(observation)} />
              </div>
            </div>
        </Drawer>
        
        <main className={classes.content}>
                <IframeJitsi/>
        </main>
        </div>
  );
}


const contentstyle = {
  container: {
    margin: 'auto',
    width: '90%'
  }, item: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: '20px',
    paddingTop: '20px'
  }, title: {
    padding: '20px',
    margin: 'auto',
    fontStyle: 'italic',
    color: '#616161'
  }, measures: {
    width: '100%'
  }, center: {
    margin: 'auto'
  }, avatar: {
      maxHeight: "75px",
      maxWidth: "75px"
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
  }
}
function Content({value, visible, doctor, updateUploadedFiles, uploadPrescription, updateObservation}) {
  const history = useHistory()
  const [patient, setPatient] = useState({})

  useEffect(() => {
    API_patient.getPatient(history.location.state.patient.googleId)
    .then((patient) => {
      if (patient) {
        setPatient(patient)
      }
    })
  }, [history.location.state.patient.googleId])

  return (
    <>
      {value === 0 && visible === true &&
        <>
          <Typography variant="h5" style={contentstyle.title}>Calendar</Typography>
          <BigCalendar user={doctor} defaultView="day"/>
        </>}
        {value === 1 && visible === true &&
        <>
          <Typography variant="h5" style={contentstyle.title}>Prescription</Typography>
          <div style={contentstyle.container}>
            <FileUpload
              accept=".jpg,.pdf"
              label="Prescriptions"
              /*multiple*/
              updateFilesCb={(files) => updateUploadedFiles(files)}
            />
          </div>
              
          <Column style={contentstyle.container}>
            
            <Row style={contentstyle.item}>
              <TextField
                id="outlined-textarea"
                label="Observations"
                placeholder="Write here"
                multiline
                variant="outlined"
                fullWidth
                onChange={(e) => updateObservation(e.target.value)}
              />    
            </Row>
            <Row style={contentstyle.item}>
              <Button
                  variant="contained"
                  color="secondary"
                  style={menustyle.okbutton}
                  fullWidth
                  onClick={() => uploadPrescription(patient.googleId)}
                  disabled={false}
              >
                  Save Prescription and Notes
              </Button>
            </Row>
          </Column>

        </>}
        {value === 2 && visible === true &&
        <>
          <Typography variant="h5" style={contentstyle.title}>Measures</Typography>
          <Row style={contentstyle.item}>
            <div style={contentstyle.measures}>
              <MeasureList googleId={patient.googleId}/>
            </div>
          </Row>
        </>}
        {value === 3 && visible === true &&
        <>
          <Typography variant="h5" style={contentstyle.title}>Patient's details</Typography>
          <Row gap={5} p={2.5} style={contentstyle.item}>
            <Column>
                <Image src={"/api/patient/doctorImage/"+patient.googleId} roundedCircle style={contentstyle.avatar} />
            </Column>
            <Column>
                <Item>
                    <div style={contentstyle.name}>
                        {patient.name + " " + patient.surname }
                    </div>
                    <div style={contentstyle.caption}>
                        {patient.fiscalCode}
                    </div>
                </Item>
            </Column>
          </Row>
          <Row>
            <PrescriptionList googleId={patient.googleId} />
          </Row>
        </>}
    </>
  )
}