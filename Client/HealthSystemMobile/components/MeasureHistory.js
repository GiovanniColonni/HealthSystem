import React,{useEffect,useContext} from "react"
import { StyleSheet, Text, View,Button } from 'react-native';
import UserContext from "../contexts/UserContext"

function MeasureHistory({navigation}){

    let userState = useContext(UserContext)    
    useEffect(()=>{
        
        if(userState.user.googleId){
            navigation.push("Login")
        }
        }
        )
        
    return(
        <View>
            <Text>This is measure history</Text>
            <Button title="back to home" onClick={()=>navigation.push("Home")}/>
        </View>
    )
}
export default MeasureHistory;