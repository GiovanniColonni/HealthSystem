import React from 'react';
import Image from 'react-bootstrap/Image';
import PatientAvatar from '../icons/Woman_01.png';

var detailsstyle = {
    avatar: {
        maxHeight: "150px",
        maxWidth: "150px"
    }
}

export default function PatientDetails() {
    return (
        <>
            <Image src={PatientAvatar} roundedCircle style={detailsstyle.avatar} />
        </>
    );
}