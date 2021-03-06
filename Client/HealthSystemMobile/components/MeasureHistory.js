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
    message:{
      fontSize:21,
      textAlign:"center"
  }
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
          let value_end = ""
          // tipo di misura
          value = JSON.parse(item.value)
          console.log(value)
          if(item.type ==  "OxygenSaturation"){
            u_mis = " %"
            value = value["Operc"] + u_mis
          }
          
          if(item.type ==  "HeartRate"){
            u_mis = " bps"
            value = value["Hrate"] + u_mis
          }
          
          if(item.type ==  "BloodPressure"){
            value = value["Max"] + " mmHg \n" + value["Min"] + " mmHg \n" + value["HRate"] + " bps"
          }
          
          if(item.type !== "type" && item.type !== ""){
            
            let subTitle = ``
            return(
              <ListItem style={styles.listItem} key={i} bottomDivider>
                {item.type == "BloodPressure" && <Image style={styles.icons} source={bloodIcon} />}
                {item.type ==  "OxygenSaturation" && <Image style={styles.icons} source={oxygenIcon} />}
                {item.type == "HeartRate" && <Image style={styles.icons} source={heartRateIcon} />}
                
                <ListItem.Title>{value}</ListItem.Title>
                <ListItem.Subtitle>{item.type + "\n " +item.date}</ListItem.Subtitle>  
                
                
                
              </ListItem>            
            )
            }
            return;
         }
    
        return(
          <View style={styles.container}>
          <SafeAreaView>
            <ScrollView>
               {measureData.length != 0 && measureData.map((item,i)=>
                retMeasure(item,i)
               )}
               {measureData.length == 0 && <Text style={styles.message}>Non ci sono misure da mostrare</Text>}
            </ScrollView>
          </SafeAreaView>
          </View>
          
        )
    }
    export default MeasureHistory;
    
    