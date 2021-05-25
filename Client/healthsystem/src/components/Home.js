import {React, useContext, useState, useEffect, useRef} from 'react';
import { Redirect, useHistory } from 'react-router';
import API from '../api/API';
import API_patient from '../api/API_patient';
import { UserContext } from '../context/UserContext';

const Home = (props) =>{
    const history = useHistory()
    let {user} = props
    useEffect(() => {
    },[user]) 

    return(
     <>
        {user && user.userType==="unknown" && <Redirect to="/firstAccess" />}
     </>   
    )
}

export default Home;