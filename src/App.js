import "devextreme/dist/css/dx.common.css";
import "./themes/generated/theme.base.css";
import "./themes/generated/theme.additional.css";
import React, { useContext, useEffect } from "react";
import { HashRouter as Router } from "react-router-dom";
import "./dx-styles.scss";
import LoadPanel from "devextreme-react/load-panel";
import { NavigationProvider } from "./contexts/navigation";
import { AuthProvider, useAuth } from "./contexts/auth";
import { useScreenSizeClass } from "./utils/media-query";
import Content from "./Content";
import UnauthenticatedContent from "./UnauthenticatedContent";
import Language, { LanguageContext } from "./contexts/Language";

function App() {
  const { user, loading } = useAuth();
  const { Right } = useContext(LanguageContext);

  useEffect(() => {
    const setDir = Right ? "rtl" : "ltr";
    document.documentElement.dir = setDir;

    if (Right) {
      import("./themes/generated/Right.css");
      import("devextreme/dist/css/dx.common.css");
      import("./themes/generated/theme.base.css");
      import("./themes/generated/theme.additional.css");
    }
  }, [Right]);

  if (loading) {
    return <LoadPanel visible={true} />;
  }

  if (user) {
    return <Content />;
  }

  return <UnauthenticatedContent />;
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
