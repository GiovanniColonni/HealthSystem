import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import UserContext from "./contexts/UserContext"
import Login from "./components/Login"
import Home from "./components/Home"
import MeasureHistory from './components/MeasureHistory';


import { StackRouter } from 'react-navigation';

export default function App() {

  let [user,setUser] = useState({googleId:"",username:"",email:""});
  let userState = {user,setUser}
  
  const Stack = createStackNavigator();
 
  return (
    <UserContext.Provider value={userState}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login}/>  
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="MeasureHisotry" component={MeasureHistory}/>
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
