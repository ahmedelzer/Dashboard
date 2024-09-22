import React, { useEffect, useRef } from "react";
import { useAuth } from "../../contexts/auth";
function Home() {
  //todo: make url and title for iframe and check allows
  //todo: do not forget the localzation of DateTimeParameter and add send the type of file to ashraf
  const { user } = useAuth();
  const iframeRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (iframeRef.current) {
        iframeRef.current.src += ""; // Refresh the iframe every 60 seconds
      }
    }, 6000); // 60,000 milliseconds = 60 seconds

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);
  return (
    <div>
      {user.HomeDashboard ? (
        <iframe
          width="100%"
          height="484"
          ref={iframeRef}
          src={user.HomeDashboard.URL}
          title={user.HomeDashboard.Title}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      ) : (
        <iframe
          width="100%"
          height="484"
          ref={iframeRef}
          src={"http://giem-house.me/"}
          title={"giem-house.me"}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      )}
    </div>
  );
}

export default Home;
