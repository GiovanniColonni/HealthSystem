
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GoogleLogin from 'react-google-login';
import API from './api/API';
import React,{useState} from "react"

import axios from 'axios'
axios.defaults.headers.common['X-Requested-With'] = "XmlHttpRequest"
axios.defaults.headers.common['Access-Control'] = "XmlHttpRequest"



const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

function App() {
  const [loginState,setLoginState] = useState(false)
  
  let loginSuccess = function(resp){
      console.log("auth success")
        var formData = new FormData()
        console.log(resp)
        async function complete(){
        formData.set("id_token",resp.tokenObj.id_token)
        formData.set("email",resp.profileObj.email)
        formData.set("googleId",resp.profileObj.googleId)
        try{
          await axios.post("/login",formData)
          console.log("request sended")
          setLoginState(true)
        }catch(e){
          setLoginState(false)
        }
      }
      complete()
      
  }
  let loginFailure = function(resp){
    console.log(resp)
  }
  return (
    <div className="App">
       {!loginState && <GoogleLogin 
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Log in with google"
        onSuccess={loginSuccess}
        onFailure={loginFailure}
        cookiePolicy={"single_host_origin"}
        redirectUri="postmessage"
        scope="openid"
      />}
      {loginState && <h1>Logged</h1> }


    
    </div>
  );
}

export default App;
