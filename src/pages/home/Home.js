import React from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../contexts/auth";
function Home() {
  //todo: make url and title for iframe and check allows
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
