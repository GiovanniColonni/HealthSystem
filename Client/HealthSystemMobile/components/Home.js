import React,{useContext, useEffect, useState} from "react"
import { StyleSheet, Text, View,Button,Image,SafeAreaView,ScrollView} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import {ListItem,Icon} from "react-native-elements"

import Api from "../api/Api"
import UserContext from "../contexts/UserContext"

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      position:"absolute"
    },
    text:{
      fontSize:21
    },
    buttonStyle:{
      fontSize:21
    },
    view:{
      padding:15
    },
    scrollView:{
        flex:1
    },
    image:{
        height:31,
        width:21,
    }
  });

function Home({navigation}){
    // qui mettere registrazione notifica
    let userState = useContext(UserContext)
    const [measuresData,setMeasuresData] = useState([
        {type:"HR",date:"2021-01-01",value1:"98"},
        {type:"HR",date:"2021-01-01",value1:"98"},
        {type:"HR",date:"2021-01-01",value1:"98"},
        {type:"HR",date:"2021-01-01",value1:"98"},
        {type:"Operc",date:"2021-01-04",value1:"100",},
        {type:"HR",date:"2021-01-03",value1:"98"},
        {type:"HR",date:"2021-01-03",value1:"98"},
        {type:"HR",date:"2021-01-06",value1:"98"},    
    ])
    const  listItemStyle = StyleSheet.create({
        icon:{
            width:31,
            height:31
        }
    ,})

    const oxygenIcon = require('../assets/Oxygen.png') 
    const HRIcon = require('../assets/HR.png')
    

    useEffect(()=>{
    if(userState.user.googleId === undefined){
        
        navigation.navigate("Login")
    }
    /*
    Api.getEventList(userState.user.googleId)
    .then((resp)=>{
        console.log(`resp : ${resp}`)
    })
    .catch(
        console.log("get events fail")
    )
    */
    })

    return(
        <View>
        <View style={styles.container}>
            <Button title="Guarda storico misure " onClick={() =>{ 
                Api.getMeasure(userState.user.googleId)
                .then((resp)=>{
                    console.log(resp)
                })}}
            />
            
        </View>
        <SafeAreaView>
        <ScrollView>
        {measuresData.map((item,index)=>(
            <ListItem key={index} bottomDivider>
                        <Image source={HRIcon}/>
                        <ListItem.Title>{item.type}</ListItem.Title>
                        <ListItem.Title>{item.value1}</ListItem.Title>
            </ListItem>
        
        ))}           
        </ScrollView>
    </SafeAreaView>
    </View>
    )
}
export default Home;