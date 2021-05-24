
import './App.css';

import React,{useState,useEffect, useCallback, useMemo} from "react"
import { Switch, BrowserRouter as Router, Route,Link,Redirect, useHistory } from 'react-router-dom';

import API from "./api/API";
import API_patient from "./api/API_patient"

import BigCalendar from "./components/BigCalendar";
import NavigationBar from './components/NavigationBar';
import Login from "./components/Login";
import FirstAccess from "./components/FirstAccess";
import {UserCardList} from "./components/UserCard";
import PatientDetails from "./components/PatientDetails";
import IframeJitsi from "./components/IframeJitsi"
import {UserContext} from "./context/UserContext"
import HeaderChooseDoctor from './components/HeaderChooseDoctor';
import SelectDoctor from "./components/SelectDoctor"
import PatientRoute from './components/routes/PatientRoute';
import Home from './components/Home';

export const AuthContext = React.createContext(); // added this
function App() {
  const [loginState,setLoginState] = useState(false)
  const [user,setUser] = useState({})
  
  let history = useHistory()

  async function checkUser(){
    API.isAuthenticated()
      .then((userJson) =>{ 
        setLoginState(true)
        console.log(userJson)
        if(userJson !== user)
          setUser(userJson)
      })
      .catch((err)=> {
        setLoginState(false) 
        history.push("/login")
        console.log(err)
      })
  }

    /*handleErrors(err){
      if(err) {
        if(err.status && err.status === 401){
          //this.setState({authErr: err.errorObj})
          //this.props.history.push("/login")
        }
      }
    }*/

  useEffect( () => {
    checkUser()
  },[loginState]) 

  return (
    <div className="App">
      <Switch>
        <Route exact path={"/login"}>
          <Login setLoginState={setLoginState} setUser={setUser} loginState={loginState}/>
        </Route>
          <Route exact path={"/firstAccess"}>
              {user && user.userType === "unknown" &&
              <FirstAccess user={user}/>  
              }    
          </Route>
          <Route exact path={"/home"}>
              <div>
                <Home user={user}/>
                <NavigationBar />
                <h1>Home of {user && user.username}</h1>
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
              <h1>Profile of {user && user.username}</h1>
            </div>
          </Route>

          <Route exact path={"/iframe"}>
            <IframeJitsi />
          </Route>
          <PatientRoute user={user}/>
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