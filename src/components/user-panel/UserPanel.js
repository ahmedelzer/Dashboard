import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ContextMenu, { Position } from "devextreme-react/context-menu";
import List from "devextreme-react/list";
import { useAuth } from "../../contexts/auth";
import "./UserPanel.scss";
import { BiWorld } from "react-icons/bi";
import { LanguageContext } from "../../contexts/Language";
import { FaExchangeAlt } from "react-icons/fa";

export default function UserPanel({ menuMode }) {
  const { user, signOut } = useAuth();
  const { localization } = useContext(LanguageContext);
  const navigate = useNavigate();
  //todo this user UserPanel and this menuItems to login amd logout and make localization
  function navigateToLogin() {
    navigate("/login");
  }

  const menuItems = useMemo(
    () => [
      {
        text: user ? localization.login.switchText : localization.login.login,
        icon: user ? "user" : "login",
        // icon: user ? "login" : "switch",
        onClick: navigateToLogin,
      },
      {
        text: "Logout",
        icon: "runner",
        onClick: signOut,
      },
    ],
    [signOut]
  );
  return (
    <div className={"user-panel"}>
      <div className={"user-info"}>
        <div className={"image-container"}>
          <div
            style={{
              background: `url(${user.avatarUrl}) no-repeat #fff`,
              backgroundSize: "cover",
            }}
            className={"user-image"}
          />
        </div>
        <div className={"user-name"}>{user.Username}</div>
      </div>

      {menuMode === "context" && (
        <ContextMenu
          items={menuItems}
          target={".user-button"}
          showEvent={"dxclick"}
          width={210}
          cssClass={"user-menu"}
        >
          <Position
            my={{ x: "center", y: "top" }}
            at={{ x: "center", y: "bottom" }}
          />
        </ContextMenu>
      )}
      {menuMode === "list" && (
        <List className={"dx-toolbar-menu-action"} items={menuItems} />
      )}
    </div>
  );
}
