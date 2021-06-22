import React, { useContext, useEffect, useState } from 'react';
import { AsyncStorage, Button, StyleSheet, Text, View,Image } from 'react-native';
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
    text:{
      fontSize:19
    },
    textCustom:{
      fontSize:24,
      color:"#8bc24a"
    },
    buttonStyle:{
      fontSize:21,
      color:"#8bc24a"
    },
    view:{
      padding:15
    }
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
          
          // insert pushToken. Get expoPushToken from app.js
          
          Api.insertPushToken(userState.user.googleId,userState.expoPushToken)
            .then((resp) =>{
                // console.log(token)
                // console.log(resp)
              })
            .catch((err) =>{
              //console.log(err)
            })
          
          if(resp){
            navigation.navigate("Home")
            //navigation.dispatch(() => resetAction);
            //navigation.reset({index:0,routes:[{name:"Home"}]})
            
          }
        })
        .catch((e) => {
          //console.log(e)
        })
      
      
    }
   

  }, [googleId]);

  const img = require('../assets/greenCross.png')
  
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Image source={img}/>
      </View>
      <View style={styles.view}>
        <Text style={styles.textCustom}>My Health Way</Text>
      </View>
      <View style={styles.view}>
        <Text style={styles.text}>Welcome please log in</Text>
      </View>
      <View style={styles.view}>
        <Button style={styles.buttonStyle}
          title="Sign In with Google"
          color="#8bc24a"
          onPress={() => { signInWithGoogleAsync(); 
          }}
        />  

      </View>
      
      
    </View>
  );
}