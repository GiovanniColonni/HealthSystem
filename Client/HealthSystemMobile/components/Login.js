import React, { useContext, useEffect, useState } from 'react';
import { AsyncStorage, Button, StyleSheet, Text, View } from 'react-native';
import * as Google from 'expo-google-app-auth';
import UserContext from "../contexts/UserContext"

export default function Login({navigation}) {
//  let [authState, setAuthState] = useState(null);
  let [headers,setHeaders] = useState("eih");
  let [googleId, setGoogleId] = useState("");
  let [name, setName] = useState("");

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
        setGoogleId(result.user.id)
        setName(result.user.name)
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  } 

  useEffect(() => {
    if(userState.user.googleId !== ""){
      navigation.navigate("Home")
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
      <Text>{googleId}</Text>
      <Text>{name}</Text>
    </View>
  );
}
