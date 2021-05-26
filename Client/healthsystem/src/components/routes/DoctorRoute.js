import {React, useEffect} from 'react';
import {Route} from 'react-router-dom';
const DoctorRoute = (props) =>{
    let {user} = props

    useEffect(() => {
        console.log("here")
    },[]) 
    return(
        <Route exact path={"/doctor/meeting"}>
            <div>
                <h1>Ciao</h1>
                <h2>Test</h2>
            </div>
        </Route>
    );
}

export default DoctorRoute;