import React, { useState } from 'react';
import Iframe from 'react-iframe'

export default function IframeJitsi() {
  // Declare a new state variable, which we'll call "count"  const [count, setCount] = useState(0);
  return (
    <Iframe url="https://meet.jit.si/lucatest"
        width="100%"
        height="500px"
        id="myId"
        allowFullScreen="true"
        allow="camera; microphone"
        className="myClassname"
        display="initial"
        position="relative"/>
  );
}