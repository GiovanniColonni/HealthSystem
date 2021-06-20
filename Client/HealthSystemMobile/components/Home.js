import React,{useContext, useEffect} from "react"
import { StyleSheet, Text, View,Button} from 'react-native';
import UserContext from "../contexts/UserContext"

function Home({navigation}){
    // qui mettere registrazione notifica
    let userState = useContext(UserContext)
    useEffect(()=>{
        
    if(userState.user.googleId === ""){
        navigation.navigate("Login")
    }
    
    }
    )
    return(
        <View>
            <Text>Home</Text>
            <Button title="Go to MueasureHistory" onClick={navigation.navigate("MeasureHisotry")}/>
        </View>
        
    )
}
export default Home;