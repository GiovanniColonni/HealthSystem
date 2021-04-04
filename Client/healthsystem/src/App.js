
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GoogleLogin from 'react-google-login';
import API from './api/API';
import React,{useState} from "react"

import axios from 'axios'
axios.defaults.headers.common['X-Requested-With'] = "XmlHttpRequest"
axios.defaults.headers.common['Access-Contorl'] = "XmlHttpRequest"

function App() {
  const [loginState,setLoginState] = useState("no login")
  
  let loginSuccess = function(resp){
      console.log("auth success")
      // qui mettere fetch per attivare login utente
        var formData = new FormData()

        async function complete(){
        formData.set("id_token",resp.tokenObj.id_token);
        try{
          await axios.post("/login",formData)
          console.log("request sended")
          setLoginState("logged")
        }catch(e){
          setLoginState("error login")
        }
      }
      complete()
      
  }
  let loginFailure = function(resp){
    console.log(resp)
  }
  return (
    <div className="App">
        <GoogleLogin 
        clientId="844949237967-h0pnqs3orkq4159ngua6s4jp0fdqatl4.apps.googleusercontent.com"
        buttonText="Log in with google"
        onSuccess={loginSuccess}
        onFailure={loginFailure}
        cookiePolicy={"single_host_origin"}
        redirectUri="postmessage"
        scope="openid"
    />


    <h1>Login state {loginState}</h1>
    </div>
  );
}

export default App;
