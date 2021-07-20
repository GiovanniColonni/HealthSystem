import React, { useEffect } from "react";

function VideoCallRedirect() {

  useEffect(() => {
    window.location.href = "https://google.com/";
  }, []);

  return (
    <div>
      <h2>TEST</h2>
    </div>
  );
}

export default VideoCallRedirect;