import {React, useContext, useState, useEffect, useRef} from 'react';
import { useHistory } from 'react-router';
import API from '../api/API';
import API_patient from '../api/API_patient';
import { UserContext } from '../context/UserContext';

const Home = (props) =>{
    const history = useHistory()
    let {user, patient} = props
    useEffect(() => {
        if(user.userType === "unknown"){
            console.log("go to firstAccess because userType is unknown")
            history.push('/firstAccess')
        }else{
            switch (user.userType) {
                case "Patient":
                    break;
                default:
                    break;
            }
        }
    },[user, patient]) 

    return(
     <></>   
    )
}

export default Home;