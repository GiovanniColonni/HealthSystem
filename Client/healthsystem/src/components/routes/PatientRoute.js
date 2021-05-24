import {React, useEffect} from 'react';
import {Route} from 'react-router-dom';
import HeaderChooseDoctor from '../HeaderChooseDoctor';
import SelectDoctor from '../SelectDoctor';
const PatientRoute = (props) =>{
    let {user} = props

    useEffect(() => {

    },[user]) 
    return(
        <Route exact path={"/patient/selectDoctor"}>
            <div>
                <HeaderChooseDoctor username={user.username}/>
                <SelectDoctor user={user}/>
            </div>
        </Route>
    );
}

export default PatientRoute;