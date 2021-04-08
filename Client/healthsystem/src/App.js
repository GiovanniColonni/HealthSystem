
import './App.css';

import React,{useState,useEffect} from "react"
import { Switch, BrowserRouter as Router, Route,Link,Redirect } from 'react-router-dom';

import Login from "./components/Login"

function App() {
  const [loginState,setLoginState] = useState(false)
  
  useEffect(()=>{
    // chiamare isUserAuth api e se ok bene altrimenti 
    // redirect to login
    
  })


  return (
    <div className="App">

      <Switch>
        
        <Route exact path="/login">
          <Login props={setLoginState}/>
        </Route>

        <Route exact path="/home">
          <div>
            <h1>if you see this you are logged</h1>
          </div>
        </Route>

      </Switch>
      
    </div>
  );
}

export default App;
