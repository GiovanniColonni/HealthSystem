import React,{useEffect,useContext, useState} from "react"
import { StyleSheet,Image,Text,View,Button,SafeAreaView,ScrollView,ListItem } from 'react-native';

import UserContext from "../contexts/UserContext"
import Api from "../api/Api";

import { WiHumidity } from "react-icons/wi";
import { FaHeartbeat, FaHeart } from "react-icons/fa";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
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
    icon:{
      width:51,
      height:51
  },
  });

function MeasureHistory({navigation}){
    const [measureData,setMeasureData] = useState([])
    const [avaible,setAvaible] = useState(false)
    let userState = useContext(UserContext)    
    
    const oxygenIcon = require('../assets/OxygenSaturation.png') 
    const hearthRateIcon = require('../assets/HearthRate.png')
    const bloodIcon = require('../assets/BloodPressure.png')

    useEffect(()=>{    
        if(userState.user.googleId === undefined){
            navigation.push("Login")
        }
        if(!avaible){
        Api.getMeasure(userState.user.googleId)
        .then((resp)=>{
          if(resp !== false && resp !== undefined){
            setMeasureData(resp)
            setAvaible(true)
          }
          
        })
        .catch(()=>{
         console.log("get measures fail")
        })

        }});
        
    return(
      <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
           {avaible && measureData.map((item,i)=>{
              return(
                <ListItem key={i} bottomDivider>
                {item.type == /*"BloodPressure"*/"type" && <Image style={styles.icons} source={bloodIcon} />}
                {item.type == "OxygenSaturation" && <Image style={styles.icons} source={oxygenIcon} />}
                {item.type == "HeartRate" && <Image style={styles.icons} source={hearthRateIcon} />}
                <Text>{item.type}</Text>
              </ListItem>
               )
             
           })}
        </ScrollView>
      </SafeAreaView>
      </View>
      
    )
}
export default MeasureHistory;

/**
 *       
  <SafeAreaView>
      <ScrollView>
      {avaible & measureData.map((item,index)=>(
          <ListItem key={index} bottomDivider>
                      <Image source={HRIcon}/>
                      
          </ListItem>
      
      ))}           
      </ScrollView>
  </SafeAreaView>

 */