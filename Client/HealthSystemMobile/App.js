import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect, useRef  } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation'

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

import UserContext from "./contexts/UserContext"
import Login from "./components/Login"
import Home from "./components/Home"
import MeasureHistory from './components/MeasureHistory';


import { StackRouter } from 'react-navigation';
import Api from './api/Api';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  let [user,setUser] = useState({googleId:undefined,username:undefined,email:undefined});
  let [isSigned,setIsSigned] = useState(false)
  let userState = {user,setUser,expoPushToken}
  const notificationListener = useRef();
  const responseListener = useRef();
  
  const AppStackNavigator = createStackNavigator({
    
    Home:{
      screen: Home,
      navigationOptions: ({navigation}) =>({
        title: `Homepage`,
        headerLeft: () => <Text>icon</Text>
      })
    },
    Login:{
      screen: Login,
      navigationOptions: ({navigation}) =>({
        title: `Autenticazione`,
        headerLeft: () => <Text>icon</Text>
      })
    },
    MeasureHistory:{
      screen: MeasureHistory,
      navigationOptions: ({navigation}) =>({
        title: `Storico Misure`,
        headerLeft: () => <Text>icon</Text>
      })
    }
  });
  
  const AppContainer = createAppContainer(AppStackNavigator); 

  useEffect(() => {
    
    registerForPushNotificationsAsync().then(token =>{
      console.log(token)
       //setExpoPushToken(token)
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      //console.log(response);
    });
    
  },[expoPushToken])
 
  return (
    <UserContext.Provider value={userState}>
      <AppContainer/>
    </UserContext.Provider>
    
  );
}


/*
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          
            <Stack.Screen name="Home" component={Home} options={{headerLeft:()=>(<></>)}}/>
            <Stack.Screen name="MeasureHisotry" component={MeasureHistory}/>
            <Stack.Screen name="Login" component={Login} options={{headerLeft:()=>(<><Text>icon</Text></>)}}>
            </Stack.Screen>
          
        </Stack.Navigator>
      </NavigationContainer>
      */


async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    } 
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;  
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});