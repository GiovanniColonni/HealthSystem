import React,{useEffect,useContext} from "react"
import { StyleSheet, Text, View,Button } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';


import UserContext from "../contexts/UserContext"


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
    }
  });

function MeasureHistory({navigation}){

    let userState = useContext(UserContext)    
    useEffect(()=>{
        
        if(userState.user.googleId === undefined){
            navigation.push("Login")
        }

        
    Api.getMeasure(userState.user.googleId)
    .then((resp)=>{
        console.log(resp)
      })
        .catch(()=>{
         console.log("get measures fail")
        })
  

        }
        )
        
    return(
        <View>
            <Text>This is measure history</Text>
            <Button title="back to home" onClick={()=>navigation.navigate("Home")}/>
        </View>
    )
}
export default MeasureHistory;