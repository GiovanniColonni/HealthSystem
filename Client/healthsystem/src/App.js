
import './App.css';

import React,{useState,useEffect} from "react"
import { Switch, BrowserRouter as Router, Route,Link,Redirect } from 'react-router-dom';
import {useHistory} from "react-router"
import Login from "./components/Login"
import API from "./api/API"

function App() {
  const [loginState,setLoginState] = useState(false)
  const [user,setUser] = useState({})
  
  
  return (
    <div className="App">

      <Switch>
       
        <Route exact path={"/login"}>
          <Login props={setLoginState}/>
        </Route>

        <Route exact path={"/home"}>
          <div>
            <h1>AAAA</h1>
          </div>
        </Route>

      </Switch>
      
    </div>
  );
}

export default App;
