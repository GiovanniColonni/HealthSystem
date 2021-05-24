
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
import PersonalProfile from './components/PersonalProfile';
import { PrescriptionCardList } from './components/PrescriptionCard';
import Home from './components/Home';
import {UserContext} from "./context/UserContext"
import HeaderChooseDoctor from './components/HeaderChooseDoctor';
import SelectDoctor from "./components/SelectDoctor"
import PatientRoute from './components/routes/PatientRoute';

export const AuthContext = React.createContext(); // added this
function App() {
  const [loginState,setLoginState] = useState(false)
  const [user,setUser] = useState({})
  const [patient,setPatient] = useState()
  
  let history = useHistory()

  async function checkUser(){
    API.isAuthenticated()
      .then((userJson) =>{ 
               if(userJson.id === null){
                setLoginState(false)
                history.push("/login")
              }else{
                setLoginState(true)
                setUser(userJson)
                const userType = userJson["userType"]
                switch (userType) {
                  case "unknown":
                    history.push("/firstAccess")  
                    break;
                  case "Patient":
                    if(patient === undefined){
                      API_patient.getPatient(userJson["googleId"])
                        .then((resp) =>{
                          setPatient(resp)
                          if(resp.doctorId === ""){
                            //doctorId undefined, go to selectDoctor
                            
                            history.push("/patient/selectDoctor")
                          }else{
                            //history.push("/home")
                          }
                          return true
                        }).catch((err) =>{
                          console.log(err)
                          history.push("/firstAccess")
                          return false
                        });
                    }else{
                      history.push("/home")
                    }
                    break;
                
                  default:
                    break;
                }
              }
              })
      .catch((err)=> {
      setLoginState(false) 
      history.push("/login")
      console.log(err)})
    }

  useEffect( () => {
        checkUser()
    },[loginState] 
  ) 
const value = {
  user: user,
  patient: patient
}
  return (
    
    <UserContext.Provider value={user}>
      <div className="App">
        <Switch>
          <Route exact path={"/login"}>
            <Login setLoginState={setLoginState} setUser={setUser} loginState={loginState}/>
          </Route>
          
          <Route exact path={"/firstAccess"}>
            {value.user && value.user.userType === "unknown" &&
            <FirstAccess user={value.user}/>  
            }    
          </Route>

          {/* Change depending of the user type */}
          <Route exact path={"/home"}>
            <div>
              <NavigationBar user={value.user} />
              <Home user={currentUser}/>
            </div>
          </Route>
          <PatientRoute />

          {/* Only accessible for doctor users */}
          <Route exact path={"/patientList"}>
              <NavigationBar user={value.user} />
              <UserCardList userlist={userlist} />
          </Route>

          {/* Changes depending on the patient: from patient list of current doctor */}
          <Route exact path={"/patientDetails"}>
            <NavigationBar user={value.user} />
            <PatientDetails />
          </Route>

          {/*Route exact path={"/patient" + {patientId} + "/sensor" + {sensorId}}> */}
          <Route exact path={"/patient/sensor"}>
            <div>
              <NavigationBar user={value.user}/>
              <h1>Sensor Details of Patient XXX</h1>
            </div>
          </Route>

          {/*Route exact path={"/patient" + {patientId} + "/appointment" + {appointmentId}}> */}
          <Route exact path={"/patient/appointment"}>
            <div>
              <NavigationBar user={value.user} />
              <h1>Appointement Details of Patient XXX, Date XXX</h1>
            </div>
          </Route>

          {/* Only accessible for patient users */}
          <Route exact path={"/prescriptionList"}>
            <div>
              <NavigationBar user={value.user} />
              <h1>My Prescriptions</h1>
              <PrescriptionCardList prescriptionlist={prescList}/>
            </div>
          </Route>

          {/* Changes depending on the user type: patient has his doctor */}
          <Route exact path={"/personalProfile"} >
            <div>
              <NavigationBar user={value.user} />
              {value.user.userType === "Patient" &&
                <PersonalProfile user={value.user} doc={doc}/>
              }
              {value.user.userType === "Doctor" &&
                <PersonalProfile user={value.user}/>
              }
            </div>
          </Route>

          <Route exact path={"/iframe"}>
            <IframeJitsi />
          </Route>

        </Switch>
        
      </div>
    </UserContext.Provider>
  );
}

export default App;

const currentUser = 
  {
    type: 'pat',
    name: 'Carla Reorda',
    //type: 'doc',
    //name: 'Carlo Cassella',
  };

const doc = 
{
  name: 'Carlo Cassela',
};

const prescList = [
  {
    date: "13/02/2021",
    doctor: "Doctor Strange"
  },{
    date: "21/11/2020",
    doctor: "Doctor Strange"
  },{
    date: "13/09/2020",
    doctor: "Doctor Strange"
  },
]

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