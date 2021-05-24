import {React, useContext, useState, useEffect} from 'react';
import {Route} from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import HeaderChooseDoctor from '../HeaderChooseDoctor';
import SelectDoctor from '../SelectDoctor';
const PatientRoute = (props) =>{
    const user = useContext(UserContext)
    return(
        <Route exact path={"/patient/selectDoctor"}>
            <div>
                <HeaderChooseDoctor username={user.username}/>
                <SelectDoctor />
            </div>
        </Route>
    );
}

export default PatientRoute;