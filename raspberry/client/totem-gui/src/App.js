import './App.css';
import { Switch, BrowserRouter as Router, Route,Link,Redirect } from 'react-router-dom';
import Login from "./components/Login"


function App() {
  const [loginState,setLoginState] = useState(false)
  const [user,setUser] = useState({})
  const [username,setUserName] = useState("")
  
  let history = useHistory()

  useEffect( () => {
      async function checkUser(){
          API.isAuthenticated()
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

export default App;