import React from 'react';
import { UserContext } from '../context/UserContext';
import Logo from './Logo';


const HeaderChooseDoctor = (props) =>{
    let {username} = props
    return (
        <div>
            <Logo />
            <h1>Welcome {username}!</h1>
            <h1>To complete your profile, choose a doctor</h1>
            <h2>This will be your family doctor, who will follow you</h2>
        </div>
    );
}
export default HeaderChooseDoctor;