import React, { useState, useEffect } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Typography from '@material-ui/core/Typography';
import { Row, Column } from '@mui-treasury/components/flex';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import API from "../api/API"
import {useHistory} from "react-router-dom"
import Logo from "./Logo"
import doctor from '../icons/doctor.png'
import nurse from '../icons/nurse.png'
import patient from '../icons/patient.png'
import Modal from 'react-bootstrap/Modal';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';

const images = [
  {
    url: doctor,
    title: 'Doctor',
    width: '33%',
  },
  {
    url: nurse,
    title: 'Nurse',
    width: '34%',
  },
  {
    url: patient,
    title: 'Patient',
    width: '33%',
  },
];

var firstaccstyle = {
  colleft: {
    width: "40%",
    margin: "auto"
  }, colright: {
    width: "60%",
    margin: "auto"
  }, googlebttn: {
    maxWidth: "50px"
  }, item: {
    justifyContent: "center",
    alignItems: "center"
  }, text: {
    fontFamily: "Lato",
    color: "#000000",
    opacity: "0.54",
    fontSize: "18px",
    marginBottom: "0",
    padding: "8px"
  }, slogan: {
    fontFamily: "Bree Serif",
    color: "#47525E",
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: "13px",
    marginBottom: "0"
  }, title: {
    fontFamily: "Lato",
    color: "#47525E",
    fontWeight: "bold",
    fontSize: "24px",
  }, btn: {
      backgroundColor: "#8BC24A"
  }, image: {
    height: 100,
    width: 50
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 200
  },
  image: {
    position: 'relative',
    height: 100,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible, &:focus, &:active': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.1,
      },
      '& $imageMarked': {
        opacity: 0.1,
      },
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(1) + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

export default function FirstAccess({user, setUser}){
    let [userType,setUserType] = useState("")
    let [name,setName] = useState("")
    let [validateName,setValidateName] = useState(false)
    let [surname,setSurname] = useState("")
    let [validateSurname,setValidateSurname] = useState(false)
    let [CF,setCF] = useState("")
    let [validateCF,setValidateCF] = useState(false)
    let [birthday,setBirthday] = useState(new moment().format('MM/DD/YYYY'))

    const classes = useStyles();

    useEffect(() => {
      if(user.userType === "Patient"){
        console.log("go to Patient")
        history.push("/patient/selectDoctor")
      }else if(user.userType === "Doctor"){
        console.log("go to Doctor")
        history.push("/home")
      }
    },[user.userType]) 

    let buttonClick = (e) => {
      setUserType(e)
    }
    const history = useHistory()
    function submit() {
      const resp = API.submitFirstAccess(user["googleId"],name,surname,birthday,CF,userType)
        .then((resp) =>{
          if(resp.status == 200){
            let usr = user
            switch (userType) {
              case "Patient":
                  usr.userType = "Patient"
                  setUser(usr)
                  history.push("/patient/selectDoctor")
                break;
              case "Doctor":
                  usr.userType = "Doctor"
                  setUser(usr)
                  history.push("/home")
                break;
              default:
                break;
            }
          }
        })
        .catch()
    }
    let onChangeName = (e) => {
        setName(e.target.value)
    }
    let onChangeSurname = (e) => {
      setSurname(e.target.value)
    }
    let onChangeCF = (e) => {
      // controllare se corretto il CF
      setCF(e.target.value)
      return
    }

    const validateForm = (event) =>{
      event.preventDefault()
      let status = true
      if(name === ""){
        status = false
        setValidateName(true)
      }else{setValidateName(false)}
      if(surname === ""){
        status = false
        setValidateSurname(true)
      }else{setValidateSurname(false)}
      if(userType === "Patient" || userType === "Doctor" || userType === "Nurse" ){
        if(userType === "Patient" && CF == ""){
          status = false
          setValidateCF(true)
        }else if(userType === "Patient"){setValidateCF(false)}
      }else{status = false}
      if(status){
        submit()
      }
    }

    return(
      <Modal
        show="true"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation="false"
      >
        <Modal.Body>
          <Typography align="center" style={firstaccstyle.title}>We do not know you yet</Typography>
          <Row p={1}>
            <Column style={firstaccstyle.colleft} p={2}>
              <Row style={firstaccstyle.item}>
                <Logo />
              </Row>
              <Row gap={3} style={firstaccstyle.item}>
                <Typography align="center" style={firstaccstyle.slogan}>A new way to communicate and heal</Typography>
              </Row>
            </Column>
            <Column>
              <Divider orientation="vertical"  />
            </Column>
            <Column style={firstaccstyle.colright} p={2}>
              <form onSubmit={validateForm}>
                    <Row style={firstaccstyle.item} p={1}>
                      <TextField error={validateName} helperText={validateName && "The field cannot be empty"} 
                                variant="outlined" label="Name" size="small" fullWidth
                                onChange={(e)=>{onChangeName(e)}}/>
                    </Row>  
                      <Row style={firstaccstyle.item} p={1}>                
                        <TextField error={validateSurname} helperText={validateSurname && "The field cannot be empty"} 
                                variant="outlined" label="Surname" size="small" fullWidth
                                onChange={(e)=>{onChangeSurname(e)}}/>
                      </Row> 
                      {(userType === "Patient") && 
                      <Row style={firstaccstyle.item} p={1}>                                   
                        <TextField error={validateSurname} helperText={validateCF && "The field cannot be empty"} 
                                  variant="outlined" label="Fiscal Code" size="small" fullWidth
                                  onChange={(e)=> onChangeCF(e)}/>
                      </Row>}
                      <Row style={firstaccstyle.item} p={1}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <DatePicker
                            disableFuture
                            openTo="year"
                            format="dd/MM/yyyy"
                            label="Date of birth"
                            value={birthday}
                            onChange={(e) => setBirthday(moment(e).format('MM/DD/YYYY'))}
                            views={["year", "month", "date"]}
                            size="small" fullWidth inputVariant="outlined"
                          />
                        </MuiPickersUtilsProvider>
                    </Row>
                    <Row >
                      <Typography style={firstaccstyle.text}>I am a...</Typography>
                    </Row>
                    <Row style={firstaccstyle.item}>
                      <div className={classes.root}>
                        {images.map((image) => (
                          <ButtonBase
                          disableRipple
                            key={image.title}
                            className={classes.image}
                            style={{
                              width: image.width,
                            }}
                            onClick={(e) => buttonClick(image.title)}
                          >
                            <span
                              className={classes.imageSrc}
                              style={{
                                backgroundImage: `url(${image.url})`,
                              }}
                            />
                            <span className={classes.imageBackdrop} />
                            <span className={classes.imageButton}>
                              <Typography
                                component="span"
                                variant="subtitle1"
                                color="inherit"
                                className={classes.imageTitle}
                              >
                                {image.title}
                                <span className={classes.imageMarked} />
                              </Typography>
                            </span>
                          </ButtonBase>
                        ))}
                      </div>
                    </Row>
                    <Row style={firstaccstyle.item} p={1}>
                      <Button id={4} type="submit" 
                              variant="contained" color="secondary" fullWidth
                              style={firstaccstyle.btn}>Submit</Button>
                    </Row>
              </form>
              
            </Column>
          </Row>
        </Modal.Body>
      </Modal>
      )
}