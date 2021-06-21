import React, { useContext, useEffect, useState } from 'react';
import { AsyncStorage, Button, StyleSheet, Text, View } from 'react-native';
import * as Google from 'expo-google-app-auth';
import UserContext from "../contexts/UserContext"

import Constants from 'expo-constants';
import Api from "../api/Api"

import { StackActions, NavigationActions } from 'react-navigation';

export default function Login({navigation}) {
  

  let [headers,setHeaders] = useState("eih");
  let [googleId, setGoogleId] = useState("");
  let [name, setName] = useState("");
  let [token,setToken] = useState()
  let [email,setEmail] = useState()
  let userState = useContext(UserContext)

  let resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home' })],
  });


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  async function signInWithGoogleAsync() {

    try {
      const result = await Google.logInAsync({
        androidClientId: "844949237967-q118p10ptsdbt2rhf3s3gjru910jcdt4.apps.googleusercontent.com",
        iosClientId: "844949237967-c1vqt61lrrrc6qnh1b44eq2r4tq8fma7.apps.googleusercontent.com",
        scopes: ['profile', 'email'], 
      }); 

      if (result.type === 'success') {
        
        userState.user.googleId = result.user.id
        userState.user.email = result.user.email
        userState.user.name = result.user.name
        
        setToken(result.accessToken)
        setName(result.user.name)
        setEmail(result.user.email)
        setGoogleId(result.user.id)
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  } 

  useEffect(() => {
   
    if(googleId !== "" ){
      
      Api.postLogin(token,email,googleId,name)
        .then((resp)=>{
          console.log(resp)
          // insert pushToken. Get expoPushToken from app.js
          
          Api.insertPushToken(userState.user.googleId,userState.expoPushToken)
            .then((resp) =>{
              console.log(token)
              console.log(resp)
            })
            .catch((err) =>{
              console.log(err)
            })
          
          if(resp){
            //navigation.navigate("Home",{googleId:googleId})
            navigation.dispatch(() => resetAction);
            //navigation.reset({index:0,routes:[{name:"Home"}]})
            
          }
        })
        .catch((e) => {console.log(e)})
      
      
    }
   

  }, [googleId]);


  return (
    <View style={styles.container}>
      <Button
        title="Sign In with Google "
        onPress={() => { signInWithGoogleAsync(); 
        }}
      />
    </View>
  );
}