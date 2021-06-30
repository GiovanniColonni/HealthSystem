import React, { useState,useEffect, useRef  } from 'react';
import { StyleSheet,Image,TouchableOpacity } from 'react-native';

import 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation'

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

import UserContext from "./contexts/UserContext"
import Login from "./components/Login"
import Home from "./components/Home"
import MeasureHistory from './components/MeasureHistory';


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
  let [user,setUser] = useState({googleId:undefined,name:undefined,email:undefined});
  let [isSigned,setIsSigned] = useState(false)
  let userState = {user,setUser,expoPushToken}
  const notificationListener = useRef();
  const responseListener = useRef();
  
  const img = require('./assets/greenCross.png')
  const styleImg = {width:51,height:51,resizeMode: 'contain'}
  const styileArrow = {width:41,height:41,resizeMode: 'contain'}
  const AppStackNavigator = createStackNavigator({

    Home:{
      screen: Home,
      navigationOptions: ({}) =>({
       
       title: `Benvenuto ${user.name}`,
       headerLeft: () => <Image style={styleImg} source={img} />
      })
    },
    Login:{
      screen: Login,
      navigationOptions: ({}) =>({
        title: `Autenticazione`,
        headerShown:false 
       // headerLeft: () => <></> 
      })
    },
    MeasureHistory:{
      screen: MeasureHistory,
      navigationOptions: ({navigation}) =>{ 
        
        if(Platform.OS === 'android'){
          return({
            title: `Storico Misure`,
            headerLeft: () => <Image style={styleImg} source={img}/> 
            })
        }
        
        return(
          {title:`Storico Misure`,
          headerRight:() => <Image style={styleImg} source={img}/>,
          headerLeft:() => {
            return(
          <TouchableOpacity onPress={()=>navigation.navigate("Home")}>
              <Image source={require('./assets/arrow.png')}  style={styleImg} />
          </TouchableOpacity>)
          } 
        }
        )
        }
    }
    

  });
  
  const AppContainer = createAppContainer(AppStackNavigator); 

  useEffect(() => {
    
    registerForPushNotificationsAsync().then(token =>{
      //console.log(token)
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