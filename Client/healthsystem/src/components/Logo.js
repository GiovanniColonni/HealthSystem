import React from 'react';
import Image from 'react-bootstrap/Image'
import CrossIcon from '../icons/greenCross.png';

var logostyle = {
    logo: {
        paddingTop: "2px",
        paddingBottom: "2px",
        paddingRight: "2px",
        paddingLeft: "2px",
    }, image: {
        height: "50px",
        width: "50px",
    }, name: {
        fontFamily: "Bree Serif",
        color: "#8BC24A",
        fontStyle: "italic",
        fontWeight: "bold",
        fontSize: "14px",
        marginBottom: "0"
    }
}

export default function Logo() {
    return (
        <>
            <div style={logostyle.logo}>
                <Image src={CrossIcon} style={logostyle.image}/>
                <p style={logostyle.name}>My Health way</p>
            </div>
        </>
    );
}