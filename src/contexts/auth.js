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
  const [notifications, setNotifications] = useState([
    {
      ope: "Insert",
      notifications: {
        NotificationType: 0,
        NotificationPortalItemCodeNumber: 0,
        NotificationSearchID: "2e60bbd6-5a4f-455e-bc04-0241122316f6",
        MessageTemplateID: "eeec0f5f-6ac9-4eeb-9f70-8a6e68a141d9",
        NotificationID: "53161ee7-7f09-442d-b1ce-18c12dce7d46",
        DashboardItemName: "Customer Requests",
        NotificationPortalItemID: "02f35826-3a7e-4ffd-acc6-af20d3c72918",
        NotificationLink:
          "dynamicFormDependencies/502c37b3-0fde-4024-a11b-295960a8b1c9",
        MessageTemplate: "",
        Message: "test",
      },
    },
  ]);

  useEffect(() => {
    (async function () {
      const result = await getUser();
      if (result.isOk) {
        setUser(result.data);
        if (!result.data) {
          navigate("/login");
        } else {
          //connect to the WS and setNotifications
          //todo check no
        }
      }
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
    Cookies.remove("user");
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
      value={{
        user,
        setUser,
        signIn,
        signOut,
        loading,
        CheckPortalMenuItem,
        notifications,
        setNotifications,
      }}
      {...props}
    />
  );
}

const AuthContext = createContext({ loading: false });
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
