import React from 'react';
import { UserCardList } from './UserCard';

var liststyle = {
    width: "60%",
    margin: "auto"
};

export default function PatientList({userlist}) {
    return (
        <div style={liststyle}>
            <UserCardList userlist={userlist} />
        </div>
    )
}