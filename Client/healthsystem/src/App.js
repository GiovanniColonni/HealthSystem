
import './App.css';

import React,{useState,useEffect} from "react";
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import API from "./api/API";

import NavigationBar from './components/NavigationBar';
import Login from "./components/Login";
import FirstAccess from "./components/FirstAccess";
import PatientDetails from "./components/PatientDetails";
import PersonalProfile from './components/PersonalProfile';
import PrescriptionList from './components/PrescriptionCard';
import Home from './components/Home';
import HeaderChooseDoctor from './components/HeaderChooseDoctor';
import SelectDoctor from "./components/SelectDoctor";
import NewAppointment from "./components/NewAppointment";
import PatientList from './components/PatientList';
import PatientCall from './components/PatientCall';
import DoctorCall from './components/DoctorCall';
import MeasureList from './components/MeasureList';
import { Typography } from '@material-ui/core';
import PatientListFiltered from './components/PatientListFiltered';

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

  const handleLogout = () =>{
    setLoginState(false)
    setUser({})
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
                <NavigationBar user={user} logout={handleLogout}/>
                <Home user={user}/>
              </div>
          </Route>
          {/* Only accessible for doctor users */}
          <Route exact path={"/patientList"}>
              <NavigationBar user={user} logout={handleLogout}/>
              <PatientListFiltered user={user} />
          </Route>

          {/* Changes depending on the patient: from patient list of current doctor */}
          <Route exact path={"/patientDetails"}>
            <NavigationBar user={user} logout={handleLogout}/>
            <PatientDetails />
          </Route>

          <Route exact path={"/patient/meeting"}>
            <div>{/*https://meet.jit.si/lucatest#config.prejoinPageEnabled=false*/ }
              <NavigationBar user={user} logout={handleLogout}/>
              <PatientCall />
            </div>
          </Route>

          {/* Only accessible for patient users */}
          <Route exact path={"/prescriptionList"}>
            <div>
              <NavigationBar user={user} logout={handleLogout}/>
              <PrescriptionList googleId={user.googleId} title={true}/>
            </div>
          </Route>

          {/* Only accessible for patient users */}
          <Route exact path={"/measureList"}>
            <NavigationBar user={user} logout={handleLogout}/>
            <div style={{width: '65%', margin: 'auto'}}>
              <Typography variant="h5" 
                style={{fontSize: '30px', fontStyle: 'italic', color: '#616161', marginBottom: '30px'}}>
                  My Measures
              </Typography>
              <MeasureList googleId={user.googleId} />
            </div>
          </Route>

          {/* Only accessible for patient users */}
          <Route exact path={"/newAppointment"}>
            <div>
              <NavigationBar user={user} logout={handleLogout}/>
              <NewAppointment user={user} />
            </div>
          </Route>

          {/* Changes depending on the user type: patient has his doctor */}
          <Route exact path={"/personalProfile"} >
            <div>
              <NavigationBar user={user} logout={handleLogout}/>
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
            <NavigationBar user={user} logout={handleLogout}/>
            <DoctorCall user={user}/>
          </div>
        </Route>
        <Redirect to="/home" />
      </Switch>
      
    </div>
  );
}

export default App;