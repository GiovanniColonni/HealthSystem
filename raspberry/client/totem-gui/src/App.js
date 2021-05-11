import './App.css';
import { Switch, BrowserRouter as Router, Route,Link,Redirect } from 'react-router-dom';
import Login from "./components/Login"
import Api from "./api/Api"
import React,{useState,useEffect, useCallback, useMemo} from "react"
import {useHistory} from "react-router"
import Button from "@material-ui/core/Button"

import Measure from "./components/Measure"

import axios from "axios"


function App() {
  const [loginState,setLoginState] = useState(false)
  const [user,setUser] = useState({})
  const [username,setUserName] = useState("")
  const [measure,setMeasure] = useState({})
  const [link,setLink] = useState("https://healthsystem.daily.co/0uNtA7BIXvP50NhUNiTo")

  let history = useHistory()
  
  useEffect( () => {
    
      async function checkUser(){
          Api.isAuthenticated()
            .then((userJson) =>{ 
                     
                     if(userJson.id === null){
                      setLoginState(false)
                      history.push("/login")
                    }else{
                      setLoginState(true)
                      setUserName(userJson.username)
                      setUser(userJson)
                      const t = userJson["userType"]
                      
                    }
                     
                    })
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
            <h1>Home</h1>
            <Link to="/measure">Start a measure</Link>
            <Link to="/videocall">Start the appointment</Link>
	  </div>
          </Route>
          <Route exact path="/measure">
            <Measure setMeasure={setMeasure} measure={measure} />
          </Route>
          <Route exact path="/videocall">
            <Button onClick={() => {window.location.href = link}}>Start Call</Button>
          </Route>
      </Switch>
    </div>
  );
}

export default App;
