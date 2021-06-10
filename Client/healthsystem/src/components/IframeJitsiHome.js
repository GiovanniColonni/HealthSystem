import React, { useEffect } from 'react';
import { useHistory } from 'react-router';



function Iframe(props) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : "" }}
    />
  );
}

export default function IframeJitsiHome(props) {
  // Declare a new state variable, which we'll call "count"  const [count, setCount] = useState(0);
  const history = useHistory()
  /*const demos = {
    jitsi:
      '<iframe width="100%" height="566" scrolling="yes" frameborder="no" allow="camera;microphone" src="https://meet.jit.si/lucatest#config.prejoinPageEnabled=false"></iframe>',
    url:
      ''
      
  }; */

  const componentIframe = (URL_meeting) =>{
    return `<iframe width="100%" height="566" scrolling="yes" frameborder="no" allow="camera;microphone" src="${URL_meeting}"></iframe>`
  }

  useEffect( () => {
  })
  return (
    <Iframe iframe={componentIframe(props.URL)} allow="camera;autoplay" />
  );
}