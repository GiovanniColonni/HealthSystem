
import './App.css';

import React,{useState,useEffect} from "react";
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import API from "./api/API";

import NavigationBar from './components/NavigationBar';
import Login from "./components/Login";
import FirstAccess from "./components/FirstAccess";
import PatientDetails from "./components/PatientDetails";
import IframeJitsi from "./components/IframeJitsi";
import PersonalProfile from './components/PersonalProfile';
import { PrescriptionCardList } from './components/PrescriptionCard';
import Home from './components/Home';
import HeaderChooseDoctor from './components/HeaderChooseDoctor';
import SelectDoctor from "./components/SelectDoctor";
import NewAppointment from "./components/NewAppointment";
import PatientList from './components/PatientList';
import PatientCall from './components/PatientCall';
import DoctorCall from './components/DoctorCall';

export const AuthContext = React.createContext(); // added this
function App() {
  const [loginState,setLoginState] = useState(false)
  const [user,setUser] = useState({})
  
  let history = useHistory()

    /*handleErrors(err){
      if(err) {
        if(err.status && err.status === 401){
          //this.setState({authErr: err.errorObj})
          //this.props.history.push("/login")
        }
      }
    }*/

  useEffect( () => {
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
  },[loginState,history]) 

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
              <PatientList user={user} />
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
          <Route exact path={"/patient/meeting"}>
            <div>
              <NavigationBar user={user} />
              {/*<PatientCall /> ONLY FOR TEST*/}
              <DoctorCall />
            </div>
          </Route>

          {/* Only accessible for patient users */}
          <Route exact path={"/prescriptionList"}>
            <div>
              <NavigationBar user={user} />
              <h1>My Prescriptions</h1>
              <PrescriptionCardList user={user}/>
            </div>
          </Route>

          {/* Only accessible for patient users */}
          <Route exact path={"/newAppointment"}>
            <div>
              <NavigationBar user={user} />
              <NewAppointment user={user} />
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
          <div className="Background">
              <HeaderChooseDoctor username={user.username}/>
              <SelectDoctor user={user}/>
          </div>
        </Route>
        <Route exact path={"/doctor/meeting"}> 
          <div>
            <IframeJitsi URL_meeting="https://meet.jit.si/lucatest#config.prejoinPageEnabled=false"/>
          </div>
        </Route>
        <Redirect to="/home" />
      </Switch>
      
    </div>
  );
}

export default App;