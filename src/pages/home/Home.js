import React from "react";
import { useAuth } from "../../contexts/auth";
function Home() {
  //todo: make url and title for iframe and check allows
  //todo: do not forget the localzation of DateTimeParameter and add send the type of file to ashraf
  const { user } = useAuth();
  return (
    <div>
      {user.HomeDashboard && (
        <iframe
          width="100%"
          height="484"
          src={user.HomeDashboard.URL}
          title={user.HomeDashboard.Title}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      )}
    </div>
  );
}

export default Home;
