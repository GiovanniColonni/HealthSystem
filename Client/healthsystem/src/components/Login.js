import React,{useState} from "react"
import GoogleLogin from 'react-google-login';
import {Redirect, useHistory} from "react-router"
import { Row, Column } from '@mui-treasury/components/flex';
import Logo from "./Logo"
import Modal from 'react-bootstrap/Modal';
import Divider from '@material-ui/core/Divider';

import axios from 'axios'

import API from "../api/API"
import { Typography } from "@material-ui/core";

// per csfr protection
axios.defaults.headers.common['X-Requested-With'] = "XmlHttpRequest"
axios.defaults.headers.common['Access-Control'] = "XmlHttpRequest"

var loginstyle = {
  colleft: {
    width: "40%"
  }, colright: {
    width: "60%",
    margin: "auto"
  }, googlebttn: {
    maxWidth: "50px"
  }, item: {
    justifyContent: "center",
    alignItems: "center"
  }, text: {
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
  }
}

export default function Login({setLoginState,setUser,loginState}){

  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

  let [accessError,setAccessError] = useState(false)
  let history = useHistory()

  let loginSuccess = function(resp){
      
    console.log(resp.takenObj)
    const id_token = resp.tokenObj.id_token
    const email = resp.profileObj.email
    const googleId = resp.profileObj.googleId

    async function completeLogin(){
      API.postLogin(id_token,email,googleId)
      .then((logState) => {
        setAccessError(!logState)
          if(logState === false){
            history.push("/login")
          }else{
          console.log("completeLogin")
          history.push('/home')
          setLoginState(logState)
          }
        })
      .catch((err) => {
          history.push('/login')
          setLoginState(false)
        })
    }
  
    completeLogin()
    
  }

  let loginFailure = function(resp){
      console.log(resp)
  }

  if(loginState)
    return <Redirect to="/home" />
  return(
    <Modal
        show="true"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation="false"
      >
        <Modal.Body>
          <Typography align="center" style={loginstyle.title}>Sign in with google</Typography>
          <Row p={1}>
            <Column style={loginstyle.colleft} p={2}>
              <Row style={loginstyle.item}>
                <Logo />
              </Row>
              <Row gap={3} style={loginstyle.item}>
                <Typography align="center" style={loginstyle.text}>A new way to communicate and heal</Typography>
              </Row>
              
              
            </Column>
            <Column>
              <Divider orientation="vertical"  />
            </Column>
            <Column style={loginstyle.colright}>
              <Row style={loginstyle.item}>
                <GoogleLogin 
                    clientId={GOOGLE_CLIENT_ID}
                    buttonText="Log in with google"
                    onSuccess={loginSuccess}
                    onFailure={loginFailure}
                    cookiePolicy={"single_host_origin"}
                    redirectUri="postmessage"
                    scope="openid"
                    style={loginstyle.googlebttn}
                />
                {accessError && <h1>Errorre di accesso</h1>}
              </Row>
              
            </Column>
          </Row>
        </Modal.Body>
      </Modal>
  )
  

}