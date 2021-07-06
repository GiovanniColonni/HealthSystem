import React,{useContext, useEffect, useState,useCallback} from "react"
import { StyleSheet, Text, View,Image,SafeAreaView,ScrollView} from 'react-native';
import {ListItem} from "react-native-elements"

import Api from "../api/Api"
import UserContext from "../contexts/UserContext"
import { Linking } from "react-native";
import { Alert } from "react-native";
import { TouchableOpacity } from "react-native";
import {Button} from "react-native-elements"
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";

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
        },
        message:{
            fontSize:21,
            textAlign:"center"
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
            console.log(resp)
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
            const s = new Date(date + 2*60*60*1000) /*Timezone sbagliata aggiungo 2 ore */
            
            let left15 = new Date(date) - new Date();
            left15 = left15 / (1000*60) // in minuti 
            
            //console.log(` left 15 : ${left15}`)
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
    const prepareDesc = (desc) => {
        if(desc === NaN){
            return ""
        }
        let s = ""
        if(desc.length < 23){
            return desc
        }
        let i = 0;
        var e;
        while(i < desc.length){
            e = Math.min(i+23,desc.length)
            s += desc.slice(i,e) + "\n";
            i += 23;
        } 
        
        return s;
    }
    return(
            <View style={styles.container}>
                <View style={styles.buttonView}>
                    <Button icon={{name:"history", size:35}} type="outline" titleStyle={styles.changePage} title="Go to measure history"
                            onPress={()=>{navigation.navigate("MeasureHistory")}}/>
                </View>
                <View style={styles.scrollView}>
                    <SafeAreaView>
                        <ScrollView >
                            {events.length != 0 && events.map((item,i)=>{
                                var now = new Date();
                                now.setHours(now.getHours()) // +2 per correggere timezone + 1 ora in più per eventuali ritardi  
                                
                                if(new Date(item.dateEnd)  < now){ // appuntamento terminato 
                                    return;
                                }
                                 
                                return(
                                    <ListItem key={i} bottomDivider>
                                        {item.typeExamination === "meeting" &&  <ImageCall url={item.meetingURL} date={item.dateStart}/> }
                                        {item.typeExamination === "measure" &&
                                         <Image style={styles.icons} source={measureIcon}/>}
                                         
                                            <ListItem.Title><Text style={{flex: 1, flexWrap: 'wrap'}}>{item.dateStart.slice(0,10) + "\n" + item.dateStart.slice(10,19)}</Text></ListItem.Title>
                                            <ListItem.Subtitle><Text style={{flex: 1, flexWrap: 'wrap'}}>{prepareDesc(item.description)}</Text></ListItem.Subtitle> 
                                         
                                    </ListItem>
                                )
                            })}
                            {events.length == 0 && <Text style={styles.message}>Mangi molte mele ? non ci sono appuntamenti futuri per te !</Text>}
                        </ScrollView>
                    </SafeAreaView>        
                </View>
                
            </View>

    )
}
export default Home;
