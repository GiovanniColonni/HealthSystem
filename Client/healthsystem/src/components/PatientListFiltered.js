import React, { useState } from 'react';
import { UserCardList } from './UserCard';
import { Input, IconButton } from '@material-ui/core';
import { GoSearch } from 'react-icons/go';

const style = {
    cardList: {
        width: '50%',
        margin: 'auto'
    }
}

export default function PatientListFiltered({user}) {
    const [patientNameFilter, setPatientNameFilter] = useState("")
    return (
        <div>
            <IconButton disabled>
                <GoSearch/>
            </IconButton>
            <Input placeholder="Patient Name" name="patientName" onChange={(e) => setPatientNameFilter(e.target.value) } />
            
            <div style={style.cardList}>
                <UserCardList user={user} filter={patientNameFilter} />
            </div>
        </div>
    )
}