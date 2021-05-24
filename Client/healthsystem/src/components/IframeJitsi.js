import React, { useEffect, useState } from 'react';



const demos = {
  jitsi:
    '<iframe width="100%" height="566" scrolling="yes" frameborder="no" allow="camera;microphone" src="https://meet.jit.si/lucatest"></iframe>'
};

function Iframe(props) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : "" }}
    />
  );
}

export default function IframeJitsi() {
  // Declare a new state variable, which we'll call "count"  const [count, setCount] = useState(0);
  useEffect( () => {
    
  })
  return (
    <Iframe iframe={demos["jitsi"]} allow="camera;autoplay" />
  );
}