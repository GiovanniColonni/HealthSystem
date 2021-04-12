
import './App.css';

import React,{useState,useEffect, useCallback, useMemo} from "react"
import { Switch, BrowserRouter as Router, Route,Link,Redirect } from 'react-router-dom';
import {useHistory} from "react-router"
import Login from "./components/Login"
import API from "./api/API"
import BigCalendar from "./components/BigCalendar"

function App() {
  const [loginState,setLoginState] = useState(false)
  const [user,setUser] = useState({})
  

  useEffect( () => {
      async function checkUser(){
        if(loginState === true){
          API.isAuthenticated()
            .then((userJson) => setUser(userJson))
            .catch((err)=> setLoginState(false))
          }else{
            return(<Redirect to={"/login"} />)
          }
      }
      
      checkUser()
    },[loginState,setUser]
  ) 

  return (
    <div className="App">

      <Switch>
       
        <Route exact path={"/login"}>
          <Login setLoginState={setLoginState} setUser={setUser}/>
        </Route>

        <Route exact path={"/home"}>
          <div>
            <h1>Home</h1>
          </div>
        </Route>

        <Route exact path={"/calendar"}>
          <BigCalendar />
        </Route>

      </Switch>
      
    </div>
  );
}

export default App;
