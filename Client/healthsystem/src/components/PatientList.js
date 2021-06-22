import React from 'react';
import { UserCardList } from './UserCard';

var liststyle = {
    width: "60%",
    margin: "auto"
};

export default function PatientList({user,filter, setPatient}) {
    return (
        <div style={liststyle}>
            <UserCardList user={user} filter={filter} setPatient={(patientId) => setPatient(patientId)}/>
        </div>
    )
}