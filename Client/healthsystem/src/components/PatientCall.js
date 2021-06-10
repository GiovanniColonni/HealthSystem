import React from 'react';
import IframeJitsi from './IframeJitsi';

const callstyle = {
    container: {
        width: "90%",
        margin: "auto"
    }
}

export default function PatientCall() {
    return (
        <div style={callstyle.container} >
            <IframeJitsi/>
        </div>
    )
}