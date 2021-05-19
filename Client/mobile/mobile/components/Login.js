import React,{useContext, useEffect} from "react"
import {Text,View} from "react-native"
import UserContext from "../contexts/UserContext"
import {GoogleSignin, GoogleSigninButton, statusCodes} from '@react-native-community/google-signin';

function Login(){
    const userObj = useContext(UserContext)
    const googleConf = {
        webClientId: "844949237967-h0pnqs3orkq4159ngua6s4jp0fdqatl4.apps.googleusercontent.com",
        offlineAccess:false, // implicit auth quindi il server non agisce per il client ma il client per il server
        forceCodeForRefreshToken:true,
    }
    useEffect(()=>{
        GoogleSignin.configure(googleConf)
    },[userObj])

    const signIn = async () =>{
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo)
            userObj.setUser(userInfo)
          } catch (error) {
            console.log('Message', error.message);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              console.log('User Cancelled the Login Flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
              console.log('Signing In');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              console.log('Play Services Not Available or Outdated');
            } else {
              console.log('Some Other Error Happened');
            }
          }
    }
    const isSignedIn = async () =>{
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (!!isSignedIn) {
             getCurrentUserInfo()
        } else {
        console.log('Please Login')
        }
    }
    const getCurrentUserInfo = async () => {
        try {
          const userInfo = await GoogleSignin.signInSilently();
          userObj.setUser(userInfo);
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_REQUIRED) {
            alert('User has not signed in yet');
            console.log('User has not signed in yet');
          } else {
            alert("Something went wrong. Unable to get user's info");
            console.log("Something went wrong. Unable to get user's info");
          }
        }
    }
    const signOut = async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          setUser({}); // Remember to remove the user from your app's state as well
        } catch (error) {
          console.error(error);
        }
    }

    return(<View>
        <GoogleSigninButton style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Dark} onPress={signIn}/>
    </View>)
}
export default Login