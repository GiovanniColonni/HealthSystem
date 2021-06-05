import React, { useContext, useEffect, useState } from 'react';
import { AsyncStorage, Button, StyleSheet, Text, View } from 'react-native';
import * as Google from 'expo-google-app-auth';
import UserContext from "../contexts/UserContext"
import Constants from 'expo-constants';
import Api from "../api/Api"

export default function Login({navigation}) {
  
//  let [authState, setAuthState] = useState(null);
  let [headers,setHeaders] = useState("eih");
  let [googleId, setGoogleId] = useState("");
  let [name, setName] = useState("");
  let [token,setToken] = useState()
  let [email,setEmail] = useState()
  let userState = useContext(UserContext)

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
    /*
      if(userState.user.googleId !== ""){
      navigation.navigate("Home")
    }
    */
    
    if(userState.user.googleId !== ""){
      Api.postLogin(token,email,googleId)
        .then((resp)=>{
          console.log(resp)
          if(resp){
            navigation.navigate("Home")
          }
        })
        .catch((e) => {console.log(e)})
    }
    
  }, [googleId]);


  return (
    <View style={styles.container}>
      <Text>Expo AppAuth Example</Text>
      <Button
        title="Sign In with Google "
        onPress={() => { signInWithGoogleAsync(); 
        }}
      />
      <Button 
      title="post login"
      onPress={()=>{ Api.postLogin(token,userState.user.email,userState.user.googleId)
        .then((resp)=>{
          console.log(resp)
          if(resp){
            navigation.navigate("Home")
          }
        })
        .catch((e) => {console.log(e)})}}/>
      <Text>{googleId}</Text>
      <Text>{name}</Text>
      <Text>token : {token}</Text>
    </View>
  );
}