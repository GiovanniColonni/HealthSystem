import React,{useContext, useEffect, useState,useCallback} from "react"
import { StyleSheet, Text, View,Image,SafeAreaView,ScrollView} from 'react-native';
import {ListItem} from "react-native-elements"

import Api from "../api/Api"
import UserContext from "../contexts/UserContext"
import { Linking } from "react-native";
import { Alert } from "react-native";
import { TouchableOpacity } from "react-native";
import {Button} from "react-native-elements"

function Home({navigation}){
    // qui mettere registrazione notifica
    //console.log(navigation)
    let userState = useContext(UserContext)
    let [events,setEvents] = useState([])
    let [avaible,setAvaible] = useState(false);

    const  listItemStyle = StyleSheet.create({
        icon:{
            width:31,
            height:31
        }
    ,})
    
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#FFF',
          alignItems: 'center',
          justifyContent: 'center',
        },
        text:{
          fontSize:21
        },
        buttonStyle:{
          fontSize:21
        },
        buttonView:{
            margin:15,
            flex:0.09
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
        },
        icons:{
            width:51,
            height:51
        },
        changePage:{
            fontSize:29,
            color:"#8bc24a",
            borderColor:"#8bc24a",
            borderEndColor:"#8bc24a",
            padding:10
        }
    });
        
    const callIcon = require('../assets/phonecallIcon.png');
    const measureIcon = require('../assets/measureIcon.png'); 

    useEffect(()=>{
    if(userState.user.googleId === undefined){    
        navigation.navigate("Login")
    }
    if(!avaible){
    Api.getEventList(userState.user.googleId)
    .then((resp)=>{
        if(resp !== false){
            setEvents(resp)
            setAvaible(true)
        }
    })
    .catch(()=>{
        console.log("get events fail")
    })
    }
    })

    const ImageCall = ({url,date}) =>{
        const handlePress = useCallback(async () => {
            const s = new Date(date + 2*60*60*1000) /*Timezone sbagliata aggiunto 2 ore */
            let left15 = Math.abs(new Date(date)-new Date());
            left15 = left15 / (1000*60) // in minuti 
            if(left15 > 15){
                const hs = left15/60 // ore
                let titleAlert = ""
                if(hs > 1){
                    titleAlert = `A questo appuntamento mancano ancora ${Math.round(hs)} ore`
                }else{
                    titleAlert = `A questo appuntamento mancano ancora ${Math.round(left15)} minuti`
                }
                Alert.alert("Manca ancora molto !",titleAlert)
                return;
            }
            const supported = await Linking.canOpenURL(url);
            if(supported){
                await Linking.openURL(url)
            }else{
                Alert.alert(`Don't know how to open url ${url}`)
            }
            
        },[url]);
        return(
            <TouchableOpacity onPress={handlePress}>
                <Image source={callIcon}  style={styles.icons} />
            </TouchableOpacity>
        )
    }
    
    return(
            <View style={styles.container}>
                <View style={styles.buttonView}>
                    <Button icon={{name:"history", size:35}} type="outline" titleStyle={styles.changePage} title="Go to measure history"
                            onPress={()=>{navigation.push("MeasureHistory")}}/>
                </View>
                <View style={styles.scrollView}>
                    <SafeAreaView>
                        <ScrollView >
                            {events.map((item,i)=>{
                                return(
                                    <ListItem key={i} bottomDivider>
                                        {item.typeExamination === "meeting" &&  <ImageCall url={item.meetingURL} date={item.dateStart}/> }
                                        {item.typeExamination === "measure" &&
                                         <Image style={styles.icons} source={measureIcon}/>}
                                        <ListItem.Title><Text style={{flex: 1, flexWrap: 'wrap'}}>{item.description}</Text></ListItem.Title>
                                        <ListItem.Subtitle><Text style={{flex: 1, flexWrap: 'wrap'}}>{item.dateStart.slice(0,item.dateStart.length-3)}</Text></ListItem.Subtitle> 
                                    </ListItem>
                                )
                            })}
                        </ScrollView>
                    </SafeAreaView>        
                </View>
            </View>

    )
}
export default Home;
