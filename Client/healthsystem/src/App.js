
import './App.css';

import React,{useState,useEffect, useCallback, useMemo} from "react"
import { Switch, BrowserRouter as Router, Route,Link,Redirect } from 'react-router-dom';
import {useHistory} from "react-router";

import API from "./api/API";

import BigCalendar from "./components/BigCalendar";
import NavigationBar from './components/NavigationBar';
import Login from "./components/Login";
import FirstAccess from "./components/FirstAccess";
import {UserCardList} from "./components/UserCard";
import PatientDetails from "./components/PatientDetails";
import IframeJitsi from "./components/IframeJitsi"
import PersonalProfile from './components/PersonalProfile';

function App() {
  const [loginState,setLoginState] = useState(false)
  const [user,setUser] = useState({})
  const [username,setUserName] = useState("")
  
  let history = useHistory()

  /*useEffect( () => {
      async function checkUser(){
          API.isAuthenticated()
            .then((userJson) =>{ 
                     
                     if(userJson.id === null){
                      setLoginState(false)
                      history.push("/login")
                    }else{
                      setLoginState(true)
                      setUserName(userJson.username)
                      setUser(userJson)
                      const t = userJson["userType"]
                      if(t == "unknow"){
                          history.push("/firstAccess")
                      }
                    }
                     
                    })
            .catch((err)=> {
            setLoginState(false) 
            history.push("/login")
            console.log(err)})
            
          }

        checkUser()
      
    },[loginState,setUser,setUserName] 
  ) */

  return (
    <div className="App">

      <Switch>
        {/*<Route exact path={"/login"}>
          <Login setLoginState={setLoginState} setUser={setUser} loginState={loginState}/>
        </Route>

        <Route exact to={"/firstAccess"}>
            <FirstAccess user={user}/>            
        </Route>*/}

        {/* Change depending of the user type */}
        <Route exact path={"/home"}>
          <div>
            <NavigationBar />
            <h1>Home of {username}</h1>
            <BigCalendar />
          </div>
        </Route>

        {/* Only accessible for doctor users */}
        <Route exact path={"/patientList"}>
            <NavigationBar />
            <UserCardList userlist={userlist} />
        </Route>

        {/* Changes depending on the patient: from patient list of current doctor */}
        <Route exact path={"/patientDetails"}>
          <NavigationBar />
          <PatientDetails />
        </Route>

        {/*Route exact path={"/patient" + {patientId} + "/sensor" + {sensorId}}> */}
        <Route exact path={"/patient/sensor"}>
          <div>
            <NavigationBar />
            <h1>Sensor Details of Patient XXX</h1>
          </div>
        </Route>

        {/*Route exact path={"/patient" + {patientId} + "/appointment" + {appointmentId}}> */}
        <Route exact path={"/patient/appointment"}>
          <div>
            <NavigationBar />
            <h1>Appointement Details of Patient XXX, Date XXX</h1>
          </div>
        </Route>

        {/* Changes depending on the user type: patient has his doctor */}
        <Route exact path={"/personalProfile"} >
          <div>
            <NavigationBar />
            <PersonalProfile />
          </div>
        </Route>

        <Route exact path={"/iframe"}>
          <IframeJitsi />
        </Route>

      </Switch>
      
    </div>
  );
}

export default App;

const userlist = [
  {
    name: 'Benedetta',
    info: 'Some info'
  },
  {
    name: 'Chiara',
    info: 'Some info'
  },
  {
    name: 'Giuseppe',
    info: 'Some info'
  },
  {
    name: 'Gabriele',
    info: 'Some info'
  },
];