import React,{useContext, useEffect} from "react"
import { StyleSheet, Text, View,Button} from 'react-native';


import UserContext from "../contexts/UserContext"

function Home({navigation,resp}){
    // qui mettere registrazione notifica
    let userState = useContext(UserContext)
    
    useEffect(()=>{

    if(userState.user.googleId === undefined){
        navigation.navigate("Login")
    }
    
    }
    )
    return(
        <View>
            <Text>Welcome : {userState.user.name}</Text>
            <Button title="Go to MueasureHistory" onClick={() => navigation.push("MeasureHistory")}/>
        </View>
        
    )
}
export default Home;