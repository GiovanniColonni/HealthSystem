import React from 'react';
import IframeJitsi from './IframeJitsi';

const callstyle = {
    container: {

    }
}

export default function PatientCall() {
    return (
        <div style={callstyle.container}>
            <IframeJitsi/>
        </div>
    )
}