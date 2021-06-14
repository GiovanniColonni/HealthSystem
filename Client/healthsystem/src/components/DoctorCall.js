import React, {useState} from 'react';
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
import { Row, Column } from '@mui-treasury/components/flex';
import MeasureList from './MeasureList';
import FileUpload from './FileUpload.jsx';
import API_doctor from '../api/API_doctor';
import { useHistory } from 'react-router-dom';


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
    API_doctor.uploadPrescription(patientId,prescription)
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
              <List style={menustyle.content}>
                <Content 
                    value={content} doctor={user} visible={open} 
                    updateUploadedFiles={(files) => updateUploadedFiles(files)} prescription={prescription} 
                    uploadPrescription={(patientId) => uploadPrescription(patientId)} 
                    updateObservation={(observation) => updateObservation(observation)} />
              </List>
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
    paddingBottom: '20px'
  }
}
function Content({value, visible, doctor, updateUploadedFiles, prescription, uploadPrescription, updateObservation}) {
  const history = useHistory()
  return (
    <>
      {value === 0 && visible === true &&
        <div>
          <Typography h1 style={contentstyle.title}>Calendar</Typography>
          <BigCalendar user={doctor} defaultView="day"/>
        </div>}
        {value === 1 && visible === true &&
        <div>
          <Typography h1 style={contentstyle.title}>Prescription</Typography>
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
                  onClick={() => uploadPrescription(history.location.state.patientId)}
                  disabled={false}
              >
                  Save Prescription and Notes
              </Button>
            </Row>
          </Column>

        </div>}
        {value === 2 && visible === true &&
        <div>
          <Typography h1 style={contentstyle.title}>Measures</Typography>
          <Row style={contentstyle.item}>
            <div style={contentstyle.measures}>
              <MeasureList />
            </div>
          </Row>
        </div>}
        {value === 3 && visible === true &&
        <div>
          <Typography h1 style={contentstyle.title}>Patient's details</Typography>
        </div>}
    </>
  )
}