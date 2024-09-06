import LoadPanel from "devextreme-react/load-panel";
import "devextreme/dist/css/dx.common.css";
import React, { useContext, useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import appInfo from "./app-info";
import ApiRoutes from "./app-routes";
import { Footer, LoginForm } from "./components";
import Language, { LanguageContext } from "./contexts/Language";
import { AuthProvider, useAuth } from "./contexts/auth";
import { NavigationProvider } from "./contexts/navigation";
import "./dx-styles.scss";
import { SideNavInnerToolbar as SideNavBarLayout, SingleCard } from "./layouts";
import "./themes/generated/theme.additional.css";
import "./themes/generated/theme.base.css";
import { useScreenSizeClass } from "./utils/media-query";
import Home from "./pages/home/Home";
function App() {
  const { user, loading } = useAuth();
  const { Right, localization } = useContext(LanguageContext);
  const [routes, setRoutes] = useState("");
  useEffect(() => {
    if (user?.UsersGroupDashboardMenuItems) {
      setRoutes(JSON.parse(user?.UsersGroupDashboardMenuItems));
    }
  }, [user]);
  useEffect(() => {
    if (localization && localization.appInfo && localization.appInfo.title) {
      document.title = localization.appInfo.title;
    }
  }, [localization]);

  useEffect(() => {
    if (Right) {
      import("./themes/generated/Right.css");
    }
  }, [Right]);

  if (loading) {
    return <LoadPanel visible={true} />;
  }
  return (
    <Routes>
      {/* Content Pages */}
      <Route
        path="/*"
        element={
          <SideNavBarLayout title={localization.appInfo.title}>
            <Routes>
              <Route path="/home" element={<Home />} />
              {ApiRoutes(routes).map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
            <Footer>
              {localization.footer.footer.copyright
                .replace("{year}", new Date().getFullYear())
                .replace("{appTitle}", localization.appInfo.title)}
              <br />
              {localization.footer.footer.trademark}
            </Footer>
          </SideNavBarLayout>
        }
      />

      {/* Authentication Pages */}
      <Route
        path="/login"
        element={
          <SingleCard title={localization.login.sign}>
            <LoginForm />
          </SingleCard>
        }
      />
      {/* <Route
        path="/reset-password"
        element={
          <SingleCard
            title={restPassword.title}
            description={restPassword.description}
          >
            <ResetPasswordForm />
          </SingleCard>
        }
      />
      <Route
        path="/change-password/:recoveryCode"
        element={
          <SingleCard title="Change Password">
            <ChangePasswordForm />
          </SingleCard>
        }
      /> */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default function Root() {
  const screenSizeClass = useScreenSizeClass();

  return (
    <Router>
      <AuthProvider>
        <NavigationProvider>
          <Language>
            <div className={`app ${screenSizeClass}`}>
              <App />
            </div>
          </Language>
        </NavigationProvider>
      </AuthProvider>
    </Router>
  );
}
