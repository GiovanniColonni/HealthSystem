
import './App.css';

import React,{useState,useEffect} from "react"
import { Switch, BrowserRouter as Route, useHistory } from 'react-router-dom';

import API from "./api/API";

import NavigationBar from './components/NavigationBar';
import Login from "./components/Login";
import FirstAccess from "./components/FirstAccess";
import {UserCardList} from "./components/UserCard";
import PatientDetails from "./components/PatientDetails";
import IframeJitsi from "./components/IframeJitsi"
import PersonalProfile from './components/PersonalProfile';
import { PrescriptionCardList } from './components/PrescriptionCard';
import Home from './components/Home';
import HeaderChooseDoctor from './components/HeaderChooseDoctor';
import SelectDoctor from "./components/SelectDoctor"

export const AuthContext = React.createContext(); // added this
function App() {
  const [loginState,setLoginState] = useState(false)
  const [user,setUser] = useState({})
  
  let history = useHistory()

  async function checkUser(){
    API.isAuthenticated()
      .then((userJson) =>{ 
        setLoginState(true)
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

  const callSetUser = (usr) =>{
    setUser(usr)
  }

  return (
    
    <div className="App">
      <Switch>
        <Route exact path={"/login"}>
          <Login setLoginState={setLoginState} setUser={setUser} loginState={loginState}/>
        </Route>
          <Route exact path={"/firstAccess"}>
              <FirstAccess user={user} setUser={setUser} />  
          </Route>
          <Route exact path={"/home"}>
              <div>
                <NavigationBar user={user} />
                <Home user={user}/>
              </div>
          </Route>
          {/* Only accessible for doctor users */}
          <Route exact path={"/patientList"}>
          <NavigationBar user={user} />
              <UserCardList userlist={userlist} />
          </Route>

          {/* Changes depending on the patient: from patient list of current doctor */}
          <Route exact path={"/patientDetails"}>
            <NavigationBar user={user} />
            <PatientDetails />
          </Route>

          {/*Route exact path={"/patient" + {patientId} + "/sensor" + {sensorId}}> */}
          <Route exact path={"/patient/sensor"}>
            <div>
              <NavigationBar user={user}/>
              <h1>Sensor Details of Patient XXX</h1>
            </div>
          </Route>

          {/*Route exact path={"/patient" + {patientId} + "/appointment" + {appointmentId}}> */}
          <Route exact path={"/patient/appointment"}>
            <div>
              <NavigationBar user={user} />
              <h1>Appointement Details of Patient XXX, Date XXX</h1>
            </div>
          </Route>

          {/* Only accessible for patient users */}
          <Route exact path={"/prescriptionList"}>
            <div>
              <NavigationBar user={user} />
              <h1>My Prescriptions</h1>
              <PrescriptionCardList prescriptionlist={prescList}/>
            </div>
          </Route>

          {/* Changes depending on the user type: patient has his doctor */}
          <Route exact path={"/personalProfile"} >
            <div>
              <NavigationBar user={user} />
              <PersonalProfile user={user} />
            </div>
          </Route>
          
        <Route exact path={"/patient/selectDoctor"}> 
          <div>
              <HeaderChooseDoctor username={user.username}/>
              <SelectDoctor user={user}/>
          </div>
        </Route>
        <Route exact path={"/doctor/meeting"}> 
          <div>
            <IframeJitsi URL_meeting="https://meet.jit.si/lucatest#config.prejoinPageEnabled=false"/>
          </div>
        </Route>

      </Switch>
      
    </div>
  );
}

export default App;

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