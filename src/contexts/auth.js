import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { getUser, signIn as sendSignInRequest } from "../api/auth";
import { useNavigate } from "react-router-dom";
import RedirectToLogin from "../components/hooks/APIsFunctions/RedirectToLogin";
import Cookies from "js-cookie";
function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      const result = await getUser();
      if (result.isOk) {
        setUser(result.data);
        if (!result.data) {
          navigate("/login");
        }
      }
      console.log(result);

      setLoading(false);
    })();
  }, []);

  const signIn = useCallback(async () => {
    const result = await getUser();
    if (result.isOk) {
      setUser(result.data);
    }

    setLoading(false);
  }, []);

  const signOut = useCallback(() => {
    navigate("/login");
    setUser(undefined);
    Cookies.remove("token");
  }, []);

  function CheckPortalMenuItem(menuItemID) {
    const usersGroupDashboardMenuItemsJson = JSON.parse(
      user?.UsersGroupDashboardMenuItems
    );

    const menuItemIDFind = usersGroupDashboardMenuItemsJson?.find(
      (item) => item.DashboardItemID === menuItemID
    );
    if (!menuItemIDFind || menuItemID === "home") {
      signOut();
      return false;
    }
    return true;
  }
  return (
    <AuthContext.Provider
      value={{ user, setUser, signIn, signOut, loading, CheckPortalMenuItem }}
      {...props}
    />
  );
}

const AuthContext = createContext({ loading: false });
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
