import React,{useEffect,useContext, useState} from "react"
import { StyleSheet,Image,Text,View,SafeAreaView,ScrollView } from 'react-native';
import {ListItem} from 'react-native-elements'
import UserContext from "../contexts/UserContext"
import Api from "../api/Api";



function MeasureHistory({navigation}){
    const [measureData,setMeasureData] = useState([])
    const [avaible,setAvaible] = useState(false)
    let userState = useContext(UserContext)    
    
    const oxygenIcon = require('../assets/OxygenSaturation.png') 
    const heartRateIcon = require('../assets/HearthRate.png')
    const bloodIcon = require('../assets/BloodPressure.png')

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
        width:31,
        height:31
    },
    listItem:{
      overflow:"hidden"
    },
    });
  
    useEffect(()=>{    
        if(userState.user.googleId === undefined){
            navigation.push("Login")
        }
        if(!avaible){
        Api.getMeasure(userState.user.googleId)
        .then((resp)=>{
          if(resp !== false && resp !== undefined){
            console.log(resp)
            setMeasureData(resp)
            setAvaible(true)
          }
          
        })
        .catch(()=>{
         console.log("get measures fail")
        })

        }});
     
    const retMeasure = (item,i) => {
      let u_mis = ""
      let value = ""
      // tipo di misura
      if(item.type ==  "OxygenSaturation"){
        u_mis = " %"
        value = item.value
      }
      
      if(item.type ==  "HeartRate"){
        u_mis = " bps"
        value = item.value
      }
      
      if(item.type ==  "BloodPressure"){
        u_mis = " mmHg"
        // value = JSON.parse(item.value)
        value = item.value + "/" + "123"
      }
      
      if(item.type !== "type"){
        let subTitle = ``
        return(
          <ListItem style={styles.listItem} key={i} bottomDivider>
            {item.type == "BloodPressure" && <Image style={styles.icons} source={bloodIcon} />}
            {item.type ==  "OxygenSaturation" && <Image style={styles.icons} source={oxygenIcon} />}
            {item.type == "HeartRate" && <Image style={styles.icons} source={heartRateIcon} />}
            <ListItem.Title>{item.type}</ListItem.Title>
            <ListItem.Subtitle>{value + u_mis + " " +item.date}</ListItem.Subtitle>
            
          </ListItem>            
        )
        }
     }

    return(
      <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
           {measureData.map((item,i)=>
            retMeasure(item,i)
           )}
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