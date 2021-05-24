import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';

/*for navigation*/
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
/*-------------*/

import Login from "./components/Login"
import Home from "./components/Home"

/*Context*/
import UserContext from "./contexts/UserContext"
/*-------*/



/*
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
*/
export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);

  let initialRouteName = "Home"
  /*Auth*/
  const [user,setUser] = useState("user")
  /*---*/

  const Stack = createStackNavigator()
  useEffect(()=>{
    if(user === {}){
      
      initialRouteName="Login"
    }
  })


  const userObj = {user,setUser}
  return (
    <UserContext.Provider value={userObj}>

    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Login" component={Login}/>
      </Stack.Navigator>
    </NavigationContainer>

    </UserContext.Provider>
    
    
  );
}

