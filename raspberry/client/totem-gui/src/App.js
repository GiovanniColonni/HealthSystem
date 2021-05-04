import './App.css';
import { Switch, BrowserRouter as Router, Route,Link,Redirect } from 'react-router-dom';
import Login from "./components/Login"
import Api from "./api/Api"
import React,{useState,useEffect, useCallback, useMemo} from "react"
import {useHistory} from "react-router"
import Button from "@material-ui/core/Button"

import axios from "axios"


function App() {
  const [loginState,setLoginState] = useState(false)
  const [user,setUser] = useState({})
  const [username,setUserName] = useState("")
  
  let history = useHistory()
  /*
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
  ) 
 */
  
  let buttonClick1 = () => {
    let resp = await axios.get("/totem/measure")
    print(resp)
  }

  let buttonClick2 = () => {
    let resp = await axios.get("/postMeasure")
    print(resp)
  }

  return(
    <div className="App">
       <Button id={1} onClick={(e) => buttonClick1()} variant={"contained"} color={"primary"}>Doctor</Button>
       <Button id={1} onClick={(e) => buttonClick2()} variant={"contained"} color={"primary"}>Doctor</Button>
    </div>
  )
}

  /*
  return (
    <div className="App">
      <Switch>
          <Route exact path={"/login"}>
              <Login setLoginState={setLoginState} setUser={setUser} loginState={loginState}/>
          </Route>
          <Route exact path={"home"}>
          <div>
            <h1>Home of {username}</h1>
            {loginState && <h1>Protected</h1>}
          </div>
          </Route>
      </Switch>
    </div>
  );
}
*/
export default App;
