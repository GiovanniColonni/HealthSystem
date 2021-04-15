import React from "react"
import GoogleLogin from 'react-google-login';
import {Redirect, useHistory} from "react-router"

import axios from 'axios'

import API from "../api/API"

// per csfr protection
axios.defaults.headers.common['X-Requested-With'] = "XmlHttpRequest"
axios.defaults.headers.common['Access-Control'] = "XmlHttpRequest"

function Login({setLoginState,setUser,loginState}){
 
    const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

    let history = useHistory()

    let loginSuccess = function(resp){
        
        const id_token = resp.tokenObj.id_token
        const email = resp.profileObj.email
        const googleId = resp.profileObj.googleId

        async function completeLogin(){
          API.postLogin(id_token,email,googleId)
          .then((logState) => setLoginState(logState))
          .catch((err) => setLoginState(false))
          
          history.push('/home')
      
        }
      
        completeLogin()
      
    }

    let loginFailure = function(resp){
        console.log(resp)
    }

    if(loginState === true){
        return <Redirect to={"/home"} />
    }
    return(
        
        <GoogleLogin 
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Log in with google"
            onSuccess={loginSuccess}
            onFailure={loginFailure}
            cookiePolicy={"single_host_origin"}
            redirectUri="postmessage"
            scope="openid"
        />
    )
  

}

export default Login;