import Button from "devextreme-react/button";
import LoadPanel from "devextreme-react/load-panel";
import "devextreme/dist/css/dx.common.css";
import { useContext, useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import ApiRoutes from "./app-routes";
import { Footer, LoginForm } from "./components";
import LanguageSelector from "./components/header/LanguageSelector";
import Language, { LanguageContext } from "./contexts/Language";
import { NetworkProvider } from "./contexts/NetworkContext";
import { WSProvider } from "./contexts/WSContext";
import { AuthProvider, useAuth } from "./contexts/auth";
import { NavigationProvider } from "./contexts/navigation";
import "./dx-styles.scss";
import { SideNavInnerToolbar as SideNavBarLayout, SingleCard } from "./layouts";
import { Test } from "./pages";
import DynamicTree from "./pages/dynamicTree/DynamicTree";
import Home from "./pages/home/Home";
import ErrorScreen from "./pages/serverError/ErrorScreen";
import "./themes/generated/theme.additional.css";
import "./themes/generated/theme.base.css";
import { useDisplayToast } from "./utils/components/useDisplayToast";
import { useScreenSizeClass } from "./utils/media-query";
import { redirectManager } from "./utils/operation/redirectManager";
function App() {
  const { user, loading, signOut } = useAuth();
  const { Right, localization } = useContext(LanguageContext);

  const [routes, setRoutes] = useState("");
  const [open, setopen] = useState(false);
  const { showToast } = useDisplayToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.sessionStorage.getItem("routes")) {
      setRoutes(JSON.parse(window.sessionStorage.getItem("routes")));
    } else if (user?.UsersGroupDashboardMenuItems) {
      window.sessionStorage.setItem(
        "routes",
        user?.UsersGroupDashboardMenuItems,
      );
      setRoutes(JSON.parse(user?.UsersGroupDashboardMenuItems));
    }
  }, [user]);
  useEffect(() => {
    //SelectFirstLanguage();
    //PrepareLanguage();
    if (localization && localization.appInfo && localization.appInfo.title) {
      document.title = localization.appInfo.title;
    }
  }, []);
  useEffect(() => {
    window.document.dir = Right ? "rtl" : "ltr";

    if (Right) {
      import("./themes/generated/Right.css");
    }
  }, [Right]);
  useEffect(() => {
    const unsubscribe = redirectManager.subscribe((redirect) => {
      console.log("====================================");
      console.log(redirect, "redirect");
      console.log("====================================");
      if (!redirect?.route) return;

      if (redirect.route === "login") {
        signOut();
      }

      if (redirect.mess) {
        showToast(
          redirect.mess,
          "",
          "info",
          4000,
          Right ? "top left" : "top right",
        );
      }

      navigate(redirect.route);
    });

    return unsubscribe;
  }, []);
  if (loading) {
    return <LoadPanel visible={true} />;
  }
  const languageComponent = (
    <Button
      width={100}
      onClick={() => setopen(true)}
      height={"100%"}
      stylingMode={"text"}
      rtlEnabled={false}
      className={`${open ? "!cursor-auto" : "!cursor-pointer"} mx-1 `}
    >
      <div>
        <LanguageSelector open={open} />
      </div>
    </Button>
  );

  return (
    <Routes>
      {/* Content Pages */}
      <Route
        path="/*"
        element={
          <SideNavBarLayout title={localization.appInfo.title}>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/serverError" element={<ErrorScreen />} />
              <Route path="/test" element={<Test />} />
              <Route path="/tree/:id" element={<DynamicTree />} />
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
          <SingleCard
            title={localization.login.sign}
            component={languageComponent}
          >
            {/* <Test /> */}

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
            <NetworkProvider>
              <WSProvider>
                <div className={`app ${screenSizeClass}`}>
                  <App />
                </div>
              </WSProvider>
            </NetworkProvider>
          </Language>
        </NavigationProvider>
      </AuthProvider>
    </Router>
  );
}
