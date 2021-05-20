import { Button, TextField } from '@material-ui/core';
import {React, useContext, useState, useEffect} from 'react';
import { UserContext } from '../context/UserContext';
import Logo from './Logo';
import API from '../api/API'
import Doctor from '../classes/Doctor';


const SelectDoctor = (props) =>{
    let {username} = props
    const [doctors,setDoctors] = useState([]);
    useEffect(() => {
      doctorList()
    }, []);

    const doctorList = () => {
        //const user = useContext(UserContext)
        API.getAllDoctors().then((doct) =>{
            const d = doct.map(d => new Doctor(d.name,d.surname,d.date,d.googleId))
            setDoctors(d)
            return true
        }).catch((err) =>{
            console.log("error in getAllDoctors()")
            return false
        })
    }

    const DoctorListComponent = () =>{
        return (doctors.map(d => 
            <li>
                <div>
                    <img></img>
                    <h2>{d.name + " " + d.surname}</h2>
                    <Button variant="contained">Choose</Button>
                </div>
            </li>
        ))
    }

    return (
        <div>
            <TextField label="Doctor name" variant="outlined"/>
            <ul>
                {doctors.length > 0 && <DoctorListComponent />}
            </ul>
        </div>
    );
}
export default SelectDoctor;