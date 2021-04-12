
import './App.css';

import React,{useState,useEffect, useCallback, useMemo} from "react"
import { Switch, BrowserRouter as Router, Route,Link,Redirect } from 'react-router-dom';
import {useHistory} from "react-router"
import Login from "./components/Login"
import API from "./api/API"

function App() {
  const [loginState,setLoginState] = useState(false)
  const [user,setUser] = useState({})
  const [username,setUserName] = useState("")
  
  let history = useHistory()

  useEffect( () => {
      async function checkUser(){
          API.isAuthenticated()
            .then((userJson) =>{ 
                     setLoginState(true)
                     setUserName(userJson.username)
                     setUser(userJson)})
            .catch((err)=> {
            setLoginState(false) 
            history.push("/login")
            console.log(err)})
            
          }

        checkUser()
      
    },[loginState,setUser,setUserName]
  ) 

  return (
    <div className="App">

      <Switch>
       
        <Route exact path={"/login"}>
          <Login setLoginState={setLoginState} setUser={setUser} loginState={loginState}/>
        </Route>

        <Route exact path={"/home"}>
          <div>
            <h1>Home of {username}</h1>
            {loginState && <h1>Protected</h1>}
          </div>
        </Route>

      </Switch>
      
    </div>
  );
}

export default App;
