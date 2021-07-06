import React, { useState, useEffect } from 'react';
import { UserCardList } from './UserCard';
import {Input } from '@material-ui/core';

export default function PatientList({user,filter, setPatient}) {
    const [patientNameFilter, setPatientNameFilter] = useState("")
    return (
        <div>
            <Input placeholder="Patient Name" name="patientName" onChange={(e) => setPatientNameFilter(e.target.value) } />
            <UserCardList user={user} filter={patientNameFilter} setPatient={(patientId) => setPatient(patientId)}/>
        </div>
    )
}