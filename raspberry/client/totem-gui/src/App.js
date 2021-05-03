import './App.css';
import { Switch, BrowserRouter as Router, Route,Link,Redirect } from 'react-router-dom';
import Login from "./components/Login"


function App() {
  return (
    <div className="App">
      <Switch>
          <Route exact path={"/login"}>
              <Login />
          </Route>
      </Switch>
    </div>
  );
}

export default App;
