import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
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
import API_patient from "../api/API_patient";
import { UserContext } from "../context/UserContext";

const images = [
  {
    url: doctor,
    title: 'Doctor',
    width: '15%',
  },
  {
    url: nurse,
    title: 'Nurse',
    width: '15%',
  },
  {
    url: patient,
    title: 'Patient',
    width: '15%',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
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
    backgroundSize: 'contain',
    backgroundRepeat: "no-repeat",
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
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

function FirstAccess({user, setUser}){
    const classes = useStyles();
    let [userType,setUserType] = useState("")
    let [name,setName] = useState("")
    let [validateName,setValidateName] = useState(false)
    let [surname,setSurname] = useState("")
    let [validateSurname,setValidateSurname] = useState(false)
    let [CF,setCF] = useState("")
    let [validateCF,setValidateCF] = useState(false)
    let [birthday,setBirthday] = useState(new moment().format('MM/DD/YYYY'))


    let buttonClick = (e) => {
      setUserType(e)
    }
    const history = useHistory()
    function submit() {
      const resp = API.submitFirstAccess(user["googleId"],name,surname,birthday,CF,userType)
        .then((resp) =>{
          if(resp.status == 200){
            switch (userType) {
              case "Patient":
                  let usr = user
                  usr.userType = "Patient"
                  setUser(usr)
                  history.push("/patient/selectDoctor")
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
      <div className="FirstAccessPage">
        <form onSubmit={validateForm}>
              <h1>We don't know you yet</h1>
              <Row display="content">
              <Column maxWidth="100px">
                <Logo />
              </Column>
              <Column display="content">
                {images.map((image) => (
                  <ButtonBase
                    focusRipple
                    key={image.title}
                    onClick={(e) => buttonClick(image.title)}
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                    style={{
                      width: image.width,
                    }}
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
              </Column>
              </Row>
              <Row display="content" padding="10px">
                <TextField error={validateName} helperText={validateName && "The field cannot be empty"} id="filled-basic" label="Name" onChange={(e)=>{onChangeName(e)}}/>
              </Row>  
                <Row display="content" padding="10px">                
                  <TextField error={validateSurname} helperText={validateSurname && "The field cannot be empty"} id="filled-basic"  label="Surname" onChange={(e)=>{onChangeSurname(e)}}/>
                </Row> 
                {(userType === "Patient") && 
                <Row display="content" padding="10px">                                   
                  <TextField error={validateSurname} helperText={validateCF && "The field cannot be empty"} onChange={(e)=> onChangeCF(e)} id="filled-basic" label="Fiscal Code"/>
                </Row>}
                <Row display="content" padding="10px">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  disableFuture
                  openTo="year"
                  format="dd/MM/yyyy"
                  label="Date of birth"
                  value={birthday}
                  variant="outlined"
                  onChange={(e) => setBirthday(moment(e).format('MM/DD/YYYY'))}
                  views={["year", "month", "date"]}
                
                />
                </MuiPickersUtilsProvider>
              </Row>
              
              <Button id={4} type="submit" variant={"contained"} color={"secondary"}>Submit</Button>
        </form>
      </div>)
}

export default FirstAccess;