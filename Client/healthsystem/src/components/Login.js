import React from "react"
import GoogleLogin from 'react-google-login';

import axios from 'axios'

// per csfr protection
axios.defaults.headers.common['X-Requested-With'] = "XmlHttpRequest"
axios.defaults.headers.common['Access-Control'] = "XmlHttpRequest"

function Login(){
  let setLoginState = () => {return}

    const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID


    let loginSuccess = function(resp){
        
        // mettere questo su file API

        var formData = new FormData()
        async function complete(){
        
        formData.set("id_token",resp.tokenObj.id_token)
        formData.set("email",resp.profileObj.email)
        formData.set("googleId",resp.profileObj.googleId)

        try{
          let resp = await axios.post("/login",formData)
          
          if (resp.status === 200){
            setLoginState(true)
          }
          
        }catch(e){
          setLoginState(false)
        }
      }
      complete()
      
    }

    let loginFailure = function(resp){
        console.log(resp)
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