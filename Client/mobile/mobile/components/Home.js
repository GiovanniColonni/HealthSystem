import React, { useContext } from "react"
import {Text,Button, View} from "react-native"
import UserContext from "../contexts/UserContext"

/*navigation viene passato implicitamente perchè è in un NavigationContainer*/
function Home({navigation}){
    let userObj = useContext(UserContext)
    return(
        <View>
            <Text>This is the home view</Text>
            <Button title={"Go to login"} onPress={()=> navigation.navigate("Login")}/>
        </View>
        
    )
}
export default Home